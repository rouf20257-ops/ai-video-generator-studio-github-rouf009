import { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, TrendingUp, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { USE_CASES, UseCaseItem } from '../data/mockData';

interface UseCasesProps {
  onUsePrompt: (prompt: string) => void;
}

export function UseCases({ onUsePrompt }: UseCasesProps) {
  const [activeTabId, setActiveTabId] = useState<string>(USE_CASES[0].id);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(USE_CASES[0].id);

  const activeUseCase = USE_CASES.find((uc) => uc.id === activeTabId) || USE_CASES[0];

  return (
    <section id="use-cases" className="py-24 bg-[var(--color-bg)] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wide uppercase">
            <span>Tailored For High Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[var(--color-text)] tracking-tight">
            Infinite Creative Scenarios
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)]">
            Explore dedicated workflows tuned for agency ads, e-commerce, indie filmmaking, and education.
          </p>
        </div>

        {/* Desktop View: Left Vertical Tab List + Right Content Panel */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Left Vertical Tab List */}
          <div className="col-span-4 space-y-2">
            {USE_CASES.map((uc) => {
              const isActive = activeTabId === uc.id;
              return (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActiveTabId(uc.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[var(--color-surface)] border-purple-500/50 shadow-lg'
                      : 'bg-[var(--color-surface)]/50 border-[var(--color-border)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <div>
                    <h4 className={`text-sm font-heading font-bold ${isActive ? 'text-transparent bg-clip-text gradient-accent-text' : 'text-[var(--color-text)]'}`}>
                      {uc.tab}
                    </h4>
                    <p className="text-xs text-[var(--color-muted)] line-clamp-1 mt-0.5">
                      {uc.tagline}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-[var(--color-muted)] opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="col-span-8 p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl card-highlight">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  {activeUseCase.tab}
                </span>
                <h3 className="text-2xl font-heading font-bold text-[var(--color-text)]">
                  {activeUseCase.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {activeUseCase.description}
                </p>
              </div>

              {/* Sample Video Player */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-[var(--color-border)] shadow-md">
                <video
                  key={activeUseCase.videoUrl}
                  src={activeUseCase.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">{activeUseCase.metric}</span>
                    <span className="text-slate-300">{activeUseCase.metricLabel}</span>
                  </div>
                </div>
              </div>

              {/* Bullet Benefits */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-[var(--color-text)] uppercase tracking-wider">
                  Key Advantages:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeUseCase.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Prompt Box */}
              <div className="p-4 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1 max-w-lg">
                  <span className="text-[10px] font-semibold uppercase text-[var(--color-muted)]">Sample Prompt</span>
                  <p className="text-[var(--color-text)] italic line-clamp-2">&ldquo;{activeUseCase.samplePrompt}&rdquo;</p>
                </div>
                <button
                  type="button"
                  onClick={() => onUsePrompt(activeUseCase.samplePrompt)}
                  className="px-4 py-2 rounded-xl gradient-accent text-white font-medium shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Use Prompt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="lg:hidden space-y-3">
          {USE_CASES.map((uc) => {
            const isExpanded = mobileExpandedId === uc.id;
            return (
              <div
                key={uc.id}
                className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setMobileExpandedId(isExpanded ? null : uc.id)}
                  className="w-full p-4 text-left flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-heading font-bold text-[var(--color-text)]">{uc.tab}</h4>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5">{uc.tagline}</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[var(--color-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--color-muted)]" />}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 space-y-4 border-t border-[var(--color-border)]/50 mt-2 text-xs">
                    <p className="text-[var(--color-muted)] leading-relaxed pt-2">{uc.description}</p>
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
                      <video src={uc.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1.5">
                      {uc.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-[var(--color-text)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => onUsePrompt(uc.samplePrompt)}
                      className="w-full py-2.5 rounded-xl gradient-accent text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try Prompt in Generator</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
