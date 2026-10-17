/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs text-amber-200/90 flex items-start gap-3">
      <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
        <Lock className="h-4 w-4" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-amber-300">
          Privacy Notice: Never Submit Passwords, OTPs, or Banking Credentials
        </p>
        <p className="text-amber-200/80 leading-relaxed">
          ScamShield AI investigates public communication patterns, entity reputations, and publicly accessible web evidence. Never input passwords, 2FA codes, PINs, bank account numbers, or government identification cards into the investigation form.
        </p>
      </div>
    </div>
  );
};
