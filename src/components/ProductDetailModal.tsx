import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ShieldCheck, 
  Clock, 
  Utensils, 
  AlertCircle, 
  HeartHandshake,
  Check
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [sliceOption, setSliceOption] = useState<
    'Utuh (Tanpa Potong)' | 'Potong Tipis (10mm - Sandwiched)' | 'Potong Tebal (18mm - Toasting)'
  >('Utuh (Tanpa Potong)');
  const [customMessage, setCustomMessage] = useState('');
  const [candleCount, setCandleCount] = useState(0);
  const [itemNotes, setItemNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      sliceOption: product.allowSlicing ? sliceOption : undefined,
      customMessage: product.allowCustomCakeMessage && customMessage.trim() ? customMessage.trim() : undefined,
      candleCount: product.allowCandles ? candleCount : undefined,
      itemNotes: itemNotes.trim() ? itemNotes.trim() : undefined,
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const totalPrice = product.price * quantity;

  return (
    <div 
      id="product-detail-modal-overlay" 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FFF9F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] relative my-auto">
        
        {/* Close Button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#FFF0E0]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
            <div className="text-white">
              <div className="flex flex-wrap gap-2 mb-2">
                {product.badges?.map((badge, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFD93D] text-[#4A2C2A]">
                    {badge}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                {product.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Price, Rating, Servings */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#FCE7D2]">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#FF6B35] font-serif">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#947065] line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#2EC4B6] font-bold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Dipanggang Segar Tanpa Bahan Kimia & Pengawet
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#FFEBD6] px-3 py-1.5 rounded-xl text-[#4A2C2A] text-xs font-bold">
                <Star className="w-4 h-4 fill-[#FFD93D] text-[#FFD93D]" />
                <span>{product.rating}</span>
                <span className="text-[#7D5A50] font-normal">({product.reviewsCount} ulasan)</span>
              </div>
              <div className="text-xs font-semibold text-[#4A2C2A] bg-white px-3 py-1.5 rounded-xl border border-[#FCE7D2]">
                {product.weightGrams ? `${product.weightGrams} gram` : product.servings}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] mb-1">
              Tentang Roti Ini
            </h4>
            <p className="text-sm text-[#4A2C2A] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Slicing Option (for Sourdough & Loaves) */}
          {product.allowSlicing && (
            <div className="bg-white p-4 rounded-2xl border border-[#FCE7D2] space-y-2">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#FF6B35]" />
                <label className="text-xs font-bold text-[#4A2C2A] uppercase tracking-wide">
                  Pilihan Pemotongan Roti (Gratis)
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Utuh (Tanpa Potong)',
                  'Potong Tipis (10mm - Sandwiched)',
                  'Potong Tebal (18mm - Toasting)',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSliceOption(opt as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                      sliceOption === opt
                        ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-xs'
                        : 'bg-[#FFF9F2] text-[#4A2C2A] border-[#FCE7D2] hover:bg-[#FFF0E0]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Cake Inscription & Message */}
          {product.allowCustomCakeMessage && (
            <div className="bg-white p-4 rounded-2xl border border-[#FCE7D2] space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#4A2C2A] uppercase tracking-wide mb-1">
                  Tulisan di Atas Kue / Cokelat Plaque (Opsional)
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Contoh: Selamat Ulang Tahun Ayah tercinta (Maks. 35 Karakter)"
                  className="w-full bg-[#FFF9F2] border border-[#FCD8B8] rounded-xl px-3.5 py-2 text-xs text-[#4A2C2A] placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
                />
              </div>

              {product.allowCandles && (
                <div className="flex items-center justify-between pt-2 border-t border-[#FCE7D2]">
                  <span className="text-xs font-semibold text-[#4A2C2A]">
                    Jumlah Lilin Batang (Gratis):
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCandleCount(Math.max(0, candleCount - 1))}
                      className="w-7 h-7 rounded-lg bg-[#FFF9F2] border border-[#FCD8B8] text-[#4A2C2A] flex items-center justify-center text-xs font-bold hover:bg-[#FFEBD6] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[#4A2C2A] w-6 text-center">
                      {candleCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCandleCount(Math.min(10, candleCount + 1))}
                      className="w-7 h-7 rounded-lg bg-[#FFF9F2] border border-[#FCD8B8] text-[#4A2C2A] flex items-center justify-center text-xs font-bold hover:bg-[#FFEBD6] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes for Kitchen */}
          <div>
            <label className="block text-xs font-bold text-[#4A2C2A] mb-1">
              Catatan Tambahan untuk Baker (Opsional):
            </label>
            <input
              type="text"
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              placeholder="Contoh: Tolong pisahkan saus, atau minta kemasan rapat..."
              className="w-full bg-white border border-[#FCD8B8] rounded-xl px-3.5 py-2 text-xs text-[#4A2C2A] placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
            />
          </div>

          {/* Ingredients & Allergens Accordion/Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FFF0E0] p-3.5 rounded-2xl border border-[#FCD8B8]">
              <span className="font-bold text-[#4A2C2A] block mb-1.5">Bahan Berkualitas:</span>
              <p className="text-[#6B463E] leading-relaxed">
                {product.ingredients.join(', ')}
              </p>
            </div>

            <div className="bg-[#FFF0E0] p-3.5 rounded-2xl border border-[#FCD8B8]">
              <div className="flex items-center gap-1 font-bold text-[#4A2C2A] mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Informasi Alergen:</span>
              </div>
              <p className="text-[#6B463E] leading-relaxed">
                {product.allergens.join(', ')}
              </p>
            </div>
          </div>

          {/* Storage & Freshness Tips */}
          <div className="flex items-start gap-2 bg-[#EAFBF9] p-3.5 rounded-2xl border border-[#2EC4B6] text-xs text-[#0F6860]">
            <Clock className="w-4 h-4 text-[#2EC4B6] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-[#0F6860]">Masa Simpan: {product.shelfLife}</span>
              <span className="text-[#0F6860]/80">{product.storageTip}</span>
            </div>
          </div>

          {/* Footer Action: Quantity & Add Button */}
          <div className="pt-4 border-t border-[#FCE7D2] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#FFF0E0] p-1.5 rounded-2xl border border-[#FCD8B8]">
              <button
                type="button"
                id="btn-modal-qty-minus"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white text-[#4A2C2A] hover:bg-[#FFEBD6] flex items-center justify-center transition-colors shadow-2xs font-bold cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-[#4A2C2A] text-sm">
                {quantity}
              </span>
              <button
                type="button"
                id="btn-modal-qty-plus"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white text-[#4A2C2A] hover:bg-[#FFEBD6] flex items-center justify-center transition-colors shadow-2xs font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Submit Button */}
            <button
              type="button"
              id="btn-modal-submit-cart"
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedAnimation 
                  ? 'bg-[#2EC4B6] text-white'
                  : 'bg-[#FF6B35] hover:bg-[#E8551E] text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5 animate-bounce" />
                  <span>Berhasil Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Tambah ke Keranjang • {formatRupiah(totalPrice)}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
