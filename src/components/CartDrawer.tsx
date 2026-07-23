import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { CartItem, Voucher } from '../types';
import { formatRupiah } from '../utils/formatters';
import { VOUCHERS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  appliedVoucher: Voucher | null;
  onApplyVoucher: (voucher: Voucher | null) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedVoucher,
  onApplyVoucher,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Calculate voucher discount
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

  const handleApplyVoucherCode = (code: string) => {
    const found = VOUCHERS.find((v) => v.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      setVoucherError('Kode voucher tidak ditemukan!');
      setVoucherSuccess('');
      return;
    }
    if (subtotal < found.minSpend) {
      setVoucherError(`Minimal belanja ${formatRupiah(found.minSpend)} untuk menggunakan voucher ini.`);
      setVoucherSuccess('');
      return;
    }
    onApplyVoucher(found);
    setVoucherSuccess(`Voucher ${found.code} berhasil dipasang!`);
    setVoucherError('');
    setVoucherInput('');
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Keranjang Belanja</h2>
              <p className="text-xs text-slate-500">{items.length} jenis produk dipilih</p>
            </div>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Keranjang Masih Kosong</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Yuk jelajahi berbagai produk terbaik Nusantara dan tambahkan ke keranjang Anda!
              </p>
              <button
                id="cart-empty-browse-btn"
                onClick={onClose}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-emerald-600/20"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">Daftar Barang</span>
                <button
                  id="clear-cart-items-btn"
                  onClick={onClearCart}
                  className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Kosongkan
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-3 relative group"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-white shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 truncate pr-6">
                          {item.product.name}
                        </h4>
                        {(item.selectedColor || item.selectedSize || item.selectedVariant) && (
                          <span className="text-[10px] text-slate-500 block truncate">
                            Varian: {[item.selectedColor, item.selectedSize, item.selectedVariant].filter(Boolean).join(' / ')}
                          </span>
                        )}
                        <span className="text-xs font-black text-emerald-700">
                          {formatRupiah(item.product.price)}
                        </span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                          <button
                            id={`cart-minus-${item.product.id}`}
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            id={`cart-plus-${item.product.id}`}
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-slate-800">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`cart-remove-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1 transition"
                      title="Hapus Barang"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Voucher Section */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-600" /> Voucher Diskon / Promo
                </label>

                {appliedVoucher ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-800">{appliedVoucher.code}</span>
                      <p className="text-[10px] text-emerald-600">{appliedVoucher.title}</p>
                    </div>
                    <button
                      id="remove-voucher-btn"
                      onClick={() => {
                        onApplyVoucher(null);
                        setVoucherSuccess('');
                      }}
                      className="text-rose-600 hover:underline font-bold text-[11px]"
                    >
                      Lepas
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => {
                        setVoucherInput(e.target.value);
                        setVoucherError('');
                      }}
                      placeholder="Masukkan kode: HEMAT20"
                      className="flex-1 h-9 px-3 bg-slate-100 border border-slate-200 rounded-xl text-xs uppercase focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      id="apply-voucher-btn"
                      onClick={() => handleApplyVoucherCode(voucherInput)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 rounded-xl transition"
                    >
                      Pakai
                    </button>
                  </div>
                )}

                {voucherError && (
                  <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {voucherError}
                  </p>
                )}
                {voucherSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> {voucherSuccess}
                  </p>
                )}

                {/* Voucher suggestions */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {VOUCHERS.map((v) => (
                    <button
                      key={v.code}
                      id={`voucher-chip-${v.code}`}
                      onClick={() => handleApplyVoucherCode(v.code)}
                      className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md hover:bg-emerald-100 font-medium"
                    >
                      + {v.code}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-slate-900">{formatRupiah(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Potongan Voucher</span>
                  <span className="font-bold">-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>Ongkos Kirim</span>
                <span className="text-[11px] italic">Dihitung saat checkout</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-slate-900">Total Pembayaran</span>
                <span className="text-xl font-black text-emerald-700">{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition hover:scale-[1.01] active:scale-95"
            >
              Lanjut ke Pembayaran <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
