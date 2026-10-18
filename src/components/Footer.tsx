import React, { useState } from 'react';
import { ArrowRight, Check, Heart } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playCherryPop(1.3);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="border-t border-rose-950/80 bg-[#080203] text-rose-200/70 pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-rose-950/60">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍒</span>
              <span className="font-serif font-bold text-2xl text-white">Charry Store</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-200/60 leading-relaxed max-w-sm mb-6">
              Cultivating premier tree-ripened organic cherries, copper-kettle preserves, and artisanal confections. Shipped chilled from our orchard to your doorstep.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
              <span>Fresh Harvest Season</span>
              <span>·</span>
              <span>Yakima Valley Orchards</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-3">
              Collections
            </p>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#products-catalog" className="hover:text-white transition-colors">
                  Fresh Bing & Rainier Cherries
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-white transition-colors">
                  Artisanal Fruit Preserves
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-white transition-colors">
                  French Cherry Galettes
                </a>
              </li>
              <li>
                <a href="#products-catalog" className="hover:text-white transition-colors">
                  Cold-Pressed Botanical Elixirs
                </a>
              </li>
              <li>
                <a href="#orchard-heritage" className="hover:text-white transition-colors">
                  Sustainable Orchard Story
                </a>
              </li>
            </ul>
          </div>

          {/* Harvest Newsletter */}
          <div className="md:col-span-4">
            <p className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-2">
              The Harvest Bulletin
            </p>
            <p className="text-xs text-rose-200/60 leading-relaxed mb-4">
              Receive alert notifications when the first Rainier and Bing trees are picked each dawn.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="harvester@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-mono transition-colors flex items-center justify-center cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-emerald-400">
                  Welcome to the Charry Store Harvest Circle!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-rose-400/60">
          <p>© 2026 Charry Store Inc. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> and ripe cherries
          </p>
        </div>

      </div>
    </footer>
  );
};
