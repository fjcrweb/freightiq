'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PaywallOverlayProps {
  isLocked: boolean;
  requiredTier: string;
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
  isLocked,
  requiredTier,
}) => {
  if (!isLocked) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
      <div className="text-center">
        <AlertCircle className="mx-auto mb-3 text-warning" size={32} />
        <p className="text-sm font-semibold text-text-primary mb-2">
          Fonctionnalité {requiredTier}
        </p>
        <a
          href="/pricing"
          className="inline-block btn-primary text-sm"
        >
          Découvrir les plans
        </a>
      </div>
    </div>
  );
};
