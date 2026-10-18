import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Plus, Minus, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    soundFx.playAddToCart();
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#140407] border border-rose-900/60 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playCherryPop(0.85);
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800/40 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Area */}
          <div className="relative aspect-square md:aspect-auto w-full bg-rose-950/40 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140407] via-transparent to-transparent md:hidden" />
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Brix info */}
              <div className="flex items-center gap-2 text-xs font-mono text-rose-300 mb-2">
                <span>{product.categoryLabel}</span>
                <span>·</span>
                <span className="text-rose-400 font-semibold">{product.weight}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-2 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 text-xs font-mono">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold ml-1 text-white">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-rose-400/60">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-bold font-mono text-rose-200 tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-rose-500/60 line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono text-emerald-400 ml-auto flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> In Season Now
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-rose-100/75 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Sweetness Brix Meter */}
              <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/40">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-rose-300">Natural Sweetness Index</span>
                  <span className="text-rose-400 font-bold">{product.sweetnessBrix}° Brix</span>
                </div>
                <div className="w-full h-2 rounded-full bg-rose-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-red-400 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, (product.sweetnessBrix / 30) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-rose-400/70 mt-1.5 font-mono">
                  {product.sweetnessBrix >= 24 ? 'Extraordinarily sweet & rich' : 'Perfect sweet-tart balance'}
                </p>
              </div>

              {/* Tasting Notes */}
              <div className="mb-6">
                <p className="text-xs font-mono uppercase tracking-wider text-rose-300/80 mb-2">Flavor Profile</p>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-rose-950/60 text-rose-200 border border-rose-800/40"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions & Stepper */}
            <div className="pt-4 border-t border-rose-950/60">
              <div className="flex items-center gap-4 mb-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-rose-900/60 rounded-xl bg-rose-950/30 p-1">
                  <button
                    onClick={() => {
                      soundFx.playCherryPop(0.9);
                      setQty(Math.max(1, qty - 1));
                    }}
                    className="p-2 text-rose-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-white text-sm tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playCherryPop(1.1);
                      setQty(qty + 1);
                    }}
                    className="p-2 text-rose-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-mono uppercase text-xs tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added To Bag!
                    </>
                  ) : (
                    <>
                      <span>Add To Bag</span>
                      <span className="tabular-nums font-mono">(${product.price * qty})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-[11px] text-rose-400/80 font-mono">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Chilled overnight freight
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Crispness Guarantee
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
