
export interface AIModel {
  id: string;
  name: string;
  type: 'neural_style' | 'cyclegan' | 'stable_diffusion' | 'custom';
  version: string;
  description: string;
  isActive: boolean;
  performance: ModelPerformance;
  capabilities: string[];
  trainingData?: TrainingData;
}

export interface ModelPerformance {
  successRate: number;
  averageProcessingTime: number;
  qualityScore: number;
  userRating: number;
  totalGenerations: number;
  errorRate: number;
}

export interface TrainingData {
  datasetSize: number;
  lastTrained: Date;
  accuracy: number;
  epochs: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  variables: PromptVariable[];
  successRate: number;
  isActive: boolean;
  style?: string;
}

export interface PromptVariable {
  name: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  required: boolean;
  default?: any;
  options?: string[];
}

export interface GenerationRequest {
  id: string;
  prompt: string;
  style: string;
  modelId: string;
  parameters: Record<string, any>;
  referenceImage?: string;
  negativePrompt?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  result?: GenerationResult;
  error?: string;
}

export interface GenerationResult {
  imageUrl: string;
  metadata: {
    processingTime: number;
    modelUsed: string;
    qualityScore: number;
    parameters: Record<string, any>;
  };
  feedback?: UserFeedback;
}

export interface UserFeedback {
  rating: number;
  quality: number;
  accuracy: number;
  comments?: string;
  improvements?: string[];
}

export interface QueueStatus {
  position: number;
  estimatedWaitTime: number;
  totalInQueue: number;
}

export interface ModelMetrics {
  modelId: string;
  period: 'day' | 'week' | 'month';
  generations: number;
  successRate: number;
  averageQuality: number;
  userSatisfaction: number;
  errorTypes: Record<string, number>;
}
