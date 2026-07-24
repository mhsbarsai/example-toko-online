import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, ArrowRight, MessageCircle, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ onNavClick, isDark, onToggleDark }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Katalog Layanan', id: 'layanan' },
    { label: 'Kalkulator Harga', id: 'estimator' },
    { label: 'Portofolio', id: 'portofolio' },
    { label: 'Testimoni', id: 'testimoni' },
    { label: 'FAQ', id: 'faq' }
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent("Halo! Saya ingin berkonsultasi mengenai pembuatan website untuk usaha UMKM saya.");
    window.open(`https://wa.me/6289512093311?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-slate-900 border-b-4 border-orange-200 dark:border-orange-500 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Branding */}
          <div 
            onClick={() => handleItemClick('hero')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="flex items-center justify-center transition-all group-hover:scale-105">
              <img src="/logo.svg" alt="Creavora Logo" className="h-9 w-9 object-contain drop-shadow-sm" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-slate-800 dark:text-slate-100">
                Crea<span className="text-orange-500">vora</span>
              </span>
              <p className="text-[9px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase leading-none">
                JASA WEB UMKM
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-bold text-sm transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle (Desktop) */}
            <button
              onClick={onToggleDark}
              className="p-2.5 rounded-full text-slate-600 hover:text-orange-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-orange-400 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer animate-fadeIn"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-200 dark:shadow-none cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Konsultasi Gratis</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Mobile Actions (Toggle + Menu Button) */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={onToggleDark}
              className="p-2 rounded-xl text-slate-600 hover:text-orange-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-orange-400 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-orange-500 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b-4 border-orange-200 dark:border-orange-500 absolute top-full left-0 right-0 py-4 px-4 shadow-lg flex flex-col space-y-4 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="text-slate-700 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 font-bold text-base text-left py-2 border-b border-slate-100 dark:border-slate-800 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleWhatsAppDirect}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition-all cursor-pointer"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Hubungi via WhatsApp</span>
          </button>
        </div>
      )}
    </nav>
  );
}
