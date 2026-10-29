import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl gradient-accent p-0.5 shadow-2xl mb-6">
        <div className="w-full h-full bg-[var(--color-surface)] rounded-[14px] flex items-center justify-center">
          <Film className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 mb-3">
        404 ERROR
      </span>

      <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight mb-2">
        Scene Not Found
      </h1>

      <p className="text-sm text-[var(--color-muted)] max-w-md mb-8 leading-relaxed">
        The cinematic timeline you requested does not exist or has been relocated to another cut.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white gradient-accent glow-accent flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to CineFlow Studio</span>
      </Link>
    </div>
  );
}
