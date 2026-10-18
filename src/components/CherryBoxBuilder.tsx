import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { Sparkles, Plus, Check, Gift } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface CherryBoxBuilderProps {
  products: Product[];
  onAddCustomBox: (customProduct: Product) => void;
}

export const CherryBoxBuilder: React.FC<CherryBoxBuilderProps> = ({
  products,
  onAddCustomBox,
}) => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [boxName, setBoxName] = useState('My Ruby Tasting Flight');
  const [added, setAdded] = useState(false);

  const toggleSelect = (product: Product) => {
    soundFx.playCherryPop(1.15);
    if (selectedItems.some((item) => item.id === product.id)) {
      setSelectedItems(selectedItems.filter((item) => item.id !== product.id));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, product]);
      }
    }
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = selectedItems.length === 3 ? 0.88 : 1; // 12% off for full box
  const discountedPrice = Math.round(totalPrice * bundleDiscount);

  const handleAddBox = () => {
    if (selectedItems.length === 0) return;
    soundFx.playAddToCart();

    const customProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `Custom Crate: ${boxName}`,
      subtitle: `Curated trio: ${selectedItems.map((i) => i.name).join(', ')}`,
      category: 'fresh',
      categoryLabel: 'Curated Crate',
      price: discountedPrice,
      originalPrice: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      sweetnessBrix: Math.round(
        selectedItems.reduce((acc, i) => acc + i.sweetnessBrix, 0) / selectedItems.length
      ),
      weight: 'Custom 3-Tier Wooden Gift Box',
      harvestDate: 'Hand-packed upon ordering',
      image: selectedItems[0]?.image || '/src/assets/images/charry_basket_harvest_1792297014371.jpg',
      description: `Bespoke artisanal gift presentation containing: ${selectedItems
        .map((i) => `${i.name} (${i.weight})`)
        .join(' + ')}. Packed in cedar shavings with silk ruby ribbon.`,
      tastingNotes: ['Custom Tasting Flight', 'Gift Presentation', 'Artisanal Ribbon'],
      inStock: true,
    };

    onAddCustomBox(customProduct);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedItems([]);
    }, 1200);
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-[#0b0304] to-[#140407] border-t border-rose-950/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">
            <Gift className="w-4 h-4 text-rose-400" />
            <span>Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Curate Your Own Cherry Crate
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/70 leading-relaxed">
            Choose 3 orchard favorites to create an exclusive cedar gift box. Enjoy an automatic 12% bundle savings and customized ribbon packaging.
          </p>
        </div>

        {/* Interactive Box Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Variety Selector List (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-rose-400/90 mb-3 flex items-center justify-between">
              <span>Select up to 3 varieties ({selectedItems.length}/3 selected)</span>
              {selectedItems.length === 3 && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 12% Bundle Discount Unlocked!
                </span>
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((prod) => {
                const isSelected = selectedItems.some((i) => i.id === prod.id);
                return (
                  <button
                    key={prod.id}
                    onClick={() => toggleSelect(prod)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                      isSelected
                        ? 'border-rose-500 bg-rose-950/80 shadow-lg shadow-rose-950/50'
                        : 'border-rose-900/40 bg-[#150407]/70 hover:border-rose-700/60'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-rose-950 shrink-0 relative">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-rose-600/60 flex items-center justify-center text-white">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-white truncate group-hover:text-rose-300">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] font-mono text-rose-300/70 truncate">
                        {prod.sweetnessBrix}° Brix · {prod.weight}
                      </p>
                      <span className="text-xs font-mono font-bold text-rose-200 mt-1 inline-block tabular-nums">
                        ${prod.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Crate Preview (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-rose-950/60 via-[#160408] to-[#0e0204] border border-rose-900/50 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-300">
                  Custom Crate Preview
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">
                  {selectedItems.length}/3 Filled
                </span>
              </div>

              {/* Wooden Box graphic container */}
              <div className="relative min-h-[170px] p-4 rounded-2xl bg-[#090103] border-2 border-dashed border-rose-900/60 flex flex-col justify-center items-center overflow-hidden mb-5">
                <AnimatePresence>
                  {selectedItems.length === 0 ? (
                    <div className="text-center text-rose-400/50 font-mono text-xs p-6">
                      <span className="text-3xl block mb-2 opacity-60">🎁</span>
                      Click products on the left to pack your cherry crate
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 w-full">
                      {selectedItems.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ scale: 0, y: -20, rotate: -10 }}
                          animate={{ scale: 1, y: 0, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="flex flex-col items-center text-center p-2 rounded-xl bg-rose-950/60 border border-rose-800/40"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1.5 shadow-md">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-serif text-white truncate max-w-[80px]">
                            {item.name}
                          </span>
                          <span className="text-[9px] font-mono text-rose-400">
                            Slot #{idx + 1}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Box customization name input */}
              <div className="mb-5">
                <label className="block text-[11px] font-mono uppercase text-rose-300 mb-1">
                  Gift Box Monogram / Inscription
                </label>
                <input
                  type="text"
                  value={boxName}
                  onChange={(e) => setBoxName(e.target.value)}
                  className="w-full px-3 py-2 bg-rose-950/40 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Price Calculation and Add to Bag */}
              <div className="pt-4 border-t border-rose-950/70 space-y-3">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="text-rose-300/80">Crate Value:</span>
                  <div className="flex items-center gap-2">
                    {selectedItems.length === 3 && (
                      <span className="text-rose-500/60 line-through tabular-nums">${totalPrice}</span>
                    )}
                    <span className="text-lg font-bold text-rose-200 tabular-nums">
                      ${discountedPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddBox}
                  disabled={selectedItems.length === 0 || added}
                  className={`w-full py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : selectedItems.length === 0
                      ? 'bg-rose-950/50 text-rose-400/40 border border-rose-900/30 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/60'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added Gift Crate!
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add Custom Crate to Bag
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
