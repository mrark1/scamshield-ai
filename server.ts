/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { analysisService } from './server/services/analysis.ts';
import { tinyfishService } from './server/services/tinyfish.ts';
import { DEMO_SCENARIOS } from './server/demoScenarios.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware for parsing JSON bodies
app.use(express.json({ limit: '2mb' }));

// Health Check API
app.get('/api/health', (req: Request, res: Response) => {
  const status = analysisService.getStatus();
  res.json({
    status: 'ok',
    ...status,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Demo Scenarios API
app.get('/api/demo-scenarios', (req: Request, res: Response) => {
  const summaries = DEMO_SCENARIOS.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    category: s.category,
    expectedRisk: s.expectedRisk,
    sampleCompany: s.sampleCompany,
    sampleUrl: s.sampleUrl,
    sampleMessageSnippet: s.sampleMessage.slice(0, 140) + '...',
  }));
  res.json({ scenarios: summaries });
});

// Single Demo Scenario by ID
app.get('/api/demo-scenarios/:id', (req: Request, res: Response) => {
  const scenario = DEMO_SCENARIOS.find((s) => s.id === req.params.id);
  if (!scenario) {
    return res.status(404).json({ error: 'Demo scenario not found' });
  }
  res.json(scenario);
});

// TinyFish Provider Status & Diagnostic Endpoint
// Distinguishes between:
// - missing_key: API key missing
// - untested: API key configured but connectivity not tested
// - connected: Successful real TinyFish request
// - auth_failed: Authentication failure (401/403)
// - provider_error / timeout: Upstream provider failure or network timeout
app.get('/api/tinyfish/status', async (req: Request, res: Response) => {
  const shouldTest = req.query.test === 'true' || req.query.test === '1';
  let status = tinyfishService.getStatus();

  if (shouldTest) {
    status = await tinyfishService.testConnectivity();
  }

  res.json({
    status,
    instruction:
      'To enable live TinyFish web research, obtain an API key from https://agent.tinyfish.ai/api-keys and set TINYFISH_API_KEY in the server environment.',
  });
});

// Dedicated trigger to test TinyFish connectivity actively
app.post('/api/tinyfish/test', async (req: Request, res: Response) => {
  const status = await tinyfishService.testConnectivity();
  res.json({
    status,
  });
});

// Main Investigation Analysis Endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { message, url, companyName, category, isDemo, demoId } = req.body || {};

    // Handle Demo Mode requests
    if (isDemo && demoId) {
      const demoScenario = DEMO_SCENARIOS.find((s) => s.id === demoId);
      if (demoScenario) {
        return res.json({
          status: 'completed',
          report: demoScenario.report,
        });
      }
    }

    if (!message && !url) {
      return res.status(400).json({
        error: 'Please provide at least a suspicious message text or a target website URL.',
      });
    }

    const report = await analysisService.analyze({
      message: typeof message === 'string' ? message : '',
      url: typeof url === 'string' ? url : undefined,
      companyName: typeof companyName === 'string' ? companyName : undefined,
      category: typeof category === 'string' ? category : undefined,
    });

    return res.json({
      status: 'completed',
      report,
    });
  } catch (err: any) {
    console.error('[ScamShield AI] Error in /api/analyze:', err);
    const message = err.message || 'Investigation could not be completed';
    const status = message.includes('Invalid URL') || message.includes('exceeds the maximum') ? 400 : 500;
    return res.status(status).json({
      error: message,
    });
  }
});

// Mount Vite or static file serving
async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ScamShield AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('[ScamShield AI] Bootstrap failed:', err);
  process.exit(1);
});
