import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqs: FaqItem[] = [
    {
      q: "Apakah harga di atas sudah termasuk domain dan hosting?",
      a: "Ya, betul sekali! Semua harga paket yang tercantum sudah terima beres, termasuk pendaftaran domain (.com, .id, atau .my.id sesuai paket) dan hosting premium berkecepatan tinggi gratis untuk tahun pertama."
    },
    {
      q: "Apakah saya harus membayar biaya langganan bulanan?",
      a: "Sama sekali TIDAK ada biaya langganan bulanan ke kami. Anda hanya membayar sekali di awal. Mulai tahun kedua dan seterusnya, Anda hanya perlu memperpanjang sewa domain dan hosting saja (berkisar Rp 250.000 hingga Rp 350.000-an per tahun tergantung domain)."
    },
    {
      q: "Saya tidak tahu koding, bagaimana cara mengubah isi website nanti?",
      a: "Tenang saja! kami menawarkan Jasa Maintenance Bulanan & Backup (6 Bulan) kami kasih diskon untuk pelanggan baru."
    },
    {
      q: "Bagaimana cara kerja integrasi chat WhatsApp di website?",
      a: "Saat pelanggan mengklik tombol 'Pesan' atau 'Checkout' di website Anda, rincian pesanan (nama barang, jumlah, total harga, alamat, dll.) akan otomatis dirangkum oleh sistem. Website kemudian langsung mengarahkan pelanggan ke aplikasi WhatsApp Anda dengan pesan terformat rapi. Pelanggan tinggal klik 'Kirim' tanpa capek mengetik ulang!"
    },
    {
      q: "Berapa lama proses pembuatan websitanya?",
      a: "Lama pengerjaan terhitung setelah semua data & materi (logo, foto produk/usaha, profil singkat) kami terima. Paket Landing Page selesai dalam 1-2 hari kerja, Paket Company Profile 2-5 hari kerja, dan Paket Toko Online berkisar 7-12 hari kerja."
    }
  ];

  const toggleFaq = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-amber-50/20 dark:bg-slate-950/40 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col space-y-4">
          <span className="text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 self-center px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            Tanya Jawab (FAQ)
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900 dark:text-slate-100 tracking-tight">
            Pertanyaan yang Sering <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">Diajukan UMKM</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Masih ragu atau bingung? Simak jawaban atas beberapa pertanyaan mendasar seputar jasa pembuatan website kami.
          </p>
        </div>

        {/* Faq Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-orange-100 dark:border-slate-800 overflow-hidden shadow-xs hover:border-orange-300 dark:hover:border-slate-700 transition-all duration-200"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 dark:text-slate-100 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 p-1.5 rounded-lg border border-orange-100 dark:border-slate-800 shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>

                {/* Animated Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t-2 border-orange-50 dark:border-slate-800/40 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
