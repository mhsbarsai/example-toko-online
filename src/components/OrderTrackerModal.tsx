import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Store, 
  ChevronRight,
  Flame,
  AlertCircle
} from 'lucide-react';
import { Order } from '../types';
import { formatRupiah } from '../utils/formatters';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
  onSelectOrderToView: (order: Order) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderNumber = '',
  onSelectOrderToView,
}) => {
  if (!isOpen) return null;

  const [searchCode, setSearchCode] = useState(initialOrderNumber);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Load order history from localStorage
  const getStoredOrders = (): Order[] => {
    try {
      return JSON.parse(localStorage.getItem('kencana_orders_history') || '[]');
    } catch {
      return [];
    }
  };

  const storedOrders = getStoredOrders();

  const handleSearch = (codeToSearch?: string) => {
    setErrorMsg('');
    const target = (codeToSearch || searchCode).trim().toUpperCase();
    if (!target) {
      setErrorMsg('Masukkan nomor pesanan (cth: KNC-89214)');
      return;
    }

    const found = storedOrders.find(
      (o) => o.orderNumber.toUpperCase() === target || o.id === target
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMsg(`Pesanan dengan kode "${target}" tidak ditemukan.`);
      setSearchedOrder(null);
    }
  };

  // If initialOrderNumber passed and searchedOrder is not set yet
  React.useEffect(() => {
    if (initialOrderNumber) {
      setSearchCode(initialOrderNumber);
      handleSearch(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  return (
    <div id="order-tracker-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FCE7D2]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shadow-md">
              <Receipt className="w-5 h-5 text-[#FFD93D]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-lg">Lacak Status Pesanan</h2>
              <span className="text-xs text-[#7D5A50]">Pantau proses pemanggangan & pengantaran roti</span>
            </div>
          </div>

          <button
            id="btn-close-tracker-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C2A]">
            Cari Berdasarkan Kode Pesanan
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              placeholder="Masukkan kode: KNC-XXXXX"
              className="flex-1 bg-white border border-[#FCD8B8] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-mono text-[#4A2C2A] font-bold placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
            />
            <button
              onClick={() => handleSearch()}
              className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E8551E] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Lacak</span>
            </button>
          </div>
          {errorMsg && (
            <p className="text-xs text-rose-600 font-bold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          )}
        </div>

        {/* Searched Order Details & Timeline */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl p-5 border border-[#FCE7D2] space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#FCE7D2] pb-3">
              <div>
                <span className="text-[11px] text-[#7D5A50] font-bold block">Nomor Pesanan:</span>
                <span className="font-mono font-bold text-base text-[#4A2C2A]">{searchedOrder.orderNumber}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                searchedOrder.status === 'PAID' || searchedOrder.status === 'BAKING'
                  ? 'bg-[#FFEBD6] text-[#FF6B35]'
                  : searchedOrder.status === 'COMPLETED'
                  ? 'bg-[#2EC4B6]/15 text-[#0F6860]'
                  : 'bg-[#FFF0E0] text-[#4A2C2A]'
              }`}>
                {searchedOrder.status}
              </span>
            </div>

            {/* Timeline progression */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#4A2C2A] uppercase tracking-wide block">
                Tahapan Pesanan:
              </span>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#FCD8B8]">
                {[
                  {
                    title: '1. Pesanan Diterima & Verifikasi',
                    desc: searchedOrder.status === 'UNPAID' ? 'Menunggu Pembayaran' : 'Pembayaran Lunas & Terverifikasi',
                    done: searchedOrder.status !== 'UNPAID',
                  },
                  {
                    title: '2. Dipanggang & Dikemas Dapur',
                    desc: 'Baker sedang memanggang batch adonan segar',
                    done: ['PAID', 'BAKING', 'READY_DELIVERY', 'COMPLETED'].includes(searchedOrder.status),
                  },
                  {
                    title: searchedOrder.deliveryMethod === 'pickup' ? '3. Siap Diambil di Outlet' : '3. Dalam Perjalanan Kurir',
                    desc: searchedOrder.deliveryMethod === 'pickup' ? `Outlet: ${searchedOrder.customer.pickupBranch}` : `Alamat: ${searchedOrder.customer.address}`,
                    done: ['READY_DELIVERY', 'COMPLETED'].includes(searchedOrder.status),
                  },
                  {
                    title: '4. Pesanan Selesai',
                    desc: 'Selamat menikmati roti artisan Kencana!',
                    done: searchedOrder.status === 'COMPLETED',
                  }
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[29px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      step.done 
                        ? 'bg-[#2EC4B6] border-[#2EC4B6] text-white' 
                        : 'bg-white border-[#FCD8B8] text-transparent'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${step.done ? 'text-[#4A2C2A]' : 'text-[#947065]'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-[#7D5A50] mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Order Info */}
            <div className="bg-[#FFF0E0] p-3.5 rounded-2xl border border-[#FCD8B8] text-xs flex items-center justify-between">
              <div>
                <span className="text-[#7D5A50] block">Total Tagihan ({searchedOrder.items.length} item):</span>
                <span className="font-bold text-[#FF6B35] font-serif text-sm">{formatRupiah(searchedOrder.grandTotal)}</span>
              </div>
              <button
                onClick={() => {
                  onSelectOrderToView(searchedOrder);
                  onClose();
                }}
                className="px-3.5 py-1.5 bg-[#FF6B35] hover:bg-[#E8551E] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Lihat Invoice Lengkap
              </button>
            </div>
          </div>
        )}

        {/* Stored Recent Orders List */}
        {storedOrders.length > 0 && !searchedOrder && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A2C2A] block">
              Riwayat Pesanan di Perangkat Ini:
            </span>
            <div className="space-y-2">
              {storedOrders.slice(0, 4).map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    setSearchedOrder(o);
                    setSearchCode(o.orderNumber);
                  }}
                  className="bg-white p-3 rounded-2xl border border-[#FCD8B8] hover:border-[#FF6B35] flex items-center justify-between cursor-pointer transition-all hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FFEBD6] text-[#FF6B35] flex items-center justify-center font-bold text-xs font-mono">
                      #
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#4A2C2A] font-mono block">{o.orderNumber}</span>
                      <span className="text-[11px] text-[#7D5A50]">
                        {o.items.length} Menu • {formatRupiah(o.grandTotal)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#FF6B35]" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
