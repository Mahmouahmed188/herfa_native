export interface PriceBreakdown {
  serviceFee: number;
  materialsFee?: number;
  travelFee: number;
  tax: number;
  total: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ProviderOffer {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  experienceYears: number;
  price: number;
  priceBreakdown: PriceBreakdown;
  estimatedDuration: string;
  estimatedDurationMinutes: number;
  isVerified: boolean;
  responseTime: string;
  responseTimeMinutes: number;
  about: string;
  categories: string[];
  portfolio: string[];
  reviews: Review[];
  message: string;
  terms: string;
  phone: string;
  whatsapp: string;
}

export type SortOption = 'lowest_price' | 'highest_rating' | 'fastest_arrival';
