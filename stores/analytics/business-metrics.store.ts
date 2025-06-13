import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { BusinessMetrics, DashboardFilter } from '@/types/analytics';
import { analyticsService } from '@/services/analytics-service';
import { createErrorHandler } from '@/lib/error-handler';

/**
 * Business Metrics Store
 * 
 * Handles business-specific analytics data including revenue, user metrics,
 * and key performance indicators. Follows single responsibility principle
 * by focusing only on business metrics state management.
 * 
 * @interface BusinessMetricsState
 */
interface BusinessMetricsState {
  // Data State
  readonly metrics: BusinessMetrics | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly lastUpdated: Date | null;
  
  // Computed Values
  readonly revenueGrowthRate: number;
  readonly userGrowthRate: number;
  readonly conversionRate: number;
  
  // Actions
  readonly loadMetrics: (filter: DashboardFilter) => Promise<void>;
  readonly refreshMetrics: () => Promise<void>;
  readonly clearError: () => void;
  readonly resetState: () => void;
}

/**
 * Creates the business metrics store with error handling and logging
 */
export const useBusinessMetricsStore = create<BusinessMetricsState>()(
  subscribeWithSelector((set, get) => {
    const errorHandler = createErrorHandler('BusinessMetricsStore');

    return {
      // Initial State
      metrics: null,
      isLoading: false,
      error: null,
      lastUpdated: null,

      // Computed Properties
      get revenueGrowthRate() {
        const metrics = get().metrics;
        if (!metrics?.revenue) return 0;
        return metrics.revenue.growth;
      },

      get userGrowthRate() {
        const metrics = get().metrics;
        if (!metrics?.users) return 0;
        return ((metrics.users.new / metrics.users.active) * 100) || 0;
      },

      get conversionRate() {
        const metrics = get().metrics;
        if (!metrics?.users || !metrics?.designs) return 0;
        return ((metrics.designs.completed / metrics.users.active) * 100) || 0;
      },

      // Actions
      loadMetrics: async (filter: DashboardFilter) => {
        // Input validation
        if (!filter?.dateRange?.start || !filter?.dateRange?.end) {
          const error = 'Invalid date range provided';
          set({ error });
          errorHandler.logError(new Error(error), { filter });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const metrics = await analyticsService.getBusinessMetrics(filter);
          
          // Validate response data
          if (!metrics) {
            throw new Error('No metrics data received from service');
          }

          set({ 
            metrics, 
            isLoading: false, 
            lastUpdated: new Date(),
            error: null 
          });

          errorHandler.logInfo('Business metrics loaded successfully', { 
            revenue: metrics.revenue?.monthly,
            users: metrics.users?.active 
          });

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load business metrics';
          
          set({ 
            isLoading: false, 
            error: errorMessage,
            metrics: null 
          });

          errorHandler.logError(error as Error, { filter });
        }
      },

      refreshMetrics: async () => {
        const currentFilter = get().metrics ? 
          { dateRange: { start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() } } :
          null;
        
        if (currentFilter) {
          await get().loadMetrics(currentFilter);
        }
      },

      clearError: () => set({ error: null }),

      resetState: () => set({
        metrics: null,
        isLoading: false,
        error: null,
        lastUpdated: null
      })
    };
  })
);

/**
 * Selector hooks for specific data slices
 * Prevents unnecessary re-renders by subscribing to specific state slices
 */
export const useRevenueMetrics = () => 
  useBusinessMetricsStore((state) => state.metrics?.revenue);

export const useUserMetrics = () => 
  useBusinessMetricsStore((state) => state.metrics?.users);

export const useDesignMetrics = () => 
  useBusinessMetricsStore((state) => state.metrics?.designs);

export const useMetricsLoading = () => 
  useBusinessMetricsStore((state) => state.isLoading);

export const useMetricsError = () => 
  useBusinessMetricsStore((state) => state.error);