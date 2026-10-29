import { Sparkles, Layers, Download, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onGoToGenerator: () => void;
}

export function HowItWorks({ onGoToGenerator }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      title: 'Prompt & Direct',
      description: 'Enter your natural language prompt or click "Enhance Prompt" to have our cinematic director add lighting, camera lens, and motion kinetics.',
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      tag: 'AI Enhancement',
    },
    {
      number: '02',
      title: 'Guide With References',
      description: 'Upload a starting frame or up to 9 reference images, audio, and videos. CineFlow locks identity, wardrobe, and aesthetic style across every frame.',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      tag: 'Multi-Modal Control',
    },
    {
      number: '03',
      title: 'Synthesize & Export in 4K',
      description: 'Watch the real-time neural pipeline render your scene with synchronized binaural audio. Download uncompressed MP4 or iterate with one click.',
      icon: <Download className="w-6 h-6 text-emerald-400" />,
      tag: 'Broadcast Ready',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0E0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            How CineFlow 2.5 Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From raw concept to broadcast-grade cinematic motion in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, index) => (
            <div
              key={s.number}
              className="relative p-8 rounded-3xl bg-[#13131A] border border-white/10 flex flex-col justify-between space-y-6 group hover:border-cyan-500/40 transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C1C26] border border-white/10 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="font-heading font-extrabold text-3xl text-white/20 group-hover:text-cyan-400/40 transition-colors">
                    {s.number}
                  </span>
                </div>

                <div className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                  {s.tag}
                </div>

                <h3 className="text-xl font-heading font-bold text-white">
                  {s.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {index < 2 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-white/20">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onGoToGenerator}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
          >
            <span>Try The Workflow Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
