
import { BusinessMetrics, UserAnalytics, AIPerformanceMetrics, UserEvent, DashboardFilter, ReportConfig, Alert } from '@/types/analytics';

export class AnalyticsService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  // Event Tracking
  async trackEvent(event: Omit<UserEvent, 'id' | 'timestamp'>): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/analytics/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date()
        })
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Business Metrics
  async getBusinessMetrics(filter: DashboardFilter): Promise<BusinessMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/business-metrics`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch business metrics:', error);
      return this.getDefaultBusinessMetrics();
    }
  }

  // User Analytics
  async getUserAnalytics(filter: DashboardFilter): Promise<UserAnalytics[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/user-analytics`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user analytics:', error);
      return [];
    }
  }

  // AI Performance Metrics
  async getAIPerformanceMetrics(filter: DashboardFilter): Promise<AIPerformanceMetrics[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/ai-performance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch AI performance metrics:', error);
      return [];
    }
  }

  // Revenue Analytics
  async getRevenueAnalytics(filter: DashboardFilter) {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/revenue`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch revenue analytics:', error);
      return { chartData: [], totalRevenue: 0, growth: 0 };
    }
  }

  // Conversion Funnel
  async getConversionFunnel(filter: DashboardFilter) {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/conversion-funnel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch conversion funnel:', error);
      return [];
    }
  }

  // Reports Management
  async generateReport(reportId: string, format: 'pdf' | 'csv' | 'excel'): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/reports/${reportId}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ format })
      });
      return await response.blob();
    } catch (error) {
      console.error('Failed to generate report:', error);
      throw error;
    }
  }

  async getReports(): Promise<ReportConfig[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/reports`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      return [];
    }
  }

  // Alerts Management
  async getAlerts(): Promise<Alert[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/alerts`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      return [];
    }
  }

  async createAlert(alert: Omit<Alert, 'id'>): Promise<Alert> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/alerts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alert)
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to create alert:', error);
      throw error;
    }
  }

  // WebSocket for real-time updates
  connectToRealTimeUpdates(onUpdate: (data: any) => void): void {
    // WebSocket implementation for real-time metrics
    console.log('Connecting to real-time analytics updates...');
  }

  private getDefaultBusinessMetrics(): BusinessMetrics {
    return {
      revenue: { monthly: 0, yearly: 0, growth: 0 },
      users: { active: 0, new: 0, retained: 0 },
      designs: { created: 0, completed: 0, aiGenerated: 0 },
      artists: { active: 0, revenue: 0, bookings: 0 }
    };
  }
}

export const analyticsService = new AnalyticsService(
  process.env.NEXT_PUBLIC_ANALYTICS_API_URL || 'http://localhost:8000',
  process.env.NEXT_PUBLIC_ANALYTICS_API_KEY || ''
);
