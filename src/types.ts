export type ProductCategory = 
  | 'Semua'
  | 'Elektronik & Gadget'
  | 'Fashion Pria & Wanita'
  | 'Sepatu & Olahraga'
  | 'Peralatan Rumah'
  | 'Kecantikan & Kesehatan'
  | 'Makanan & Minuman'
  | 'Produk Lokal UKM';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  stock: number;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  variants?: {
    type: 'color' | 'size' | 'variant';
    options: string[];
  }[];
  brand: string;
  weightGrams: number;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  freeShipping?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedVariant?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface ShippingCourier {
  id: string;
  name: string;
  serviceName: string;
  estimatedDays: string;
  price: number;
  logo: string;
}

export type PaymentCategory = 'qris' | 'va' | 'ewallet' | 'card' | 'cod';

export interface PaymentMethodOption {
  id: string;
  name: string;
  category: PaymentCategory;
  icon: string;
  description?: string;
  accountNumber?: string;
}

export interface Voucher {
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 20 for 20% or 50000 for Rp 50,000
  minSpend: number;
  maxDiscount?: number;
}

export type OrderStatus = 'Menunggu Pembayaran' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  address: ShippingAddress;
  courier: ShippingCourier;
  paymentMethod: PaymentMethodOption;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  virtualAccount?: string;
  qrCodeUrl?: string;
  paidAt?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  userAvatar: string;
}
