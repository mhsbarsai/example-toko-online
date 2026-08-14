import React from 'react';
import { X, Clock, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

interface BakingScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMenu: () => void;
}

export const BakingScheduleModal: React.FC<BakingScheduleModalProps> = ({
  isOpen,
  onClose,
  onExploreMenu,
}) => {
  if (!isOpen) return null;

  const schedules = [
    {
      time: '07:00 - 07:30 WIB',
      batchName: 'Batch Pagi Pertama (Morning Sunrise)',
      items: [
        'Classic Country Sourdough Loaf 750g',
        'Pure French Butter Croissant (Batch 1)',
        'French Baguette Traditionnelle'
      ],
      status: 'Keluar Oven Setiap Hari',
      badge: 'Paling Fresh untuk Sarapan',
      isHot: true,
    },
    {
      time: '08:30 - 09:00 WIB',
      batchName: 'Batch Viennoiserie & Roti Manis',
      items: [
        'Pain au Chocolat Valrhona 66%',
        'Double Baked Almond Croissant Supreme',
        'Roti Sisir Klasik Mentega Wijsman'
      ],
      status: 'Siap Saji',
      badge: 'Favorit Coffee Pairing',
      isHot: false,
    },
    {
      time: '11:30 - 12:00 WIB',
      batchName: 'Batch Siang (Lunch Time Warm Batch)',
      items: [
        'Pure French Butter Croissant (Batch 2)',
        'Roti Kasur Keju Gondrong Melted',
        'Floss Roll Bread Abon Sapi Pedas'
      ],
      status: 'Hangat Siang',
      badge: 'Makan Siang & Snack Kantor',
      isHot: false,
    },
    {
      time: '14:00 - 14:30 WIB',
      batchName: 'Batch Sore (Afternoon Fresh Bake)',
      items: [
        'Classic Country Sourdough Loaf (Batch 2)',
        'Roasted Walnut & Cranberry Sourdough',
        'Salted Caramel Kouign-Amann Bretagne'
      ],
      status: 'Oven Sore',
      badge: 'Untuk Makan Malam & Besok Pagi',
      isHot: false,
    },
    {
      time: '15:30 - 16:00 WIB',
      batchName: 'Batch Cake & Fresh Pastry',
      items: [
        'San Sebastián Basque Burnt Cheesecake',
        'Royal Belgian Dark Chocolate Ganache Cake',
        'Hokkaido Fresh Cream Strawberry Shortcake'
      ],
      status: 'Chilled & Ready',
      badge: 'Dekorasi Fresh Harian',
      isHot: false,
    }
  ];

  return (
    <div id="baking-schedule-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FCE7D2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shadow-md">
              <Clock className="w-5 h-5 text-[#FFD93D]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-lg flex items-center gap-2">
                <span>Jadwal Pemanggangan Harian</span>
                <span className="flex items-center gap-1 text-[10px] font-sans font-bold bg-[#2EC4B6]/15 text-[#0F6860] px-2 py-0.5 rounded-full border border-[#2EC4B6]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-ping"></span>
                  Live Oven
                </span>
              </h2>
              <span className="text-xs text-[#7D5A50]">Waktu tepat ketika roti keluar hangat dari oven kami</span>
            </div>
          </div>

          <button
            id="btn-close-schedule-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedules.map((sch, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                sch.isHot
                  ? 'bg-[#FFF0E0] border-[#FF6B35] ring-2 ring-[#FF6B35]/30 shadow-xs'
                  : 'bg-white border-[#FCD8B8] hover:border-[#FF6B35]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${sch.isHot ? 'text-[#FF6B35] animate-bounce' : 'text-[#FF6B35]/70'}`} />
                  <span className="font-mono font-bold text-xs sm:text-sm text-[#4A2C2A]">
                    {sch.time}
                  </span>
                  <span className="text-xs font-bold text-[#4A2C2A]">
                    • {sch.batchName}
                  </span>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD93D] text-[#4A2C2A]">
                  {sch.badge}
                </span>
              </div>

              <ul className="text-xs text-[#6B463E] space-y-1 pl-6 list-disc">
                {sch.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="pt-2 border-t border-[#FCE7D2] flex items-center justify-between">
          <p className="text-xs text-[#7D5A50] max-w-sm">
            Ingin memesan untuk jam tertentu? Pilih slot jam saat proses checkout.
          </p>
          <button
            onClick={() => {
              onClose();
              onExploreMenu();
            }}
            className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#E8551E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Pesan Menu Hangat
          </button>
        </div>

      </div>
    </div>
  );
};
