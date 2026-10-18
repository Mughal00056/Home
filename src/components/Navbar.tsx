import React from 'react';
import { ShoppingBag, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  isMuted,
  onToggleMute,
  onSelectCategory,
}) => {
  const scrollToSection = (id: string) => {
    soundFx.playCherryPop(0.9);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0305]/85 backdrop-blur-xl border-b border-rose-950/60 transition-colors">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark with cherry accent */}
        <button
          onClick={() => {
            soundFx.playCherryPop(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left text-white whitespace-nowrap shrink-0 group cursor-pointer"
        >
          {/* Animated mini logo cherry */}
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-700 to-red-500 flex items-center justify-center shadow-md shadow-rose-900/50 group-hover:scale-110 transition-transform">
            🍒
          </span>
          <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-rose-400 transition-colors">
            Charry<span className="text-rose-500 font-sans ml-1">Store</span>
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.16em] text-rose-200/70">
          <button
            onClick={() => {
              onSelectCategory('all');
              scrollToSection('products-catalog');
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            All Harvest
          </button>
          <button
            onClick={() => {
              onSelectCategory('fresh');
              scrollToSection('products-catalog');
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Fresh Bing & Rainier
          </button>
          <button
            onClick={() => {
              onSelectCategory('preserves');
              scrollToSection('products-catalog');
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Artisanal Preserves
          </button>
          <button
            onClick={() => {
              onSelectCategory('bakery');
              scrollToSection('products-catalog');
            }}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Pastries & Confections
          </button>
          <button
            onClick={() => scrollToSection('orchard-heritage')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Our Heritage
          </button>
        </div>

        {/* Zone 3: 1 primary action & sound toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cherry pop sound toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg border border-rose-900/40 text-rose-300 hover:text-white hover:bg-rose-950/50 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute cherry sounds' : 'Mute cherry sounds'}
            aria-label="Toggle cherry sound effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              soundFx.playCherryPop(1.15);
              onOpenCart();
            }}
            className="flex items-center gap-2.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md shadow-rose-950/60 font-medium text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Bag</span>
            <span className="px-1.5 py-0.5 rounded-full bg-rose-950 text-rose-200 text-[10px] font-bold min-w-[18px] text-center tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>

      </nav>
    </header>
  );
};
