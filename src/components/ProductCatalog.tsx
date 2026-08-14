import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Wheat, 
  Flame, 
  Heart, 
  Cake, 
  Gift, 
  Coffee, 
  Star, 
  Plus, 
  SlidersHorizontal,
  Info,
  Check,
  Clock
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { BAKERY_CATEGORIES } from '../data/products';
import { formatRupiah } from '../utils/formatters';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');

  const categoryIcons: Record<string, React.ReactNode> = {
    all: <Sparkles className="w-4 h-4" />,
    'artisan-sourdough': <Wheat className="w-4 h-4" />,
    'viennoiserie-pastry': <Flame className="w-4 h-4" />,
    'roti-manis-gurih': <Heart className="w-4 h-4" />,
    'cake-tart': <Cake className="w-4 h-4" />,
    'hampers-gift': <Gift className="w-4 h-4" />,
    'minuman-kopi': <Coffee className="w-4 h-4" />,
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
        p.dietary.some(d => d.toLowerCase().includes(q))
      );

      // Dietary filter match
      const matchDietary = selectedDietary === 'all' || p.dietary.includes(selectedDietary as any);

      return matchCat && matchSearch && matchDietary;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedDietary, sortBy]);

  const dietaryOptions = [
    { id: 'all', label: 'Semua Kategori' },
    { id: '100% Halal', label: '100% Halal' },
    { id: 'French Butter', label: 'French Butter AOP' },
    { id: 'Sourdough 24h', label: 'Sourdough 24h' },
    { id: 'Vegan', label: 'Vegan Friendly' },
    { id: 'Low-Sugar', label: 'Rendah Gula' },
  ];

  return (
    <section id="katalog-produk-section" className="py-10 bg-[#FFF9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#FF6B35] bg-[#FFEBD6] px-3.5 py-1 rounded-full inline-block mb-2">
              Menu Toko Roti Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2C2A]">
              Katalog Roti, Pastry & Kue Spesial
            </h2>
            <p className="text-xs sm:text-sm text-[#7D5A50] mt-1">
              Setiap menu dipanggang menggunakan ragi alami, tepung organik pilihan, dan mentega murni.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-xs text-[#4A2C2A] font-semibold">Urutkan:</span>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#FCD8B8] rounded-xl px-3 py-1.5 text-xs text-[#4A2C2A] font-semibold focus:ring-2 focus:ring-[#FF6B35] focus:outline-hidden cursor-pointer"
            >
              <option value="popular">Paling Populer (Best Seller)</option>
              <option value="rating">Rating Tertinggi ⭐</option>
              <option value="price_asc">Harga: Rendah ke Tinggi</option>
              <option value="price_desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {BAKERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/20'
                    : 'bg-white hover:bg-[#FFF0E0] text-[#4A2C2A] border border-[#FCD8B8]'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs">
          <span className="text-[#7D5A50] font-semibold mr-1">Filter Diet:</span>
          {dietaryOptions.map((opt) => (
            <button
              key={opt.id}
              id={`dietary-filter-${opt.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedDietary(opt.id)}
              className={`px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer ${
                selectedDietary === opt.id
                  ? 'bg-[#2EC4B6] text-white'
                  : 'bg-[#FFF0E0] hover:bg-[#FFE0C2] text-[#4A2C2A]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#FCE7D2] p-8">
            <Wheat className="w-12 h-12 text-[#FFD93D] mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-[#4A2C2A]">Tidak ada produk yang cocok</h3>
            <p className="text-xs text-[#7D5A50] mt-1 max-w-md mx-auto">
              Coba ganti kata kunci pencarian atau reset filter kategori untuk melihat menu lezat kami yang lain.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedDietary('all');
              }}
              className="mt-4 px-4 py-2 bg-[#FF6B35] hover:bg-[#E8551E] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-[#FCE7D2] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Image & Badges Container */}
                  <div className="relative h-48 overflow-hidden bg-[#FFF0E0]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      {product.badges?.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#4A2C2A]/90 text-[#FFF9F2] backdrop-blur-xs shadow-xs"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Fresh Batch Time Tag */}
                    {product.freshBatchTime && (
                      <div className="absolute bottom-3 left-3 right-3 bg-[#4A2C2A]/85 backdrop-blur-xs text-[#FFF9F2] text-[10px] px-2.5 py-1 rounded-xl flex items-center gap-1.5 font-semibold">
                        <Clock className="w-3 h-3 text-[#2EC4B6] shrink-0" />
                        <span className="truncate">{product.freshBatchTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between text-xs text-[#7D5A50] mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#FFD93D] text-[#FFD93D]" />
                          <span className="font-bold text-[#4A2C2A]">{product.rating}</span>
                          <span className="text-[11px] text-[#947065]">({product.reviewsCount})</span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#7D5A50]">
                          {product.weightGrams ? `${product.weightGrams}g` : product.servings}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif font-bold text-[#4A2C2A] text-base leading-snug hover:text-[#FF6B35] transition-colors cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#6B463E] mt-1 line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>

                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.dietary.slice(0, 2).map((diet, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF0E0] text-[#4A2C2A] font-semibold"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 border-t border-[#FCE7D2] flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-[#4A2C2A]">
                            {formatRupiah(product.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-[#947065] line-through">
                              {formatRupiah(product.originalPrice!)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#2EC4B6] font-bold block">
                          Tersedia Siap Kirim
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          id={`btn-detail-${product.id}`}
                          onClick={() => onSelectProduct(product)}
                          className="p-2 rounded-xl text-[#4A2C2A] hover:bg-[#FFF0E0] transition-colors cursor-pointer"
                          title="Lihat Rincian & Bahan"
                        >
                          <Info className="w-4 h-4 text-[#FF6B35]" />
                        </button>

                        <button
                          id={`btn-add-cart-${product.id}`}
                          onClick={() => {
                            if (product.allowSlicing || product.allowCustomCakeMessage) {
                              onSelectProduct(product);
                            } else {
                              onQuickAddToCart(product);
                            }
                          }}
                          className="flex items-center gap-1 bg-[#FF6B35] hover:bg-[#E8551E] text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pesan</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
