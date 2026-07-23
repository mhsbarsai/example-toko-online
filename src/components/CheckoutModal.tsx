import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Wallet, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Phone,
  User,
  FileText
} from 'lucide-react';
import { 
  CartItem, 
  Voucher, 
  ShippingAddress, 
  ShippingCourier, 
  PaymentMethodOption, 
  Order 
} from '../types';
import { SHIPPING_COURIERS, PAYMENT_METHODS } from '../data/products';
import { formatRupiah, generateOrderId, generateTrackingNumber } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedVoucher: Voucher | null;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedVoucher,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Address & Courier, 2: Payment, 3: Review & Pay

  // Shipping Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Ahmad Rizky',
    phone: '081234567890',
    address: 'Jl. Jendral Sudirman No. 45, RT 02/RW 05, Kel. Gelora',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    postalCode: '10270',
    notes: 'Titip di satpam jika rumah kosong'
  });

  // Courier state
  const [selectedCourier, setSelectedCourier] = useState<ShippingCourier>(SHIPPING_COURIERS[0]);

  // Payment method state
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodOption>(PAYMENT_METHODS[0]);

  // Card details state
  const [cardNumber, setCardNumber] = useState('4532 1890 2341 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('889');

  // E-Wallet phone state
  const [ewalletPhone, setEwalletPhone] = useState('081234567890');

  // Process status state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [copiedVa, setCopiedVa] = useState(false);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = (subtotal * appliedVoucher.discountValue) / 100;
      if (appliedVoucher.maxDiscount && discountAmount > appliedVoucher.maxDiscount) {
        discountAmount = appliedVoucher.maxDiscount;
      }
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
  }

  const shippingCost = selectedCourier.price;
  const adminFee = 1000;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost + adminFee);

  const handleCopyVa = (vaNumber: string) => {
    navigator.clipboard.writeText(vaNumber);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setProcessStep('Menghubungkan ke Gateway Pembayaran...');

    setTimeout(() => {
      setProcessStep('Memverifikasi detail pesanan dan keamanan transaksi...');
    }, 1200);

    setTimeout(() => {
      setProcessStep('Konfirmasi pembayaran berhasil!');
    }, 2400);

    setTimeout(() => {
      setIsProcessing(false);

      const newOrder: Order = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        items,
        address,
        courier: selectedCourier,
        paymentMethod: selectedPayment,
        subtotal,
        shippingCost,
        discount: discountAmount,
        total: totalAmount,
        status: 'Diproses',
        trackingNumber: generateTrackingNumber(selectedCourier.name),
        virtualAccount: selectedPayment.accountNumber || `8801${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=TOKONUSANTARA-QRIS-ORDER-VALID',
        paidAt: new Date().toISOString()
      };

      onOrderCompleted(newOrder);
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Wizard Steps */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold tracking-tight">Checkout Pembayaran Aman</h2>
          </div>

          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-emerald-700' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
              1
            </span>
            <span className="hidden sm:inline">Alamat & Kurir</span>
          </div>

          <span className="text-slate-300">• • •</span>

          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-emerald-700' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
              2
            </span>
            <span className="hidden sm:inline">Metode Pembayaran</span>
          </div>

          <span className="text-slate-300">• • •</span>

          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-emerald-700' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
              3
            </span>
            <span className="hidden sm:inline">Konfirmasi & Bayar</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Address & Courier */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Shipping Address Form */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Alamat Pengiriman
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Penerima</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="text"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Alamat Lengkap (Jalan, RT/RW, No. Rumah)</label>
                    <input
                      type="text"
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kota / Kabupaten</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kode Pos</label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Courier Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Truck className="w-4 h-4 text-emerald-600" /> Pilih Kurir & Layanan Pengiriman
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SHIPPING_COURIERS.map((courier) => (
                    <div
                      key={courier.id}
                      id={`courier-opt-${courier.id}`}
                      onClick={() => setSelectedCourier(courier)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        selectedCourier.id === courier.id
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{courier.logo}</span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{courier.name}</p>
                          <p className="text-[11px] text-emerald-700 font-semibold">{courier.serviceName}</p>
                          <p className="text-[10px] text-slate-500">Estimasi: {courier.estimatedDays}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">
                        {formatRupiah(courier.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Integrated Payment System Selection */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" /> Pilih Sistem Pembayaran Terintegrasi
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Enkripsi SSL 256-Bit
                </span>
              </h3>

              {/* Payment Methods List */}
              <div className="space-y-2.5">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    id={`payment-opt-${method.id}`}
                    onClick={() => setSelectedPayment(method)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      selectedPayment.id === method.id
                        ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{method.name}</p>
                          <p className="text-[11px] text-slate-500">{method.description}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment.id === method.id ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}>
                        {selectedPayment.id === method.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Extended Form if Credit Card chosen */}
                    {selectedPayment.category === 'card' && selectedPayment.id === method.id && (
                      <div className="mt-4 pt-3 border-t border-emerald-200 grid grid-cols-2 gap-3 text-xs" onClick={(e) => e.stopPropagation()}>
                        <div className="col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Nomor Kartu Kredit / Debit</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 1890 2341 8892"
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl font-mono text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Berlaku s/d (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl font-mono text-slate-900 text-center"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">CVV (3 Digit)</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={3}
                            placeholder="889"
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl font-mono text-slate-900 text-center"
                          />
                        </div>
                      </div>
                    )}

                    {/* Extended Form if E-Wallet chosen */}
                    {selectedPayment.category === 'ewallet' && selectedPayment.id === method.id && (
                      <div className="mt-3 pt-2 border-t border-emerald-200 text-xs" onClick={(e) => e.stopPropagation()}>
                        <label className="block font-semibold text-slate-700 mb-1">Nomor HP Terdaftar E-Wallet</label>
                        <input
                          type="text"
                          value={ewalletPhone}
                          onChange={(e) => setEwalletPhone(e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl text-slate-900"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Review & Final Payment Execution */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Ringkasan Transaksi & Informasi Pembayaran
              </h3>

              {/* Dynamic Payment Gate Panel */}
              <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                    Metode Pembayaran Terpilih
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-400/30">
                    Otomatis Verifikasi 24/7
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedPayment.icon}</span>
                  <div>
                    <h4 className="font-bold text-base text-white">{selectedPayment.name}</h4>
                    <p className="text-xs text-emerald-200">{selectedPayment.description}</p>
                  </div>
                </div>

                {/* If QRIS */}
                {selectedPayment.category === 'qris' && (
                  <div className="bg-white text-slate-900 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TOKONUSANTARA-QRIS-ORDER-VALID" 
                      alt="Kode QRIS"
                      className="w-28 h-28 border border-slate-300 rounded-lg shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 text-xs">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        Scan QRIS
                      </span>
                      <p className="font-bold text-slate-900 text-sm">Pindai dengan Semua Aplikasi E-Wallet / M-Banking</p>
                      <p className="text-slate-500">Masa berlaku QR code: 15:00 menit. Pembayaran terverifikasi secara realtime.</p>
                    </div>
                  </div>
                )}

                {/* If Virtual Account */}
                {selectedPayment.category === 'va' && (
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-slate-400">Nomor Virtual Account Anda:</p>
                      <p className="font-mono text-lg font-bold text-emerald-400 tracking-wider">
                        {selectedPayment.accountNumber || '880128391029381'}
                      </p>
                    </div>
                    <button
                      id="copy-va-number-btn"
                      onClick={() => handleCopyVa(selectedPayment.accountNumber || '880128391029381')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                    >
                      {copiedVa ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                      {copiedVa ? 'Tersalin!' : 'Salin Nomor VA'}
                    </button>
                  </div>
                )}
              </div>

              {/* Order Items Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Daftar Barang ({items.length})</h4>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold text-slate-900">{item.quantity}x</span>
                        <span className="text-slate-700 truncate">{item.product.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0 ml-2">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Cost Breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal Produk</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Diskon Voucher ({appliedVoucher?.code})</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim ({selectedCourier.name} - {selectedCourier.serviceName})</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan Sistem</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(adminFee)}</span>
                </div>

                <div className="pt-2 border-t border-slate-300 flex justify-between items-baseline text-slate-900">
                  <span className="font-black text-sm">Total Pembayaran</span>
                  <span className="font-black text-xl text-emerald-700">{formatRupiah(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              id="checkout-prev-step-btn"
              onClick={() => setStep((step - 1) as 1 | 2)}
              disabled={isProcessing}
              className="px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              id="checkout-next-step-btn"
              onClick={() => setStep((step + 1) as 2 | 3)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition hover:scale-[1.01]"
            >
              Lanjut Ke Metode Pembayaran <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="execute-payment-btn"
              onClick={handleExecutePayment}
              disabled={isProcessing}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition hover:scale-[1.02] active:scale-95 disabled:opacity-80"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{processStep}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Bayar Sekarang ({formatRupiah(totalAmount)})
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
