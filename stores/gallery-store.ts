
import { create } from 'zustand'

interface FilterState {
  styles: string[]
  bodyParts: string[]
  colors: string[]
  artists: string[]
  searchQuery: string
  isAiOnly: boolean
  sortBy: 'recent' | 'popular' | 'rating'
}

interface GalleryState {
  filters: FilterState
  favorites: string[]
  setFilters: (filters: Partial<FilterState>) => void
  toggleFavorite: (imageId: string) => void
  clearFilters: () => void
}

const initialFilters: FilterState = {
  styles: [],
  bodyParts: [],
  colors: [],
  artists: [],
  searchQuery: '',
  isAiOnly: false,
  sortBy: 'recent',
}

export const useGalleryStore = create<GalleryState>((set) => ({
  filters: initialFilters,
  favorites: [],
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  toggleFavorite: (imageId) =>
    set((state) => ({
      favorites: state.favorites.includes(imageId)
        ? state.favorites.filter((id) => id !== imageId)
        : [...state.favorites, imageId],
    })),
  clearFilters: () => set({ filters: initialFilters }),
}))
