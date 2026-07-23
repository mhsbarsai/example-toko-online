import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  PackageCheck, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Tag, 
  Truck, 
  ChevronDown
} from 'lucide-react';
import { ProductCategory } from '../types';
import { formatRupiah } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  ordersCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  categories: ProductCategory[];
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  ordersCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  categories
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Promo
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Bebas Ongkir Ke Seluruh Indonesia + Voucher Cashback s/d Rp 100.000!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <span className="hover:text-white cursor-pointer transition">Bantuan & Layanan</span>
            <span className="hover:text-white cursor-pointer transition">Mitra Toko</span>
            <span className="hover:text-white cursor-pointer transition flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Jaminan 100% Original
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Buka Menu Mobile"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Toko<span className="text-emerald-600">Nusantara</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
                  E-Commerce Indonesia
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar & Category Dropdown */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-4 gap-2">
            <div className="relative">
              <button
                id="category-dropdown-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="h-11 px-3.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl flex items-center gap-2 transition"
              >
                <Tag className="w-4 h-4 text-emerald-600" />
                <span className="max-w-[120px] truncate">{selectedCategory}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      id={`cat-select-${cat}`}
                      onClick={() => {
                        onSelectCategory(cat);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center justify-between ${
                        selectedCategory === cat ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      {cat}
                      {selectedCategory === cat && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari produk, merek, atau kategori..."
                className="w-full h-11 pl-11 pr-4 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Bersihkan
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              id="wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition flex items-center justify-center"
              title="Favorit"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Orders Tracker Button */}
            <button
              id="orders-tracker-btn"
              onClick={onOpenOrders}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition flex items-center justify-center"
              title="Pesanan Saya"
            >
              <PackageCheck className="w-5 h-5" />
              {ordersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-emerald-600/20 transition group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">
                {cartCount > 0 ? formatRupiah(cartTotal) : 'Keranjang'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 lg:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari produk di TokoNusantara..."
              className="w-full h-10 pl-10 pr-4 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 animate-in fade-in duration-200">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Kategori Produk</p>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`mobile-cat-${cat}`}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
