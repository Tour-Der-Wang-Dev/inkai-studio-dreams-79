/**
 * Centralized Error Handling Utility
 * 
 * Provides consistent error logging, user notification, and error reporting
 * across the application. Implements singleton pattern for configuration.
 */

interface ErrorContext {
  [key: string]: any;
}

interface ErrorHandlerConfig {
  enableLogging: boolean;
  enableUserNotification: boolean;
  enableReporting: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

class ErrorHandler {
  private config: ErrorHandlerConfig;
  private context: string;

  constructor(context: string, config?: Partial<ErrorHandlerConfig>) {
    this.context = context;
    this.config = {
      enableLogging: true,
      enableUserNotification: false,
      enableReporting: true,
      logLevel: 'error',
      ...config
    };
  }

  /**
   * Logs error with context and additional data
   * @param error - The error object
   * @param context - Additional context data
   */
  logError(error: Error, context?: ErrorContext): void {
    if (!this.config.enableLogging) return;

    const errorData = {
      timestamp: new Date().toISOString(),
      context: this.context,
      message: error.message,
      stack: error.stack,
      additionalContext: context,
    };

    console.error(`[${this.context}] Error:`, errorData);

    // Send to error reporting service in production
    if (this.config.enableReporting && process.env.NODE_ENV === 'production') {
      this.reportError(errorData);
    }
  }

  /**
   * Logs informational messages
   * @param message - Info message
   * @param context - Additional context
   */
  logInfo(message: string, context?: ErrorContext): void {
    if (!this.config.enableLogging || this.config.logLevel === 'error') return;

    console.info(`[${this.context}] Info:`, { message, context });
  }

  /**
   * Logs warning messages
   * @param message - Warning message
   * @param context - Additional context
   */
  logWarning(message: string, context?: ErrorContext): void {
    if (!this.config.enableLogging || this.config.logLevel === 'error') return;

    console.warn(`[${this.context}] Warning:`, { message, context });
  }

  /**
   * Reports error to external service
   * @param errorData - Formatted error data
   */
  private async reportError(errorData: any): Promise<void> {
    try {
      // Implement error reporting service integration
      // Example: Sentry, LogRocket, etc.
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData),
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  /**
   * Creates user-friendly error message
   * @param error - Original error
   * @returns User-friendly message
   */
  createUserMessage(error: Error): string {
    const errorMap: Record<string, string> = {
      'Network Error': 'Connection problem. Please check your internet and try again.',
      'Unauthorized': 'Your session has expired. Please log in again.',
      'Forbidden': 'You don\'t have permission to perform this action.',
      'Not Found': 'The requested resource was not found.',
      'Validation Error': 'Please check your input and try again.',
    };

    return errorMap[error.message] || 'Something went wrong. Please try again.';
  }
}

/**
 * Factory function to create error handlers with context
 * @param context - Context identifier for logging
 * @param config - Optional configuration overrides
 * @returns ErrorHandler instance
 */
export const createErrorHandler = (
  context: string, 
  config?: Partial<ErrorHandlerConfig>
): ErrorHandler => {
  return new ErrorHandler(context, config);
};

/**
 * Global error boundary for unhandled errors
 */
export const setupGlobalErrorHandler = (): void => {
  window.addEventListener('error', (event) => {
    const handler = createErrorHandler('GlobalErrorHandler');
    handler.logError(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const handler = createErrorHandler('GlobalErrorHandler');
    handler.logError(new Error(event.reason), {
      type: 'UnhandledPromiseRejection',
    });
  });
};