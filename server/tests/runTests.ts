/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { runAllTests } from './tinyfish.test.ts';

async function main() {
  console.log('Running ScamShield AI Test Suite...\n');
  const results = await runAllTests();
  if (results.failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Test runner encountered unexpected error:', err);
  process.exit(1);
});
