/**
 * Base API Client with Dependency Injection and Error Handling
 * 
 * Provides a foundation for all API services with consistent error handling,
 * request/response interceptors, and retry logic.
 */

import { createErrorHandler } from '@/lib/error-handler';

interface ApiClientConfig {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

interface RequestConfig extends RequestInit {
  timeout?: number;
  retry?: boolean;
}

export class ApiClient {
  private config: ApiClientConfig;
  private errorHandler = createErrorHandler('ApiClient');

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    };
  }

  /**
   * Makes HTTP request with error handling and retry logic
   * @param endpoint - API endpoint
   * @param config - Request configuration
   * @returns Promise with response data
   */
  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { retry = true, timeout = this.config.timeout, ...requestConfig } = config;
    
    const url = `${this.config.baseURL}${endpoint}`;
    const headers = this.buildHeaders(requestConfig.headers);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await this.executeWithRetry(
        () => fetch(url, {
          ...requestConfig,
          headers,
          signal: controller.signal
        }),
        retry ? this.config.retryAttempts! : 1
      );

      clearTimeout(timeoutId);
      return await this.handleResponse<T>(response);

    } catch (error) {
      clearTimeout(timeoutId);
      this.errorHandler.logError(error as Error, { endpoint, config });
      throw this.transformError(error as Error);
    }
  }

  /**
   * GET request helper
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request helper
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  /**
   * PUT request helper
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  /**
   * DELETE request helper
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  private buildHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...customHeaders
    });

    if (this.config.apiKey) {
      headers.set('Authorization', `Bearer ${this.config.apiKey}`);
    }

    return headers;
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxAttempts || !this.shouldRetry(error as Error)) {
          throw error;
        }

        await this.delay(this.config.retryDelay! * attempt);
      }
    }

    throw lastError!;
  }

  private shouldRetry(error: Error): boolean {
    // Retry on network errors, timeouts, and 5xx status codes
    return (
      error.name === 'TypeError' || // Network error
      error.name === 'AbortError' || // Timeout
      (error as any).status >= 500 // Server error
    );
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    
    return response.text() as T;
  }

  private transformError(error: Error): Error {
    if (error.name === 'AbortError') {
      return new Error('Request timeout');
    }
    
    if (error.message.includes('Failed to fetch')) {
      return new Error('Network Error');
    }
    
    return error;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}