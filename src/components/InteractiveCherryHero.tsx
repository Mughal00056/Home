import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface InteractiveCherryHeroProps {
  onExploreClick: () => void;
  onOpenStoryClick: () => void;
}

export const InteractiveCherryHero: React.FC<InteractiveCherryHeroProps> = ({
  onExploreClick,
  onOpenStoryClick,
}) => {
  const [cherrySquish, setCherrySquish] = useState(false);
  const [cherriesPicked, setCherriesPicked] = useState(148);
  const [liked, setLiked] = useState(false);

  const handleCherryClick = () => {
    soundFx.playCherryPop(1.1);
    setCherrySquish(true);
    setCherriesPicked((prev) => prev + 1);
    setTimeout(() => setCherrySquish(false), 240);
  };

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Ambient Red Glows in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-rose-900/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-12 right-0 w-[400px] h-[400px] bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Hero Column: Copy & Actions */}
          <div className="lg:col-span-7">
            {/* Top metadata label (clean text, no pill) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-rose-300/80 mb-4 font-mono">
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                Orchard Reserve 2026
              </span>
              <span aria-hidden="true">·</span>
              <span>100% Tree-Ripened</span>
              <span aria-hidden="true">·</span>
              <span>Peak Season Now</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-[1.05] tracking-tight text-white mb-6">
              Pure Ruby Cherries.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-300">
                Fresh From The Orchard.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-rose-100/75 leading-relaxed max-w-2xl mb-8">
              Hand-harvested at sunrise to capture maximum natural sugars, crunch, and aroma.
              Indulge in estate-grown Bing cherries, golden Rainier blossoms, and small-batch copper kettle preserves.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-900/40 hover:shadow-rose-700/50 transition-all duration-200 cursor-pointer group"
              >
                <span>Shop Fresh Harvest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenStoryClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-rose-900/60 hover:border-rose-500/80 bg-rose-950/30 hover:bg-rose-900/30 text-rose-200 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer"
              >
                <span>Our Orchard Heritage</span>
              </button>
            </div>

            {/* Trust metrics bar */}
            <div className="pt-6 border-t border-rose-950/60 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-rose-200 font-mono tabular-nums">22°-26°</p>
                <p className="text-xs text-rose-400/80 mt-0.5">Brix Sugar Rating</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-rose-200 font-mono tabular-nums">&lt;24h</p>
                <p className="text-xs text-rose-400/80 mt-0.5">Orchard to Door</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-rose-200 font-mono tabular-nums">100%</p>
                <p className="text-xs text-rose-400/80 mt-0.5">Eco Organic Certified</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive Animated Cherry Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-rose-950/50 via-[#180509] to-[#0f0305] border border-rose-900/40 shadow-2xl shadow-rose-950/60 overflow-hidden">
              
              {/* Decorative Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400/90 font-medium">
                  Interactive Tasting
                </span>
                <button
                  onClick={() => {
                    soundFx.playCherryPop(1.3);
                    setLiked(!liked);
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    liked ? 'bg-rose-600 text-white' : 'bg-rose-950/60 text-rose-400 hover:text-white'
                  }`}
                  aria-label="Favorite Cherries"
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Main Animated Cherry Display Container */}
              <div
                onClick={handleCherryClick}
                className="relative cursor-pointer group flex flex-col items-center justify-center py-6 select-none"
              >
                {/* Floating Glow */}
                <div className="absolute w-44 h-44 bg-rose-600/30 rounded-full blur-2xl animate-cherry-glow pointer-events-none" />

                {/* Animated Cherry Pair Illustration */}
                <motion.div
                  animate={{
                    scale: cherrySquish ? [1, 1.18, 0.92, 1] : 1,
                    rotate: cherrySquish ? [-4, 6, -2, 0] : 0,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                    scale: { duration: 0.28 },
                  }}
                  className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(225,29,72,0.45)]">
                    {/* Cherry Stems joined at top */}
                    <path
                      d="M 68 110 C 60 45, 95 20, 115 15"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 132 120 C 138 60, 110 30, 115 15"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Fresh Orchard Leaf */}
                    <path
                      d="M 115 15 C 145 10, 165 28, 148 44 C 130 50, 118 35, 115 15 Z"
                      fill="#16a34a"
                      stroke="#86efac"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 118 20 Q 138 28 152 38"
                      fill="none"
                      stroke="#86efac"
                      strokeWidth="1.2"
                      strokeOpacity="0.8"
                    />

                    {/* Top Stem Node */}
                    <circle cx="115" cy="15" r="4.5" fill="#15803d" />

                    {/* Left Cherry Body (Ruby Bing) */}
                    <defs>
                      <radialGradient id="cherryLeftGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#ff4d6d" />
                        <stop offset="45%" stopColor="#e11d48" />
                        <stop offset="85%" stopColor="#881337" />
                        <stop offset="100%" stopColor="#4c0519" />
                      </radialGradient>
                      <radialGradient id="cherryRightGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#ff758f" />
                        <stop offset="50%" stopColor="#be123c" />
                        <stop offset="85%" stopColor="#4c0519" />
                        <stop offset="100%" stopColor="#2a040d" />
                      </radialGradient>
                    </defs>

                    {/* Left Cherry */}
                    <circle cx="68" cy="120" r="38" fill="url(#cherryLeftGrad)" />
                    {/* Left Gloss Sheen */}
                    <ellipse cx="56" cy="104" rx="10" ry="5.5" transform="rotate(-30 56 104)" fill="white" fillOpacity="0.75" />
                    <circle cx="50" cy="115" r="3" fill="white" fillOpacity="0.45" />

                    {/* Right Cherry (slightly overlapping) */}
                    <circle cx="132" cy="130" r="40" fill="url(#cherryRightGrad)" />
                    {/* Right Gloss Sheen */}
                    <ellipse cx="120" cy="112" rx="11" ry="6" transform="rotate(-30 120 112)" fill="white" fillOpacity="0.8" />
                    <circle cx="114" cy="124" r="3.5" fill="white" fillOpacity="0.45" />
                  </svg>
                </motion.div>

                {/* Interactive Click Tip */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-300 font-mono tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Tap cherries to taste sweetness</span>
                  <span className="text-rose-400 font-bold ml-1 tabular-nums">({cherriesPicked} picked)</span>
                </div>
              </div>

              {/* Real-time Sweetness Gauge & Variety Detail */}
              <div className="mt-4 pt-4 border-t border-rose-900/50 flex items-center justify-between text-xs text-rose-300/90 font-mono">
                <div>
                  <span className="text-white font-medium">Bing & Rainier Duo</span>
                  <p className="text-rose-400/80 text-[11px]">Organic Yakima Valley</p>
                </div>
                <div className="text-right">
                  <span className="text-rose-400 font-bold">24.5° Brix</span>
                  <p className="text-rose-300/70 text-[11px]">Extra Crisp</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
