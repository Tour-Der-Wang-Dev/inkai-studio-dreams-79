
import { create } from 'zustand'
import { ArtistProfile, ArtistPortfolioItem, ArtistSkill, ArtistReview, BookingSlot, BookingRequest } from '@/types/artist'

interface ArtistState {
  // Current artist data
  currentArtist: ArtistProfile | null
  portfolio: ArtistPortfolioItem[]
  skills: ArtistSkill[]
  reviews: ArtistReview[]
  bookingSlots: BookingSlot[]
  bookingRequests: BookingRequest[]
  
  // UI state
  isEditingProfile: boolean
  selectedPortfolioFilter: string
  isLoadingPortfolio: boolean
  
  // Actions
  setCurrentArtist: (artist: ArtistProfile | null) => void
  setPortfolio: (portfolio: ArtistPortfolioItem[]) => void
  addPortfolioItem: (item: ArtistPortfolioItem) => void
  updatePortfolioItem: (id: string, updates: Partial<ArtistPortfolioItem>) => void
  removePortfolioItem: (id: string) => void
  reorderPortfolio: (fromIndex: number, toIndex: number) => void
  
  setSkills: (skills: ArtistSkill[]) => void
  addSkill: (skill: ArtistSkill) => void
  updateSkill: (id: string, updates: Partial<ArtistSkill>) => void
  removeSkill: (id: string) => void
  
  setReviews: (reviews: ArtistReview[]) => void
  addReview: (review: ArtistReview) => void
  
  setBookingSlots: (slots: BookingSlot[]) => void
  addBookingSlot: (slot: BookingSlot) => void
  updateBookingSlot: (id: string, updates: Partial<BookingSlot>) => void
  removeBookingSlot: (id: string) => void
  
  setBookingRequests: (requests: BookingRequest[]) => void
  updateBookingRequest: (id: string, updates: Partial<BookingRequest>) => void
  
  setIsEditingProfile: (editing: boolean) => void
  setSelectedPortfolioFilter: (filter: string) => void
  setIsLoadingPortfolio: (loading: boolean) => void
}

export const useArtistStore = create<ArtistState>((set, get) => ({
  // Initial state
  currentArtist: null,
  portfolio: [],
  skills: [],
  reviews: [],
  bookingSlots: [],
  bookingRequests: [],
  isEditingProfile: false,
  selectedPortfolioFilter: 'all',
  isLoadingPortfolio: false,

  // Artist actions
  setCurrentArtist: (artist) => set({ currentArtist: artist }),

  // Portfolio actions
  setPortfolio: (portfolio) => set({ portfolio }),
  
  addPortfolioItem: (item) => set((state) => ({
    portfolio: [...state.portfolio, item]
  })),
  
  updatePortfolioItem: (id, updates) => set((state) => ({
    portfolio: state.portfolio.map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  
  removePortfolioItem: (id) => set((state) => ({
    portfolio: state.portfolio.filter(item => item.id !== id)
  })),
  
  reorderPortfolio: (fromIndex, toIndex) => set((state) => {
    const newPortfolio = [...state.portfolio]
    const [removed] = newPortfolio.splice(fromIndex, 1)
    newPortfolio.splice(toIndex, 0, removed)
    
    // Update display_order
    const updatedPortfolio = newPortfolio.map((item, index) => ({
      ...item,
      display_order: index
    }))
    
    return { portfolio: updatedPortfolio }
  }),

  // Skills actions
  setSkills: (skills) => set({ skills }),
  
  addSkill: (skill) => set((state) => ({
    skills: [...state.skills, skill]
  })),
  
  updateSkill: (id, updates) => set((state) => ({
    skills: state.skills.map(skill =>
      skill.id === id ? { ...skill, ...updates } : skill
    )
  })),
  
  removeSkill: (id) => set((state) => ({
    skills: state.skills.filter(skill => skill.id !== id)
  })),

  // Reviews actions
  setReviews: (reviews) => set({ reviews }),
  
  addReview: (review) => set((state) => ({
    reviews: [...state.reviews, review]
  })),

  // Booking slots actions
  setBookingSlots: (slots) => set({ bookingSlots: slots }),
  
  addBookingSlot: (slot) => set((state) => ({
    bookingSlots: [...state.bookingSlots, slot]
  })),
  
  updateBookingSlot: (id, updates) => set((state) => ({
    bookingSlots: state.bookingSlots.map(slot =>
      slot.id === id ? { ...slot, ...updates } : slot
    )
  })),
  
  removeBookingSlot: (id) => set((state) => ({
    bookingSlots: state.bookingSlots.filter(slot => slot.id !== id)
  })),

  // Booking requests actions
  setBookingRequests: (requests) => set({ bookingRequests: requests }),
  
  updateBookingRequest: (id, updates) => set((state) => ({
    bookingRequests: state.bookingRequests.map(request =>
      request.id === id ? { ...request, ...updates } : request
    )
  })),

  // UI actions
  setIsEditingProfile: (editing) => set({ isEditingProfile: editing }),
  setSelectedPortfolioFilter: (filter) => set({ selectedPortfolioFilter: filter }),
  setIsLoadingPortfolio: (loading) => set({ isLoadingPortfolio: loading })
}))
