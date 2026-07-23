import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  ArrowRight, 
  MapPin, 
  Clock, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Order } from '../types';
import { formatRupiah, formatDate } from '../utils/formatters';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onViewOrdersHistory: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewOrdersHistory
}) => {
  if (!isOpen || !order) return null;

  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Success Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-lg border border-white/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black tracking-tight">Pembayaran Berhasil!</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Terima kasih! Pesanan Anda telah diterima dan langsung masuk ke proses pengemasan oleh penjual.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-200 border border-emerald-300/30">
            <span>No. Invoice: {order.id}</span>
            <button 
              id="copy-invoice-id-btn"
              onClick={handleCopyOrderId}
              className="p-1 hover:text-white transition"
              title="Salin No. Invoice"
            >
              {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Live Order Tracking Timeline */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" /> Status Lacak Pesanan Realtime
            </h4>

            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              <div className="space-y-1 text-emerald-700">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  1
                </div>
                <span>Dibayar</span>
              </div>

              <div className="space-y-1 text-emerald-700">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  2
                </div>
                <span>Diproses</span>
              </div>

              <div className="space-y-1 text-slate-400">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  3
                </div>
                <span>Dikirim</span>
              </div>

              <div className="space-y-1 text-slate-400">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  4
                </div>
                <span>Selesai</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500 font-medium">No. Resi Kurir ({order.courier.name}):</span>
                <p className="font-mono font-bold text-slate-900">{order.trackingNumber}</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                Estimasi Tiba: {order.courier.estimatedDays}
              </span>
            </div>
          </div>

          {/* Shipping Address & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Tujuan Pengiriman
              </span>
              <p className="font-semibold text-slate-800">{order.address.fullName} ({order.address.phone})</p>
              <p className="text-slate-600 leading-snug">{order.address.address}, {order.address.city}, {order.address.province} ({order.address.postalCode})</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" /> Metode Pembayaran & Kurir
              </span>
              <p className="font-semibold text-slate-800">{order.paymentMethod.name}</p>
              <p className="text-slate-600">{order.courier.name} - {order.courier.serviceName}</p>
              <p className="text-[10px] text-slate-400">Waktu: {formatDate(new Date(order.createdAt))}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Rincian Barang</h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-[10px] text-slate-500">{item.quantity} x {formatRupiah(item.product.price)}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{formatRupiah(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal Produk</span>
              <span>{formatRupiah(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Diskon Voucher</span>
                <span>-{formatRupiah(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Ongkos Kirim</span>
              <span>{formatRupiah(order.shippingCost)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
              <span>Total Dibayar</span>
              <span className="text-emerald-700 text-base">{formatRupiah(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="print-invoice-btn"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" /> Cetak Resi / Invoice
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="view-orders-history-btn"
              onClick={onViewOrdersHistory}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Lihat Riwayat Pesanan
            </button>

            <button
              id="continue-shopping-btn"
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-600/20 transition"
            >
              Belanja Lagi <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
