import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#0A0A0F] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Answered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Common Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Everything you need to know about CineFlow 2.5 architecture, credits, and rendering.
          </p>
        </div>

        {/* 8 Accordion Items */}
        <div className="space-y-3.5">
          {FAQ_LIST.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#13131A] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-sm sm:text-base pr-2">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#1C1C26] flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {item.answer}
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
