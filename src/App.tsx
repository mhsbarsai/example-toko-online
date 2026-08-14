import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { BakingScheduleModal } from './components/BakingScheduleModal';
import { StoreLocationsModal } from './components/StoreLocationsModal';
import { AIBakerConsultant } from './components/AIBakerConsultant';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { Footer } from './components/Footer';

import { Product, CartItem, Order, PromoCode } from './types';
import { INITIAL_PRODUCTS } from './data/products';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kencana_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('kencana_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Orders state persisted in localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kencana_orders_history');
      if (saved) return JSON.parse(saved);

      // Seed with sample initial order for rich testing
      const sampleOrder: Order = {
        id: 'ord_sample_1',
        orderNumber: 'KNC-88219',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        items: [
          {
            id: 'cart_s1',
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
            sliceOption: 'Potong Tebal (18mm - Toasting)',
          },
          {
            id: 'cart_s2',
            product: INITIAL_PRODUCTS[4],
            quantity: 2,
          }
        ],
        customer: {
          fullName: 'Budi Santoso',
          phoneNumber: '081299887766',
          email: 'budi.santoso@gmail.com',
          address: 'Jl. Wijaya Timur No. 15, Kebayoran Baru',
          city: 'Jakarta Selatan',
          deliveryDate: new Date().toISOString().split('T')[0],
          deliveryTimeSlot: 'Pagi (08:00 - 11:00 WIB)',
          isGift: false,
        },
        deliveryMethod: 'instant',
        paymentMethod: 'qris',
        subtotal: 138000,
        deliveryFee: 25000,
        packagingFee: 3000,
        discount: 0,
        grandTotal: 166000,
        status: 'BAKING',
        paymentInfo: {
          expiresAt: new Date().toISOString(),
          paidAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
          transactionId: 'TRX-SAMPLE-9901'
        },
        timeline: [
          {
            title: 'Pesanan Dibuat',
            description: 'Pesanan diterima sistem online.',
            timestamp: '08:15',
            completed: true,
          },
          {
            title: 'Pembayaran Dikonfirmasi',
            description: 'QRIS diverifikasi lunas.',
            timestamp: '08:16',
            completed: true,
          },
          {
            title: 'Dipanggang & Dikemas Dapur',
            description: 'Dapur memanggang batch sourdough segar.',
            timestamp: '08:25',
            completed: true,
            current: true,
          },
          {
            title: 'Dalam Pengantaran Kurir',
            description: 'Kurir menuju lokasi tujuan.',
            timestamp: '-',
            completed: false,
          },
          {
            title: 'Pesanan Selesai',
            description: 'Roti tiba dalam kondisi hangat.',
            timestamp: '-',
            completed: false,
          }
        ]
      };
      localStorage.setItem('kencana_orders_history', JSON.stringify([sampleOrder]));
      return [sampleOrder];
    } catch {
      return [];
    }
  });

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('kencana_orders_history', JSON.stringify(newOrders));
  };

  // Active Promo Code
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | undefined>(undefined);

  // Modals visibility
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrderForReceipt, setActiveOrderForReceipt] = useState<Order | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerInitialCode, setTrackerInitialCode] = useState('');
  const [isBakingScheduleOpen, setIsBakingScheduleOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === newItem.product.id &&
        item.sliceOption === newItem.sliceOption &&
        item.customMessage === newItem.customMessage
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += newItem.quantity;
      setCartItems(updated);
    } else {
      const itemWithId: CartItem = {
        ...newItem,
        id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      };
      setCartItems((prev) => [...prev, itemWithId]);
    }
  };

  const handleQuickAddToCart = (product: Product) => {
    handleAddToCart({
      product,
      quantity: 1,
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Checkout flow
  const handleProceedToCheckout = (promo?: PromoCode) => {
    if (promo) setAppliedPromo(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    saveOrders([newOrder, ...orders]);
    setCartItems([]); // clear cart
    setAppliedPromo(undefined);
    setIsCheckoutOpen(false);
    setActiveOrderForReceipt(newOrder);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => {
      if (o.id === orderId || o.orderNumber === orderId) {
        return {
          ...o,
          status: newStatus,
          paymentInfo: {
            ...o.paymentInfo,
            paidAt: newStatus !== 'UNPAID' ? new Date().toISOString() : undefined,
          }
        };
      }
      return o;
    });

    saveOrders(updated);
    if (activeOrderForReceipt && (activeOrderForReceipt.id === orderId || activeOrderForReceipt.orderNumber === orderId)) {
      setActiveOrderForReceipt({
        ...activeOrderForReceipt,
        status: newStatus,
        paymentInfo: {
          ...activeOrderForReceipt.paymentInfo,
          paidAt: newStatus !== 'UNPAID' ? new Date().toISOString() : undefined,
        }
      });
    }
  };

  const handleOpenTrackerForOrder = (orderCode: string) => {
    setTrackerInitialCode(orderCode);
    setIsTrackerOpen(true);
  };

  const scrollToMenu = () => {
    const elem = document.getElementById('katalog-produk-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#4A2C2A] flex flex-col font-sans selection:bg-[#FF6B35] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => {
          setTrackerInitialCode('');
          setIsTrackerOpen(true);
        }}
        onOpenBakingSchedule={() => setIsBakingScheduleOpen(true)}
        onOpenLocations={() => setIsLocationsOpen(true)}
        onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToMenu();
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) scrollToMenu();
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Banner with Bakery USPs */}
        <HeroBanner
          onExploreMenu={scrollToMenu}
          onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
          onOpenSchedule={() => setIsBakingScheduleOpen(true)}
        />

        {/* Product Catalog Section */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSelectProduct={(product) => setSelectedProductForDetail(product)}
          onQuickAddToCart={handleQuickAddToCart}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenSchedule={() => setIsBakingScheduleOpen(true)}
        onOpenLocations={() => setIsLocationsOpen(true)}
        onOpenTracker={() => {
          setTrackerInitialCode('');
          setIsTrackerOpen(true);
        }}
      />

      {/* MODALS & DRAWERS */}

      {/* 1. Product Detail & Customization Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromo={appliedPromo}
        onApplyPromo={setAppliedPromo}
      />

      {/* 3. Checkout Modal (Delivery & Multi-channel Payment) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 4. Payment Success & Digital Receipt Modal */}
      <PaymentSuccessModal
        order={activeOrderForReceipt}
        onClose={() => setActiveOrderForReceipt(null)}
        onTrackOrder={handleOpenTrackerForOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* 5. Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderNumber={trackerInitialCode}
        onSelectOrderToView={(order) => setActiveOrderForReceipt(order)}
      />

      {/* 6. Live Baking Schedule Modal */}
      <BakingScheduleModal
        isOpen={isBakingScheduleOpen}
        onClose={() => setIsBakingScheduleOpen(false)}
        onExploreMenu={scrollToMenu}
      />

      {/* 7. Store Locations Modal */}
      <StoreLocationsModal
        isOpen={isLocationsOpen}
        onClose={() => setIsLocationsOpen(false)}
      />

      {/* 8. AI Sommelier Consultant Modal */}
      <AIBakerConsultant
        isOpen={isAIConsultantOpen}
        onClose={() => setIsAIConsultantOpen(false)}
        products={products}
        onSelectProduct={(product) => setSelectedProductForDetail(product)}
      />

      {/* 9. Admin Orders Manager Modal */}
      <AdminOrdersModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onViewInvoice={(order) => {
          setIsAdminOpen(false);
          setActiveOrderForReceipt(order);
        }}
      />

    </div>
  );
}
