import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Sparkles, 
  Clock, 
  Receipt, 
  Phone,
  ChefHat,
  Menu,
  X
} from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenBakingSchedule: () => void;
  onOpenLocations: () => void;
  onOpenAIConsultant: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenTracker,
  onOpenBakingSchedule,
  onOpenLocations,
  onOpenAIConsultant,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FFF9F2]/95 backdrop-blur-md border-b border-[#FCE7D2] shadow-xs">
      {/* Top Notification Bar */}
      <div id="top-announcement-bar" className="bg-[#4A2C2A] text-[#FFF9F2] text-xs px-4 py-1.5 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2EC4B6] animate-pulse"></span>
            <span>Oven Menyala: Batch Hangat Sourdough & Croissant keluar setiap 07:30 & 14:00 WIB</span>
          </div>
          <div className="flex items-center gap-4 text-[#FDE2CF]">
            <button 
              id="btn-top-schedule"
              onClick={onOpenBakingSchedule} 
              className="hover:text-[#FFD93D] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>Jadwal Pemanggangan</span>
            </button>
            <span className="text-[#8B5E5B] hidden sm:inline">|</span>
            <button 
              id="btn-top-admin"
              onClick={onOpenAdmin} 
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-[#FFD93D] font-medium"
            >
              <span>Panel Pesanan Toko</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              id="brand-logo-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#E8551E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <ChefHat className="w-7 h-7 text-[#FFD93D]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#4A2C2A] tracking-tight block">
                  Kencana <span className="text-[#FF6B35] font-sans font-semibold text-base sm:text-lg">Bakery</span>
                </span>
                <span className="text-[11px] font-sans tracking-wider uppercase text-[#7D5A50] font-bold block">
                  Artisan Boulangerie & Patisserie
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B35]" />
              <input
                id="search-input-desktop"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari sourdough, croissant butter, basque cheesecake..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFF0E0]/70 border border-[#FCD8B8] rounded-full text-sm text-[#4A2C2A] placeholder-[#947065] focus:outline-hidden focus:ring-2 focus:ring-[#FF6B35]/50 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#FF6B35] hover:text-[#4A2C2A] font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Sommelier Button */}
            <button
              id="btn-open-ai-consultant"
              onClick={onOpenAIConsultant}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] text-white text-xs font-bold shadow-xs hover:from-[#E8551E] hover:to-[#FF6B35] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>Tanya Chef AI</span>
            </button>

            {/* Outlet Locations */}
            <button
              id="btn-open-locations"
              onClick={onOpenLocations}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-[#4A2C2A] hover:bg-[#FFEBD6] text-xs font-semibold transition-colors cursor-pointer"
              title="4 Cabang Outlet"
            >
              <MapPin className="w-4 h-4 text-[#FF6B35]" />
              <span className="hidden xl:inline">Outlet & Jam Buka</span>
            </button>

            {/* Order Tracker */}
            <button
              id="btn-open-tracker"
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[#4A2C2A] hover:bg-[#FFEBD6] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-[#2EC4B6]" />
              <span className="hidden sm:inline">Lacak Pesanan</span>
            </button>

            {/* Cart Button */}
            <button
              id="btn-open-cart"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-[#2EC4B6] hover:bg-[#25A599] text-white px-4 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FFD93D] text-[#4A2C2A] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden xs:block">
                <span className="text-[11px] text-[#E0FAF7] block leading-tight">Keranjang</span>
                <span className="font-bold text-xs leading-tight">
                  {totalCartCount > 0 ? formatRupiah(totalCartPrice) : 'Kosong'}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF6B35]" />
            <input
              id="search-input-mobile"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari roti manis, croissant, sourdough..."
              className="w-full pl-10 pr-4 py-2 bg-[#FFF0E0]/70 border border-[#FCD8B8] rounded-full text-sm text-[#4A2C2A] placeholder-[#947065] focus:outline-hidden focus:ring-2 focus:ring-[#FF6B35]/40"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-drawer" className="md:hidden py-3 border-t border-[#FCE7D2] flex flex-col gap-2">
            <button
              onClick={() => { onOpenAIConsultant(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FFF0E0] text-[#4A2C2A] text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Tanya Chef AI (Rekomendasi Roti & Acara)</span>
            </button>
            <button
              onClick={() => { onOpenBakingSchedule(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#FFF0E0] text-[#4A2C2A] text-sm font-semibold"
            >
              <Clock className="w-4 h-4 text-[#FF6B35]" />
              <span>Jadwal Oven Hari Ini</span>
            </button>
            <button
              onClick={() => { onOpenLocations(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#FFF0E0] text-[#4A2C2A] text-sm font-semibold"
            >
              <MapPin className="w-4 h-4 text-[#FF6B35]" />
              <span>Lokasi 4 Cabang Outlet</span>
            </button>
            <button
              onClick={() => { onOpenTracker(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#FFF0E0] text-[#4A2C2A] text-sm font-semibold"
            >
              <Receipt className="w-4 h-4 text-[#2EC4B6]" />
              <span>Lacak Status Pesanan Saya</span>
            </button>
            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-[#FFF0E0] text-[#4A2C2A] text-sm font-semibold"
            >
              <ChefHat className="w-4 h-4 text-[#FF6B35]" />
              <span>Kelola Pesanan Toko (Admin Mode)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
