import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { estimatorFeatures } from '../data';
import { EstimatorFeature } from '../types';
import { Calculator, Check, MessageCircle, HelpCircle, RefreshCw } from 'lucide-react';

interface EstimatorHargaProps {
  preselectedPackageId?: string;
}

export default function EstimatorHarga({ preselectedPackageId }: EstimatorHargaProps) {
  // States for selection
  const [baseType, setBaseType] = useState<string>('base-profile'); // Default: Company Profile
  const [pageTier, setPageTier] = useState<string>('page-sm'); // Default: 1-3 pages
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['feat-wa', 'feat-maps']); // Default: WA checkout & Maps
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['add-com']); // Default: Domain .com

  // Handle preselection from package catalog
  useEffect(() => {
    if (preselectedPackageId) {
      if (preselectedPackageId === 'landing') {
        setBaseType('base-landing');
        setPageTier('page-sm');
        setSelectedFeatures(['feat-wa']);
        setSelectedAddons(['add-com']);
      } else if (preselectedPackageId === 'profile') {
        setBaseType('base-profile');
        setPageTier('page-md');
        setSelectedFeatures(['feat-wa', 'feat-maps']);
        setSelectedAddons(['add-com', 'add-email']);
      } else if (preselectedPackageId === 'toko-online') {
        setBaseType('base-shop');
        setPageTier('page-md');
        setSelectedFeatures(['feat-wa', 'feat-shipping', 'feat-payment']);
        setSelectedAddons(['add-com', 'add-email']);
      } else if (preselectedPackageId === 'custom') {
        setBaseType('base-profile');
        setPageTier('page-lg');
        setSelectedFeatures(['feat-wa', 'feat-payment', 'feat-booking']);
        setSelectedAddons(['add-com', 'add-email', 'add-seo', 'add-maintenance']);
      }
      
      // Scroll to estimator section
      const element = document.getElementById('estimator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedPackageId]);

  const baseOptions = estimatorFeatures.filter(f => f.category === 'base');
  const pageOptions = estimatorFeatures.filter(f => f.category === 'pages');
  const featureOptions = estimatorFeatures.filter(f => f.category === 'features');
  const addonOptions = estimatorFeatures.filter(f => f.category === 'addons');

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Toggle Features
  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(item => item !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Toggle Addons
  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Reset calculator
  const handleReset = () => {
    setBaseType('base-profile');
    setPageTier('page-sm');
    setSelectedFeatures(['feat-wa', 'feat-maps']);
    setSelectedAddons(['add-com']);
  };

  // Calculation logic
  const calculateTotal = () => {
    let total = 0;

    // Add Base Type price
    const baseSelected = baseOptions.find(o => o.id === baseType);
    if (baseSelected) total += baseSelected.price;

    // Add Page Tier price
    const pageSelected = pageOptions.find(o => o.id === pageTier);
    if (pageSelected) total += pageSelected.price;

    // Add selected features price
    selectedFeatures.forEach(featId => {
      const feat = featureOptions.find(o => o.id === featId);
      if (feat) total += feat.price;
    });

    // Add selected addons price
    selectedAddons.forEach(addonId => {
      const addon = addonOptions.find(o => o.id === addonId);
      if (addon) total += addon.price;
    });

    return total;
  };

  const handlePesanKustomWA = () => {
    const baseName = baseOptions.find(o => o.id === baseType)?.name || '';
    const pageName = pageOptions.find(o => o.id === pageTier)?.name || '';
    const featuresList = selectedFeatures.map(fId => `• ${featureOptions.find(f => f.id === fId)?.name}`).join('\n');
    const addonsList = selectedAddons.map(aId => `• ${addonOptions.find(a => a.id === aId)?.name}`).join('\n');
    const totalFormatted = formatIDR(calculateTotal());

    const message = 
      `*KONSULTASI ESTIMASI BIAYA WEB UMKM*\n\n` +
      `Halo Creavora! Saya telah membuat simulasi biaya kustom untuk website usaha saya dengan rincian berikut:\n\n` +
      `*1. Jenis Website:* ${baseName}\n` +
      `*2. Skala Halaman:* ${pageName}\n\n` +
      `*3. Fitur Tambahan Terpilih:*\n${featuresList || 'Tidak ada'}\n\n` +
      `*4. Layanan Pendukung:*\n${addonsList || 'Tidak ada'}\n\n` +
      `*ESTIMASI TOTAL INVESTASI:* _*${totalFormatted}*_\n\n` +
      `Saya ingin berkonsultasi mengenai spesifikasi ini lebih lanjut. Mohon bantuannya!`;

    window.open(`https://wa.me/6289512093311?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section 
      id="estimator" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-white dark:bg-slate-950 relative"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-orange-100/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-100/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col space-y-4">
          <span className="text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 self-center px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900 flex items-center gap-1.5">
            <Calculator className="h-4 w-4" />
            Kalkulator Estimasi Biaya
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight">
            Desain Website Kustom <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">Sesuai Budget</span> Anda
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Gunakan kalkulator interaktif di bawah ini untuk merakit fitur website yang Anda butuhkan dan langsung ketahui perkiraan biayanya secara jujur & transparan.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Panel Left */}
          <div className="lg:col-span-8 bg-amber-50/20 dark:bg-slate-900/40 border-2 border-orange-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="flex justify-between items-center pb-4 border-b border-orange-200 dark:border-slate-800">
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">Konfigurasi Fitur Web</h3>
              <button 
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 text-xs font-bold bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-800 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset Ulang</span>
              </button>
            </div>

            {/* 1. Base Tipe Website */}
            <div className="space-y-4">
              <label className="block text-sm font-extrabold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                1. Pilih Tipe Dasar Website <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {baseOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setBaseType(opt.id)}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      baseType === opt.id 
                        ? 'bg-white dark:bg-slate-900 border-orange-400 shadow-md shadow-orange-50/10' 
                        : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">{opt.name.split(' (')[0]}</span>
                        {baseType === opt.id && (
                          <div className="bg-orange-500 text-white rounded-full p-0.5">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mb-4 h-10 overflow-hidden">{opt.description}</p>
                    </div>
                    <span className="font-display font-black text-sm text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 rounded-lg py-1.5 px-3 self-start border border-slate-100 dark:border-slate-800/40">
                      {formatIDR(opt.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Page Count */}
            <div className="space-y-4">
              <label className="block text-sm font-extrabold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                2. Skala Jumlah Halaman
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pageOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setPageTier(opt.id)}
                    className={`p-4 rounded-2xl border-2 bg-white dark:bg-slate-900 transition-all cursor-pointer flex items-center justify-between ${
                      pageTier === opt.id 
                        ? 'border-orange-400 shadow-md shadow-orange-50/10' 
                        : 'border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-none mb-1">{opt.name.replace('Jumlah Halaman: ', '')}</p>
                      <p className="text-slate-400 dark:text-slate-500 text-[10px]">{opt.description}</p>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800/40">
                      {opt.price === 0 ? 'Gratis' : `+${formatIDR(opt.price)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Advanced Features Checklist */}
            <div className="space-y-4">
              <label className="block text-sm font-extrabold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                3. Integrasi & Fitur Tambahan (Bisa pilih several)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featureOptions.map((opt) => {
                  const isChecked = selectedFeatures.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleFeature(opt.id)}
                      className={`p-4 rounded-2xl border-2 bg-white dark:bg-slate-900 transition-all cursor-pointer flex items-start space-x-3 ${
                        isChecked 
                          ? 'border-orange-400 shadow-md shadow-orange-50/10' 
                          : 'border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                      }`}>
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3.5]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center gap-2">
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-tight">{opt.name}</p>
                          <span className="text-xs font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md shrink-0">
                            +{formatIDR(opt.price)}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-1 leading-normal">{opt.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Addons Checklist */}
            <div className="space-y-4">
              <label className="block text-sm font-extrabold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                4. Layanan Pendukung & Pemeliharaan (Opsional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addonOptions.map((opt) => {
                  const isChecked = selectedAddons.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleAddon(opt.id)}
                      className={`p-4 rounded-2xl border-2 bg-white dark:bg-slate-900 transition-all cursor-pointer flex items-start space-x-3 ${
                        isChecked 
                          ? 'border-orange-400 shadow-md shadow-orange-50/10' 
                          : 'border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                      }`}>
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3.5]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center gap-2">
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-tight">{opt.name}</p>
                          <span className="text-xs font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md shrink-0">
                            +{formatIDR(opt.price)}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-1 leading-normal">{opt.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Checkout Quote Panel Right */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 bg-slate-900 text-white border-4 border-orange-200 dark:border-orange-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />

            <h3 className="font-display font-bold text-lg sm:text-xl border-b border-white/10 pb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-orange-400" />
              <span>Ringkasan Estimasi</span>
            </h3>

            {/* List selected details */}
            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
              {/* Base */}
              <div className="flex justify-between items-start text-xs sm:text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wide">TIPE WEBSITE</span>
                  <span className="font-bold text-white text-xs">{baseOptions.find(o => o.id === baseType)?.name.split(' (')[0]}</span>
                </div>
                <span className="font-mono text-slate-300">{formatIDR(baseOptions.find(o => o.id === baseType)?.price || 0)}</span>
              </div>

              {/* Pages */}
              <div className="flex justify-between items-start text-xs sm:text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wide">SKALA HALAMAN</span>
                  <span className="font-bold text-white text-xs">{pageOptions.find(o => o.id === pageTier)?.name.replace('Jumlah Halaman: ', '')}</span>
                </div>
                <span className="font-mono text-slate-300">
                  {pageOptions.find(o => o.id === pageTier)?.price === 0 ? 'Gratis' : `+${formatIDR(pageOptions.find(o => o.id === pageTier)?.price || 0)}`}
                </span>
              </div>

              {/* Selected Features list */}
              {selectedFeatures.length > 0 && (
                <div className="space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wide block">FITUR INTERAKTIF</span>
                  {selectedFeatures.map(fId => {
                    const fObj = featureOptions.find(f => f.id === fId);
                    if (!fObj) return null;
                    return (
                      <div key={fId} className="flex justify-between items-center text-xs pl-2.5 border-l border-orange-500/50">
                        <span className="text-slate-300">{fObj.name}</span>
                        <span className="font-mono text-slate-400">+{formatIDR(fObj.price)}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Selected Addons list */}
              {selectedAddons.length > 0 && (
                <div className="space-y-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wide block">LAYANAN PENDUKUNG</span>
                  {selectedAddons.map(aId => {
                    const aObj = addonOptions.find(a => a.id === aId);
                    if (!aObj) return null;
                    return (
                      <div key={aId} className="flex justify-between items-center text-xs pl-2.5 border-l border-orange-500/50">
                        <span className="text-slate-300">{aObj.name}</span>
                        <span className="font-mono text-slate-400">+{formatIDR(aObj.price)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Grand Total Area */}
            <div className="border-t border-white/10 pt-6 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-xs sm:text-sm font-semibold">Total Investasi</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-orange-400 tracking-tight">
                  {formatIDR(calculateTotal())}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                *Nilai di atas merupakan harga perkiraan jujur berdasarkan konfigurasi fitur. Bebas biaya langganan bulanan ke agency!
              </p>
            </div>

            {/* WA Order Trigger */}
            <button
              onClick={handlePesanKustomWA}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-base py-4 rounded-full transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5 stroke-[2.5]" />
              <span>Konsultasikan Spesifikasi Ini</span>
            </button>
          </div>

        </div>

      </div>
    </motion.section>
  );
}
