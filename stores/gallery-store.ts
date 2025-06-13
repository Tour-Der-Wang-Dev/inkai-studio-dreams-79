
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  title: string;
  artist: string;
  style: string;
  bodyPart: string;
  colors: string[];
  isAiEnhanced: boolean;
  processSteps: ProcessStep[];
  metadata: ImageMetadata;
  likes: number;
  views: number;
  createdAt: string;
  rating: number;
}

export interface ProcessStep {
  step: number;
  description: string;
  imageUrl?: string;
  timestamp: string;
}

export interface ImageMetadata {
  prompt?: string;
  model?: string;
  parameters?: Record<string, any>;
  processingTime?: number;
  aiInvolvement: number; // 0-100%
}

export interface FilterState {
  styles: string[];
  bodyParts: string[];
  colors: string[];
  artists: string[];
  searchQuery: string;
  isAiOnly: boolean;
  sortBy: 'recent' | 'popular' | 'rating';
  priceRange: [number, number];
  tags: string[];
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: string;
}

interface GalleryStore {
  // State
  items: GalleryItem[];
  filteredItems: GalleryItem[];
  filters: FilterState;
  selectedItem: GalleryItem | null;
  favorites: string[];
  filterPresets: FilterPreset[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  
  // Actions
  setItems: (items: GalleryItem[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setSelectedItem: (item: GalleryItem | null) => void;
  toggleFavorite: (itemId: string) => void;
  saveFilterPreset: (name: string) => void;
  loadFilterPreset: (presetId: string) => void;
  deleteFilterPreset: (presetId: string) => void;
  applyFilters: () => void;
  loadMore: () => void;
  setLoading: (loading: boolean) => void;
}

const defaultFilters: FilterState = {
  styles: [],
  bodyParts: [],
  colors: [],
  artists: [],
  searchQuery: '',
  isAiOnly: false,
  sortBy: 'recent',
  priceRange: [0, 1000],
  tags: [],
};

export const useGalleryStore = create<GalleryStore>()(
  persist(
    (set, get) => ({
      items: [],
      filteredItems: [],
      filters: defaultFilters,
      selectedItem: null,
      favorites: [],
      filterPresets: [],
      isLoading: false,
      hasMore: true,
      page: 1,

      setItems: (items) => {
        set({ items });
        get().applyFilters();
      },

      setFilters: (newFilters) => {
        set({ filters: { ...get().filters, ...newFilters } });
        get().applyFilters();
      },

      resetFilters: () => {
        set({ filters: defaultFilters });
        get().applyFilters();
      },

      setSelectedItem: (item) => set({ selectedItem: item }),

      toggleFavorite: (itemId) => {
        const favorites = get().favorites;
        const newFavorites = favorites.includes(itemId)
          ? favorites.filter(id => id !== itemId)
          : [...favorites, itemId];
        set({ favorites: newFavorites });
      },

      saveFilterPreset: (name) => {
        const preset: FilterPreset = {
          id: Date.now().toString(),
          name,
          filters: get().filters,
          createdAt: new Date().toISOString(),
        };
        set({ filterPresets: [...get().filterPresets, preset] });
      },

      loadFilterPreset: (presetId) => {
        const preset = get().filterPresets.find(p => p.id === presetId);
        if (preset) {
          set({ filters: preset.filters });
          get().applyFilters();
        }
      },

      deleteFilterPreset: (presetId) => {
        set({ filterPresets: get().filterPresets.filter(p => p.id !== presetId) });
      },

      applyFilters: () => {
        const { items, filters } = get();
        let filtered = [...items];

        // Apply search query
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.artist.toLowerCase().includes(query) ||
            item.style.toLowerCase().includes(query) ||
            item.bodyPart.toLowerCase().includes(query)
          );
        }

        // Apply style filters
        if (filters.styles.length > 0) {
          filtered = filtered.filter(item => filters.styles.includes(item.style));
        }

        // Apply body part filters
        if (filters.bodyParts.length > 0) {
          filtered = filtered.filter(item => filters.bodyParts.includes(item.bodyPart));
        }

        // Apply color filters
        if (filters.colors.length > 0) {
          filtered = filtered.filter(item =>
            filters.colors.some(color => item.colors.includes(color))
          );
        }

        // Apply artist filters
        if (filters.artists.length > 0) {
          filtered = filtered.filter(item => filters.artists.includes(item.artist));
        }

        // Apply AI filter
        if (filters.isAiOnly) {
          filtered = filtered.filter(item => item.isAiEnhanced);
        }

        // Apply sorting
        filtered.sort((a, b) => {
          switch (filters.sortBy) {
            case 'popular':
              return b.likes - a.likes;
            case 'rating':
              return b.rating - a.rating;
            case 'recent':
            default:
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
        });

        set({ filteredItems: filtered });
      },

      loadMore: () => {
        set({ page: get().page + 1 });
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'gallery-store',
      partialize: (state) => ({ 
        favorites: state.favorites, 
        filterPresets: state.filterPresets 
      }),
    }
  )
);
