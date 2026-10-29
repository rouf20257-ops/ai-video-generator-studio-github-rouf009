import { useState } from 'react';
import { Check, Sparkles, Coins, ArrowRight, Zap } from 'lucide-react';
import { PRICING_PLANS, CREDIT_TOP_UPS, PricingPlan, CreditTopUp } from '../data/mockData';

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onTopUpCredits: (topup: CreditTopUp) => void;
}

export function Pricing({ onSelectPlan, onTopUpCredits }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-[var(--color-bg)] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <span>100% Free & Open Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[var(--color-text)] tracking-tight">
            All Features 100% Free
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)]">
            No credit card, no paywalls, and no hidden subscriptions. Create unlimited 4K videos with sound completely free.
          </p>

          {/* Access Mode Highlights */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              No Credit Card Required
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              Unlimited High-Res Computes
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
              Commercial Rights Included
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  plan.isPopular
                    ? 'bg-[var(--color-surface)] border-2 border-purple-500/80 shadow-2xl shadow-purple-950/40 card-highlight'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg'
                }`}
              >
                {/* Popular Pill */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-accent text-white font-semibold text-[11px] tracking-wide uppercase shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] mt-1 min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-4xl sm:text-5xl font-heading font-extrabold text-[var(--color-text)]">
                      ${price}
                    </span>
                    <span className="text-xs text-[var(--color-muted)]">
                      / month {isYearly && '(billed annually)'}
                    </span>
                  </div>

                  {/* Included Credits */}
                  <div className="p-3.5 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-between text-xs">
                    <span className="text-[var(--color-muted)] font-medium">Credits Included:</span>
                    <span className="text-amber-400 font-bold font-mono text-sm">
                      {plan.credits.toLocaleString()} / mo
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-semibold uppercase text-[var(--color-muted)] tracking-wider">
                      Plan Perks:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-text)]">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.isPopular
                        ? 'gradient-accent glow-accent text-white hover:opacity-95'
                        : 'bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)]'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Credit Top-Up Row (Instant Free Bonus Packs) */}
        <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl card-highlight">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-heading font-bold text-[var(--color-text)]">
                  Need Extra Compute On-Demand?
                </h4>
              </div>
              <p className="text-xs text-[var(--color-muted)]">
                Instant one-click free credit top-ups that never expire. Add unlimited GPU compute anytime for $0.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CREDIT_TOP_UPS.map((topup) => (
                <button
                  key={topup.id}
                  type="button"
                  onClick={() => onTopUpCredits(topup)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center ${
                    topup.popular
                      ? 'bg-[var(--color-surface-2)] border-cyan-500/60 shadow-md'
                      : 'bg-[var(--color-surface-2)]/60 border-[var(--color-border)] hover:border-purple-500/40'
                  }`}
                >
                  {topup.popular && (
                    <span className="absolute -top-2 px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold text-[9px] uppercase">
                      100% Free
                    </span>
                  )}
                  <span className="text-sm font-bold text-[var(--color-text)] font-mono">
                    +{topup.credits.toLocaleString()} Credits
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono mt-0.5">
                    $0 Free Claim
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
