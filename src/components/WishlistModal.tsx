import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative border border-slate-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
              <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Produk Favorit Saya</h2>
              <p className="text-xs text-slate-500">{wishlistItems.length} produk disimpan</p>
            </div>
          </div>

          <button
            id="close-wishlist-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Daftar Favorit Masih Kosong</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Klik ikon hati pada produk yang Anda sukai untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wishlistItems.map((product) => (
                <div key={product.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 relative group">
                  <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover bg-white shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-700 font-bold block">{product.brand}</span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                      <span className="text-xs font-black text-slate-900">{formatRupiah(product.price)}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        id={`wishlist-add-cart-${product.id}`}
                        onClick={() => onAddToCart(product)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> + Keranjang
                      </button>

                      <button
                        id={`wishlist-remove-${product.id}`}
                        onClick={() => onRemoveWishlist(product)}
                        className="p-1.5 bg-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-600 rounded-lg transition"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
