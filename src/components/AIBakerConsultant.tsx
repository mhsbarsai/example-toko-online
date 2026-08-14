import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  ChefHat, 
  Coffee, 
  Lightbulb, 
  Plus, 
  Check,
  Wheat
} from 'lucide-react';
import { Product } from '../types';

interface AIBakerConsultantProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AIBakerConsultant: React.FC<AIBakerConsultantProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [occasion, setOccasion] = useState('Ulang Tahun & Pesta');
  const [flavorPreference, setFlavorPreference] = useState('Manis creamy & cokelat');
  const [dietary, setDietary] = useState('Standard Halal');
  const [budget, setBudget] = useState('Rp 100.000 - Rp 350.000');
  const [userPrompt, setUserPrompt] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    recommendation: string;
    pairing: string;
    chefTip: string;
    suggestedProducts: string[];
  } | null>(null);

  const handleAskAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          flavorPreference,
          dietaryRestrictions: dietary,
          budget,
          prompt: userPrompt,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        recommendation: "Pilihan terbaik kami untuk Anda adalah Signature Basque Burnt Cheesecake dan French Butter Croissant segar kami!",
        pairing: "Sangat serasi dinikmati bersama Kencana Iced Sea Salt Latte.",
        chefTip: "Simpan cheesecake di lemari pendingin agar tekstur krim tetap lumer dan segar.",
        suggestedProducts: ["Signature San Sebastián Basque Burnt Cheesecake", "Artisan Pure French Butter Croissant"]
      });
    } finally {
      setLoading(false);
    }
  };

  const findProductByName = (name: string) => {
    return products.find(p => p.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(p.name.toLowerCase()));
  };

  return (
    <div id="ai-baker-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FFF9F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FCE7D2] my-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FCE7D2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-[#4A2C2A] text-lg flex items-center gap-2">
                <span>Chef AI Baker & Sommelier</span>
                <span className="text-[10px] font-sans font-bold bg-[#FFD93D] text-[#4A2C2A] px-2 py-0.5 rounded-full uppercase">
                  Gemini Powered
                </span>
              </h2>
              <span className="text-xs text-[#7D5A50]">Konsultasi rekomendasi menu, padu padan minuman, & tips perayaan</span>
            </div>
          </div>

          <button
            id="btn-close-ai-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFEBD6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAskAI} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4A2C2A] mb-1">
                Acara / Kebutuhan
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-white border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
              >
                <option value="Ulang Tahun & Pesta">Ulang Tahun & Pesta</option>
                <option value="Sarapan Pagi Keluarga">Sarapan Pagi Keluarga</option>
                <option value="Meeting Kantor & Arisan">Meeting Kantor & Arisan</option>
                <option value="Hampers Kado Sahabat">Hampers Kado Sahabat</option>
                <option value="Santap Sehat & Diet Serat">Santap Sehat & Diet Serat</option>
                <option value="Afternoon Tea & Ngopi Santai">Afternoon Tea & Ngopi Santai</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A2C2A] mb-1">
                Preferensi Rasa
              </label>
              <select
                value={flavorPreference}
                onChange={(e) => setFlavorPreference(e.target.value)}
                className="w-full bg-white border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
              >
                <option value="Manis creamy & cokelat">Manis creamy & cokelat pekat</option>
                <option value="Gurih mentega wangi & keju">Gurih mentega wangi & keju</option>
                <option value="Artisan asam gurih sourdough">Artisan asam gurih sourdough</option>
                <option value="Segar buah & rendah gula">Segar buah & rendah gula</option>
                <option value="Kue kering tradisional Wijsman">Kue kering renyah Wijsman</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A2C2A] mb-1">
              Catatan Khusus untuk Chef AI (Opsional)
            </label>
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="cth: 'Saya cari kue untuk 8 orang yang tidak terlalu manis', atau 'Ide ucapan kue untuk anniversary'"
              className="w-full bg-white border border-[#FCD8B8] rounded-xl px-3 py-2 text-xs text-[#4A2C2A] placeholder-[#947065] focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            id="btn-submit-ai-consultant"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#FF6B35] hover:bg-[#E8551E] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD93D]" />
            <span>{loading ? 'Chef AI Sedang Meracik Saran...' : 'Dapatkan Rekomendasi Chef AI'}</span>
          </button>
        </form>

        {/* AI Result Card */}
        {result && (
          <div className="bg-white rounded-3xl p-5 border border-[#FCE7D2] space-y-4 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 text-[#4A2C2A] font-serif font-bold text-sm border-b border-[#FCE7D2] pb-2">
              <ChefHat className="w-4 h-4 text-[#FF6B35]" />
              <span>Saran Personal dari Chef Kencana:</span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A2C2A] leading-relaxed">
              {result.recommendation}
            </p>

            {/* Pairing & Chef Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FFF0E0] p-3 rounded-2xl border border-[#FCD8B8]">
                <div className="flex items-center gap-1.5 font-bold text-[#4A2C2A] mb-1">
                  <Coffee className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Paduan Minuman Terbaik:</span>
                </div>
                <p className="text-[#6B463E]">{result.pairing}</p>
              </div>

              <div className="bg-[#FFF0E0] p-3 rounded-2xl border border-[#FCD8B8]">
                <div className="flex items-center gap-1.5 font-bold text-[#4A2C2A] mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Tips Chef:</span>
                </div>
                <p className="text-[#6B463E]">{result.chefTip}</p>
              </div>
            </div>

            {/* Suggested Products Quick View */}
            {result.suggestedProducts && result.suggestedProducts.length > 0 && (
              <div className="pt-2 border-t border-[#FCE7D2] space-y-2">
                <span className="text-xs font-bold text-[#4A2C2A] block">Menu Terkait yang Disarankan:</span>
                <div className="flex flex-wrap gap-2">
                  {result.suggestedProducts.map((prodName, i) => {
                    const match = findProductByName(prodName);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (match) {
                            onSelectProduct(match);
                            onClose();
                          }
                        }}
                        className="px-3 py-1.5 bg-[#FFEBD6] hover:bg-[#FFD93D] text-[#4A2C2A] text-xs font-bold rounded-xl border border-[#FCD8B8] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Wheat className="w-3 h-3 text-[#FF6B35]" />
                        <span>{prodName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
