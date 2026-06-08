'use client';

import React, { useState } from 'react';
import { Layout } from '@components/Layout';
import { KPICard } from '@components/KPICard';
import { FREIGHT_INDICES } from '@data/mock';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Info } from 'lucide-react';

export default function IndicesPage() {
  const [selectedIndex, setSelectedIndex] = useState(FREIGHT_INDICES[0]);
  const [timeRange, setTimeRange] = useState('6m');

  const getFilteredHistory = (range: string) => {
    const history = selectedIndex.history;
    const months = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 12,
      'all': history.length,
    };
    return history.slice(-months[range as keyof typeof months] || history.length);
  };

  const descriptions: Record<string, string> = {
    bdi: 'Le Baltic Dry Index (BDI) est un indice maritime qui mesure le coût du transport maritime de matières premières sèches en vrac. Il est calculé quotidiennement par le Baltic Exchange basé à Londres et inclut environ 18 routes commerciales différentes.',
    bci: 'Le Baltic Capesize Index mesure les taux de fret pour les navires Capesize, les plus grands porte-conteneurs. Ces navires transportent principalement du minerai de fer, du charbon et des grains.',
    bpi: 'Le Baltic Panamax Index suit les taux de fret pour les navires Panamax, qui peuvent passer par le Canal de Panama. Ces navires sont utilisés pour les conteneurs et les charges générales.',
    bsi: 'Le Baltic Supramax Index mesure les taux pour les navires plus petits utilisés sur les routes régionales et pour les conteneurs de plus petite capacité.',
    fbxi: 'Le Freightos Baltic Index (conteneurs) mesure les tarifs de transport de conteneurs maritimes. Contrairement au BDI, il inclut explicitement les tarifs des conteneurs empilables (EVP).',
    tac: 'L\'indice TAC (The Air Cargo) mesure les tarifs du transport aérien de fret. Il reflète les prix pour le transport express international de marchandises par avion.',
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-navy-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Indices de fret</h1>
          <p className="text-blue-200">
            Suivez les 6 principaux indices maritimes et aériens
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* KPI Grid */}
        <h2 className="text-2xl font-bold text-text-primary mb-6">Vue d'ensemble</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FREIGHT_INDICES.map((index) => (
            <div
              key={index.id}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer"
            >
              <KPICard
                label={index.name}
                value={index.current_value}
                unit={index.code}
                change={index.change_pct}
                sparklineData={index.history.slice(-30)}
              />
            </div>
          ))}
        </div>

        {/* Detailed Chart */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              {selectedIndex.name} ({selectedIndex.code})
            </h2>
            <p className="text-text-secondary mb-4">
              {descriptions[selectedIndex.id]}
            </p>

            {/* Info Box */}
            <div className="bg-background p-4 rounded-lg flex gap-3 mb-6">
              <Info size={20} className="text-navy-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-semibold text-text-primary mb-1">Catégorie</p>
                <p>{selectedIndex.category === 'maritime' ? 'Indice maritime' : 'Indice aérien'}</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={getFilteredHistory(timeRange)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDE3ED" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#5A6A7E"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#5A6A7E"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DDE3ED',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1E5FA8"
                dot={false}
                strokeWidth={2}
                name={`${selectedIndex.code} Value`}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Time Range Buttons */}
          <div className="flex gap-2 justify-center mt-6 flex-wrap">
            {['1m', '3m', '6m', '1y', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded border transition ${
                  timeRange === range
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'border-border text-text-secondary hover:bg-background'
                }`}
              >
                {range === '1m' ? '1 mois' : range === '3m' ? '3 mois' : range === '6m' ? '6 mois' : range === '1y' ? '1 an' : 'Tout'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-text-secondary text-sm mb-2">Valeur actuelle</p>
            <p className="text-3xl font-bold font-mono text-text-primary">
              {selectedIndex.current_value}
            </p>
            <p className="text-text-secondary text-xs mt-2">
              {selectedIndex.code} - {selectedIndex.name}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-text-secondary text-sm mb-2">Changement 7 jours</p>
            <p className={`text-3xl font-bold font-mono ${
              selectedIndex.change_pct >= 0 ? 'text-positive' : 'text-negative'
            }`}>
              {selectedIndex.change_pct >= 0 ? '+' : ''}{selectedIndex.change_pct.toFixed(2)}%
            </p>
            <p className="text-text-secondary text-xs mt-2">
              De {selectedIndex.previous_value} à {selectedIndex.current_value}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-text-secondary text-sm mb-2">Dernière mise à jour</p>
            <p className="text-lg font-semibold text-text-primary">
              {new Date(selectedIndex.date_updated).toLocaleDateString('fr-FR')}
            </p>
            <p className="text-text-secondary text-xs mt-2">
              Quotidien à ~10h30 UTC
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
