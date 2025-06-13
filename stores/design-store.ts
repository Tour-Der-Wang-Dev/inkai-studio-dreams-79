
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Design {
  id: string
  title: string
  prompt: string
  imageUrl: string
  style: string
  bodyPart: string
  createdAt: Date
  isAiGenerated: boolean
}

interface DesignState {
  designs: Design[]
  currentDesign: Design | null
  isGenerating: boolean
  addDesign: (design: Design) => void
  setCurrentDesign: (design: Design | null) => void
  setIsGenerating: (generating: boolean) => void
  removeDesign: (id: string) => void
}

export const useDesignStore = create<DesignState>()(
  persist(
    (set) => ({
      designs: [],
      currentDesign: null,
      isGenerating: false,
      addDesign: (design) =>
        set((state) => ({
          designs: [design, ...state.designs],
        })),
      setCurrentDesign: (design) => set({ currentDesign: design }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      removeDesign: (id) =>
        set((state) => ({
          designs: state.designs.filter((d) => d.id !== id),
        })),
    }),
    {
      name: 'design-storage',
    }
  )
)
