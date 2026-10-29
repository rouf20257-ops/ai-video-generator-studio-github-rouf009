import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cineflow_cookie_accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cineflow_cookie_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie & Session Notice"
      className="fixed bottom-4 left-4 z-40 max-w-sm p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 card-highlight"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1 text-xs">
          <h4 className="font-heading font-semibold text-[var(--color-text)]">
            Local Session & Cache Notice
          </h4>
          <p className="text-[var(--color-muted)] leading-relaxed">
            We store your credit balance and generated video history locally in your browser for fast rendering.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-lg font-medium text-xs text-white gradient-accent hover:opacity-95 cursor-pointer shadow-xs"
            >
              Accept All
            </button>
            <button
              onClick={() => setVisible(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[var(--color-muted)] hover:text-[var(--color-text)] p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
