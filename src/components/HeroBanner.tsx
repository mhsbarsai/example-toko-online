import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Truck, Clock, Award, Flame } from 'lucide-react';

interface HeroBannerProps {
  onExploreMenu: () => void;
  onOpenAIConsultant: () => void;
  onOpenSchedule: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreMenu,
  onOpenAIConsultant,
  onOpenSchedule,
}) => {
  return (
    <section id="hero-banner" className="relative overflow-hidden bg-gradient-to-b from-[#FFF0E0] via-[#FFF9F2] to-[#FFF0E0]/50 border-b border-[#FCE7D2] pt-6 pb-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD93D]/40 border border-[#FFD93D] text-[#4A2C2A] text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-[#FF6B35] animate-bounce" />
              <span>Dipanggang Segar Setiap Pagi & Sore Hari</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2C2A] tracking-tight leading-tight">
              Kelezatan Roti & Pastry Artisan, <br className="hidden sm:inline" />
              <span className="text-[#FF6B35] italic font-serif">Dipanggang Segar ke Rumah Anda</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B463E] max-w-2xl leading-relaxed">
              Nikmati keaslian <strong>Country Sourdough</strong> fermentasi alami 24 jam, <strong>Croissant 27 lapis</strong> dengan mentega Prancis Elle & Vire murni, serta <strong>Basque Burnt Cheesecake</strong> lumer. Dibuat tanpa pengawet dengan bahan premium bersertifikasi 100% Halal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-hero-order-now"
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-2xl bg-[#FF6B35] hover:bg-[#E8551E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Pesan Roti Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="btn-hero-ai-recommendation"
                href="https://wa.me/6281288991980?text=Halo%20Admin%20Kencana%20Bakery%2C%20saya%20ingin%20bertanya%20menu%20dan%20pemesanan%20roti"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-[#FFF0E0] border border-[#FCD8B8] text-[#4A2C2A] font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#2EC4B6]" />
                <span>WhatsApp Admin</span>
              </a>

              <button
                id="btn-hero-live-schedule"
                onClick={onOpenSchedule}
                className="px-4 py-3.5 rounded-2xl text-[#4A2C2A] hover:bg-[#FFEBD6] font-semibold text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-[#2EC4B6]" />
                <span>Lihat Jam Oven Hari Ini</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#FCE7D2]">
              <div className="flex items-center gap-2 text-xs text-[#4A2C2A] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                <span>100% Halal & Alami</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4A2C2A] font-medium">
                <Truck className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <span>Instant & Same-Day</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4A2C2A] font-medium">
                <Award className="w-4 h-4 text-[#FFD93D] shrink-0" />
                <span>French Butter AOP</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4A2C2A] font-medium">
                <Clock className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                <span>Sourdough 24h Ferment</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#4A2C2A]">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
                alt="Fresh Artisan French Butter Croissant"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#381B19] via-[#381B19]/40 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD93D] text-[#4A2C2A] text-xs font-bold w-fit mb-2 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Batch Hangat Baru Keluar</span>
                </div>
                <h3 className="text-xl font-serif font-bold leading-snug">
                  Artisan Butter Croissant & Sourdough
                </h3>
                <p className="text-xs text-[#FDE2CF] mt-1 line-clamp-2">
                  Tekstur renyah dengan aroma mentega murni Prancis dan keasaman khas starter alami.
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                  <span className="text-[#FFD93D] font-bold text-sm">Mulai Rp 32.000</span>
                  <button 
                    onClick={onExploreMenu}
                    className="text-xs font-bold text-white bg-[#FF6B35] hover:bg-[#E8551E] px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Beli Sekarang →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
