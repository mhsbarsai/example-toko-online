import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Truck, 
  ShieldCheck, 
  Heart, 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus, 
  Share2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, options?: { color?: string; size?: string; variant?: string }) => void;
  onInstantBuy: (product: Product, quantity: number, options?: { color?: string; size?: string; variant?: string }) => void;
}

const SAMPLE_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    userName: 'Budi Santoso',
    rating: 5,
    date: '2 Hari yang lalu',
    comment: 'Pengiriman sangat cepat! Packaging rapi menggunakan bubble wrap tebal. Kualitas produk melebihi ekspektasi, sangat puas belanja di TokoNusantara!',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'rev-2',
    userName: 'Siti Rahmawati',
    rating: 5,
    date: '1 Minggu yang lalu',
    comment: 'Barang original 100%, garansi resmi terdaftar. Seller sangat ramah dan merespon pertanyaan dengan cepat. Recommended seller!',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
  }
];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onInstantBuy
}) => {
  if (!isOpen || !product) return null;

  const images = [product.image, ...(product.additionalImages || [])];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  // Variant selection state
  const colorVariant = product.variants?.find(v => v.type === 'color');
  const sizeVariant = product.variants?.find(v => v.type === 'size');
  const otherVariant = product.variants?.find(v => v.type === 'variant');

  const [selectedColor, setSelectedColor] = useState<string | undefined>(colorVariant?.options[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizeVariant?.options[0]);
  const [selectedOther, setSelectedOther] = useState<string | undefined>(otherVariant?.options[0]);

  const [activeTab, setActiveTab] = useState<'deskripsi' | 'ulasan'>('deskripsi');

  const handleAddToCart = () => {
    onAddToCart(product, quantity, {
      color: selectedColor,
      size: selectedSize,
      variant: selectedOther
    });
  };

  const handleInstantBuy = () => {
    onInstantBuy(product, quantity, {
      color: selectedColor,
      size: selectedSize,
      variant: selectedOther
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-emerald-700 font-bold">{product.brand}</span>
          </div>
          <button
            id="close-product-detail-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner relative">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                {product.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                    Diskon {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      id={`thumbnail-select-${idx}`}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition ${
                        selectedImage === img ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Purchase Options */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                    Stok Tersedia ({product.stock})
                  </span>
                  {product.freeShipping && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Bebas Ongkir
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Sales */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-400">({product.reviewCount} Ulasan)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">Terjual {product.salesCount} unit</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Variants Selector */}
              {colorVariant && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Pilihan Warna: <span className="text-emerald-700 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorVariant.options.map((col) => (
                      <button
                        key={col}
                        id={`variant-color-${col}`}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          selectedColor === col
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizeVariant && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Ukuran: <span className="text-emerald-700 font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizeVariant.options.map((sz) => (
                      <button
                        key={sz}
                        id={`variant-size-${sz}`}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold border transition ${
                          selectedSize === sz
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {otherVariant && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Tipe / Varian: <span className="text-emerald-700 font-normal">{selectedOther}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {otherVariant.options.map((varOpt) => (
                      <button
                        key={varOpt}
                        id={`variant-other-${varOpt}`}
                        onClick={() => setSelectedOther(varOpt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          selectedOther === varOpt
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                        }`}
                      >
                        {varOpt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Adjuster */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Jumlah Pembelian
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      id="decrease-qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 hover:bg-slate-100 transition"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      id="increase-qty-btn"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 text-slate-600 hover:bg-slate-100 transition"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">
                    Subtotal: <strong className="text-slate-900">{formatRupiah(product.price * quantity)}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  id="detail-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" /> + Keranjang
                </button>

                <button
                  id="detail-instant-buy-btn"
                  onClick={handleInstantBuy}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition hover:scale-[1.02] active:scale-95"
                >
                  Beli Sekarang
                </button>

                <button
                  id="detail-wishlist-toggle-btn"
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Favoritkan"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Deskripsi & Ulasan */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex border-b border-slate-200 mb-4 gap-6">
              <button
                id="tab-deskripsi-btn"
                onClick={() => setActiveTab('deskripsi')}
                className={`pb-3 text-sm font-bold border-b-2 transition ${
                  activeTab === 'deskripsi'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Deskripsi & Spesifikasi
              </button>
              <button
                id="tab-ulasan-btn"
                onClick={() => setActiveTab('ulasan')}
                className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
                  activeTab === 'ulasan'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Ulasan Pembeli ({product.reviewCount})
              </button>
            </div>

            {activeTab === 'deskripsi' ? (
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>{product.description}</p>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-900">Keunggulan Fitur Utama:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {SAMPLE_REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-sm">{rev.userName}</span>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
