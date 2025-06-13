
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from 'fabric'
import { useCanvasStore } from '@/stores/canvas-store'
import { useCollaboration } from '@/hooks/use-collaboration'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Share,
  Layers,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react'

interface DesignCanvasProps {
  designId: string
  collaborative?: boolean
}

export const DesignCanvas: React.FC<DesignCanvasProps> = ({ 
  designId, 
  collaborative = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    canvas,
    setCanvas,
    selectedTool,
    brushSize,
    brushColor,
    zoom,
    setZoom,
    layers,
    collaborators,
    undo,
    redo,
    addToHistory
  } = useCanvasStore()

  const socket = useCollaboration(designId)

  useEffect(() => {
    if (!canvasRef.current) return

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    })

    // Configure drawing brush
    fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas)
    fabricCanvas.freeDrawingBrush.color = brushColor
    fabricCanvas.freeDrawingBrush.width = brushSize

    // Add event listeners
    fabricCanvas.on('path:created', () => {
      saveToHistory(fabricCanvas)
    })

    fabricCanvas.on('object:added', () => {
      saveToHistory(fabricCanvas)
    })

    fabricCanvas.on('object:modified', () => {
      saveToHistory(fabricCanvas)
    })

    // Mouse tracking for collaboration
    if (collaborative && socket) {
      fabricCanvas.on('mouse:move', (e) => {
        const pointer = fabricCanvas.getPointer(e.e)
        socket.emit('cursor-move', {
          x: pointer.x,
          y: pointer.y,
          designId
        })
      })
    }

    setCanvas(fabricCanvas)

    return () => {
      fabricCanvas.dispose()
    }
  }, [designId, setCanvas, socket, collaborative])

  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = selectedTool === 'brush'
      
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor
        canvas.freeDrawingBrush.width = brushSize
      }
    }
  }, [canvas, selectedTool, brushColor, brushSize])

  const saveToHistory = (fabricCanvas: FabricCanvas) => {
    const canvasState = JSON.stringify(fabricCanvas.toJSON())
    addToHistory({
      id: Date.now().toString(),
      canvasState,
      timestamp: new Date(),
      action: 'canvas_update'
    })
  }

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 5)
    setZoom(newZoom)
    canvas?.setZoom(newZoom)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.1)
    setZoom(newZoom)
    canvas?.setZoom(newZoom)
  }

  const handleExport = () => {
    if (!canvas) return
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    })
    
    const link = document.createElement('a')
    link.download = `design-${designId}.png`
    link.href = dataURL
    link.click()
  }

  return (
    <div className="flex h-full bg-gray-900">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                className="text-white hover:bg-gray-700"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                className="text-white hover:bg-gray-700"
              >
                <Redo className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-6 bg-gray-600 mx-2" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="text-white hover:bg-gray-700"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-white text-sm min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="text-white hover:bg-gray-700"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {collaborative && (
                <div className="flex -space-x-2">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      style={{ borderColor: collaborator.color }}
                    >
                      <img
                        src={collaborator.avatar}
                        alt={collaborator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                className="text-white hover:bg-gray-700"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-700"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 relative overflow-hidden bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <canvas ref={canvasRef} />
            </div>
          </div>
          
          {/* Collaboration Cursors */}
          {collaborative && collaborators.map((collaborator) => (
            <div
              key={`cursor-${collaborator.id}`}
              className="absolute pointer-events-none z-10 transition-all duration-100"
              style={{
                left: collaborator.cursor.x,
                top: collaborator.cursor.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: collaborator.color }}
              />
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                style={{ backgroundColor: collaborator.color }}
              >
                {collaborator.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layers Panel */}
      <div className="w-80 bg-gray-800 border-l border-gray-700">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center">
              <Layers className="w-4 h-4 mr-2" />
              Layers
            </h3>
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
              Add Layer
            </Button>
          </div>
          
          <div className="space-y-2">
            {layers.map((layer) => (
              <Card key={layer.id} className="bg-gray-700 border-gray-600 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">{layer.name}</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-gray-400 hover:text-white"
                    >
                      {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Lock className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Opacity</span>
                    <Slider
                      value={[layer.opacity]}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
