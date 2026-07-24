import React from 'react';
import { motion } from 'motion/react';
import { servicePackages } from '../data';
import { ServicePackage } from '../types';
import { Check, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

interface KatalogLayananProps {
  onSelectPackage?: (pkgId: string) => void;
}

export default function KatalogLayanan({ onSelectPackage }: KatalogLayananProps) {
  
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePesanWhatsApp = (pkg: ServicePackage) => {
    const text = encodeURIComponent(
      `Halo! Saya tertarik untuk memesan "${pkg.name}" seharga ${formatIDR(pkg.price)}.\n\n` +
      `Mohon info lebih lanjut mengenai langkah pembuatannya. Terima kasih!`
    );
    window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section 
      id="layanan" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-amber-50/20 dark:bg-slate-950/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-4">
          <span className="text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 self-center px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900">
            Katalog Layanan & Harga
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight">
            Paket Website Siap Pakai, <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">Terima Beres</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Investasi transparan tanpa biaya tambahan tersembunyi. Pilih paket yang paling cocok untuk mempercepat pertumbuhan bisnis UMKM Anda saat ini.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicePackages.map((pkg) => {
            const isRec = pkg.recommended;
            return (
              <div
                key={pkg.id}
                id={`pkg-card-${pkg.id}`}
                className={`relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl p-6 transition-all duration-300 ${
                  isRec 
                    ? 'border-4 border-orange-400 dark:border-orange-500 shadow-2xl shadow-orange-100 dark:shadow-none lg:scale-[1.03] lg:-translate-y-2' 
                    : 'border-2 border-orange-100 dark:border-slate-800 hover:border-orange-300 dark:hover:border-slate-700 shadow-md shadow-slate-100 dark:shadow-none'
                }`}
              >
                {/* Popular Badge */}
                {isRec && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">
                    REKOMENDASI UMKM
                  </div>
                )}

                <div>
                  {/* Category / Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                    <span className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400 dark:text-slate-500" />
                      {pkg.deliveryTime}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">{pkg.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                    {pkg.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-orange-100 dark:border-slate-800">
                    {pkg.originalPrice && (
                      <span className="text-slate-400 dark:text-slate-500 line-through text-xs sm:text-sm block leading-none mb-1">
                        {formatIDR(pkg.originalPrice)}
                      </span>
                    )}
                    <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 tracking-tight">
                      {formatIDR(pkg.price)}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold"> / sekali bayar</span>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feat, index) => (
                      <li key={index} className="flex items-start text-xs sm:text-sm">
                        <div className="bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded-full p-0.5 mr-2.5 shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button CTA */}
                <div className="space-y-3">
                  <button
                    onClick={() => handlePesanWhatsApp(pkg)}
                    className={`w-full flex items-center justify-center space-x-2 font-black py-3.5 rounded-full transition-all cursor-pointer ${
                      isRec
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-100'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>Pesan Paket Ini</span>
                  </button>

                  {onSelectPackage && (
                    <button
                      onClick={() => onSelectPackage(pkg.id)}
                      className="w-full text-center text-xs font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 py-1 cursor-pointer flex items-center justify-center space-x-1 hover:underline"
                    >
                      <span>Gunakan di kalkulator kustom</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Promo Note Banner */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 border-4 border-orange-300 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="bg-white/20 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
                PROMO KHUSUS BULAN INI
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl mt-3">Diskon 30% + Gratis Pemeliharaan Website</h3>
              <p className="text-orange-100 text-xs sm:text-sm mt-1 max-w-xl">
                Bagi 10 pendaftar pertama UMKM minggu ini. Dapatkan gratis optimasi SEO Lokal dan bantuan pendaftaran Google Maps senilai Rp 500.000!
              </p>
            </div>
            <button
              onClick={() => {
                const text = encodeURIComponent("Halo! Saya ingin mengklaim Promo Diskon 30% + Bonus SEO untuk pendaftaran website UMKM saya.");
                window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
              }}
              className="bg-white hover:bg-slate-100 text-orange-600 font-black px-6 py-4 rounded-full shadow-lg transition-all flex items-center space-x-2 shrink-0 cursor-pointer text-sm"
            >
              <MessageCircle className="h-4.5 w-4.5 stroke-[2.5]" />
              <span>Klaim Promo Sekarang</span>
            </button>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
