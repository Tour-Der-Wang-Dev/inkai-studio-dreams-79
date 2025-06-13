
import { create } from 'zustand';
import { SubscriptionTier, PricingFactors, PriceBreakdown, DiscountCode, PaymentHistory } from '@/types/pricing';

interface PricingState {
  // Pricing Calculator
  pricingFactors: PricingFactors;
  priceBreakdown: PriceBreakdown;
  activeDiscountCode: DiscountCode | null;
  
  // Subscription Management
  subscriptionTiers: SubscriptionTier[];
  currentSubscription: SubscriptionTier | null;
  paymentHistory: PaymentHistory[];
  
  // UI State
  isCalculating: boolean;
  showBreakdown: boolean;
  
  // Actions
  updatePricingFactors: (factors: Partial<PricingFactors>) => void;
  calculatePrice: () => void;
  applyDiscountCode: (code: string) => void;
  removeDiscountCode: () => void;
  setSubscriptionTiers: (tiers: SubscriptionTier[]) => void;
  setCurrentSubscription: (subscription: SubscriptionTier | null) => void;
  setPaymentHistory: (history: PaymentHistory[]) => void;
  toggleBreakdown: () => void;
}

export const usePricingStore = create<PricingState>((set, get) => ({
  // Initial state
  pricingFactors: {
    size: 5,
    complexity: 5,
    colors: 3,
    placement: 'arm'
  },
  priceBreakdown: {
    basePrice: 200,
    sizeMultiplier: 1.0,
    complexityMultiplier: 1.0,
    colorCost: 0,
    placementCost: 0,
    discount: 0,
    total: 200
  },
  activeDiscountCode: null,
  subscriptionTiers: [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      interval: 'month',
      features: {
        aiGenerations: 10,
        designRevisions: 3,
        premiumStyles: false,
        prioritySupport: false,
        collaborationTools: false,
        exportFormats: ['PNG']
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      interval: 'month',
      popular: true,
      features: {
        aiGenerations: 50,
        designRevisions: 10,
        premiumStyles: true,
        prioritySupport: true,
        collaborationTools: true,
        exportFormats: ['PNG', 'SVG', 'PDF']
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      interval: 'month',
      features: {
        aiGenerations: -1, // unlimited
        designRevisions: -1, // unlimited
        premiumStyles: true,
        prioritySupport: true,
        collaborationTools: true,
        exportFormats: ['PNG', 'SVG', 'PDF', 'AI']
      }
    }
  ],
  currentSubscription: null,
  paymentHistory: [],
  isCalculating: false,
  showBreakdown: false,

  // Actions
  updatePricingFactors: (factors) => {
    set((state) => ({
      pricingFactors: { ...state.pricingFactors, ...factors }
    }));
    get().calculatePrice();
  },

  calculatePrice: () => {
    set({ isCalculating: true });
    
    setTimeout(() => {
      const { pricingFactors, activeDiscountCode } = get();
      const basePrice = 200;
      
      // Size multiplier (1x to 2x)
      const sizeMultiplier = 1 + (pricingFactors.size - 1) * 0.11;
      
      // Complexity multiplier (1x to 2.5x)
      const complexityMultiplier = 1 + (pricingFactors.complexity - 1) * 0.17;
      
      // Color cost ($20 per additional color after 2)
      const colorCost = Math.max(0, pricingFactors.colors - 2) * 20;
      
      // Placement cost based on body part
      const placementMultipliers: Record<string, number> = {
        'arm': 1.0,
        'leg': 1.1,
        'back': 1.5,
        'chest': 1.3,
        'face': 2.0,
        'hand': 1.8,
        'neck': 1.6
      };
      const placementCost = basePrice * (placementMultipliers[pricingFactors.placement] - 1);
      
      // Calculate subtotal
      const subtotal = (basePrice * sizeMultiplier * complexityMultiplier) + colorCost + placementCost;
      
      // Apply discount
      const discountAmount = activeDiscountCode ? (subtotal * activeDiscountCode.percentage / 100) : 0;
      const total = subtotal - discountAmount;
      
      set({
        priceBreakdown: {
          basePrice,
          sizeMultiplier,
          complexityMultiplier,
          colorCost,
          placementCost,
          discount: discountAmount,
          total
        },
        isCalculating: false
      });
    }, 300); // Simulate calculation delay for smooth animation
  },

  applyDiscountCode: (code) => {
    // Mock discount codes
    const discountCodes: Record<string, DiscountCode> = {
      'SAVE10': { code: 'SAVE10', percentage: 10, validUntil: new Date('2024-12-31') },
      'NEWUSER': { code: 'NEWUSER', percentage: 20, validUntil: new Date('2024-12-31') },
      'HOLIDAY25': { code: 'HOLIDAY25', percentage: 25, validUntil: new Date('2024-12-31') }
    };
    
    const discountCode = discountCodes[code.toUpperCase()];
    if (discountCode && new Date() < discountCode.validUntil) {
      set({ activeDiscountCode: discountCode });
      get().calculatePrice();
    }
  },

  removeDiscountCode: () => {
    set({ activeDiscountCode: null });
    get().calculatePrice();
  },

  setSubscriptionTiers: (tiers) => set({ subscriptionTiers: tiers }),
  setCurrentSubscription: (subscription) => set({ currentSubscription: subscription }),
  setPaymentHistory: (history) => set({ paymentHistory: history }),
  toggleBreakdown: () => set((state) => ({ showBreakdown: !state.showBreakdown }))
}));
