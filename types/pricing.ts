
export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: {
    aiGenerations: number;
    designRevisions: number;
    premiumStyles: boolean;
    prioritySupport: boolean;
    collaborationTools: boolean;
    exportFormats: string[];
  };
  popular?: boolean;
}

export interface PricingFactors {
  size: number; // 1-10 scale
  complexity: number; // 1-10 scale
  colors: number; // number of colors
  placement: string; // body part affects pricing
}

export interface PriceBreakdown {
  basePrice: number;
  sizeMultiplier: number;
  complexityMultiplier: number;
  colorCost: number;
  placementCost: number;
  discount: number;
  total: number;
}

export interface DiscountCode {
  code: string;
  percentage: number;
  validUntil: Date;
  minAmount?: number;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: Date;
  description: string;
  invoiceUrl?: string;
}
