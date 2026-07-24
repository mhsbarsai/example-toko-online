import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KatalogLayanan from './components/KatalogLayanan';
import EstimatorHarga from './components/EstimatorHarga';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import WhatsAppWidget from './components/WhatsAppWidget';
import { Globe, ShieldCheck, Heart, Award } from 'lucide-react';

export default function App() {
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Smooth scroll handler
  const handleNavScroll = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky navbar
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkgId: string) => {
    setPreselectedPackage(pkgId);
    // Reset selected package after matching so subsequent clicks still trigger
    setTimeout(() => {
      setPreselectedPackage(undefined);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 text-[#1f2937] dark:text-slate-100 flex flex-col relative antialiased selection:bg-orange-100 selection:text-orange-900 transition-colors duration-300">
      
      {/* Dynamic Overlay Elements */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-linear-to-b from-orange-50/20 dark:from-orange-950/10 via-transparent to-transparent -z-20 pointer-events-none" />

      {/* Sticky Header & Navbar */}
      <Navbar onNavClick={handleNavScroll} isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onCatalogClick={() => handleNavScroll('layanan')} 
          onEstimatorClick={() => handleNavScroll('estimator')} 
        />

        {/* Katalog Layanan Section */}
        <KatalogLayanan onSelectPackage={handleSelectPackage} />

        {/* Kalkulator Estimasi Biaya */}
        <EstimatorHarga preselectedPackageId={preselectedPackage} />

        {/* Galeri Portofolio */}
        <Portfolio />

        {/* Testimonial Section */}
        <Testimonial />

        {/* FAQ Section */}
        <Faq />

        {/* Contact Form & Workflows */}
        <ContactForm />

      </main>

      {/* Beautiful Credibility Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center space-x-2.5">
                <div className="flex items-center justify-center">
                  <img src="/logo.svg" alt="Creavora Logo" className="h-9 w-9 object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-display font-black text-xl tracking-tight text-white">
                    Crea<span className="text-orange-400">vora</span>
                  </span>
                  <p className="text-[9px] font-extrabold tracking-widest text-orange-500 uppercase leading-none">
                    JASA WEB UMKM
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Creavora berdedikasi membantu digitalisasi pelaku usaha mikro, kecil, dan menengah (UMKM) di seluruh penjuru Indonesia lewat pembuatan website berkualitas tinggi yang ramah budget dan berorientasi hasil.
              </p>
              
              {/* Trust badges row */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center space-x-1 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-orange-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>100% Karya Anak Bangsa</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-blue-400">
                  <Heart className="h-3.5 w-3.5" />
                  <span>Peduli UMKM Indonesia</span>
                </span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-slate-300">Akses Cepat</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
                <li>
                  <button onClick={() => handleNavScroll('layanan')} className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer text-left">
                    Katalog Paket Layanan
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavScroll('estimator')} className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer text-left">
                    Kalkulator Simulasi Biaya
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavScroll('portofolio')} className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer text-left">
                    Portofolio & Galeri
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavScroll('testimoni')} className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer text-left">
                    Testimonial Klien
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavScroll('faq')} className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer text-left">
                    Tanya Jawab (FAQ)
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal / Protection Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-slate-300">Jaminan & Keamanan</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Setiap website dilengkapi perlindungan SSL HTTPS gratis, optimasi struktur SEO berkala, serta garansi perbaikan bug server (30 hari). Data dan transaksi terlindungi secara aman.
              </p>
              <div className="flex items-center space-x-2.5 bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-orange-400 shrink-0" />
                <p className="text-[10px] sm:text-xs text-slate-300 leading-tight">
                  <strong>Garansi Perbaikan Bug Server (30 Hari):</strong> Kami menggaransi perbaikan bug atau kendala server tanpa biaya tambahan sepeser pun.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Block */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] sm:text-xs text-slate-500">
            <p>© 2026 Creavora Indonesia. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center justify-center space-x-1">
              <span>Dibuat penuh semangat untuk memajukan perekonomian Indonesia</span>
              <span className="text-red-500">❤️</span>
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppWidget />

    </div>
  );
}
