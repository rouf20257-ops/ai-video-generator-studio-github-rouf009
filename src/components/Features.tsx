import { Clock, Sparkles, Layers, UserCheck, Volume2, Video, CheckCircle2 } from 'lucide-react';
import { FEATURES } from '../data/mockData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-6 h-6 text-cyan-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-purple-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-300" />,
  UserCheck: <UserCheck className="w-6 h-6 text-emerald-400" />,
  Volume2: <Volume2 className="w-6 h-6 text-violet-400" />,
  Video: <Video className="w-6 h-6 text-amber-400" />,
};

export function Features() {
  return (
    <section id="features" className="py-20 bg-[#0A0A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide uppercase">
            <span>Next-Gen Video Synthesis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Engineered For Cinematic Perfection
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Eliminating temporal flicker, facial mutation, and low-resolution artifacting with a state-of-the-art multi-reference diffusion pipeline.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="group relative p-8 rounded-3xl bg-[#13131A] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C1C26] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {ICON_MAP[f.icon] || <Sparkles className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-semibold text-white tracking-tight">
                  {f.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Production Benchmark Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
