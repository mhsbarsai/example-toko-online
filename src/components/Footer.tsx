import React from 'react';
import { ChefHat, ShieldCheck, MapPin, Phone, MessageCircle, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSchedule: () => void;
  onOpenLocations: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSchedule,
  onOpenLocations,
  onOpenTracker,
}) => {
  return (
    <footer id="main-footer" className="bg-[#2D1B19] text-[#FDEEE0] pt-12 pb-8 border-t border-[#4A2C2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#4A2C2A]/80">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-md">
                <ChefHat className="w-6 h-6 text-[#FFD93D]" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block">
                  Kencana <span className="text-[#FFD93D] font-sans text-base">Bakery</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#FF6B35] font-semibold block">
                  Artisan Boulangerie & Patisserie
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E2C5BA] leading-relaxed">
              Menghadirkan kelezatan roti sourdough fermentasi alami, croissant berlapis mentega Prancis AOP, dan kue pesta premium sejak 2018.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#2EC4B6] font-bold bg-[#2EC4B6]/10 p-2.5 rounded-xl border border-[#2EC4B6]/30 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
              <span>100% Bersertifikasi Halal & Higienis</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm tracking-wide">
              Layanan & Informasi
            </h4>
            <ul className="space-y-2 text-xs text-[#E2C5BA]">
              <li>
                <button onClick={onOpenSchedule} className="hover:text-[#FFD93D] transition-colors cursor-pointer text-left">
                  Jadwal Pemanggangan Fresh Oven
                </button>
              </li>
              <li>
                <button onClick={onOpenLocations} className="hover:text-[#FFD93D] transition-colors cursor-pointer text-left">
                  4 Cabang Butik & Kafe Kami
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-[#FFD93D] transition-colors cursor-pointer text-left">
                  Lacak Pesanan Online Anda
                </button>
              </li>
              <li>
                <a href="#katalog-produk-section" className="hover:text-[#FFD93D] transition-colors">
                  Katalog Sourdough & Pastry
                </a>
              </li>
              <li>
                <span className="text-[#FFD93D] font-semibold block mt-1">
                  Pengiriman: Instant (1-2 Jam) & Same-Day
                </span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm tracking-wide">
              Jam Operasional Toko
            </h4>
            <div className="space-y-2 text-xs text-[#E2C5BA]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#FFD93D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Senin - Minggu:</span>
                  <span>07:00 - 21:00 WIB</span>
                </div>
              </div>
              <p className="text-[11px] text-[#FFD93D] bg-white/5 p-2 rounded-xl border border-white/10">
                Batch sourdough hangat pertama keluar oven pukul 07:30 WIB setiap pagi.
              </p>
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm tracking-wide">
              Layanan Pelanggan & Pesanan Khusus
            </h4>
            <div className="space-y-2 text-xs text-[#E2C5BA]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD93D] shrink-0" />
                <span>(021) 7280-9988</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                <span>WhatsApp: 0812-8899-1980</span>
              </div>
              <a
                href="https://wa.me/6281288991980?text=Halo%20Kencana%20Bakery%2C%20saya%20ingin%20bertanya%20pesanan%20kue%2Fhampers"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-[#2EC4B6] hover:bg-[#25A99D] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hubungi Admin WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D1A598]">
          <p>© 2026 Kencana Bakery & Patisserie. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-1">
            <span>Dipanggang dengan</span>
            <Heart className="w-3.5 h-3.5 text-[#FF6B35] fill-[#FF6B35] inline" />
            <span>untuk para penikmat roti sejati.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
