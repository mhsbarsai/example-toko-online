export interface ServicePackage {
  id: string;
  name: string;
  price: number; // in IDR
  originalPrice?: number; // for showing discount
  description: string;
  features: string[];
  badge?: string;
  deliveryTime: string; // e.g. "3-5 Hari"
  recommended?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'landing' | 'toko-online' | 'profile' | 'custom';
  description: string;
  image: string;
  tags: string[];
  clientName: string;
  clientLocation: string;
  liveUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  category: string; // e.g. "Kuliner", "Fashion", "Jasa", "Toko Kelontong"
  rating: number;
  content: string;
  avatar: string;
  waVerified?: boolean;
}

export interface EstimatorFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'base' | 'pages' | 'features' | 'addons';
}
