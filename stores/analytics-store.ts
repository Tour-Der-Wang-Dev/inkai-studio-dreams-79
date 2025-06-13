
import { create } from 'zustand';
import { BusinessMetrics, UserAnalytics, AIPerformanceMetrics, DashboardFilter, ReportConfig, Alert, ChartData } from '@/types/analytics';
import { analyticsService } from '@/services/analytics-service';

interface AnalyticsState {
  // Data
  businessMetrics: BusinessMetrics | null;
  userAnalytics: UserAnalytics[];
  aiPerformanceMetrics: AIPerformanceMetrics[];
  revenueData: ChartData | null;
  conversionFunnel: any[];
  reports: ReportConfig[];
  alerts: Alert[];
  
  // Filters
  currentFilter: DashboardFilter;
  
  // UI State
  isLoadingMetrics: boolean;
  isLoadingAnalytics: boolean;
  isLoadingAI: boolean;
  isGeneratingReport: boolean;
  selectedMetric: string | null;
  
  // Actions
  setFilter: (filter: DashboardFilter) => void;
  loadBusinessMetrics: () => Promise<void>;
  loadUserAnalytics: () => Promise<void>;
  loadAIPerformanceMetrics: () => Promise<void>;
  loadRevenueAnalytics: () => Promise<void>;
  loadConversionFunnel: () => Promise<void>;
  loadReports: () => Promise<void>;
  loadAlerts: () => Promise<void>;
  generateReport: (reportId: string, format: 'pdf' | 'csv' | 'excel') => Promise<void>;
  createAlert: (alert: Omit<Alert, 'id'>) => Promise<void>;
  trackEvent: (eventType: string, properties: Record<string, any>) => Promise<void>;
  selectMetric: (metric: string | null) => void;
  refreshDashboard: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  // Initial state
  businessMetrics: null,
  userAnalytics: [],
  aiPerformanceMetrics: [],
  revenueData: null,
  conversionFunnel: [],
  reports: [],
  alerts: [],
  currentFilter: {
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    },
    segment: 'all'
  },
  isLoadingMetrics: false,
  isLoadingAnalytics: false,
  isLoadingAI: false,
  isGeneratingReport: false,
  selectedMetric: null,

  // Actions
  setFilter: (filter) => {
    set({ currentFilter: filter });
    // Reload data with new filter
    const { refreshDashboard } = get();
    refreshDashboard();
  },

  loadBusinessMetrics: async () => {
    set({ isLoadingMetrics: true });
    try {
      const { currentFilter } = get();
      const metrics = await analyticsService.getBusinessMetrics(currentFilter);
      set({ businessMetrics: metrics });
    } catch (error) {
      console.error('Failed to load business metrics:', error);
    } finally {
      set({ isLoadingMetrics: false });
    }
  },

  loadUserAnalytics: async () => {
    set({ isLoadingAnalytics: true });
    try {
      const { currentFilter } = get();
      const analytics = await analyticsService.getUserAnalytics(currentFilter);
      set({ userAnalytics: analytics });
    } catch (error) {
      console.error('Failed to load user analytics:', error);
    } finally {
      set({ isLoadingAnalytics: false });
    }
  },

  loadAIPerformanceMetrics: async () => {
    set({ isLoadingAI: true });
    try {
      const { currentFilter } = get();
      const metrics = await analyticsService.getAIPerformanceMetrics(currentFilter);
      set({ aiPerformanceMetrics: metrics });
    } catch (error) {
      console.error('Failed to load AI performance metrics:', error);
    } finally {
      set({ isLoadingAI: false });
    }
  },

  loadRevenueAnalytics: async () => {
    try {
      const { currentFilter } = get();
      const revenueData = await analyticsService.getRevenueAnalytics(currentFilter);
      set({ revenueData: revenueData.chartData });
    } catch (error) {
      console.error('Failed to load revenue analytics:', error);
    }
  },

  loadConversionFunnel: async () => {
    try {
      const { currentFilter } = get();
      const funnel = await analyticsService.getConversionFunnel(currentFilter);
      set({ conversionFunnel: funnel });
    } catch (error) {
      console.error('Failed to load conversion funnel:', error);
    }
  },

  loadReports: async () => {
    try {
      const reports = await analyticsService.getReports();
      set({ reports });
    } catch (error) {
      console.error('Failed to load reports:', error);
    }
  },

  loadAlerts: async () => {
    try {
      const alerts = await analyticsService.getAlerts();
      set({ alerts });
    } catch (error) {
      console.error('Failed to load alerts:', error);
    }
  },

  generateReport: async (reportId, format) => {
    set({ isGeneratingReport: true });
    try {
      const blob = await analyticsService.generateReport(reportId, format);
      
      // Download the report
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportId}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      set({ isGeneratingReport: false });
    }
  },

  createAlert: async (alert) => {
    try {
      const newAlert = await analyticsService.createAlert(alert);
      set(state => ({
        alerts: [...state.alerts, newAlert]
      }));
    } catch (error) {
      console.error('Failed to create alert:', error);
    }
  },

  trackEvent: async (eventType, properties) => {
    try {
      await analyticsService.trackEvent({
        type: eventType as any,
        properties,
        sessionId: 'session-' + Date.now() // Simple session ID
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  },

  selectMetric: (metric) => {
    set({ selectedMetric: metric });
  },

  refreshDashboard: async () => {
    const {
      loadBusinessMetrics,
      loadUserAnalytics,
      loadAIPerformanceMetrics,
      loadRevenueAnalytics,
      loadConversionFunnel
    } = get();

    await Promise.all([
      loadBusinessMetrics(),
      loadUserAnalytics(),
      loadAIPerformanceMetrics(),
      loadRevenueAnalytics(),
      loadConversionFunnel()
    ]);
  }
}));
