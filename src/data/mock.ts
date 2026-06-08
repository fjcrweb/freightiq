import { FreightIndex, HistoryPoint, Route, Port, MarketEvent } from '@types/index';

const generateHistory = (baseValue: number, months: number = 24): HistoryPoint[] => {
  const data: HistoryPoint[] = [];
  const today = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    const variance = (Math.random() - 0.5) * 40;
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round((baseValue + variance) * 100) / 100,
    });
  }
  return data;
};

export const FREIGHT_INDICES: FreightIndex[] = [
  {
    id: 'bdi',
    name: 'Baltic Dry Index',
    code: 'BDI',
    current_value: 1247,
    previous_value: 1189,
    change_pct: 4.88,
    category: 'maritime',
    description: 'Primary indicator of global shipping costs for dry bulk cargo.',
    date_updated: new Date().toISOString(),
    history: generateHistory(1247),
  },
  {
    id: 'bci',
    name: 'Baltic Capesize Index',
    code: 'BCI',
    current_value: 2156,
    previous_value: 2043,
    change_pct: 5.53,
    category: 'maritime',
    description: 'Tracks large vessel shipping rates for bulk commodities.',
    date_updated: new Date().toISOString(),
    history: generateHistory(2156),
  },
  {
    id: 'bpi',
    name: 'Baltic Panamax Index',
    code: 'BPI',
    current_value: 1089,
    previous_value: 1045,
    change_pct: 4.21,
    category: 'maritime',
    description: 'Shipping rates for Panamax-sized bulk carriers.',
    date_updated: new Date().toISOString(),
    history: generateHistory(1089),
  },
  {
    id: 'bsi',
    name: 'Baltic Supramax Index',
    code: 'BSI',
    current_value: 876,
    previous_value: 823,
    change_pct: 6.44,
    category: 'maritime',
    description: 'Rates for smaller bulk carrier vessels.',
    date_updated: new Date().toISOString(),
    history: generateHistory(876),
  },
  {
    id: 'fbxi',
    name: 'Freightos Baltic Index (Containers)',
    code: 'FBXI',
    current_value: 2847,
    previous_value: 2712,
    change_pct: 4.98,
    category: 'maritime',
    description: 'Global container shipping rates index.',
    date_updated: new Date().toISOString(),
    history: generateHistory(2847),
  },
  {
    id: 'tac',
    name: 'TAC Index (Air Freight)',
    code: 'TAC',
    current_value: 156,
    previous_value: 148,
    change_pct: 5.41,
    category: 'aerial',
    description: 'Global air freight pricing index.',
    date_updated: new Date().toISOString(),
    history: generateHistory(156),
  },
];

export const ROUTES: Route[] = [
  {
    id: 'route-001',
    origin_port: 'Shanghai',
    destination_port: 'Rotterdam',
    origin_country: 'CN',
    destination_country: 'NL',
    transport_mode: 'sea',
    container_type: '40ft',
    current_rate_usd: 2890,
    previous_rate_usd: 2756,
    change_pct: 4.85,
    transit_days: 42,
    key_operators: ['MSC', 'Maersk', 'CMA CGM', 'COSCO'],
    risk_level: 'medium',
    history: generateHistory(2890),
    seasonal_notes: 'Peak season Sept-Nov. Pre-holiday demand drives rates up.',
    geopolitical_notes: 'Suez Canal route affected by Red Sea tensions.',
  },
];

export const PORTS: Port[] = [
  {
    id: 'port-001',
    name: 'Shanghai',
    country: 'China',
    congestion_level: 8,
    congestion_trend: 'up',
    weekly_vessels: 487,
    average_wait_days: 3,
    coordinates: { lat: 30.3928, lng: 121.5439 },
    last_incident: 'Typhoon warnings Sept 15-20',
  },
];

export const MARKET_EVENTS: MarketEvent[] = [
  {
    id: 'event-001',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    title: 'Red Sea Crisis Escalation',
    description: 'Houthi attacks on cargo vessels force rerouting via Cape of Good Hope.',
    impact_level: 'critical',
    affected_routes: ['route-001'],
    impact_direction: 'negative',
    source: 'Maritime Intelligence',
  },
];
