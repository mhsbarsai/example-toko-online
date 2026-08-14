export type ProductCategory = 
  | 'all'
  | 'roti-manis-gurih'
  | 'artisan-sourdough'
  | 'viennoiserie-pastry'
  | 'cake-tart'
  | 'hampers-gift'
  | 'minuman-kopi';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  shortDesc: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badges?: string[];
  dietary: ('100% Halal' | 'Gluten-Free' | 'Vegan' | 'Low-Sugar' | 'French Butter' | 'Sourdough 24h')[];
  ingredients: string[];
  allergens: string[];
  shelfLife: string;
  storageTip: string;
  allowSlicing?: boolean;
  allowCustomCakeMessage?: boolean;
  allowCandles?: boolean;
  stockStatus: 'in_stock' | 'fresh_batch' | 'pre_order' | 'sold_out';
  freshBatchTime?: string;
  weightGrams?: number;
  servings?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  sliceOption?: 'Utuh (Tanpa Potong)' | 'Potong Tipis (10mm - Sandwiched)' | 'Potong Tebal (18mm - Toasting)';
  customMessage?: string;
  candleCount?: number;
  giftBoxIncluded?: boolean;
  itemNotes?: string;
}

export type PaymentChannel = 
  | 'qris'
  | 'bca_va'
  | 'mandiri_va'
  | 'bni_va'
  | 'bri_va'
  | 'gopay'
  | 'ovo'
  | 'dana'
  | 'shopeepay'
  | 'credit_card'
  | 'cash_on_pickup';

export type DeliveryMethod = 
  | 'instant' // Kurir Instant (1-2 Jam)
  | 'sameday' // Kurir Same Day (4-6 Jam)
  | 'pickup'  // Ambil Sendiri di Outlet
  | 'courier'; // Ekspedisi Luar Kota (Kue Kering & Hampers)

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  address?: string;
  subdistrict?: string;
  city?: string;
  postalCode?: string;
  deliveryNotes?: string;
  pickupBranch?: string;
  pickupTimeSlot?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  isGift: boolean;
  recipientName?: string;
  recipientPhone?: string;
  greetingCardText?: string;
}

export interface OrderTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentChannel;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  discount: number;
  appliedPromo?: string;
  grandTotal: number;
  status: 'UNPAID' | 'VERIFYING' | 'PAID' | 'BAKING' | 'READY_DELIVERY' | 'COMPLETED' | 'CANCELLED';
  paymentInfo: {
    vaNumber?: string;
    qrCodeUrl?: string;
    expiresAt: string;
    transactionId?: string;
    paidAt?: string;
  };
  timeline: OrderTimelineEvent[];
}

export interface StoreBranch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  operatingHours: string;
  bakingSchedule: string;
  isMainKitchen?: boolean;
  mapEmbedQuery: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  maxDiscount?: number;
  description: string;
}
