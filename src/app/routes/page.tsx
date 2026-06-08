'use client';

import React, { useState } from 'react';
import { Layout } from '@components/Layout';
import { RouteCard } from '@components/RouteCard';
import { ROUTES } from '@data/mock';
import { Search, Filter } from 'lucide-react';

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'sea' | 'air'>('all');
  const [sortBy, setSortBy] = useState<'rate' | 'change' | 'risk'>('rate');

  const filteredRoutes = ROUTES.filter((route) => {
    const matchesSearch =
      route.origin_port.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination_port.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.origin_country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination_country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMode = filterMode === 'all' || route.transport_mode === filterMode;

    return matchesSearch && matchesMode;
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    switch (sortBy) {
      case 'rate':
        return b.current_rate_usd - a.current_rate_usd;
      case 'change':
        return b.change_pct - a.change_pct;
      case 'risk':
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.risk_level] - riskOrder[a.risk_level];
      default:
        return 0;
    }
  });

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-navy-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Routes de fret</h1>
          <p className="text-blue-200">
            Suivez les taux de 15+ routes maritimes et aériennes principales
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-3 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Chercher par port ou pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Mode Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-2 rounded border transition ${
                filterMode === 'all'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'border-border text-text-secondary hover:bg-background'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterMode('sea')}
              className={`px-4 py-2 rounded border transition ${
                filterMode === 'sea'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'border-border text-text-secondary hover:bg-background'
              }`}
            >
              Maritime
            </button>
            <button
              onClick={() => setFilterMode('air')}
              className={`px-4 py-2 rounded border transition ${
                filterMode === 'air'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'border-border text-text-secondary hover:bg-background'
              }`}
            >
              Aérien
            </button>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            >
              <option value="rate">Trier par taux</option>
              <option value="change">Trier par changement</option>
              <option value="risk">Trier par risque</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-text-secondary mb-6">
          {sortedRoutes.length} route{sortedRoutes.length !== 1 ? 's' : ''} trouvée{sortedRoutes.length !== 1 ? 's' : ''}
        </p>

        {/* Routes Grid */}
        {sortedRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg mb-4">Aucune route trouvée</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterMode('all');
              }}
              className="btn-secondary"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
