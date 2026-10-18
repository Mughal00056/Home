import React, { useState, useEffect } from 'react';
import { Product, CartItem, CategoryFilter } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { InteractiveCherryHero } from './components/InteractiveCherryHero';
import { CherryAnimationCanvas } from './components/CherryAnimationCanvas';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CherryBoxBuilder } from './components/CherryBoxBuilder';
import { OrchardStory } from './components/OrchardStory';
import { Footer } from './components/Footer';
import { soundFx } from './utils/sound';
import { Search, SlidersHorizontal, Sparkles, Star } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'brix' | 'price-asc' | 'price-desc'>('featured');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('charry_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('charry_cart_items', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playCherryPop(1);
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter & sort products
  const filteredProducts = products
    .filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tastingNotes.some((n) => n.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'brix') return b.sweetnessBrix - a.sweetnessBrix;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured default
    });

  return (
    <div className="min-h-screen bg-[#0b0304] text-[#fef2f2] relative selection:bg-[#e11d48] selection:text-white">
      {/* Falling and Floating Cherry Animation Canvas */}
      <CherryAnimationCanvas
        isAnimationActive={isAnimationActive}
        onToggleAnimation={() => setIsAnimationActive(!isAnimationActive)}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-red-950 text-rose-200 text-xs py-2 px-4 text-center border-b border-rose-900/50 flex items-center justify-center gap-2">
        <span>🍒</span>
        <span className="font-mono">
          <strong className="text-white font-semibold">Orchard Harvest Special:</strong> Use code{' '}
          <span className="underline font-bold text-rose-300">CHERRY15</span> for 15% off · Free chilled express shipping on orders over $60
        </span>
      </div>

      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat as CategoryFilter)}
      />

      {/* Main Page Content */}
      <main>
        {/* Interactive Hero with animated Cherry illustration */}
        <InteractiveCherryHero
          onExploreClick={() => {
            document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStoryClick={() => {
            document.getElementById('orchard-heritage')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Products Catalog Section */}
        <section id="products-catalog" className="py-16 sm:py-24 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            
            {/* Catalog Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-rose-950/70">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">
                  <span>[ 01 · Handpicked Reserve ]</span>
                  <span>·</span>
                  <span>Direct From Branches</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  Seasonal Orchard Offerings
                </h2>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative min-w-[200px] sm:min-w-[240px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-rose-400/60" />
                  <input
                    type="text"
                    placeholder="Search cherries, preserves, tarts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-rose-400/60 hover:text-white text-xs font-mono"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-rose-300">
                  <SlidersHorizontal className="w-3 h-3 text-rose-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-rose-200 focus:outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-[#140407] text-white">Featured Harvest</option>
                    <option value="brix" className="bg-[#140407] text-white">Highest Sweetness (Brix)</option>
                    <option value="price-asc" className="bg-[#140407] text-white">Price: Low to High</option>
                    <option value="price-desc" className="bg-[#140407] text-white">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {[
                { id: 'all', label: 'All Collections' },
                { id: 'fresh', label: 'Fresh Harvest' },
                { id: 'preserves', label: 'Artisanal Preserves' },
                { id: 'bakery', label: 'Bakery & Pastry' },
                { id: 'beverages', label: 'Elixirs & Cordials' },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playCherryPop(1);
                      setActiveCategory(tab.id as CategoryFilter);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-950/60'
                        : 'bg-rose-950/30 text-rose-300/70 hover:text-white hover:bg-rose-900/40 border border-rose-900/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-rose-950/20 border border-rose-900/30 rounded-3xl p-8">
                <span className="text-4xl block mb-2">🍒</span>
                <p className="font-serif text-lg text-white mb-2">No matching harvest items found</p>
                <p className="text-xs text-rose-300/70 mb-4">
                  Try adjusting your search terms or view our all-time favorite Bing cherries.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-mono"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={handleAddToCart}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Interactive Custom Cherry Gift Box Builder */}
        <CherryBoxBuilder
          products={products}
          onAddCustomBox={handleAddToCart}
        />

        {/* Orchard Heritage Section */}
        <OrchardStory />

        {/* Customer Reviews & Testimonials */}
        <section className="py-16 sm:py-20 border-t border-rose-950/60 bg-[#090203]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                [ 03 · Verified Harvesters ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Cherished Across Tables
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "The Bing cherries had an unbelievable snap and deep wine-like sweetness. Delivered chilled to New York within 24 hours of being picked.",
                  author: "Chef Julian Moreau",
                  role: "Michelin Guide Pâtissier",
                  product: "Estate Royal Bing Cherries",
                },
                {
                  quote:
                    "The Ruby Reserve Preserve is simply the best cherry jam I have ever tasted. Not oversweet, bursting with whole wild cherries and real vanilla.",
                  author: "Catherine S.",
                  role: "Sommelier, San Francisco",
                  product: "Ruby Reserve Preserve",
                },
                {
                  quote:
                    "The French Cherry Galette arrived in perfect condition. Reheated in the oven for 8 minutes and the butter pastry paired heavenly with the tart Morello cherries.",
                  author: "Marcus & David",
                  role: "Food & Wine Critics",
                  product: "French Orchard Cherry Galette",
                },
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#140407] border border-rose-950/70 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-rose-100/80 italic leading-relaxed mb-4">
                      "{rev.quote}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-rose-950/60 text-xs font-mono">
                    <p className="text-white font-bold">{rev.author}</p>
                    <p className="text-rose-400/70 text-[11px]">{rev.role}</p>
                    <p className="text-rose-500 text-[10px] mt-1 font-semibold">Verified Harvest: {rev.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cherry Animation Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            soundFx.playCherryPop(1.2);
            setIsAnimationActive(!isAnimationActive);
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border text-xs font-mono shadow-xl backdrop-blur-md transition-all cursor-pointer ${
            isAnimationActive
              ? 'bg-rose-950/90 text-rose-200 border-rose-700/60 shadow-rose-950/80 hover:bg-rose-900'
              : 'bg-[#120306]/90 text-rose-400/50 border-rose-950 hover:text-rose-300'
          }`}
          title="Toggle falling cherry animation"
        >
          <span className={isAnimationActive ? 'animate-bounce text-sm' : 'text-sm'}>🍒</span>
          <span className="hidden sm:inline">
            {isAnimationActive ? 'Cherry Rain: Active' : 'Cherry Rain: Paused'}
          </span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
