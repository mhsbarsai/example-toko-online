import React from 'react';
import { Star, Heart, ShoppingBag, Truck, Flame, Check } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isInCart: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onAddToCart,
  onViewDetail
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Badges & Wishlist Button */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onViewDetail(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Discount & Promo Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage && (
            <span className="bg-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded-lg shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isFlashSale && (
            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-slate-950" /> Flash
            </span>
          )}
          {product.freeShipping && (
            <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-0.5">
              <Truck className="w-3 h-3" /> Bebas Ongkir
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 z-10 ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600 shadow-md' 
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
          title={isWishlisted ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
            <span className="text-emerald-700 font-semibold">{product.brand}</span>
            <span className="truncate max-w-[120px]">{product.category}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetail(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
          >
            {product.name}
          </h3>

          {/* Rating & Sales */}
          <div className="flex items-center gap-1.5 text-xs mb-3">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-[11px]">Terjual {product.salesCount >= 1000 ? `${(product.salesCount/1000).toFixed(1)}rb` : product.salesCount}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through block">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
            <span className="text-base font-black text-slate-900 tracking-tight">
              {formatRupiah(product.price)}
            </span>
          </div>

          <button
            id={`add-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product)}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center justify-center transition-all ${
              isInCart
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95'
            }`}
            title={isInCart ? 'Sudah di Keranjang' : 'Tambah ke Keranjang'}
          >
            {isInCart ? (
              <span className="flex items-center gap-1 font-bold text-[11px]">
                <Check className="w-4 h-4 text-emerald-700" /> Ada
              </span>
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
