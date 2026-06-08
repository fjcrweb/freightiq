'use client';

import React from 'react';
import Link from 'next/link';
import { Layout } from '@components/Layout';
import { KPICard } from '@components/KPICard';
import { RouteCard } from '@components/RouteCard';
import { FREIGHT_INDICES, ROUTES, MARKET_EVENTS } from '@data/mock';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function HomePage() {
  const bdiData = FREIGHT_INDICES[0];
  const topRoutes = ROUTES.slice(0, 5);
  const recentEvents = MARKET_EVENTS.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            L'intelligence du fret mondial, simplifiée
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Suivez les indices maritimes, les prix des conteneurs et les taux aériens en temps réel. Conçu pour les professionnels de la logistique.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/routes" className="btn-primary bg-white text-navy-900 hover:bg-gray-100 text-lg px-6 py-3">
              Accéder au dashboard
            </Link>
            <Link href="/apprendre" className="btn-secondary border-white text-white hover:bg-white hover:text-navy-900 text-lg px-6 py-3">
              Voir comment ça marche
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="bg-background border-b border-border py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-text-primary font-mono">15</p>
            <p className="text-text-secondary">routes suivies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary font-mono">8</p>
            <p className="text-text-secondary">ports monitorés</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary font-mono">Quotidien</p>
            <p className="text-text-secondary">Données mises à jour</p>
          </div>
        </div>
      </div>

      {/* Market Overview - KPI Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-text-primary mb-8">Vue du marché</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FREIGHT_INDICES.map((index) => (
            <KPICard
              key={index.id}
              label={index.name}
              value={index.current_value}
              unit={index.code}
              change={index.change_pct}
              sparklineData={index.history.slice(-30)}
            />
          ))}
        </div>
      </section>

      {/* BDI Chart */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-background rounded-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            Évolution du Baltic Dry Index — 12 derniers mois
          </h2>
          <p className="text-text-secondary">Indice composite des tarifs de transport maritime de matières premières</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border mb-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={bdiData.history}>
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
                name="BDI Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
            <button
              key={range}
              className="px-4 py-2 rounded border border-border text-text-secondary hover:bg-card transition"
            >
              {range}
            </button>
          ))}
        </div>
      </section>

      {/* Top Routes */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary">Routes les plus actives</h2>
          <Link href="/routes" className="flex items-center gap-2 text-navy-700 hover:text-navy-900 font-semibold">
            Voir toutes les routes <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRoutes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* Market Events */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-text-primary mb-8">Actualités marché</h2>
        <div className="space-y-4">
          {recentEvents.map((event) => {
            const impactColor = {
              critical: 'bg-red-100 text-red-700',
              high: 'bg-orange-100 text-orange-700',
              medium: 'bg-yellow-100 text-yellow-700',
              low: 'bg-blue-100 text-blue-700',
            };

            return (
              <div key={event.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-text-secondary mb-1">{event.date}</p>
                    <h3 className="text-lg font-bold text-text-primary">{event.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${impactColor[event.impact_level]}`}>
                    {event.impact_level === 'critical' ? 'Critique' : 
                     event.impact_level === 'high' ? 'Élevé' :
                     event.impact_level === 'medium' ? 'Modéré' : 'Faible'}
                  </span>
                </div>
                <p className="text-text-secondary mb-3 line-clamp-2">{event.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {event.affected_routes.slice(0, 3).map((routeId) => {
                    const route = ROUTES.find(r => r.id === routeId);
                    return route ? (
                      <span key={routeId} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {route.origin_port} → {route.destination_port}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/actualites" className="btn-secondary">
            Voir tous les événements
          </Link>
        </div>
      </section>

      {/* Premium Features Teaser */}
      <section className="bg-background py-16 px-4 my-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border-2 border-navy-900 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-navy-900 mb-2">Accès Premium</p>
                <Link href="/pricing" className="btn-primary">
                  Découvrir les plans
                </Link>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">Alertes de prix personnalisées</h3>
            <p className="text-text-secondary">
              Recevez des notifications instantanées quand les tarifs de vos routes atteignent vos seuils configurés.
            </p>
          </div>

          <div className="bg-card border-2 border-navy-900 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-navy-900 mb-2">Accès Pro</p>
                <Link href="/pricing" className="btn-primary">
                  Découvrir les plans
                </Link>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">Export & API</h3>
            <p className="text-text-secondary">
              Téléchargez vos données en CSV et accédez à notre API pour intégrer les données dans vos systèmes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Commencez gratuitement aujourd'hui</h2>
          <p className="text-blue-200 mb-8">
            Accédez aux données de fret mondiales. Aucune carte de crédit requise.
          </p>
          <Link href="/auth/signup" className="btn-primary bg-white text-navy-900 hover:bg-gray-100 text-lg px-6 py-3">
            Créer un compte gratuit
          </Link>
        </div>
      </section>
    </Layout>
  );
}
