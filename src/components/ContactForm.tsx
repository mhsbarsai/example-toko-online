import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  // State for form
  const [name, setName] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Kuliner');
  const [interestPkg, setInterestPkg] = useState('profile');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const businessTypes = ['Kuliner', 'Fashion / Baju', 'Toko Kelontong / Retail', 'Jasa / Profesional', 'Kesehatan / Klinik', 'Properti / Kos', 'Lainnya'];
  const packagesList = [
    { label: 'Paket Landing Page (Rp 799.000)', value: 'landing' },
    { label: 'Paket Company Profile (Rp 1.499.000)', value: 'profile' },
    { label: 'Paket Toko Online (Rp 2.499.000)', value: 'toko-online' },
    { label: 'Paket Custom / Sistem Kustom', value: 'custom' }
  ];

  const workflowSteps = [
    { step: '01', title: 'Konsultasi Gratis', desc: 'Diskusikan kebutuhan bisnis & paket lewat WhatsApp.' },
    { step: '02', title: 'Kirim Materi Usaha', desc: 'Siapkan foto produk, visi-misi, logo, atau materi lainnya.' },
    { step: '03', title: 'Desain & Pengembangan', desc: 'Kami kerjakan desain website yang responsif dan kencang.' },
    { step: '04', title: 'Revisi & Serah Terima', desc: 'Penyesuaian desain, serah terima akun, & Terima Beres.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !waNumber || !businessName) {
      alert('Mohon isi nama, nomor WhatsApp, dan nama usaha Anda.');
      return;
    }

    setSubmitting(true);
    
    // Simulate slight loader
    setTimeout(() => {
      const selectedPkgLabel = packagesList.find(p => p.value === interestPkg)?.label || '';
      
      const text = encodeURIComponent(
        `*FORMULIR PENAWARAN JASA WEB UMKM*\n\n` +
        `• *Nama Klien:* ${name}\n` +
        `• *No. WhatsApp:* ${waNumber}\n` +
        `• *Nama Usaha:* ${businessName}\n` +
        `• *Kategori Bidang:* ${businessType}\n` +
        `• *Paket Minat:* ${selectedPkgLabel}\n` +
        `• *Keterangan Tambahan:* ${notes || 'Tidak ada'}\n\n` +
        `Saya ingin segera berkonsultasi untuk pembuatan website ini. Terima kasih!`
      );

      setSubmitting(false);
      setSubmitted(true);

      // Open WhatsApp
      window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <motion.section 
      id="kontak" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 bg-white dark:bg-slate-950 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Workflow */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-orange-700 dark:text-orange-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900 inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Alur Kerja Mudah
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 dark:text-slate-100 tracking-tight mt-3">
              Bikin Website Mudah, <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">4 Langkah Praktis</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2">
              Kami menyederhanakan seluruh proses untuk Anda. Cukup ikuti tahapan mudah berikut hingga website siap mengudara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((ws, i) => (
              <div key={i} className="bg-amber-50/10 dark:bg-slate-900/40 rounded-2xl p-6 border-2 border-orange-100 dark:border-slate-800 relative group hover:bg-white dark:hover:bg-slate-900 hover:border-orange-300 dark:hover:border-slate-700 hover:shadow-lg dark:hover:shadow-none transition-all duration-300">
                <span className="font-display font-black text-4xl text-orange-100 dark:text-slate-800 group-hover:text-orange-200 dark:group-hover:text-slate-700 transition-colors block mb-4">
                  {ws.step}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">{ws.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-10 border-t border-orange-100 dark:border-slate-800">
          
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-orange-700 dark:text-orange-300 font-bold text-xs tracking-wider uppercase bg-orange-100 dark:bg-orange-950/40 px-4 py-1.5 rounded-full border-2 border-orange-200 dark:border-orange-900 inline-block">
                Hubungi Kami
              </span>
              <h2 className="font-display font-black text-3xl text-slate-900 dark:text-slate-100 tracking-tight">
                Mari Konsultasikan <span className="text-orange-500 underline decoration-blue-500 decoration-4 underline-offset-4">Ide Usaha Anda</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Punya pertanyaan khusus atau ingin berkonsultasi mengenai layout terbaik untuk produk Anda? Jangan sungkan untuk menghubungi kami melalui form atau detail kontak di bawah.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border-2 border-orange-100 dark:border-slate-800">
                <div className="bg-orange-500 text-white p-3 rounded-xl shadow-md shadow-orange-50/10">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide">WhatsApp / Telepon</p>
                  <a href="https://wa.me/6289512093311" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    +62 895-1209-3311
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border-2 border-orange-100 dark:border-slate-800">
                <div className="bg-orange-500 text-white p-3 rounded-xl shadow-md shadow-orange-50/10">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide">Surel / Email Bisnis</p>
                  <a href="mailto:halo@creavora.com" className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    halo@creavora.com
                  </a>
                </div>
              </div>



            </div>

            {/* Support hours info */}
            <div className="bg-amber-50/50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-900/50 rounded-2xl p-5 space-y-2">
              <p className="text-orange-800 dark:text-orange-300 font-bold text-xs flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                Jam Kerja Layanan:
              </p>
              <p className="text-orange-700 dark:text-orange-400 text-xs leading-normal font-bold">
                Senin - Sabtu: 08.00 WIB - 18.00 WIB.<br />
                Menerima konsultasi di luar jam kerja dengan respon chat santai.
              </p>
            </div>
          </div>

          {/* Contact Form Intake Right */}
          <div className="lg:col-span-7 bg-amber-50/20 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-8 border-2 border-orange-100 dark:border-slate-800 shadow-xs relative">
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 border-b border-orange-200 dark:border-slate-800 pb-4 mb-6">
              Kirim Rencana Pembuatan Website
            </h3>

            {submitted ? (
              <div className="bg-orange-50 border border-orange-100 text-orange-800 rounded-2xl p-6 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="h-10 w-10 text-orange-500 mx-auto" />
                <h4 className="font-bold text-lg">Permintaan Terkirim!</h4>
                <p className="text-xs sm:text-sm">
                  Rincian formulir telah kami siapkan dan Anda sedang diarahkan ke WhatsApp kami. Jika tidak terbuka, silakan klik tombol di bawah.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-full text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Isi Formulir Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 2 columns name & wa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Prasetyo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-orange-100 dark:border-slate-800 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">No. WhatsApp <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 089512093311"
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-orange-100 dark:border-slate-800 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>

                {/* 2 columns company name & type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">Nama Toko / Usaha <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Soto Kudus Pak Ndut"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-orange-100 dark:border-slate-800 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">Bidang Usaha</label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-orange-100 dark:border-slate-800 px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
                    >
                      {businessTypes.map((type, i) => (
                        <option key={i} value={type} className="dark:bg-slate-900">{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Package Interest Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">Pilih Paket Website yang Diminati</label>
                  <select
                    value={interestPkg}
                    onChange={(e) => setInterestPkg(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-orange-100 dark:border-slate-800 px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
                  >
                    {packagesList.map((pkg, i) => (
                      <option key={i} value={pkg.value} className="dark:bg-slate-900">{pkg.label}</option>
                    ))}
                  </select>
                </div>

                {/* Notes/Brief Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">Keterangan Tambahan / Pertanyaan (Opsional)</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Saya ingin website yang didominasi warna hijau pandan, ada katalog menu makanan, dan tombol order terhubung ke 2 nomor WhatsApp admin saya."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 rounded-xl border-2 border-orange-100 dark:border-slate-800 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-black text-base py-3.5 rounded-full transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 cursor-pointer mt-4"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{submitting ? 'Menyiapkan Chat...' : 'Kirim Konsultasi ke WhatsApp'}</span>
                </button>

                <p className="text-center text-[10px] text-slate-400 mt-2 leading-relaxed">
                  *Dengan mengklik tombol, Anda akan dialihkan secara aman ke aplikasi WhatsApp untuk bertukar pesan langsung dengan tim desainer kami.
                </p>

              </form>
            )}
          </div>

        </div>

      </div>
    </motion.section>
  );
}
