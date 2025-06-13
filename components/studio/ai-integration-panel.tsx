
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { useCanvasStore } from '@/stores/canvas-store'
import { 
  Sparkles, 
  Upload, 
  Download, 
  RefreshCw,
  Settings,
  Image as ImageIcon,
  Palette,
  Zap
} from 'lucide-react'

const stylePresets = [
  { id: 'realistic', name: 'Realistic', thumbnail: '/lovable-uploads/0054f817-2244-44d2-81b9-1611ad4bc89d.png' },
  { id: 'traditional', name: 'Traditional', thumbnail: '/lovable-uploads/e23b9249-3729-4797-a77f-1f0eb59db256.png' },
  { id: 'geometric', name: 'Geometric', thumbnail: '/lovable-uploads/7ded6218-6d2c-4efe-923f-312633f0f2f3.png' },
  { id: 'watercolor', name: 'Watercolor', thumbnail: '/lovable-uploads/0b7ab356-de3b-4783-8746-d4938c6712f8.png' },
  { id: 'minimalist', name: 'Minimalist', thumbnail: '/lovable-uploads/a2f0b7bd-6ea3-4229-a9ce-94dc279b6ca4.png' },
  { id: 'neo-traditional', name: 'Neo-Traditional', thumbnail: '/lovable-uploads/4a11d10b-9c79-4d6d-88f9-b1212fa82a7d.png' },
]

export const AIIntegrationPanel: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [creativity, setCreativity] = useState(50)
  const [detail, setDetail] = useState(70)
  const [colorIntensity, setColorIntensity] = useState(60)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [batchCount, setBatchCount] = useState(1)
  
  const { aiGenerationStatus, setAiGenerationStatus } = useCanvasStore()

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setAiGenerationStatus('generating')
    setGenerationProgress(0)
    
    // Simulate AI generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setAiGenerationStatus('complete')
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 500)
    
    // TODO: Integrate with actual AI service
    try {
      // Placeholder for AI generation logic
      console.log('Generating with:', {
        prompt,
        style: selectedStyle,
        creativity,
        detail,
        colorIntensity,
        batchCount
      })
    } catch (error) {
      setAiGenerationStatus('error')
      clearInterval(progressInterval)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setReferenceImage(file)
    }
  }

  return (
    <div className="w-96 bg-gray-900 border-l border-gray-700 p-4 space-y-6 overflow-y-auto">
      {/* AI Prompt */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your tattoo design..."
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
            />
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || aiGenerationStatus === 'generating'}
            className="w-full bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90"
          >
            {aiGenerationStatus === 'generating' ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Design
              </>
            )}
          </Button>
          
          {aiGenerationStatus === 'generating' && (
            <div className="space-y-2">
              <Progress value={generationProgress} className="w-full" />
              <p className="text-xs text-gray-400 text-center">
                {Math.round(generationProgress)}% complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Style Selection */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Style Presets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {stylePresets.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                  selectedStyle === style.id
                    ? 'border-electric-blue'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <img
                  src={style.thumbnail}
                  alt={style.name}
                  className="w-full h-20 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                  <span className="text-white text-xs p-2 w-full text-center">
                    {style.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Parameters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Creativity: {creativity}%
            </label>
            <Slider
              value={[creativity]}
              onValueChange={([value]) => setCreativity(value)}
              max={100}
              min={0}
              step={1}
            />
          </div>
          
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Detail Level: {detail}%
            </label>
            <Slider
              value={[detail]}
              onValueChange={([value]) => setDetail(value)}
              max={100}
              min={0}
              step={1}
            />
          </div>
          
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Color Intensity: {colorIntensity}%
            </label>
            <Slider
              value={[colorIntensity]}
              onValueChange={([value]) => setColorIntensity(value)}
              max={100}
              min={0}
              step={1}
            />
          </div>
          
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Batch Size: {batchCount}
            </label>
            <Slider
              value={[batchCount]}
              onValueChange={([value]) => setBatchCount(value)}
              max={6}
              min={1}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reference Image Upload */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Reference Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="reference-upload"
            />
            <label
              htmlFor="reference-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-gray-400 text-sm">
                {referenceImage ? referenceImage.name : 'Upload reference image'}
              </span>
            </label>
          </div>
          {referenceImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReferenceImage(null)}
              className="w-full mt-2 text-gray-400 hover:text-white"
            >
              Remove Image
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as Template
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Style Transfer
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Enhance Details
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
