import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Check, Star, Eye } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetails,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playAddToCart();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  return (
    <div
      onClick={() => {
        soundFx.playCherryPop(1);
        onOpenDetails(product);
      }}
      className="group relative flex flex-col bg-[#140407] hover:bg-[#1a0509] border border-rose-950/70 hover:border-rose-600/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/50 cursor-pointer"
    >
      {/* Product Image Area with Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950/30">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-rose-950/40 animate-pulse text-rose-500">
            <span className="text-3xl">🍒</span>
          </div>
        )}

        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-950 to-red-950 p-6 text-center">
            <span className="text-4xl mb-2">🍒</span>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-300">{product.name}</span>
          </div>
        )}

        {/* Bestseller or In-Stock tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono text-rose-200 bg-rose-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-rose-800/40">
          <span>{product.sweetnessBrix}° Brix</span>
          <span className="text-rose-400">·</span>
          <span>{product.categoryLabel}</span>
        </div>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="px-3 py-1.5 bg-rose-950/90 text-white rounded-lg text-xs font-mono flex items-center gap-1.5 border border-rose-800/60 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata row */}
          <div className="flex items-center justify-between text-xs text-rose-300/70 font-mono mb-2">
            <span>{product.weight}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-rose-200">{product.rating.toFixed(1)}</span>
              <span className="text-rose-400/60">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-lg text-white group-hover:text-rose-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          <p className="text-xs text-rose-200/65 line-clamp-2 leading-relaxed mb-4">
            {product.subtitle}
          </p>

          {/* Tasting notes clean text list */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {product.tastingNotes.slice(0, 3).map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono text-rose-300/80 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/30"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart Row */}
        <div className="pt-3 border-t border-rose-950/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-rose-200 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-rose-500/60 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`p-2.5 rounded-xl font-medium text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              addedAnim
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
            title="Add to cart"
            aria-label={`Add ${product.name} to cart`}
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-[11px]">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="text-[11px]">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
