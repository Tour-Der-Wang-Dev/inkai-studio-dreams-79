
'use client'

import React from 'react'
import { useCanvasStore } from '@/stores/canvas-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ChromePicker } from 'react-color'
import { 
  MousePointer,
  Brush,
  Eraser,
  Type,
  Circle,
  Square,
  Image,
  Palette
} from 'lucide-react'

const tools = [
  { id: 'select', label: 'Select', icon: MousePointer },
  { id: 'brush', label: 'Brush', icon: Brush },
  { id: 'eraser', label: 'Eraser', icon: Eraser },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'circle', label: 'Circle', icon: Circle },
  { id: 'rectangle', label: 'Rectangle', icon: Square },
  { id: 'image', label: 'Image', icon: Image },
]

export const ToolPalette: React.FC = () => {
  const {
    selectedTool,
    setSelectedTool,
    brushSize,
    setBrushSize,
    brushColor,
    setBrushColor,
    canvas
  } = useCanvasStore()

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    
    if (!canvas) return
    
    switch (toolId) {
      case 'select':
        canvas.isDrawingMode = false
        break
      case 'brush':
        canvas.isDrawingMode = true
        break
      case 'eraser':
        canvas.isDrawingMode = true
        // Configure eraser
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.color = 'rgba(255,255,255,1)'
        }
        break
      case 'circle':
        canvas.isDrawingMode = false
        // Add circle creation logic
        break
      case 'rectangle':
        canvas.isDrawingMode = false
        // Add rectangle creation logic
        break
    }
  }

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 p-4 space-y-6">
      {/* Tools */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm">Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleToolSelect(tool.id)}
                  className={`flex flex-col items-center p-3 h-auto ${
                    selectedTool === tool.id
                      ? 'bg-electric-blue text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Brush Settings */}
      {(selectedTool === 'brush' || selectedTool === 'eraser') && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Brush Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Size</label>
              <Slider
                value={[brushSize]}
                onValueChange={([value]) => setBrushSize(value)}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-center text-gray-400 text-xs mt-1">
                {brushSize}px
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Color Picker */}
      {selectedTool !== 'eraser' && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChromePicker
              color={brushColor}
              onChange={(color) => setBrushColor(color.hex)}
              disableAlpha={true}
              styles={{
                default: {
                  picker: {
                    background: '#374151',
                    border: '1px solid #4B5563',
                  },
                  body: {
                    padding: '12px',
                  },
                  controls: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                  color: {
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                  },
                  swatch: {
                    background: brushColor,
                    height: '24px',
                    width: '24px',
                    borderRadius: '4px',
                    border: '1px solid #4B5563',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Quick Colors */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-sm">Quick Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {[
              '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
              '#FF00FF', '#00FFFF', '#FF8000', '#8000FF', '#80FF00', '#FF0080'
            ].map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`w-8 h-8 rounded border-2 ${
                  brushColor === color ? 'border-white' : 'border-gray-600'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
