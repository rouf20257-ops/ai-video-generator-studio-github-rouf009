import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export function Testimonials() {
  return (
    <section className="py-20 bg-[#0E0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
            <span>Verified Creator Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Trusted By Top Directors & Studios
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            See how high-volume video teams use CineFlow 2.5 to supercharge their visual pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-[#13131A] border border-white/10 flex flex-col justify-between space-y-6 shadow-xl relative group hover:border-purple-500/30 transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Creator details */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/40"
                />
                <div>
                  <h4 className="text-sm font-heading font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role} • {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
