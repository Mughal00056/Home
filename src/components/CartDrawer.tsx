import React, { useState } from 'react';
import { CartItem, CheckoutForm } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryNotes: '',
    paymentMethod: 'card',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 60;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 8.5;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'CHERRY15' || code === 'RUBYRED' || code === 'SWEETCHERRY') {
      soundFx.playCherryPop(1.4);
      setDiscountPercent(15);
      setPromoMessage('15% Sweet Cherry Discount applied!');
    } else if (code === 'VIPCHERRY') {
      soundFx.playCherryPop(1.5);
      setDiscountPercent(20);
      setPromoMessage('20% VIP Harvester Discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try CHERRY15');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playAddToCart();
    const generatedOrder = 'CHR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrder);
    setStep('success');
    onClearCart();
  };

  const resetAndClose = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div
        className="w-full max-w-lg h-full bg-[#120306] border-l border-rose-950/80 flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-rose-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍒</span>
            <h2 className="font-serif font-bold text-xl text-white">
              {step === 'cart' && 'Your Cherry Bag'}
              {step === 'checkout' && 'Express Checkout'}
              {step === 'success' && 'Harvest Confirmed'}
            </h2>
          </div>
          <button
            onClick={() => {
              soundFx.playCherryPop(0.9);
              resetAndClose();
            }}
            className="p-2 text-rose-300 hover:text-white rounded-lg hover:bg-rose-950/60 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS VIEW */}
        {step === 'cart' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {/* Free Shipping Progress Indicator */}
            {items.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs font-mono">
                {amountToFreeShipping === 0 ? (
                  <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> You unlocked FREE express chilled delivery!
                  </p>
                ) : (
                  <div>
                    <p className="text-rose-200">
                      Add <span className="font-bold text-rose-400">${amountToFreeShipping.toFixed(2)}</span> more to qualify for Free Chilled Shipping.
                    </p>
                    <div className="w-full h-1.5 bg-rose-950 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-red-400 rounded-full"
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                <span className="text-5xl mb-4 animate-bounce">🍒</span>
                <p className="font-serif text-lg text-white mb-2">Your harvest basket is empty</p>
                <p className="text-xs text-rose-300/70 max-w-xs mb-6">
                  Explore our tree-ripened orchard Bing cherries, artisanal ruby preserves, and warm baked galettes.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 hover:border-rose-800/50 transition-colors"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-rose-950/50 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => {
                              soundFx.playCherryPop(0.8);
                              onRemoveItem(item.product.id);
                            }}
                            className="text-rose-400/60 hover:text-rose-300 p-1 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-rose-400/80 mt-0.5">
                          {item.product.weight}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-rose-900/50 rounded-lg bg-rose-950/40">
                          <button
                            onClick={() => {
                              soundFx.playCherryPop(0.9);
                              onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1));
                            }}
                            className="p-1.5 text-rose-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              soundFx.playCherryPop(1.1);
                              onUpdateQuantity(item.product.id, item.quantity + 1);
                            }}
                            className="p-1.5 text-rose-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono font-bold text-sm text-rose-200 tabular-nums">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-rose-400/60" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. CHERRY15)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800/50 text-rose-200 text-xs font-mono rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] font-mono mt-1.5 ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {promoMessage}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: CHECKOUT FORM VIEW */}
        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-rose-300 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Eleanor Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-rose-300 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-rose-300 mb-1">Phone</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-rose-300 mb-1">Delivery Address</label>
                <input
                  required
                  type="text"
                  placeholder="742 Evergreen Terrace, Orchard Way"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-rose-300 mb-1">City</label>
                  <input
                    required
                    type="text"
                    placeholder="Yakima"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-rose-300 mb-1">Postal Code</label>
                  <input
                    required
                    type="text"
                    placeholder="98901"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Payment selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-rose-300 mb-2">Payment Option</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono text-center transition-colors cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'border-rose-500 bg-rose-950/80 text-white font-bold'
                        : 'border-rose-900/40 bg-rose-950/20 text-rose-300/70 hover:text-white'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono text-center transition-colors cursor-pointer ${
                      formData.paymentMethod === 'apple_pay'
                        ? 'border-rose-500 bg-rose-950/80 text-white font-bold'
                        : 'border-rose-900/40 bg-rose-950/20 text-rose-300/70 hover:text-white'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono text-center transition-colors cursor-pointer ${
                      formData.paymentMethod === 'cod'
                        ? 'border-rose-500 bg-rose-950/80 text-white font-bold'
                        : 'border-rose-900/40 bg-rose-950/20 text-rose-300/70 hover:text-white'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-white mb-1">
              Harvest Order Placed!
            </h3>
            <p className="font-mono text-xs text-rose-400 mb-5">
              Order Reference #{orderNumber}
            </p>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 text-left text-xs font-mono w-full max-w-sm space-y-2 mb-6">
              <div className="flex justify-between text-rose-300">
                <span>Customer:</span>
                <span className="text-white font-bold">{formData.fullName || 'Guest Harvester'}</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Destination:</span>
                <span className="text-white">{formData.city || 'Orchard Express'}, {formData.postalCode}</span>
              </div>
              <div className="flex justify-between text-rose-300">
                <span>Method:</span>
                <span className="text-white uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-rose-300 pt-2 border-t border-rose-900/40 font-bold">
                <span>Paid Total:</span>
                <span className="text-emerald-400">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-rose-200/70 max-w-xs mb-6">
              Your cherries will be picked at tomorrow dawn, chilled to 2°C, and dispatched in insulated eco-friendly crates.
            </p>

            <button
              onClick={resetAndClose}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Back To Orchard Store
            </button>
          </div>
        )}

        {/* Drawer Footer with Totals & CTAs */}
        {items.length > 0 && step !== 'success' && (
          <div className="p-5 sm:p-6 border-t border-rose-950/80 bg-[#0e0205] space-y-3">
            <div className="space-y-1.5 text-xs font-mono text-rose-300/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Cherry Promo ({discountPercent}%)</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Chilled Express Delivery</span>
                <span className="text-white tabular-nums">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-rose-900/50">
                <span>Total Amount</span>
                <span className="text-rose-200 tabular-nums">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => {
                  soundFx.playCherryPop(1.1);
                  setStep('checkout');
                }}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950/60 transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 border border-rose-900/50 text-rose-300 hover:text-white rounded-xl font-mono text-xs transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950/60 transition-colors cursor-pointer"
                >
                  <span>Confirm Order (${finalTotal.toFixed(2)})</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
