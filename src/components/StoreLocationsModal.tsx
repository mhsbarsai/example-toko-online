import React from 'react';
import { X, MapPin, Clock, Phone, ExternalLink, MessageCircle, Store } from 'lucide-react';
import { STORE_BRANCHES } from '../data/products';

interface StoreLocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocationsModal: React.FC<StoreLocationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div id="locations-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FCE7D2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shadow-md">
              <Store className="w-5 h-5 text-[#FFD93D]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-lg">Cabang Outlet Kencana Bakery</h2>
              <span className="text-xs text-[#7D5A50]">Kunjungi butik roti & cafe artisan kami di 4 lokasi pilihan</span>
            </div>
          </div>

          <button
            id="btn-close-locations-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STORE_BRANCHES.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#FCD8B8] shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#4A2C2A]">
                    {b.name}
                  </h3>
                  {b.isMainKitchen && (
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-[#FF6B35] text-white shrink-0">
                      Central Kitchen
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-[#6B463E]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Buka: <strong className="text-[#4A2C2A]">{b.operatingHours}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Telp: {b.phone}</span>
                  </div>
                </div>

                <div className="bg-[#FFF0E0] p-2.5 rounded-xl border border-[#FCD8B8] text-[11px] text-[#4A2C2A]">
                  <span className="font-bold block text-[#4A2C2A]">Jadwal Oven Fresh:</span>
                  <span className="text-[#7D5A50]">{b.bakingSchedule}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-[#FCE7D2] flex items-center justify-between gap-2">
                <a
                  href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Kencana%20Bakery%20${encodeURIComponent(b.name)}%2C%20saya%20ingin%20bertanya%20menu`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-[#2EC4B6] hover:bg-[#25A99D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Outlet</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 bg-[#FFEBD6] hover:bg-[#FFD93D] text-[#4A2C2A] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-[#FCD8B8]"
                  title="Buka Google Maps"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
