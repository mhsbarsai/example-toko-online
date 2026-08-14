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
import { CartItem, PromoCode } from '../types';
import { PROMO_VOUCHERS } from '../data/products';
import { formatRupiah } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedPromo?: PromoCode) => void;
  appliedPromo?: PromoCode;
  onApplyPromo: (promo?: PromoCode) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const itemsSubtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Calculate promo discount
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

  const handleApplyPromoCode = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    const matched = PROMO_VOUCHERS.find((p) => p.code.toUpperCase() === code);
    if (!matched) {
      setPromoError('Kode promo tidak valid atau telah kedaluwarsa.');
      return;
    }

    if (itemsSubtotal < matched.minSpend) {
      setPromoError(`Minimal belanja ${formatRupiah(matched.minSpend)} untuk menggunakan kode ${matched.code}.`);
      return;
    }

    onApplyPromo(matched);
    setPromoInput('');
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#FFF9F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#FCE7D2]">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#FFF0E0] border-b border-[#FCE7D2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2EC4B6] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-base">Keranjang Roti</h2>
              <span className="text-[11px] text-[#7D5A50] font-semibold">
                {items.length} jenis produk dipilih
              </span>
            </div>
          </div>

          <button
            id="btn-close-cart-drawer"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#7D5A50]">
              <div className="w-16 h-16 rounded-full bg-[#FFEBD6] flex items-center justify-center text-[#FF6B35] mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-[#4A2C2A] text-lg">Keranjang Masih Kosong</h3>
              <p className="text-xs text-[#7D5A50] mt-1 max-w-xs">
                Aroma roti dan pastry lezat kami sudah menunggu Anda. Tambahkan menu favorit sekarang!
              </p>
              <button
                id="btn-empty-cart-explore"
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-2xl shadow-xs hover:bg-[#E8551E] transition-colors cursor-pointer"
              >
                Jelajahi Menu Roti
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="bg-white p-3.5 rounded-2xl border border-[#FCE7D2] shadow-2xs space-y-2.5"
              >
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-16 h-16 rounded-xl object-cover border border-[#FCE7D2] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-[#4A2C2A] text-xs sm:text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#FF6B35] block mt-0.5">
                      {formatRupiah(item.product.price)}
                    </span>

                    {/* Custom slicing or cake message summary */}
                    {item.sliceOption && (
                      <span className="text-[10px] text-[#4A2C2A] font-semibold block bg-[#FFF0E0] px-1.5 py-0.5 rounded-md mt-1 w-fit border border-[#FCD8B8]">
                        ✂️ {item.sliceOption}
                      </span>
                    )}

                    {item.customMessage && (
                      <span className="text-[10px] text-[#4A2C2A] font-semibold block bg-[#FFF0E0] px-1.5 py-0.5 rounded-md mt-1 border border-[#FCD8B8]">
                        🎂 &quot;{item.customMessage}&quot; {item.candleCount ? `(${item.candleCount} lilin)` : ''}
                      </span>
                    )}

                    {item.itemNotes && (
                      <span className="text-[10px] text-[#947065] italic block mt-0.5">
                        Catatan: {item.itemNotes}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#947065] hover:text-rose-600 transition-colors self-start p-1 cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Quantity Control & Item Total */}
                <div className="flex items-center justify-between pt-2 border-t border-[#FCE7D2] text-xs">
                  <span className="text-[#7D5A50] font-medium">
                    Subtotal: <strong className="text-[#4A2C2A]">{formatRupiah(item.product.price * item.quantity)}</strong>
                  </span>

                  <div className="flex items-center gap-2 bg-[#FFF0E0] p-1 rounded-xl border border-[#FCD8B8]">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white text-[#4A2C2A] flex items-center justify-center text-xs font-bold hover:bg-[#FFEBD6] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-[#4A2C2A] text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white text-[#4A2C2A] flex items-center justify-center text-xs font-bold hover:bg-[#FFEBD6] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#FCE7D2] space-y-3">
            
            {/* Promo Code Box */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-[#EAFBF9] border border-[#2EC4B6] px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#2EC4B6]" />
                    <div>
                      <span className="font-bold text-[#0F6860]">{appliedPromo.code}</span>
                      <span className="text-[#2EC4B6] block text-[10px] font-bold">
                        Hemat {formatRupiah(discountAmount)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onApplyPromo(undefined)}
                    className="text-[#0F6860] hover:text-rose-600 font-bold text-xs cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Punya Kode Promo? (cth: ROTIHANGAT)"
                      className="flex-1 bg-[#FFF0E0]/60 border border-[#FCD8B8] rounded-xl px-3 py-1.5 text-xs text-[#4A2C2A] placeholder-[#947065] uppercase font-bold focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                    />
                    <button
                      id="btn-apply-promo-code"
                      type="button"
                      onClick={handleApplyPromoCode}
                      className="bg-[#FF6B35] hover:bg-[#E8551E] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Terapkan
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[10px] text-rose-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      {promoError}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-[10px] text-[#7D5A50]">
                    <Sparkles className="w-3 h-3 text-[#FF6B35]" />
                    <span>Gunakan voucher <strong className="cursor-pointer underline text-[#FF6B35]" onClick={() => setPromoInput('ROTIHANGAT')}>ROTIHANGAT</strong> untuk diskon 15%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-[#FCE7D2]">
              <div className="flex justify-between text-[#7D5A50]">
                <span>Subtotal Menu</span>
                <span className="font-bold text-[#4A2C2A]">{formatRupiah(itemsSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2EC4B6] font-bold">
                  <span>Diskon Voucher ({appliedPromo?.code})</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#4A2C2A] font-bold text-sm pt-1 border-t border-dashed border-[#FCE7D2]">
                <span>Estimasi Total</span>
                <span className="text-[#FF6B35] font-serif text-base">{formatRupiah(itemsSubtotal - discountAmount)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              id="btn-checkout-from-cart"
              onClick={() => onProceedToCheckout(appliedPromo)}
              className="w-full py-3.5 px-4 bg-[#FF6B35] hover:bg-[#E8551E] text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Lanjut ke Pembayaran & Pengiriman</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
