import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Store, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  ShieldCheck, 
  Gift, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { 
  CartItem, 
  DeliveryMethod, 
  PaymentChannel, 
  PromoCode, 
  CustomerDetails, 
  Order 
} from '../types';
import { STORE_BRANCHES } from '../data/products';
import { 
  formatRupiah, 
  generateOrderNumber, 
  generateMockVANumber,
  getPaymentMethodDetails 
} from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo?: PromoCode;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  // Checkout form states
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('instant');
  const [selectedBranch, setSelectedBranch] = useState(STORE_BRANCHES[0].id);

  // Customer info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Jakarta Selatan');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Pagi (08:00 - 11:00 WIB)');

  // Gift options
  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [greetingCardText, setGreetingCardText] = useState('');

  // Payment channel selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentChannel>('qris');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Card details (if credit card selected)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Calculations
  const itemsSubtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  let deliveryFee = 0;
  if (deliveryMethod === 'instant') deliveryFee = 25000;
  else if (deliveryMethod === 'sameday') deliveryFee = 15000;
  else if (deliveryMethod === 'courier') deliveryFee = 30000;
  else if (deliveryMethod === 'pickup') deliveryFee = 0;

  const packagingFee = 3000; // Dus tebal food-grade & segel higienis

  let discountAmount = 0;
  if (appliedPromo) {
    if (itemsSubtotal >= appliedPromo.minSpend) {
      if (appliedPromo.discountType === 'percentage') {
        const raw = (itemsSubtotal * appliedPromo.value) / 100;
        discountAmount = appliedPromo.maxDiscount ? Math.min(raw, appliedPromo.maxDiscount) : raw;
      } else {
        discountAmount = appliedPromo.value;
      }
    }
  }

  const grandTotal = Math.max(0, itemsSubtotal + deliveryFee + packagingFee - discountAmount);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setFormError('Mohon lengkapi Nama, Nomor WhatsApp, dan Email Anda.');
      return;
    }

    if (deliveryMethod !== 'pickup' && !address.trim()) {
      setFormError('Mohon isi alamat pengiriman lengkap Anda.');
      return;
    }

    setStep('payment');
  };

  const handleCreateAndPayOrder = async () => {
    setIsSubmitting(true);
    setFormError('');

    try {
      const orderNumber = generateOrderNumber();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString(); // 15 mins expiry for payment

      const chosenBranchObj = STORE_BRANCHES.find(b => b.id === selectedBranch);

      const customer: CustomerDetails = {
        fullName: fullName.trim(),
        phoneNumber: phone.trim(),
        email: email.trim(),
        address: deliveryMethod !== 'pickup' ? address.trim() : undefined,
        city: deliveryMethod !== 'pickup' ? city : undefined,
        deliveryNotes: deliveryNotes.trim() || undefined,
        pickupBranch: deliveryMethod === 'pickup' ? chosenBranchObj?.name : undefined,
        pickupTimeSlot: deliveryMethod === 'pickup' ? deliveryTimeSlot : undefined,
        deliveryDate,
        deliveryTimeSlot,
        isGift,
        recipientName: isGift ? recipientName.trim() : undefined,
        recipientPhone: isGift ? recipientPhone.trim() : undefined,
        greetingCardText: isGift ? greetingCardText.trim() : undefined,
      };

      // Mock VA or QR data
      let vaNumber: string | undefined = undefined;
      let qrCodeUrl: string | undefined = undefined;

      if (['bca_va', 'mandiri_va', 'bni_va', 'bri_va'].includes(paymentMethod)) {
        vaNumber = generateMockVANumber(paymentMethod);
      } else if (paymentMethod === 'qris') {
        qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021226580014ID.LINKAJA.WWW01189360091100000000000215${orderNumber}520458125303360540${grandTotal}5802ID5914KENCANA_BAKERY6007JAKARTA62070703A016304`;
      }

      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: now.toISOString(),
        items,
        customer,
        deliveryMethod,
        paymentMethod,
        subtotal: itemsSubtotal,
        deliveryFee,
        packagingFee,
        discount: discountAmount,
        appliedPromo: appliedPromo?.code,
        grandTotal,
        status: paymentMethod === 'cash_on_pickup' ? 'VERIFYING' : 'UNPAID',
        paymentInfo: {
          vaNumber,
          qrCodeUrl,
          expiresAt,
          transactionId: `TRX-${Date.now().toString(36).toUpperCase()}`,
        },
        timeline: [
          {
            title: 'Pesanan Dibuat',
            description: 'Menunggu proses verifikasi pembayaran multi-kanal.',
            timestamp: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            completed: true,
          },
          {
            title: 'Pembayaran Dikonfirmasi',
            description: 'Gateway memverifikasi dana secara otomatis.',
            timestamp: '-',
            completed: false,
            current: true,
          },
          {
            title: 'Dipanggang & Dikemas Chef',
            description: 'Dapur memanggang segar sesuai pesanan Anda.',
            timestamp: '-',
            completed: false,
          },
          {
            title: deliveryMethod === 'pickup' ? 'Siap Diambil di Outlet' : 'Dalam Pengantaran Kurir',
            description: deliveryMethod === 'pickup' ? 'Dapat diambil di kasir outlet terpilih.' : 'Kurir mengantar dalam kemasan thermal aman.',
            timestamp: '-',
            completed: false,
          },
          {
            title: 'Pesanan Selesai',
            description: 'Terima kasih telah menikmati Kencana Bakery.',
            timestamp: '-',
            completed: false,
          }
        ]
      };

      // Save order to local storage
      const existingHistory = JSON.parse(localStorage.getItem('kencana_orders_history') || '[]');
      localStorage.setItem('kencana_orders_history', JSON.stringify([newOrder, ...existingHistory]));

      setTimeout(() => {
        setIsSubmitting(false);
        onOrderCompleted(newOrder);
      }, 500);

    } catch (err: any) {
      console.error('Order creation error:', err);
      setFormError('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#FFF0E0] border-b border-[#FCE7D2] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center font-serif font-bold text-lg shadow-xs">
              K
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-base sm:text-lg">
                Pemesanan & Integrasi Pembayaran
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#7D5A50]">
                <span className={step === 'details' ? 'font-bold text-[#4A2C2A] underline' : 'text-[#7D5A50]'}>
                  1. Pengiriman & Data
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#FFD93D]" />
                <span className={step === 'payment' ? 'font-bold text-[#4A2C2A] underline' : 'text-[#7D5A50]'}>
                  2. Metode Pembayaran
                </span>
              </div>
            </div>
          </div>

          <button
            id="btn-close-checkout-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {step === 'details' ? (
            /* STEP 1: DELIVERY & CUSTOMER DETAILS */
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Delivery Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C2A] mb-2.5">
                  Pilih Metode Pengambilan / Pengiriman
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Instant Courier */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('instant')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'instant'
                        ? 'bg-[#FFF0E0] text-[#4A2C2A] border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                        : 'bg-white text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Truck className={`w-4 h-4 ${deliveryMethod === 'instant' ? 'text-[#FF6B35]' : 'text-[#7D5A50]'}`} />
                      <span className="text-xs font-bold text-[#FF6B35]">{formatRupiah(25000)}</span>
                    </div>
                    <div>
                      <span className="font-bold text-xs block">Kurir Instant (1-2 Jam)</span>
                      <span className={`text-[10px] ${deliveryMethod === 'instant' ? 'text-[#4A2C2A]' : 'text-[#7D5A50]'}`}>
                        GoSend / GrabExpress
                      </span>
                    </div>
                  </button>

                  {/* Same Day Courier */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('sameday')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'sameday'
                        ? 'bg-[#FFF0E0] text-[#4A2C2A] border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                        : 'bg-white text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Clock className={`w-4 h-4 ${deliveryMethod === 'sameday' ? 'text-[#FF6B35]' : 'text-[#7D5A50]'}`} />
                      <span className="text-xs font-bold text-[#FF6B35]">{formatRupiah(15000)}</span>
                    </div>
                    <div>
                      <span className="font-bold text-xs block">Same-Day (4-6 Jam)</span>
                      <span className={`text-[10px] ${deliveryMethod === 'sameday' ? 'text-[#4A2C2A]' : 'text-[#7D5A50]'}`}>
                        Paxel / AnterAja Fresh
                      </span>
                    </div>
                  </button>

                  {/* Pick Up at Store */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'pickup'
                        ? 'bg-[#FFF0E0] text-[#4A2C2A] border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                        : 'bg-white text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Store className={`w-4 h-4 ${deliveryMethod === 'pickup' ? 'text-[#FF6B35]' : 'text-[#7D5A50]'}`} />
                      <span className="text-xs font-bold text-[#2EC4B6]">GRATIS</span>
                    </div>
                    <div>
                      <span className="font-bold text-xs block">Ambil di Outlet (Click & Collect)</span>
                      <span className={`text-[10px] ${deliveryMethod === 'pickup' ? 'text-[#4A2C2A]' : 'text-[#7D5A50]'}`}>
                        Pilih 4 Cabang Toko
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Outlet Branch Selector if Pick Up */}
              {deliveryMethod === 'pickup' && (
                <div className="bg-white p-4 rounded-2xl border border-[#FCE7D2] space-y-3">
                  <div className="flex items-center gap-2 text-[#4A2C2A] font-bold text-xs uppercase">
                    <Store className="w-4 h-4 text-[#FF6B35]" />
                    <span>Pilih Cabang Outlet Pengambilan</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STORE_BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBranch(b.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedBranch === b.id
                            ? 'bg-[#FFF0E0] border-[#FF6B35] text-[#4A2C2A] ring-2 ring-[#FF6B35]/20'
                            : 'bg-white border-[#FCE7D2] text-[#4A2C2A] hover:bg-[#FFF0E0]/50'
                        }`}
                      >
                        <span className="font-bold text-xs block">{b.name}</span>
                        <span className="text-[10px] text-[#7D5A50] block mt-0.5">{b.address}</span>
                        <span className="text-[10px] text-[#2EC4B6] font-semibold mt-1 block">
                          Buka: {b.operatingHours}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#FCE7D2] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A2C2A]">
                  Data Kontak Pemesan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="cth: Sarah Wijaya"
                      className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                      Nomor WhatsApp (Aktif) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="cth: 081234567890"
                      className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                      Alamat Email (Untuk Invoice Digital) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="cth: sarah.wijaya@gmail.com"
                      className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Delivery Address & Time Slot */}
                {deliveryMethod !== 'pickup' && (
                  <div className="pt-3 border-t border-[#FCE7D2] space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                        Alamat Pengiriman Lengkap & Nomor Rumah *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nama jalan, nomor rumah, blok, RT/RW, kelurahan, dan patokan..."
                        className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                          Kota / Wilayah
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                        >
                          <option value="Jakarta Selatan">Jakarta Selatan</option>
                          <option value="Jakarta Pusat">Jakarta Pusat</option>
                          <option value="Jakarta Barat">Jakarta Barat</option>
                          <option value="Jakarta Utara">Jakarta Utara</option>
                          <option value="Jakarta Timur">Jakarta Timur</option>
                          <option value="Tangerang / BSD">Tangerang / BSD City</option>
                          <option value="Bekasi">Bekasi</option>
                          <option value="Depok">Depok</option>
                          <option value="Bandung">Kota Bandung</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                          Catatan untuk Driver
                        </label>
                        <input
                          type="text"
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          placeholder="Pagar hitam depan pos satpam..."
                          className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Date & Time Slot Selection */}
                <div className="pt-3 border-t border-[#FCE7D2] grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                      {deliveryMethod === 'pickup' ? 'Tanggal Pengambilan' : 'Tanggal Pengiriman'}
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">
                      Pilihan Slot Jam
                    </label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                    >
                      <option value="Pagi (08:00 - 11:00 WIB)">Pagi (08:00 - 11:00 WIB) • Batch Hangat Pagi</option>
                      <option value="Siang (11:30 - 14:30 WIB)">Siang (11:30 - 14:30 WIB) • Fresh Lunch Batch</option>
                      <option value="Sore (15:00 - 18:00 WIB)">Sore (15:00 - 18:00 WIB) • Afternoon Tea</option>
                      <option value="Malam (18:30 - 20:30 WIB)">Malam (18:30 - 20:30 WIB) • Dinner & Cake</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Gift & Greeting Card Section */}
              <div className="bg-white p-4 rounded-2xl border border-[#FCE7D2] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#FF6B35]" />
                    <div>
                      <span className="text-xs font-bold text-[#4A2C2A] block">Kirim Sebagai Kado / Hadiah?</span>
                      <span className="text-[10px] text-[#7D5A50]">Gratis pita satin & kartu ucapan eksklusif Kencana</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    id="is-gift-checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 text-[#FF6B35] rounded-sm focus:ring-[#FF6B35]"
                  />
                </div>

                {isGift && (
                  <div className="pt-3 border-t border-[#FCE7D2] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">Nama Penerima Kado</label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Nama sahabat / keluarga"
                          className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-1.5 text-xs text-[#4A2C2A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">No HP Penerima (Opsional)</label>
                        <input
                          type="tel"
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          placeholder="08xxxxxxxx"
                          className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-1.5 text-xs text-[#4A2C2A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4A2C2A] mb-1">Pesan di Kartu Ucapan</label>
                      <textarea
                        rows={2}
                        value={greetingCardText}
                        onChange={(e) => setGreetingCardText(e.target.value)}
                        placeholder="Tuliskan ucapan hangat Anda di sini..."
                        className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3 py-1.5 text-xs text-[#4A2C2A]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button to Step 2 */}
              <button
                type="submit"
                id="btn-proceed-to-payment-step"
                className="w-full py-3.5 px-6 bg-[#FF6B35] hover:bg-[#E8551E] text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke Pilihan Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: MULTI-CHANNEL PAYMENT GATEWAY SELECTION */
            <div className="space-y-6">
              
              {/* Back to Step 1 Button */}
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#FF6B35] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                ← Kembali ke Data Pengiriman
              </button>

              {/* Payment Methods Grid */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C2A]">
                  Pilih Kanal Pembayaran Online
                </label>

                <div className="space-y-2">
                  
                  {/* QRIS */}
                  <div
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'qris'
                        ? 'bg-[#FFF0E0] text-[#4A2C2A] border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                        : 'bg-white text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#4A2C2A] border border-[#FCD8B8] flex items-center justify-center p-2 shadow-2xs">
                        <QrCode className="w-6 h-6 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm">QRIS (Semua Bank & E-Wallet)</span>
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#2EC4B6] text-white">
                            Instan Otomatis
                          </span>
                        </div>
                        <span className="text-[11px] text-[#7D5A50]">
                          Scan via BCA, GoPay, OVO, DANA, ShopeePay, Livin by Mandiri
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qris' ? 'border-[#FF6B35] bg-[#FF6B35]' : 'border-[#FCD8B8]'}`}>
                      {paymentMethod === 'qris' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>

                  {/* Virtual Accounts */}
                  <div className="bg-white p-3.5 rounded-2xl border border-[#FCE7D2] space-y-2">
                    <span className="text-xs font-bold text-[#4A2C2A] block">Transfer Virtual Account (Verifikasi Otomatis)</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'bca_va', name: 'BCA VA', logo: 'BCA' },
                        { id: 'mandiri_va', name: 'Mandiri VA', logo: 'Mandiri' },
                        { id: 'bni_va', name: 'BNI VA', logo: 'BNI' },
                        { id: 'bri_va', name: 'BRI VA (BRIVA)', logo: 'BRI' },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setPaymentMethod(bank.id as any)}
                          className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            paymentMethod === bank.id
                              ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-xs'
                              : 'bg-[#FFF9F2] text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]'
                          }`}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* E-Wallets */}
                  <div className="bg-white p-3.5 rounded-2xl border border-[#FCE7D2] space-y-2">
                    <span className="text-xs font-bold text-[#4A2C2A] block">E-Wallet Direct</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'gopay', name: 'GoPay' },
                        { id: 'ovo', name: 'OVO' },
                        { id: 'dana', name: 'DANA' },
                        { id: 'shopeepay', name: 'ShopeePay' },
                      ].map((ewallet) => (
                        <button
                          key={ewallet.id}
                          type="button"
                          onClick={() => setPaymentMethod(ewallet.id as any)}
                          className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            paymentMethod === ewallet.id
                              ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-xs'
                              : 'bg-[#FFF9F2] text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]'
                          }`}
                        >
                          {ewallet.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'bg-[#FFF0E0] text-[#4A2C2A] border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                        : 'bg-white text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#FCD8B8] text-[#4A2C2A] flex items-center justify-center p-2 shadow-2xs">
                          <CreditCard className="w-6 h-6 text-[#FF6B35]" />
                        </div>
                        <div>
                          <span className="font-bold text-xs sm:text-sm block">Kartu Kredit / Debit Online</span>
                          <span className="text-[11px] text-[#7D5A50]">
                            Visa, MasterCard, JCB dengan 3D Secure
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-[#FF6B35] bg-[#FF6B35]' : 'border-[#FCD8B8]'}`}>
                        {paymentMethod === 'credit_card' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>

                    {paymentMethod === 'credit_card' && (
                      <div className="mt-3 pt-3 border-t border-[#FCD8B8] grid grid-cols-1 sm:grid-cols-3 gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Nomor Kartu (16 Digit)"
                            className="w-full bg-[#FFF9F2] border border-[#FCD8B8] text-[#4A2C2A] rounded-xl px-3 py-1.5 text-xs placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full bg-[#FFF9F2] border border-[#FCD8B8] text-[#4A2C2A] rounded-xl px-3 py-1.5 text-xs placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="CVV"
                            className="w-full bg-[#FFF9F2] border border-[#FCD8B8] text-[#4A2C2A] rounded-xl px-3 py-1.5 text-xs placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Pick-up (if pick-up selected) */}
                  {deliveryMethod === 'pickup' && (
                    <div
                      onClick={() => setPaymentMethod('cash_on_pickup')}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'cash_on_pickup'
                          ? 'bg-[#FFF0E0] text-[#4A2C2A] border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                          : 'bg-white text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#FCD8B8] text-[#4A2C2A] flex items-center justify-center p-2 shadow-2xs">
                          <Store className="w-6 h-6 text-[#FF6B35]" />
                        </div>
                        <div>
                          <span className="font-bold text-xs sm:text-sm block">Bayar di Kasir Toko</span>
                          <span className="text-[11px] text-[#7D5A50]">
                            Tunai atau EDC saat mengambil roti di outlet
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash_on_pickup' ? 'border-[#FF6B35] bg-[#FF6B35]' : 'border-[#FCD8B8]'}`}>
                        {paymentMethod === 'cash_on_pickup' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

          {/* Transparent Order Summary Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#FCE7D2] space-y-2 text-xs">
            <h4 className="font-bold text-[#4A2C2A] uppercase tracking-wide">
              Rincian Pembayaran
            </h4>
            <div className="space-y-1 text-[#7D5A50]">
              <div className="flex justify-between">
                <span>Subtotal Menu ({items.length} item)</span>
                <span className="font-bold text-[#4A2C2A]">{formatRupiah(itemsSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengiriman ({deliveryMethod === 'pickup' ? 'Ambil di Toko' : deliveryMethod})</span>
                <span className="font-bold text-[#4A2C2A]">
                  {deliveryFee === 0 ? <strong className="text-[#2EC4B6]">GRATIS</strong> : formatRupiah(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Kemasan Food-Grade & Safety Seal</span>
                <span className="font-bold text-[#4A2C2A]">{formatRupiah(packagingFee)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2EC4B6] font-bold">
                  <span>Diskon Promo ({appliedPromo?.code})</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-dashed border-[#FCE7D2] flex justify-between items-baseline">
              <span className="font-bold text-[#4A2C2A] text-sm">Total Tagihan</span>
              <span className="font-serif font-bold text-xl text-[#FF6B35]">
                {formatRupiah(grandTotal)}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Payment Action (Only on step 2) */}
        {step === 'payment' && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#FCE7D2] flex items-center justify-between gap-4 sticky bottom-0 z-20">
            <div>
              <span className="text-[11px] text-[#7D5A50] block font-medium">Metode Pembayaran:</span>
              <span className="font-bold text-xs text-[#4A2C2A] block">
                {getPaymentMethodDetails(paymentMethod).name}
              </span>
            </div>

            <button
              type="button"
              id="btn-confirm-and-pay"
              disabled={isSubmitting}
              onClick={handleCreateAndPayOrder}
              className="py-3 px-6 bg-[#FF6B35] hover:bg-[#E8551E] disabled:bg-[#FCD8B8] text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFD93D]" />
              <span>{isSubmitting ? 'Memproses Gateway...' : `Bayar ${formatRupiah(grandTotal)}`}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
