export type FreightIndexCode = 'BDI' | 'BCI' | 'BPI' | 'BSI' | 'FBXI' | 'TAC';
export type TransportMode = 'sea' | 'air' | 'both';
export type ContainerType = '20ft' | '40ft' | 'air_kg';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ImpactLevel = 'low' | 'medium' | 'high' | 'critical';
export type UserTier = 'free' | 'premium' | 'pro';
export type UserProfession = 'student' | 'professional' | 'business';
export type TrendDirection = 'up' | 'stable' | 'down';
export type ImpactDirection = 'positive' | 'negative' | 'mixed';

export interface HistoryPoint {
  date: string;
  value: number;
}

export interface FreightIndex {
  id: string;
  name: string;
  code: FreightIndexCode;
  current_value: number;
  previous_value: number;
  change_pct: number;
  category: 'maritime' | 'aerial';
  description: string;
  date_updated: string;
  history: HistoryPoint[];
}

export interface Route {
  id: string;
  origin_port: string;
  destination_port: string;
  origin_country: string;
  destination_country: string;
  transport_mode: TransportMode;
  container_type: ContainerType;
  current_rate_usd: number;
  previous_rate_usd: number;
  change_pct: number;
  transit_days: number;
  key_operators: string[];
  risk_level: RiskLevel;
  history: HistoryPoint[];
  seasonal_notes: string;
  geopolitical_notes: string;
}

export interface Port {
  id: string;
  name: string;
  country: string;
  congestion_level: number;
  congestion_trend: TrendDirection;
  weekly_vessels: number;
  average_wait_days: number;
  coordinates: { lat: number; lng: number };
  last_incident?: string;
}

export interface MarketEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  impact_level: ImpactLevel;
  affected_routes: string[];
  impact_direction: ImpactDirection;
  source: string;
}

export interface Alert {
  id: string;
  user_id: string;
  route_id: string;
  threshold_pct: number;
  direction: 'above' | 'below' | 'both';
  is_active: boolean;
  last_triggered?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  company?: string;
  profession: UserProfession;
  saved_routes: string[];
  alerts: string[];
  created_at: string;
}
