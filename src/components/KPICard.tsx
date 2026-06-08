'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface KPICardProps {
  label: string;
  value: number | string;
  unit?: string;
  change: number;
  sparklineData: Array<{ date: string; value: number }>;
  isLoading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  unit = '',
  change,
  sparklineData,
  isLoading = false,
}) => {
  const isPositive = change >= 0;
  const chartColor = isPositive ? '#1D9E75' : '#E24B4A';

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-text-secondary text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-text-primary font-mono mt-1">
            {isLoading ? '—' : value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-semibold ${
          isPositive ? 'badge-up' : 'badge-down'
        }`}>
          {isPositive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{Math.abs(change).toFixed(2)}%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={sparklineData}>
          <Tooltip 
            contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-text-secondary mt-2">
        Last 30 days
      </p>
    </div>
  );
};
