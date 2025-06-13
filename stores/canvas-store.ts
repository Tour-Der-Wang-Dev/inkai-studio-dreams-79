
import { create } from 'zustand'
import { Canvas as FabricCanvas, Object as FabricObject } from 'fabric'

interface Layer {
  id: string
  name: string
  visible: boolean
  locked: boolean
  opacity: number
  objects: FabricObject[]
}

interface HistoryState {
  id: string
  canvasState: string
  timestamp: Date
  action: string
}

interface Collaborator {
  id: string
  name: string
  avatar: string
  cursor: { x: number; y: number }
  color: string
  permissions: 'view' | 'comment' | 'edit'
}

interface CanvasState {
  canvas: FabricCanvas | null
  layers: Layer[]
  activeLayer: string
  history: HistoryState[]
  historyIndex: number
  collaborators: Collaborator[]
  aiGenerationStatus: 'idle' | 'generating' | 'complete' | 'error'
  selectedTool: string
  brushSize: number
  brushColor: string
  zoom: number
  
  // Actions
  setCanvas: (canvas: FabricCanvas) => void
  addLayer: (layer: Layer) => void
  setActiveLayer: (layerId: string) => void
  addToHistory: (state: HistoryState) => void
  undo: () => void
  redo: () => void
  setSelectedTool: (tool: string) => void
  setBrushSize: (size: number) => void
  setBrushColor: (color: string) => void
  setZoom: (zoom: number) => void
  addCollaborator: (collaborator: Collaborator) => void
  updateCollaborator: (id: string, updates: Partial<Collaborator>) => void
  removeCollaborator: (id: string) => void
  setAiGenerationStatus: (status: 'idle' | 'generating' | 'complete' | 'error') => void
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  layers: [],
  activeLayer: '',
  history: [],
  historyIndex: -1,
  collaborators: [],
  aiGenerationStatus: 'idle',
  selectedTool: 'select',
  brushSize: 5,
  brushColor: '#000000',
  zoom: 1,

  setCanvas: (canvas) => set({ canvas }),
  
  addLayer: (layer) => set((state) => ({
    layers: [...state.layers, layer],
    activeLayer: layer.id
  })),
  
  setActiveLayer: (layerId) => set({ activeLayer: layerId }),
  
  addToHistory: (historyState) => set((state) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1)
    newHistory.push(historyState)
    return {
      history: newHistory,
      historyIndex: newHistory.length - 1
    }
  }),
  
  undo: () => {
    const { canvas, history, historyIndex } = get()
    if (canvas && historyIndex > 0) {
      canvas.loadFromJSON(history[historyIndex - 1].canvasState, () => {
        canvas.renderAll()
      })
      set({ historyIndex: historyIndex - 1 })
    }
  },
  
  redo: () => {
    const { canvas, history, historyIndex } = get()
    if (canvas && historyIndex < history.length - 1) {
      canvas.loadFromJSON(history[historyIndex + 1].canvasState, () => {
        canvas.renderAll()
      })
      set({ historyIndex: historyIndex + 1 })
    }
  },
  
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setBrushSize: (size) => set({ brushSize: size }),
  setBrushColor: (color) => set({ brushColor: color }),
  setZoom: (zoom) => set({ zoom }),
  
  addCollaborator: (collaborator) => set((state) => ({
    collaborators: [...state.collaborators, collaborator]
  })),
  
  updateCollaborator: (id, updates) => set((state) => ({
    collaborators: state.collaborators.map(c => 
      c.id === id ? { ...c, ...updates } : c
    )
  })),
  
  removeCollaborator: (id) => set((state) => ({
    collaborators: state.collaborators.filter(c => c.id !== id)
  })),
  
  setAiGenerationStatus: (status) => set({ aiGenerationStatus: status })
}))
