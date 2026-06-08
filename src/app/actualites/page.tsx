'use client';

import React, { useState } from 'react';
import { Layout } from '@components/Layout';
import { MARKET_EVENTS } from '@data/mock';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

export default function NewsPage() {
  const [filterImpact, setFilterImpact] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const impactColors = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700',
  };

  const impactLabels = {
    critical: 'Critique',
    high: 'Élevé',
    medium: 'Modéré',
    low: 'Faible',
  };

  const filteredEvents = MARKET_EVENTS.filter((event) => {
    const matchesFilter = filterImpact === 'all' || event.impact_level === filterImpact;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-navy-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Actualités marché</h1>
          <p className="text-blue-200">
            Restez informé des événements qui impactent le marché du fret
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Chercher dans les actualités..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 mb-6"
          />

          <div className="flex gap-2 flex-wrap">
            {['all', 'critical', 'high', 'medium', 'low'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterImpact(level as any)}
                className={`px-4 py-2 rounded border transition ${
                  filterImpact === level
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'border-border text-text-secondary hover:bg-background'
                }`}
              >
                {level === 'all' ? 'Tous' : impactLabels[level as keyof typeof impactLabels]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-text-secondary mb-6">
          {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} trouvé{filteredEvents.length !== 1 ? 's' : ''}
        </p>

        {/* Events Timeline */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="relative"
              >
                {/* Timeline line */}
                {index !== filteredEvents.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
                )}

                {/* Event Card */}
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white ${
                      event.impact_level === 'critical' ? 'bg-red-500' :
                      event.impact_level === 'high' ? 'bg-orange-500' :
                      event.impact_level === 'medium' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}>
                      <AlertCircle size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="flex-grow bg-card border border-border rounded-lg p-6 mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-text-secondary mb-1">
                          {new Date(event.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <h3 className="text-xl font-bold text-text-primary">{event.title}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded text-sm font-semibold flex-shrink-0 ${
                        impactColors[event.impact_level as keyof typeof impactColors]
                      }`}>
                        {impactLabels[event.impact_level as keyof typeof impactLabels]}
                      </span>
                    </div>

                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Affected Routes */}
                    {event.affected_routes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-text-primary mb-2">Routes affectées:</p>
                        <div className="flex flex-wrap gap-2">
                          {event.affected_routes.map((routeId, i) => (
                            <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded">
                              Route #{routeId}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Source */}
                    {event.source && (
                      <p className="text-xs text-text-secondary">
                        Source: {event.source}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-text-secondary text-lg mb-4">Aucun événement trouvé</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterImpact('all');
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
