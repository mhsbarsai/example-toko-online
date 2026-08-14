import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Share2, 
  Clock, 
  MapPin, 
  Receipt, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Order } from '../types';
import { formatRupiah, getPaymentMethodDetails } from '../utils/formatters';

interface PaymentSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  onUpdateOrderStatus,
}) => {
  if (!order) return null;

  const [copiedVA, setCopiedVA] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isVerifying, setIsVerifying] = useState(false);

  const paymentMeta = getPaymentMethodDetails(order.paymentMethod);
  const isPaid = order.status !== 'UNPAID';

  // Confetti effect when paid
  useEffect(() => {
    if (isPaid) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPaid]);

  // Countdown timer for unpaid QR/VA
  useEffect(() => {
    if (isPaid) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaid]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyVA = () => {
    if (order.paymentInfo.vaNumber) {
      navigator.clipboard.writeText(order.paymentInfo.vaNumber);
      setCopiedVA(true);
      setTimeout(() => setCopiedVA(false), 2000);
    }
  };

  const handleSimulateSuccessfulPayment = async () => {
    setIsVerifying(true);
    try {
      // Call mock payment gateway backend
      const res = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.orderNumber,
          paymentMethod: order.paymentMethod,
          amount: order.grandTotal,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onUpdateOrderStatus(order.id, 'PAID');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
    } catch (e) {
      console.error(e);
      onUpdateOrderStatus(order.id, 'PAID');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  // Build WhatsApp share link
  const buildWhatsAppMessage = () => {
    const branchPhone = '6281288991980';
    const text = `Halo Kencana Bakery, saya ingin konfirmasi pesanan:
*No. Pesanan:* ${order.orderNumber}
*Nama:* ${order.customer.fullName}
*Metode:* ${order.deliveryMethod === 'pickup' ? 'Ambil di Outlet' : 'Pengiriman Kurir'}
*Total:* ${formatRupiah(order.grandTotal)}
*Status:* ${isPaid ? 'SUDAH DIBAYAR' : 'Menunggu Verifikasi'}

Mohon diproses segera ya chef, terima kasih!`;
    return `https://wa.me/${branchPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="payment-success-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in print:bg-white print:p-0">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto print:shadow-none print:border-none print:max-h-full">
        
        {/* Header Status Banner */}
        <div className={`p-6 text-center text-white relative ${isPaid ? 'bg-gradient-to-r from-[#FF6B35] via-[#E8551E] to-[#D0430E]' : 'bg-gradient-to-r from-[#4A2C2A] to-[#2D1B19]'}`}>
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center mx-auto mb-3 border border-white/20">
            {isPaid ? (
              <CheckCircle className="w-9 h-9 text-[#FFD93D]" />
            ) : (
              <QrCode className="w-9 h-9 text-[#FFD93D] animate-pulse" />
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold">
            {isPaid ? 'Pembayaran Berhasil Diverifikasi!' : 'Selesaikan Pembayaran Pesanan'}
          </h2>

          <p className="text-xs sm:text-sm text-[#FFEBD6] mt-1">
            Nomor Pesanan: <strong className="text-white font-mono bg-white/20 px-2 py-0.5 rounded-md">{order.orderNumber}</strong>
          </p>

          {!isPaid && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD93D]/20 text-[#FFD93D] text-xs font-bold mt-3 border border-[#FFD93D]/40">
              <Clock className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>Sisa Waktu Bayar: {formatTimer(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* SECTION A: PAYMENT INSTRUCTIONS (IF NOT YET PAID) */}
          {!isPaid && (
            <div className="space-y-4">
              
              {/* QRIS Interactive Display */}
              {order.paymentMethod === 'qris' && (
                <div className="bg-white p-6 rounded-3xl border border-[#FCD8B8] text-center space-y-4 shadow-xs">
                  <div className="inline-block bg-[#FFF9F2] p-4 rounded-2xl shadow-sm border border-[#FCD8B8]">
                    <img
                      src={order.paymentInfo.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=KENCANA_BAKERY_PAYMENT'}
                      alt="QRIS Code Kencana Bakery"
                      referrerPolicy="no-referrer"
                      className="w-48 h-48 mx-auto"
                    />
                    <span className="text-[10px] font-bold text-[#4A2C2A]/70 mt-2 block uppercase tracking-wider">
                      NMID: ID1020038829102 • Kencana Bakery
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-[#7D5A50] font-semibold block">Total Pembayaran Tepat:</span>
                    <span className="text-2xl font-serif font-bold text-[#FF6B35] block">
                      {formatRupiah(order.grandTotal)}
                    </span>
                    <p className="text-xs text-[#7D5A50] max-w-sm mx-auto">
                      Buka aplikasi BCA Mobile, GoPay, OVO, DANA, ShopeePay, atau Livin by Mandiri, lalu pilih menu <strong>Scan QRIS</strong>.
                    </p>
                  </div>

                  {/* Simulate Payment Gateway Trigger */}
                  <div className="pt-2">
                    <button
                      id="btn-simulate-qris-paid"
                      onClick={handleSimulateSuccessfulPayment}
                      disabled={isVerifying}
                      className="px-5 py-2.5 bg-[#2EC4B6] hover:bg-[#25A99D] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#FFD93D]" />
                      <span>{isVerifying ? 'Memverifikasi...' : 'Simulasikan Pembayaran Berhasil (Instant Callback)'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Virtual Account Interactive Display */}
              {order.paymentInfo.vaNumber && (
                <div className="bg-white p-6 rounded-3xl border border-[#FCD8B8] space-y-4 shadow-xs">
                  <div className="text-center">
                    <span className="text-xs text-[#7D5A50] font-semibold">Nomor Virtual Account {paymentMeta.name}:</span>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-2xl font-mono font-bold text-[#4A2C2A] bg-[#FFF9F2] px-4 py-2 rounded-2xl border border-[#FCD8B8] shadow-2xs">
                        {order.paymentInfo.vaNumber}
                      </span>
                      <button
                        onClick={handleCopyVA}
                        className="p-2.5 bg-[#FF6B35] text-white hover:bg-[#E8551E] rounded-2xl transition-colors cursor-pointer"
                        title="Salin Nomor VA"
                      >
                        {copiedVA ? <Check className="w-5 h-5 text-[#FFD93D]" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    {copiedVA && (
                      <span className="text-xs text-[#2EC4B6] font-bold block mt-1">
                        Nomor VA berhasil disalin ke papan klip!
                      </span>
                    )}
                  </div>

                  <div className="text-center pt-2 border-t border-[#FCE7D2]">
                    <span className="text-xs text-[#7D5A50]">Jumlah Transfer:</span>
                    <span className="text-xl font-serif font-bold text-[#FF6B35] block">
                      {formatRupiah(order.grandTotal)}
                    </span>
                  </div>

                  {/* Simulate VA Transfer Button */}
                  <div className="pt-2 text-center">
                    <button
                      id="btn-simulate-va-paid"
                      onClick={handleSimulateSuccessfulPayment}
                      disabled={isVerifying}
                      className="px-5 py-2.5 bg-[#2EC4B6] hover:bg-[#25A99D] text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isVerifying ? 'Memverifikasi...' : 'Simulasikan Transfer VA Diterima'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* SECTION B: OFFICIAL DIGITAL INVOICE & ORDER RECEIPT */}
          <div id="printable-order-receipt" className="border border-[#FCE7D2] rounded-3xl p-5 sm:p-6 bg-white space-y-4">
            
            {/* Invoice Top Header */}
            <div className="flex items-start justify-between border-b border-[#FCE7D2] pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4A2C2A]">Kencana Bakery & Patisserie</h3>
                <p className="text-xs text-[#7D5A50]">Artisan Boulangerie • Est. 2018</p>
                <p className="text-[11px] text-[#947065]">WhatsApp: 0812-8899-1980 | kencanabakery.com</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  isPaid ? 'bg-[#2EC4B6]/15 text-[#0F6860]' : 'bg-[#FF6B35]/15 text-[#FF6B35]'
                }`}>
                  {order.status}
                </span>
                <span className="text-[11px] text-[#7D5A50] block mt-1">
                  {new Date(order.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Customer & Delivery Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4A2C2A] pb-3 border-b border-[#FCE7D2]">
              <div>
                <span className="font-bold text-[#FF6B35] block mb-1">Data Pelanggan:</span>
                <p className="font-bold">{order.customer.fullName}</p>
                <p className="text-[#6B463E]">{order.customer.phoneNumber}</p>
                <p className="text-[#6B463E]">{order.customer.email}</p>
              </div>

              <div>
                <span className="font-bold text-[#FF6B35] block mb-1">
                  {order.deliveryMethod === 'pickup' ? 'Pengambilan di Outlet:' : 'Alamat Pengiriman:'}
                </span>
                {order.deliveryMethod === 'pickup' ? (
                  <p className="font-bold text-[#4A2C2A]">{order.customer.pickupBranch}</p>
                ) : (
                  <p className="text-[#6B463E]">{order.customer.address}, {order.customer.city}</p>
                )}
                <p className="text-[#2EC4B6] font-bold mt-1">
                  Slot: {order.customer.deliveryDate} ({order.customer.deliveryTimeSlot})
                </p>
              </div>
            </div>

            {/* Greeting Card Note (If Gift) */}
            {order.customer.isGift && order.customer.greetingCardText && (
              <div className="bg-[#FFF0E0] p-3 rounded-xl border border-[#FCD8B8] text-xs">
                <span className="font-bold text-[#4A2C2A] block">Kartu Ucapan Hadiah untuk: {order.customer.recipientName}</span>
                <p className="italic text-[#6B463E] mt-0.5">&quot;{order.customer.greetingCardText}&quot;</p>
              </div>
            )}

            {/* Items Ordered List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#4A2C2A] uppercase tracking-wide block">
                Menu yang Dipesan
              </span>
              <div className="space-y-1.5 divide-y divide-[#FCE7D2] text-xs">
                {order.items.map((item, idx) => (
                  <div key={idx} className="pt-1.5 flex justify-between items-start">
                    <div>
                      <span className="font-bold text-[#4A2C2A]">{item.product.name}</span>
                      <span className="text-[#FF6B35] font-bold ml-1">x{item.quantity}</span>
                      {item.sliceOption && (
                        <span className="block text-[10px] text-[#7D5A50]">✂️ {item.sliceOption}</span>
                      )}
                      {item.customMessage && (
                        <span className="block text-[10px] text-[#7D5A50]">🎂 &quot;{item.customMessage}&quot;</span>
                      )}
                    </div>
                    <span className="font-bold text-[#4A2C2A]">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grand Total Breakdown */}
            <div className="pt-3 border-t border-[#FCE7D2] space-y-1 text-xs text-[#7D5A50]">
              <div className="flex justify-between">
                <span>Subtotal Menu</span>
                <span className="font-bold text-[#4A2C2A]">{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim ({order.deliveryMethod})</span>
                <span className="font-bold text-[#4A2C2A]">
                  {order.deliveryFee === 0 ? 'GRATIS' : formatRupiah(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Kemasan Food-Grade</span>
                <span className="font-bold text-[#4A2C2A]">{formatRupiah(order.packagingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#2EC4B6] font-bold">
                  <span>Diskon Promo ({order.appliedPromo})</span>
                  <span>-{formatRupiah(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-[#FCE7D2] text-base font-bold text-[#4A2C2A]">
                <span>Total Tagihan</span>
                <span className="text-[#FF6B35] font-serif text-lg">{formatRupiah(order.grandTotal)}</span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintInvoice}
                className="px-4 py-2.5 rounded-xl border border-[#FCD8B8] text-[#4A2C2A] hover:bg-[#FFEBD6] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#FF6B35]" />
                <span>Cetak Invoice</span>
              </button>

              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#2EC4B6] hover:bg-[#25A99D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp Admin</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onTrackOrder(order.orderNumber);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E8551E] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>Lacak Pesanan Ini</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
