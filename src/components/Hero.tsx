import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowDown, Sparkles, CheckCircle2, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onCatalogClick: () => void;
  onEstimatorClick: () => void;
}

export default function Hero({ onCatalogClick, onEstimatorClick }: HeroProps) {
  const trustPoints = [
    { icon: <CheckCircle2 className="h-5 w-5 text-orange-500" />, text: 'Domain .COM & Hosting Premium' },
    { icon: <Zap className="h-5 w-5 text-blue-600" />, text: 'Selesai Cepat (1-2 Hari Kerja)' },
    { icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />, text: 'Garansi Perbaikan Bug Server (30 Hari)' }
  ];

  const stats = [
    { value: '150+', label: 'UMKM Go-Digital' },
    { value: 'Komitmen', label: 'Pelayanan Transparan & Sesuai Brief' },
    { value: 'Rp 750rb', label: 'Harga Mulai Dari' }
  ];

  return (
    <motion.section 
      id="hero" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-amber-50/50 dark:bg-slate-950/60"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[350px] h-[350px] bg-blue-100/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 px-4 py-1.5 rounded-full text-xs font-bold self-center lg:self-start border border-orange-200 dark:border-orange-900 shadow-xs">
              <Sparkles className="h-3 w-3 text-orange-600 animate-pulse" />
              <span>Mitra Pembuatan Website Profesional untuk UMKM</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
              Bikin Bisnis <span className="text-orange-500 italic underline decoration-blue-500 decoration-8 underline-offset-8">UMKM Naik Kelas</span> Dengan Website Profesional
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl lg:max-w-none leading-relaxed">
              Tingkatkan omset usaha Anda hingga 3x lipat dengan website yang cepat, tepercaya, dan terintegrasi langsung ke WhatsApp pelanggan. Siap pakai, terima beres tanpa ribet koding!
            </p>

            {/* Trust Badges Checklist */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 py-2">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-2xl border-2 border-orange-100 dark:border-slate-800 shadow-xs">
                  {point.icon}
                  <span className="text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm">{point.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onCatalogClick}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-black text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-orange-200 hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Lihat Katalog Paket</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                onClick={onEstimatorClick}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-4 rounded-full transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <TrendingUp className="h-4 w-4 text-white" />
                <span>Simulasi Biaya Kustom</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="font-display font-black text-2xl sm:text-3xl text-orange-500">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card Visual Right */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-amber-100 rounded-3xl blur-2xl -z-10 transform rotate-3 scale-95" />
            
            {/* Mockup Frame Container */}
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border-4 border-orange-200 dark:border-orange-800 p-4 shadow-2xl relative overflow-hidden">
              {/* Phone Status bar */}
              <div className="flex justify-between items-center px-4 py-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono border-b border-slate-100 dark:border-slate-800 mb-3">
                <span>09:41 AM</span>
                <div className="flex space-x-1 items-center">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">ONLINE</span>
                </div>
              </div>

              {/* Mock Web View */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-3.5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">W</div>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">WarungSotoKudus.com</span>
                  </div>
                  <span className="text-[9px] bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 px-2.5 py-1 rounded-full font-bold">Toko Online (Ilustrasi)</span>
                </div>

                {/* Banner */}
                <div className="relative rounded-xl overflow-hidden h-32 bg-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80" 
                    alt="Soto Kudus" 
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-2.5">
                    <p className="text-white text-xs font-bold leading-tight">Asli Soto Kudus Pak Ndut</p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col space-y-1">
                    <div className="h-14 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&h=150&q=80" 
                        alt="Menu" 
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Soto Kudus Campur</p>
                    <p className="text-[9px] text-orange-500 font-black leading-none">Rp 15.000</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col space-y-1">
                    <div className="h-14 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&h=150&q=80" 
                        alt="Sate" 
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Sate Kerang Kudus</p>
                    <p className="text-[9px] text-orange-500 font-black leading-none">Rp 4.000</p>
                  </div>
                </div>

                {/* Simulated Order Button */}
                <div className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-2 text-center text-xs font-bold flex items-center justify-center space-x-1 shadow-md shadow-orange-100 cursor-pointer">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Pesan Sekarang via WA</span>
                </div>
              </div>

              {/* Micro interactive message banner floating below */}
              <div className="absolute -bottom-2 -right-4 bg-white dark:bg-slate-900 border-2 border-orange-100 dark:border-slate-800 rounded-2xl p-3 shadow-lg flex items-center space-x-3 max-w-[210px] animate-bounce duration-1000">
                <div className="bg-blue-100 dark:bg-blue-950/60 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Order Soto Pak Ndut</p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Usaha Lebih Mudah Ditemukan Pelanggan!</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
