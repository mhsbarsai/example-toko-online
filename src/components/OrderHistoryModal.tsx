import React, { useState } from 'react';
import { 
  X, 
  PackageCheck, 
  Truck, 
  Clock, 
  ChevronRight, 
  Search, 
  Star, 
  RotateCcw,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Order } from '../types';
import { formatRupiah, formatDate } from '../utils/formatters';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onReorder: (order: Order) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder
}) => {
  if (!isOpen) return null;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Riwayat & Lacak Pesanan Saya</h2>
              <p className="text-xs text-slate-500">{orders.length} transaksi tercatat</p>
            </div>
          </div>

          <button
            id="close-order-history-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <PackageCheck className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Belum Ada Transaksi</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Anda belum melakukan transaksi. Pesanan yang telah Anda bayar akan ditampilkan di sini secara otomatis.
              </p>
              <button
                id="empty-order-history-close-btn"
                onClick={onClose}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-emerald-600/20"
              >
                Mulai Belanja Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Order List Column */}
              <div className="lg:col-span-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Daftar Transaksi</h4>
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      id={`order-history-card-${ord.id}`}
                      onClick={() => setSelectedOrder(ord)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                        selectedOrder?.id === ord.id
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-mono font-bold text-slate-900 truncate max-w-[140px]">{ord.id}</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                          {ord.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 my-2">
                        <img 
                          src={ord.items[0]?.product.image} 
                          alt={ord.items[0]?.product.name} 
                          className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{ord.items[0]?.product.name}</p>
                          <p className="text-[10px] text-slate-500">
                            {ord.items.length > 1 ? `+ ${ord.items.length - 1} produk lainnya` : `${ord.items[0]?.quantity} barang`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                        <span className="text-slate-400 text-[10px]">{formatDate(new Date(ord.createdAt))}</span>
                        <span className="font-black text-emerald-700">{formatRupiah(ord.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Detail Inspector */}
              {selectedOrder && (
                <div className="lg:col-span-7 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Rincian Pesanan</h3>
                      <p className="font-mono text-xs text-slate-500">{selectedOrder.id}</p>
                    </div>
                    <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* Courier & Tracking */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-emerald-600" /> Kurir Pengiriman
                      </span>
                      <span className="text-emerald-700 font-bold">{selectedOrder.courier.name}</span>
                    </div>
                    <p className="text-slate-600">Layanan: {selectedOrder.courier.serviceName}</p>
                    <p className="font-mono text-slate-900 font-bold">Nomor Resi: {selectedOrder.trackingNumber}</p>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Produk Dibeli</h5>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedOrder.items.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                              <p className="text-[10px] text-slate-500">{item.quantity} x {formatRupiah(item.product.price)}</p>
                            </div>
                          </div>
                          <span className="font-bold text-slate-900 shrink-0 ml-2">{formatRupiah(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Metode Pembayaran</span>
                      <span className="font-semibold text-slate-900">{selectedOrder.paymentMethod.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal Barang</span>
                      <span>{formatRupiah(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Ongkos Kirim</span>
                      <span>{formatRupiah(selectedOrder.shippingCost)}</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-200 flex justify-between font-black text-slate-900 text-sm">
                      <span>Total Biaya</span>
                      <span className="text-emerald-700">{formatRupiah(selectedOrder.total)}</span>
                    </div>
                  </div>

                  {/* Action Reorder Button */}
                  <button
                    id="order-reorder-btn"
                    onClick={() => onReorder(selectedOrder)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    <RotateCcw className="w-4 h-4" /> Beli Lagi Produk Ini
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
