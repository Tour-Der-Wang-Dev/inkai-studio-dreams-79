
export interface BusinessMetrics {
  revenue: {
    monthly: number;
    yearly: number;
    growth: number;
  };
  users: {
    active: number;
    new: number;
    retained: number;
  };
  designs: {
    created: number;
    completed: number;
    aiGenerated: number;
  };
  artists: {
    active: number;
    revenue: number;
    bookings: number;
  };
}

export interface UserAnalytics {
  userId: string;
  sessionId: string;
  events: UserEvent[];
  journey: UserJourneyStep[];
  conversionFunnel: FunnelStep[];
  retentionData: RetentionData;
}

export interface UserEvent {
  id: string;
  type: EventType;
  timestamp: Date;
  properties: Record<string, any>;
  userId?: string;
  sessionId: string;
}

export type EventType = 
  | 'page_view'
  | 'design_created'
  | 'design_completed'
  | 'ai_generation_started'
  | 'ai_generation_completed'
  | 'subscription_upgraded'
  | 'artist_booked'
  | 'payment_completed'
  | 'user_registered'
  | 'user_logged_in';

export interface UserJourneyStep {
  step: string;
  timestamp: Date;
  duration: number;
  exitRate: number;
  conversionRate: number;
}

export interface FunnelStep {
  name: string;
  users: number;
  conversions: number;
  conversionRate: number;
  dropoffRate: number;
}

export interface RetentionData {
  day1: number;
  day7: number;
  day30: number;
  day90: number;
}

export interface AIPerformanceMetrics {
  modelId: string;
  modelName: string;
  successRate: number;
  averageProcessingTime: number;
  userSatisfactionScore: number;
  costPerGeneration: number;
  accuracy: number;
  totalGenerations: number;
  failureRate: number;
  qualityScore: number;
}

export interface DashboardFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  segment?: 'all' | 'free' | 'premium' | 'enterprise';
  region?: string;
  artistType?: 'ai' | 'human' | 'hybrid';
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
}

export interface ReportConfig {
  id: string;
  name: string;
  type: 'revenue' | 'users' | 'designs' | 'ai_performance';
  schedule: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  format: 'pdf' | 'csv' | 'excel';
  isActive: boolean;
}

export interface Alert {
  id: string;
  metric: string;
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  isActive: boolean;
  lastTriggered?: Date;
  recipients: string[];
}
