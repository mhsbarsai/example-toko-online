import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Smile, ShieldCheck } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Show a little notification bubble after 5 seconds to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const [inputMsg, setInputMsg] = useState('');

  const quickPrompts = [
    { label: 'Tanya Paket Toko Online 🛍️', msg: 'Halo! Saya tertarik untuk konsultasi pembuatan website Toko Online.' },
    { label: 'Tanya Paket Landing Page 📄', msg: 'Halo! Saya tertarik bertanya tentang Paket Landing Page.' },
    { label: 'Ingin Konsultasi Umum 💬', msg: 'Halo! Saya ingin konsultasi umum mengenai pembuatan website.' }
  ];

  const handleOpenWidget = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;
    const text = encodeURIComponent(messageText);
    window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
    setInputMsg('');
  };

  return (
    <div id="floating-wa-widget" className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Notification Toast Bubble */}
      {showNotification && !isOpen && (
        <div 
          onClick={handleOpenWidget}
          className="absolute bottom-16 right-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 shadow-xl w-60 text-slate-800 dark:text-slate-100 animate-slideUp cursor-pointer hover:border-orange-200 dark:hover:border-slate-700 transition-all"
        >
          <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100 dark:border-slate-800 mb-1.5">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">CS ONLINE</span>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">Mbak Sarah · Creavora</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
            "Halo! Cari jasa website UMKM? Konsultasikan ide Anda gratis di sini!"
          </p>
        </div>
      )}

      {/* Main Trigger Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpenWidget}
          className="bg-orange-500 hover:bg-orange-600 hover:scale-105 active:scale-95 text-white p-4 rounded-full shadow-2xl shadow-orange-200 transition-all cursor-pointer flex items-center justify-center relative group"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute right-full mr-3 bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Konsultasi WhatsApp (Online)
          </span>
        </button>
      )}

      {/* Expanded Live Chat Panel */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-950 rounded-3xl border-2 border-orange-100 dark:border-slate-800 shadow-2xl w-80 sm:w-96 overflow-hidden animate-scaleUp">
          
          {/* Widget Header */}
          <div className="bg-slate-900 text-white p-5 flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Simulated Avatar */}
                <div className="w-10 h-10 rounded-full bg-orange-100 text-slate-950 font-bold flex items-center justify-center border-2 border-orange-500">
                  S
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm leading-tight">Sarah (Creavora)</h4>
                <p className="text-[10px] text-orange-400 font-semibold flex items-center gap-1">
                  <span>Customer Support</span>
                  <span>•</span>
                  <span>Aktif Sekarang</span>
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 max-h-[320px] overflow-y-auto space-y-4">
            
            {/* System Info Banner */}
            <div className="bg-orange-50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-300 text-[10px] font-semibold p-2 rounded-xl text-center flex items-center justify-center gap-1 border border-orange-100 dark:border-orange-900/50">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
              <span>Tim kami akan merespon pesan Anda segera</span>
            </div>

            {/* Chat Bubble Welcome */}
            <div className="flex flex-col space-y-1 max-w-[85%] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3 shadow-xs">
              <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                Halo! Selamat datang di <strong>Creavora</strong>. 👋
              </p>
              <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed mt-1">
                Kami siap membantu mendesain website profesional untuk mendongkrak penjualan usaha UMKM Anda.
              </p>
              <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed mt-1 font-semibold">
                Silakan pilih salah satu pertanyaan cepat di bawah untuk langsung berkonsultasi via WA:
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-col space-y-2 pt-1">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.msg)}
                  className="bg-white dark:bg-slate-900 hover:bg-orange-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-orange-900 dark:hover:text-slate-100 text-left px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all shadow-xs cursor-pointer leading-tight flex items-center justify-between"
                >
                  <span>{qp.label}</span>
                  <span className="text-orange-600 text-xs font-bold font-mono">→</span>
                </button>
              ))}
            </div>

          </div>

          {/* Chat Input Footer */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ketik pesan konsultasi kustom..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(inputMsg);
              }}
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
            <button
              onClick={() => handleSendMessage(inputMsg)}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
