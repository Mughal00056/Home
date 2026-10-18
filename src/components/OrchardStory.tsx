import React from 'react';
import { Sun, ThermometerSnowflake, Award, Sparkles } from 'lucide-react';

export const OrchardStory: React.FC = () => {
  return (
    <section id="orchard-heritage" className="py-20 sm:py-28 relative border-t border-rose-950/60 bg-[#0e0204]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">
            <span>[ 02 · Heritage & Soil ]</span>
            <span>·</span>
            <span>High-Altitude Cherries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Grown under glacial meltwater & volcanic mineral soil.
          </h2>
          <p className="text-sm sm:text-base text-rose-200/70 leading-relaxed">
            Every cherry offered at Charry Store comes from century-old orchard terraces.
            We honor the rhythm of natural sunlight and mountain breezes to develop rich ruby anthocyanins and firm snap.
          </p>
        </div>

        {/* 3 Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#150407] border border-rose-950/80 hover:border-rose-800/60 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-800/50 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              01. 4:30 AM Dew Harvest
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/65 leading-relaxed">
              Harvesting begins before first light when temperatures are crisp. Cold stems seal in essential aromatic oils and prevent fruit respiration.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#150407] border border-rose-950/80 hover:border-rose-800/60 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-800/50 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              02. Optical Brix Sorting
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/65 leading-relaxed">
              Each cherry cluster is inspected with non-invasive infrared refraction. Only fruit reaching 20° to 26° Brix sugar density enters our reserve crates.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#150407] border border-rose-950/80 hover:border-rose-800/60 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-800/50 flex items-center justify-center text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white mb-2">
              03. Cold-Chain Express
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/65 leading-relaxed">
              Packed in biodegradable insulated wooden baskets with thermal ice sheets. Shipped via chilled express to arrive with garden-picked crispness.
            </p>
          </div>
        </div>

        {/* Feature Visual Split Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-rose-900/50 bg-[#160407]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 mb-2">
                Pure Natural Sweetness
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white mb-4">
                Taste the difference of true tree-ripening.
              </h3>
              <p className="text-xs sm:text-sm text-rose-200/70 leading-relaxed mb-6">
                Supermarket cherries are often plucked unripe and gas-treated. Ours ripen 100% on the branches until deep ruby coloration and juicy firmness peak.
              </p>
              <div className="flex items-center gap-6 text-xs font-mono text-rose-300">
                <div>
                  <span className="block text-xl font-bold text-white tabular-nums">0%</span>
                  <span className="text-rose-400/80">Artificial Preservatives</span>
                </div>
                <div className="w-px h-8 bg-rose-900/60" />
                <div>
                  <span className="block text-xl font-bold text-white tabular-nums">38+</span>
                  <span className="text-rose-400/80">Years Heritage Farming</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full">
              <img
                src="/src/assets/images/charry_basket_harvest_1792297014371.jpg"
                alt="Cherry harvest orchard crate"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#160407] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
