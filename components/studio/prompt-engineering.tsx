
'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAIModelStore } from '@/stores/ai-model-store'
import {
  Wand2,
  BookOpen,
  TrendingUp,
  Copy,
  RefreshCw,
  Sparkles,
  Filter,
  CheckCircle
} from 'lucide-react'

export const PromptEngineering: React.FC = () => {
  const {
    promptTemplates,
    selectedTemplate,
    isLoadingTemplates,
    loadPromptTemplates,
    selectTemplate,
    optimizePrompt
  } = useAIModelStore()

  const [userPrompt, setUserPrompt] = useState('')
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    loadPromptTemplates()
  }, [loadPromptTemplates])

  const categories = Array.from(new Set(promptTemplates.map(t => t.category)))

  const filteredTemplates = selectedCategory
    ? promptTemplates.filter(t => t.category === selectedCategory)
    : promptTemplates

  const handleOptimizePrompt = async () => {
    if (!userPrompt.trim()) return

    setIsOptimizing(true)
    try {
      const optimized = await optimizePrompt(userPrompt, selectedStyle)
      setOptimizedPrompt(optimized)
    } catch (error) {
      console.error('Failed to optimize prompt:', error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleTemplateSelect = (template: any) => {
    selectTemplate(template)
    setUserPrompt(template.template)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const applyTemplate = (template: any) => {
    let appliedTemplate = template.template
    
    // Replace variables with defaults or placeholders
    template.variables.forEach((variable: any) => {
      const placeholder = variable.default || `[${variable.name}]`
      appliedTemplate = appliedTemplate.replace(`{${variable.name}}`, placeholder)
    })
    
    setUserPrompt(appliedTemplate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Prompt Engineering</h2>
          <p className="text-gray-400">Optimize your prompts for better AI generation results</p>
        </div>
        <Button
          variant="outline"
          onClick={() => loadPromptTemplates(selectedCategory)}
          disabled={isLoadingTemplates}
          className="border-gray-600"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingTemplates ? 'animate-spin' : ''}`} />
          Refresh Templates
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Prompt Optimizer */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Wand2 className="w-5 h-5 mr-2" />
              Prompt Optimizer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Your Prompt</label>
              <Textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Enter your tattoo design prompt..."
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Style</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
              >
                <option value="realistic">Realistic</option>
                <option value="traditional">Traditional</option>
                <option value="geometric">Geometric</option>
                <option value="watercolor">Watercolor</option>
                <option value="minimalist">Minimalist</option>
                <option value="neo-traditional">Neo-Traditional</option>
              </select>
            </div>

            <Button
              onClick={handleOptimizePrompt}
              disabled={!userPrompt.trim() || isOptimizing}
              className="w-full bg-gradient-to-r from-electric-blue to-neon-green"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize Prompt
                </>
              )}
            </Button>

            {optimizedPrompt && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-400 text-sm">Optimized Prompt</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(optimizedPrompt)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-md p-3">
                  <p className="text-white text-sm">{optimizedPrompt}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Template Library */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Template Library
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded text-white text-sm px-2 py-1"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-electric-blue bg-electric-blue/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{template.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-400 text-xs"
                      >
                        {template.category}
                      </Badge>
                      <div className="flex items-center text-green-400 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {template.successRate}%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                    {template.template}
                  </p>
                  
                  {template.variables.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable) => (
                        <Badge
                          key={variable.name}
                          variant="outline"
                          className="border-gray-600 text-gray-400 text-xs"
                        >
                          {variable.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      {template.isActive && (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      )}
                      <span className="text-xs text-gray-400">
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        applyTemplate(template)
                      }}
                      className="text-electric-blue hover:text-electric-blue/80 text-xs"
                    >
                      Apply Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
