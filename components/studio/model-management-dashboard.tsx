
'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useAIModelStore } from '@/stores/ai-model-store'
import {
  Brain,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  RefreshCw
} from 'lucide-react'

export const ModelManagementDashboard: React.FC = () => {
  const {
    availableModels,
    selectedModel,
    modelMetrics,
    isLoadingModels,
    showModelPerformance,
    loadModels,
    selectModel,
    loadModelMetrics,
    toggleModelPerformance
  } = useAIModelStore()

  useEffect(() => {
    loadModels()
  }, [loadModels])

  useEffect(() => {
    if (selectedModel) {
      loadModelMetrics(selectedModel.id)
    }
  }, [selectedModel, loadModelMetrics])

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-900/20 text-green-400 border-green-700' : 'bg-red-900/20 text-red-400 border-red-700'
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Model Management</h2>
          <p className="text-gray-400">Monitor and manage AI models for tattoo design generation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={toggleModelPerformance}
            className="border-gray-600"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {showModelPerformance ? 'Hide' : 'Show'} Performance
          </Button>
          <Button
            variant="outline"
            onClick={loadModels}
            disabled={isLoadingModels}
            className="border-gray-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingModels ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableModels.map((model) => (
          <Card
            key={model.id}
            className={`bg-gray-900 border-gray-800 cursor-pointer transition-all duration-200 ${
              selectedModel?.id === model.id ? 'ring-2 ring-electric-blue' : 'hover:border-gray-600'
            }`}
            onClick={() => selectModel(model)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  {model.name}
                </CardTitle>
                <Badge className={getStatusColor(model.isActive)}>
                  {model.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">{model.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Version</span>
                <span className="text-white">{model.version}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Type</span>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  {model.type}
                </Badge>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Success Rate</span>
                  <span className={getPerformanceColor(model.performance.successRate)}>
                    {model.performance.successRate}%
                  </span>
                </div>
                <Progress 
                  value={model.performance.successRate} 
                  className="h-2"
                />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Avg. Processing</span>
                  <span className="text-white">
                    {model.performance.averageProcessingTime}s
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Quality Score</span>
                  <span className={getPerformanceColor(model.performance.qualityScore)}>
                    {model.performance.qualityScore}/100
                  </span>
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <span className="text-gray-400 text-sm mb-2 block">Capabilities</span>
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 3).map((capability) => (
                    <Badge
                      key={capability}
                      variant="outline"
                      className="border-gray-600 text-gray-400 text-xs"
                    >
                      {capability}
                    </Badge>
                  ))}
                  {model.capabilities.length > 3 && (
                    <Badge
                      variant="outline"
                      className="border-gray-600 text-gray-400 text-xs"
                    >
                      +{model.capabilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Model Performance */}
      {selectedModel && showModelPerformance && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              {selectedModel.name} Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-900/20 rounded-full mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedModel.performance.totalGenerations}
                </div>
                <div className="text-gray-400 text-sm">Total Generations</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-900/20 rounded-full mx-auto mb-2">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedModel.performance.successRate}%
                </div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-900/20 rounded-full mx-auto mb-2">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedModel.performance.averageProcessingTime}s
                </div>
                <div className="text-gray-400 text-sm">Avg. Processing</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-red-900/20 rounded-full mx-auto mb-2">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedModel.performance.errorRate}%
                </div>
                <div className="text-gray-400 text-sm">Error Rate</div>
              </div>
            </div>

            {/* Training Data Info */}
            {selectedModel.trainingData && (
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Training Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dataset Size:</span>
                    <span className="text-white">{selectedModel.trainingData.datasetSize.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Trained:</span>
                    <span className="text-white">
                      {selectedModel.trainingData.lastTrained.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="text-white">{selectedModel.trainingData.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Epochs:</span>
                    <span className="text-white">{selectedModel.trainingData.epochs}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
