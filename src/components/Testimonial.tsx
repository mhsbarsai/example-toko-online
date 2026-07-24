import React, { useState } from 'react';
import { motion } from 'motion/react';
import { testimonials } from '../data';
import { Star, MessageSquare, Check } from 'lucide-react';

export default function Testimonial() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { label: 'Semua Bidang', id: 'all' },
    { label: 'Kuliner', id: 'Kuliner' },
    { label: 'Fashion / Online Shop', id: 'Fashion / Online Shop' },
    { label: 'Properti / Kos', id: 'Properti' },
    { label: 'Furniture & Ekspor', id: 'Ekspor Furnitur' }
  ];

  const filteredTestimonials = activeCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === activeCategory);

  return (
    <motion.section 
      id="testimoni" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-white dark:bg-slate-950 relative"
    >
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-orange-100/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col space-y-4">
          <span className="text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 self-center px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900 flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            Testimonial Klien
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight">
            Kata Mereka yang Telah <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">Go Digital</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Kisah sukses nyata dari para pemilik usaha UMKM di Indonesia yang mempercayakan pembuatan websitenya kepada kami.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                activeCategory === cat.id
                  ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-900'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-orange-200 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-amber-50/10 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-8 border-2 border-orange-100 dark:border-slate-800 shadow-xs relative flex flex-col justify-between hover:bg-white dark:hover:bg-slate-900 hover:shadow-lg dark:hover:shadow-none hover:border-orange-300 dark:hover:border-slate-700 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Stars and Verification */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                  "{item.content}"
                </p>
              </div>

              {/* Bio Footer */}
              <div className="flex items-center space-x-3.5 mt-6 pt-5 border-t border-orange-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-orange-200 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">{item.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{item.role}, <span className="font-bold text-orange-600 dark:text-orange-400">{item.company}</span></p>
                  <span className="inline-block text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider mt-1.5">
                    {item.category}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Secondary Trust Banner */}
        <div className="mt-14 p-6 bg-amber-50/30 dark:bg-slate-900/40 rounded-2xl border-2 border-orange-100 dark:border-slate-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-semibold">
            Ingin berkonsultasi langsung dengan tim kami mengenai kesuksesan digital Anda?
          </p>
          <button
            onClick={() => {
              const text = encodeURIComponent("Halo! Saya tertarik bertanya lebih lanjut mengenai layanan website untuk UMKM.");
              window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-blue-100 shrink-0 transition-all cursor-pointer"
          >
            Mulai Diskusi Usaha
          </button>
        </div>

      </div>
    </motion.section>
  );
}
