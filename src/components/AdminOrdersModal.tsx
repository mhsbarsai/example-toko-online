import React, { useState } from 'react';
import { 
  X, 
  ChefHat, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Truck, 
  Store, 
  Printer, 
  RefreshCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Order } from '../types';
import { formatRupiah } from '../utils/formatters';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onViewInvoice: (order: Order) => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  onViewInvoice,
}) => {
  if (!isOpen) return null;

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchAdmin, setSearchAdmin] = useState('');

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const q = searchAdmin.toLowerCase().trim();
    const matchQuery = !q || (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customer.fullName.toLowerCase().includes(q) ||
      o.customer.phoneNumber.includes(q)
    );
    return matchStatus && matchQuery;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'UNPAID':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFEBD6] text-[#FF6B35] border border-[#FF6B35]/30">Menunggu Bayar</span>;
      case 'VERIFYING':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-300">Verifikasi Gateway</span>;
      case 'PAID':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2EC4B6]/15 text-[#0F6860] border border-[#2EC4B6]/30">Lunas (Siap Diproses)</span>;
      case 'BAKING':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFD93D]/30 text-[#4A2C2A] border border-[#FFD93D]">Sedang Dipanggang</span>;
      case 'READY_DELIVERY':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">Siap Kirim / Ambil</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">Selesai</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-900 border border-rose-300">Dibatalkan</span>;
    }
  };

  return (
    <div id="admin-orders-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto p-5 sm:p-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#FCE7D2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shadow-md">
              <ChefHat className="w-5 h-5 text-[#FFD93D]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-lg">Panel Manajemen Pesanan Toko</h2>
              <span className="text-xs text-[#7D5A50]">Pantau status pesanan masuk dan atur alur kerja dapur</span>
            </div>
          </div>

          <button
            id="btn-close-admin-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors self-end sm:self-auto cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B35]" />
            <input
              type="text"
              value={searchAdmin}
              onChange={(e) => setSearchAdmin(e.target.value)}
              placeholder="Cari kode pesanan, nama pelanggan, no HP..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#FCD8B8] rounded-xl text-xs text-[#4A2C2A] placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#FF6B35]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] font-bold focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden cursor-pointer"
            >
              <option value="all">Semua Status Pesanan ({orders.length})</option>
              <option value="UNPAID">Menunggu Pembayaran</option>
              <option value="PAID">Lunas (Perlu Dipanggang)</option>
              <option value="BAKING">Sedang Dipanggang Dapur</option>
              <option value="READY_DELIVERY">Siap Kirim / Diambil</option>
              <option value="COMPLETED">Selesai</option>
            </select>
          </div>
        </div>

        {/* Orders Table / Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#FCD8B8] p-6">
            <ChefHat className="w-10 h-10 text-[#FFD93D] mx-auto mb-2" />
            <h4 className="font-bold text-[#4A2C2A] text-sm">Tidak ada pesanan yang sesuai filter</h4>
            <p className="text-xs text-[#7D5A50] mt-0.5">Pesanan baru dari pelanggan akan muncul di sini secara otomatis.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#FCD8B8] p-4 sm:p-5 space-y-3 shadow-2xs"
              >
                {/* Top Row: Order ID, Timestamp, Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FCE7D2] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#4A2C2A] text-sm">{order.orderNumber}</span>
                    <span className="text-xs text-[#7D5A50]">• {new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <span className="text-xs font-bold text-[#FF6B35] font-serif">{formatRupiah(order.grandTotal)}</span>
                  </div>
                </div>

                {/* Customer & Items Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A2C2A]">
                  <div>
                    <span className="text-[#7D5A50] font-bold block">Pelanggan:</span>
                    <p className="font-bold text-[#4A2C2A]">{order.customer.fullName} ({order.customer.phoneNumber})</p>
                    <p className="text-[#6B463E]">
                      Metode: {order.deliveryMethod === 'pickup' ? `Ambil di Outlet (${order.customer.pickupBranch})` : `Antar Kurir (${order.customer.address})`}
                    </p>
                    <p className="text-[#7D5A50] font-medium">
                      Slot: {order.customer.deliveryDate} ({order.customer.deliveryTimeSlot})
                    </p>
                  </div>

                  <div>
                    <span className="text-[#7D5A50] font-bold block">Daftar Menu:</span>
                    <ul className="space-y-0.5 text-[#6B463E] max-h-20 overflow-y-auto">
                      {order.items.map((item, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.quantity}x {item.product.name}</span>
                          <span className="font-semibold text-[#4A2C2A]">{formatRupiah(item.product.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Status Update Quick Action Controls */}
                <div className="pt-3 border-t border-[#FCE7D2] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#4A2C2A]">Ubah Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                      className="bg-[#FFF0E0] border border-[#FCD8B8] rounded-xl px-2.5 py-1 text-xs font-bold text-[#4A2C2A] cursor-pointer focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                    >
                      <option value="UNPAID">Menunggu Pembayaran</option>
                      <option value="PAID">Lunas (Diverifikasi)</option>
                      <option value="BAKING">Sedang Dipanggang Dapur</option>
                      <option value="READY_DELIVERY">Siap Kirim / Diambil</option>
                      <option value="COMPLETED">Selesai</option>
                      <option value="CANCELLED">Batalkan Pesanan</option>
                    </select>
                  </div>

                  <button
                    onClick={() => onViewInvoice(order)}
                    className="px-3 py-1.5 bg-[#FFEBD6] hover:bg-[#FFD93D] text-[#4A2C2A] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors border border-[#FCD8B8] cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Lihat & Cetak Invoice</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
