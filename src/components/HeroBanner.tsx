import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Tag
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroBannerProps {
  onSelectCategory: (category: ProductCategory) => void;
  selectedCategory: ProductCategory;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  selectedCategory
}) => {
  // Flash sale countdown state
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 24, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categoriesList: { name: ProductCategory; icon: string; bg: string }[] = [
    { name: 'Semua', icon: '🛍️', bg: 'bg-emerald-100 text-emerald-800' },
    { name: 'Elektronik & Gadget', icon: '🎧', bg: 'bg-blue-100 text-blue-800' },
    { name: 'Fashion Pria & Wanita', icon: '👕', bg: 'bg-purple-100 text-purple-800' },
    { name: 'Sepatu & Olahraga', icon: '👟', bg: 'bg-amber-100 text-amber-800' },
    { name: 'Peralatan Rumah', icon: '🍳', bg: 'bg-rose-100 text-rose-800' },
    { name: 'Kecantikan & Kesehatan', icon: '✨', bg: 'bg-pink-100 text-pink-800' },
    { name: 'Makanan & Minuman', icon: '☕', bg: 'bg-orange-100 text-orange-800' },
    { name: 'Produk Lokal UKM', icon: '🇮🇩', bg: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="mb-8">
      {/* Main Promo Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-10 shadow-2xl">
        {/* Glowing backdrop elements */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              PROMO MEGA SALE HARBOLNAS 2026
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Belanja Hemat Produk <span className="text-emerald-400">Impian Nusantara</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Dapatkan diskon hingga <span className="text-amber-400 font-bold">50% + Bebas Ongkir</span> tanpa minimum belanja. Ribuan produk original bergaransi resmi menanti Anda!
            </p>

            {/* Flash Sale Timer */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">Berakhir dalam:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-sm">
                  <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  :
                  <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  :
                  <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-500/25 hover:translate-x-0.5"
              >
                Jelajahi Sekarang <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Banner Graphic / Highlights */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"
                  alt="Mega Sale E-Commerce"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      Flash Deal
                    </span>
                    <p className="font-bold text-lg mt-1">Diskon Ekstra Pengguna Baru</p>
                    <p className="text-xs text-slate-300">Gunakan Voucher: PELANGGANBARU</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Bebas Ongkir</h4>
            <p className="text-[11px] text-slate-500">Seluruh wilayah Indonesia</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">100% Produk Original</h4>
            <p className="text-[11px] text-slate-500">Garansi uang kembali</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Pembayaran Instan</h4>
            <p className="text-[11px] text-slate-500">QRIS, VA & E-Wallet</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Harga Terbaik</h4>
            <p className="text-[11px] text-slate-500">Promo & Voucher harian</p>
          </div>
        </div>
      </div>

      {/* Category Horizontal Pills */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Kategori Pilihan
          </h3>
          <span className="text-xs text-slate-500 font-medium">Klik untuk memfilter</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.name}
              id={`category-pill-${cat.name}`}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition-all border ${
                selectedCategory === cat.name
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
