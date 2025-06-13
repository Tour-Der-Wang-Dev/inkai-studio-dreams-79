
import { AIModel, GenerationRequest, GenerationResult, PromptTemplate, ModelMetrics, QueueStatus } from '@/types/ai-models';

export class AIModelService {
  private baseUrl: string;
  private apiKey: string;
  private socket: any; // WebSocket connection

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  // Model Management
  async getAvailableModels(): Promise<AIModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }

  async getModelPerformance(modelId: string): Promise<ModelMetrics[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models/${modelId}/metrics`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch model performance:', error);
      return [];
    }
  }

  // Prompt Engineering
  async getPromptTemplates(category?: string): Promise<PromptTemplate[]> {
    try {
      const url = category 
        ? `${this.baseUrl}/prompts?category=${category}`
        : `${this.baseUrl}/prompts`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch prompt templates:', error);
      return [];
    }
  }

  async optimizePrompt(prompt: string, style: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/prompts/optimize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, style })
      });
      const result = await response.json();
      return result.optimizedPrompt;
    } catch (error) {
      console.error('Failed to optimize prompt:', error);
      return prompt;
    }
  }

  // Generation Management
  async generateDesign(request: Omit<GenerationRequest, 'id' | 'status' | 'createdAt'>): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      const result = await response.json();
      return result.requestId;
    } catch (error) {
      console.error('Failed to start generation:', error);
      throw error;
    }
  }

  async getGenerationStatus(requestId: string): Promise<GenerationRequest> {
    try {
      const response = await fetch(`${this.baseUrl}/generate/${requestId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to get generation status:', error);
      throw error;
    }
  }

  async getQueueStatus(): Promise<QueueStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/queue/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to get queue status:', error);
      return { position: 0, estimatedWaitTime: 0, totalInQueue: 0 };
    }
  }

  // Feedback and Training
  async submitFeedback(requestId: string, feedback: any): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/generate/${requestId}/feedback`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  }

  // WebSocket for real-time updates
  connectToUpdates(onUpdate: (data: any) => void): void {
    // Initialize WebSocket connection for real-time updates
    // This would connect to the AI service WebSocket endpoint
    console.log('Connecting to AI service updates...');
  }

  disconnectFromUpdates(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const aiModelService = new AIModelService(
  process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000',
  process.env.NEXT_PUBLIC_AI_API_KEY || ''
);
