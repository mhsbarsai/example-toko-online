import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { WishlistModal } from './components/WishlistModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

import { Product, ProductCategory, CartItem, Voucher, Order } from './types';
import { SAMPLE_PRODUCTS, SHIPPING_COURIERS, PAYMENT_METHODS } from './data/products';
import { formatRupiah, generateOrderId, generateTrackingNumber } from './utils/formatters';
import { 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Star, 
  SearchX, 
  ArrowUpDown,
  ShoppingBag,
  ShieldCheck,
  Heart,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function App() {
  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000000);

  // Shopping Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: SAMPLE_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Hitam Onyx'
    }
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([SAMPLE_PRODUCTS[1]]);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // Orders State (with 1 initial completed order for demo)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'INV/TK/982103/4812',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        {
          product: SAMPLE_PRODUCTS[1],
          quantity: 1,
          selectedColor: 'Black Edition'
        }
      ],
      address: {
        fullName: 'Ahmad Rizky',
        phone: '081234567890',
        address: 'Jl. Jendral Sudirman No. 45',
        city: 'Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10270'
      },
      courier: SHIPPING_COURIERS[0],
      paymentMethod: PAYMENT_METHODS[0],
      subtotal: 499000,
      shippingCost: 18000,
      discount: 0,
      total: 518000,
      status: 'Dikirim',
      trackingNumber: generateTrackingNumber('JNE'),
      paidAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Modal Open States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Categories list
  const categories: ProductCategory[] = [
    'Semua',
    'Elektronik & Gadget',
    'Fashion Pria & Wanita',
    'Sepatu & Olahraga',
    'Peralatan Rumah',
    'Kecantikan & Kesehatan',
    'Makanan & Minuman',
    'Produk Lokal UKM'
  ];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((prod) => {
      const matchCategory = selectedCategory === 'Semua' || prod.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRating = prod.rating >= minRating;
      const matchPrice = prod.price <= maxPrice;

      return matchCategory && matchSearch && matchRating && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.salesCount - a.salesCount; // popular
    });
  }, [selectedCategory, searchQuery, sortBy, minRating, maxPrice]);

  // Cart Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (
    product: Product, 
    quantity: number = 1, 
    options?: { color?: string; size?: string; variant?: string }
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) => i.product.id === product.id && 
               i.selectedColor === options?.color && 
               i.selectedSize === options?.size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedColor: options?.color,
            selectedSize: options?.size,
            selectedVariant: options?.variant
          }
        ];
      }
    });

    addToast(`"${product.name.slice(0, 24)}..." ditambahkan ke keranjang!`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    addToast('Produk dihapus dari keranjang', 'info');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      addToast('Dihapus dari favorit', 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Disimpan ke daftar favorit!');
    }
  };

  // Instant Buy Handler
  const handleInstantBuy = (
    product: Product, 
    quantity: number = 1, 
    options?: { color?: string; size?: string; variant?: string }
  ) => {
    handleAddToCart(product, quantity, options);
    setSelectedDetailProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Placement Handler
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    setCart([]);
    setAppliedVoucher(null);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    addToast('Pembayaran berhasil! Pesanan Anda diproses.', 'success');
  };

  // Reorder Handler
  const handleReorder = (orderToReorder: Order) => {
    orderToReorder.items.forEach((item) => {
      handleAddToCart(item.product, item.quantity, {
        color: item.selectedColor,
        size: item.selectedSize,
        variant: item.selectedVariant
      });
    });
    setIsOrderHistoryOpen(false);
    setIsCartOpen(true);
    addToast('Produk dimasukkan kembali ke keranjang!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Header Bar */}
      <Header
        cartCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        ordersCount={orders.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrderHistoryOpen(true)}
        categories={categories}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section & Category Pills */}
        <HeroBanner
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Catalog Section */}
        <section id="catalog-section" className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Katalog {selectedCategory}
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} Produk
              </span>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500 hidden sm:inline">Urutkan:</span>
                <select
                  id="sort-products-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>

              {/* Rating Filter Pill */}
              <button
                id="rating-filter-pill-btn"
                onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border shrink-0 transition flex items-center gap-1 ${
                  minRating > 0
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Rating 4.5+
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 my-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Produk Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Maaf, tidak ada produk yang cocok dengan pencarian atau filter Anda. Coba kata kunci lain.
              </p>
              <button
                id="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setMinRating(0);
                  setMaxPrice(2000000);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((p) => p.id === product.id)}
                  isInCart={cart.some((i) => i.product.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(prod) => handleAddToCart(prod, 1)}
                  onViewDetail={(prod) => setSelectedDetailProduct(prod)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                  T
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Toko<span className="text-emerald-400">Nusantara</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Platform e-commerce lokal terpercaya menyajikan produk kualitas terbaik dengan sistem pembayaran terintegrasi, aman, dan bebas ongkir.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-3">Layanan Pelanggan</h4>
              <p className="hover:text-white cursor-pointer transition">Pusat Bantuan & FAQ</p>
              <p className="hover:text-white cursor-pointer transition">Cara Pengembalian Barang</p>
              <p className="hover:text-white cursor-pointer transition">Lacak Pengiriman Kurir</p>
              <p className="hover:text-white cursor-pointer transition">Garansi Resmi 100%</p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-3">Sistem Pembayaran</h4>
              <div className="flex flex-wrap gap-2 text-slate-400">
                <span className="bg-slate-800 px-2 py-1 rounded-md">QRIS</span>
                <span className="bg-slate-800 px-2 py-1 rounded-md">BCA VA</span>
                <span className="bg-slate-800 px-2 py-1 rounded-md">Mandiri</span>
                <span className="bg-slate-800 px-2 py-1 rounded-md">GoPay</span>
                <span className="bg-slate-800 px-2 py-1 rounded-md">DANA</span>
                <span className="bg-slate-800 px-2 py-1 rounded-md">Visa</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-3">Jasa Pengiriman</h4>
              <p className="text-slate-400">JNE Express, SiCepat Ekspres, GoSend, GrabExpress</p>
              <div className="pt-2 flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Transaksi Terenkripsi SSL
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2026 TokoNusantara E-Commerce Indonesia. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={!!selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        isWishlisted={selectedDetailProduct ? wishlist.some((p) => p.id === selectedDetailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod, qty, opts) => {
          handleAddToCart(prod, qty, opts);
          setSelectedDetailProduct(null);
        }}
        onInstantBuy={handleInstantBuy}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={setAppliedVoucher}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedVoucher={appliedVoucher}
        onOrderCompleted={handleOrderCompleted}
      />

      <OrderSuccessModal
        order={latestOrder}
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        onViewOrdersHistory={() => {
          setIsOrderSuccessOpen(false);
          setIsOrderHistoryOpen(true);
        }}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        onReorder={handleReorder}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod) => handleAddToCart(prod, 1)}
      />

      {/* Notification Toast Stack */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
