'use client';

import React from 'react';
import Link from 'next/link';
import { Ship, Plane, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Route } from '@types/index';

interface RouteCardProps {
  route: Route;
}

const getModeIcon = (mode: string) => {
  return mode === 'air' ? <Plane size={16} /> : <Ship size={16} />;
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const isPositive = route.change_pct >= 0;
  const rate = route.transport_mode === 'air' 
    ? `$${route.current_rate_usd.toFixed(2)}/kg` 
    : `$${route.current_rate_usd}/40ft`;

  return (
    <Link href={`/routes/${route.id}`}>
      <div className="bg-card rounded-lg border border-border p-5 hover:shadow-lg hover:border-navy-700 transition-all cursor-pointer">
        {/* Route Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary">
              {route.origin_port}
            </span>
            <span className="text-text-secondary">→</span>
            <span className="font-semibold text-text-primary">
              {route.destination_port}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
              route.transport_mode === 'sea' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {getModeIcon(route.transport_mode)}
              {route.transport_mode === 'air' ? 'Aérien' : 'Maritime'}
            </span>
          </div>
        </div>

        {/* Rate Section */}
        <div className="mb-4">
          <p className="text-text-secondary text-xs mb-1">Taux actuel</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {rate}
          </p>
        </div>

        {/* Changes */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-text-secondary text-xs mb-1">7 jours</p>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? 'text-positive' : 'text-negative'
            }`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{Math.abs(route.change_pct).toFixed(2)}%</span>
            </div>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-1">Transit</p>
            <p className="text-sm font-semibold text-text-primary">
              {route.transit_days} jours
            </p>
          </div>
        </div>

        {/* Risk Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${getRiskColor(route.risk_level)}`}>
            {route.risk_level === 'high' && <AlertCircle size={12} />}
            <span className="capitalize">
              {route.risk_level === 'low' ? 'Faible' : route.risk_level === 'medium' ? 'Modéré' : 'Élevé'}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};
