import { Sparkles, ArrowRight, ShieldCheck, Film } from 'lucide-react';

interface CtaBannerProps {
  onStartGenerating: () => void;
}

export function CtaBanner({ onStartGenerating }: CtaBannerProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-gradient-to-r from-violet-900/60 via-purple-900/50 to-cyan-900/50 border border-purple-500/30 shadow-2xl shadow-purple-950/80 text-center space-y-6">
          {/* Background Aura */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/20 blur-[90px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-cyan-300 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready In Under 30 Seconds</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Bring Your Imagined Worlds To Life in 4K
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of filmmakers, agencies, and content creators synthesizing next-generation multimodal video.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartGenerating}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-purple-600/40 hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Film className="w-4 h-4 text-cyan-200" />
              <span>Launch Studio – 100% Free Forever</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Free & Unlimited Access
            </span>
            <span>•</span>
            <span>No Credit Card Required</span>
            <span>•</span>
            <span>Zero Watermarks On Export</span>
          </div>
        </div>
      </div>
    </section>
  );
}
