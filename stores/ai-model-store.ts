
import { create } from 'zustand';
import { AIModel, GenerationRequest, PromptTemplate, ModelMetrics, QueueStatus } from '@/types/ai-models';
import { aiModelService } from '@/services/ai-model-service';

interface AIModelState {
  // Models
  availableModels: AIModel[];
  selectedModel: AIModel | null;
  modelMetrics: Record<string, ModelMetrics[]>;
  
  // Prompt Templates
  promptTemplates: PromptTemplate[];
  selectedTemplate: PromptTemplate | null;
  
  // Generation Queue
  activeGenerations: GenerationRequest[];
  generationHistory: GenerationRequest[];
  queueStatus: QueueStatus | null;
  
  // UI State
  isLoadingModels: boolean;
  isLoadingTemplates: boolean;
  showModelPerformance: boolean;
  
  // Actions
  loadModels: () => Promise<void>;
  selectModel: (model: AIModel) => void;
  loadModelMetrics: (modelId: string) => Promise<void>;
  loadPromptTemplates: (category?: string) => Promise<void>;
  selectTemplate: (template: PromptTemplate) => void;
  optimizePrompt: (prompt: string, style: string) => Promise<string>;
  startGeneration: (request: Omit<GenerationRequest, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  updateGenerationStatus: (requestId: string) => Promise<void>;
  submitFeedback: (requestId: string, feedback: any) => Promise<void>;
  updateQueueStatus: () => Promise<void>;
  toggleModelPerformance: () => void;
}

export const useAIModelStore = create<AIModelState>((set, get) => ({
  // Initial state
  availableModels: [],
  selectedModel: null,
  modelMetrics: {},
  promptTemplates: [],
  selectedTemplate: null,
  activeGenerations: [],
  generationHistory: [],
  queueStatus: null,
  isLoadingModels: false,
  isLoadingTemplates: false,
  showModelPerformance: false,

  // Actions
  loadModels: async () => {
    set({ isLoadingModels: true });
    try {
      const models = await aiModelService.getAvailableModels();
      set({ 
        availableModels: models,
        selectedModel: models.find(m => m.isActive) || models[0] || null
      });
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      set({ isLoadingModels: false });
    }
  },

  selectModel: (model) => {
    set({ selectedModel: model });
  },

  loadModelMetrics: async (modelId) => {
    try {
      const metrics = await aiModelService.getModelPerformance(modelId);
      set(state => ({
        modelMetrics: {
          ...state.modelMetrics,
          [modelId]: metrics
        }
      }));
    } catch (error) {
      console.error('Failed to load model metrics:', error);
    }
  },

  loadPromptTemplates: async (category) => {
    set({ isLoadingTemplates: true });
    try {
      const templates = await aiModelService.getPromptTemplates(category);
      set({ promptTemplates: templates });
    } catch (error) {
      console.error('Failed to load prompt templates:', error);
    } finally {
      set({ isLoadingTemplates: false });
    }
  },

  selectTemplate: (template) => {
    set({ selectedTemplate: template });
  },

  optimizePrompt: async (prompt, style) => {
    try {
      return await aiModelService.optimizePrompt(prompt, style);
    } catch (error) {
      console.error('Failed to optimize prompt:', error);
      return prompt;
    }
  },

  startGeneration: async (request) => {
    try {
      const requestId = await aiModelService.generateDesign(request);
      
      const newRequest: GenerationRequest = {
        ...request,
        id: requestId,
        status: 'queued',
        createdAt: new Date()
      };
      
      set(state => ({
        activeGenerations: [...state.activeGenerations, newRequest]
      }));
      
      return requestId;
    } catch (error) {
      console.error('Failed to start generation:', error);
      throw error;
    }
  },

  updateGenerationStatus: async (requestId) => {
    try {
      const updated = await aiModelService.getGenerationStatus(requestId);
      
      set(state => {
        const activeIndex = state.activeGenerations.findIndex(g => g.id === requestId);
        
        if (activeIndex !== -1) {
          const updatedActive = [...state.activeGenerations];
          updatedActive[activeIndex] = updated;
          
          // Move to history if completed or failed
          if (updated.status === 'completed' || updated.status === 'failed') {
            updatedActive.splice(activeIndex, 1);
            return {
              activeGenerations: updatedActive,
              generationHistory: [updated, ...state.generationHistory]
            };
          }
          
          return { activeGenerations: updatedActive };
        }
        
        return state;
      });
    } catch (error) {
      console.error('Failed to update generation status:', error);
    }
  },

  submitFeedback: async (requestId, feedback) => {
    try {
      await aiModelService.submitFeedback(requestId, feedback);
      
      set(state => ({
        generationHistory: state.generationHistory.map(g => 
          g.id === requestId 
            ? { ...g, result: { ...g.result!, feedback } }
            : g
        )
      }));
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  },

  updateQueueStatus: async () => {
    try {
      const status = await aiModelService.getQueueStatus();
      set({ queueStatus: status });
    } catch (error) {
      console.error('Failed to update queue status:', error);
    }
  },

  toggleModelPerformance: () => {
    set(state => ({ showModelPerformance: !state.showModelPerformance }));
  }
}));
