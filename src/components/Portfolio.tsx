import React, { useState } from 'react';
import { motion } from 'motion/react';
import { portfolioItems } from '../data';
import { PortfolioItem } from '../types';
import { MessageCircle, Search, ExternalLink, Truck, CreditCard } from 'lucide-react';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { label: 'Semua Portofolio', id: 'all' },
    { label: 'Landing Page', id: 'landing' },
    { label: 'Toko Online', id: 'toko-online' },
    { label: 'Profil Bisnis', id: 'profile' }
  ];

  const filteredItems = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  const handleMintaDesainSerupa = (item: PortfolioItem) => {
    const text = encodeURIComponent(
      `Halo Creavora! Saya melihat contoh portofolio "${item.title}" untuk klien "${item.clientName}".\n\n` +
      `Saya tertarik untuk membuat website dengan model atau desain serupa untuk usaha saya. Mohon infonya!`
    );
    window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section 
      id="portofolio" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-amber-50/20 dark:bg-slate-950/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col space-y-4">
          <span className="text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 self-center px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900 flex items-center gap-1.5">
            <Search className="h-4 w-4" />
            Contoh Portofolio (Ilustrasi)
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight">
            Inspirasi & Contoh <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">Portofolio (Ilustrasi)</span> Website
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Intip rancangan desain website fungsional dengan tampilan estetik dan navigasi super mudah untuk berbagai jenis contoh ilustrasi usaha lokal.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-100/30'
                  : 'bg-white dark:bg-slate-900 border-orange-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-orange-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border-2 border-orange-100 dark:border-slate-800 shadow-md hover:shadow-xl dark:shadow-none hover:border-orange-300 dark:hover:border-slate-700 group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Portfolio Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 group/img">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.category === 'landing' ? 'Landing Page' : item.category === 'toko-online' ? 'Toko Online' : 'Profil Bisnis'}
                  </div>

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-2 backdrop-blur-[2px]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Buka Live Demo</span>
                    </a>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  {/* Client Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest">{item.clientName}</span>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-orange-500 transition-colors">
                      {item.liveUrl ? (
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5 inline-flex">
                          <span>{item.title}</span>
                          <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-orange-500" />
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold">{item.clientLocation}</p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* E-Commerce Specific Shipping & Payment Highlight */}
                  {item.category === 'toko-online' && (
                    <div className="bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 rounded-xl p-3 space-y-2 text-[11px]">
                      <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <Truck className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 dark:text-slate-100 font-bold block">Integrasi Kurir & Pengiriman:</strong>
                          <span>JNE, J&T Express, SiCepat, Pos Indonesia, GoSend, GrabExpress (Cek Ongkir Automatis).</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300 pt-1 border-t border-orange-200/40 dark:border-orange-900/30">
                        <CreditCard className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 dark:text-slate-100 font-bold block">Metode Pembayaran Indonesia:</strong>
                          <span>QRIS Instant, Transfer Bank (BCA, Mandiri, BRI, BNI), E-Wallet (GoPay, OVO, Dana, ShopeePay), & Cash on Delivery (COD).</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2.5 py-1 rounded-lg font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-800/50 mt-4 space-y-2">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Lihat Website Demo</span>
                  </a>
                )}
                <button
                  onClick={() => handleMintaDesainSerupa(item)}
                  className="w-full bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/40 text-orange-700 dark:text-orange-400 font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 stroke-[2.5]" />
                  <span>Mau Website Seperti Ini</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
            Punya kebutuhan kustom atau ingin melihat lebih banyak portofolio kami?
          </p>
          <button
            onClick={() => {
              const text = encodeURIComponent("Halo! Saya ingin berdiskusi mengenai kebutuhan kustom website UMKM saya.");
              window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
            }}
            className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold text-sm mt-2 hover:underline cursor-pointer"
          >
            <span>Hubungi tim kami untuk konsultasi gratis</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </motion.section>
  );
}
