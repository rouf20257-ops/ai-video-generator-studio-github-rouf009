import { Link } from 'react-router-dom';
import { ArrowLeft, Film, ShieldCheck } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-muted)] hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to CineFlow Studio</span>
        </Link>

        <div className="space-y-3 pb-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
            <Film className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-[var(--color-muted)]">
            Last Updated: October 2026 • Effective Date: Worldwide
          </p>
        </div>

        <div className="space-y-6 text-sm text-[var(--color-muted)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              1. Platform Services & Licensing
            </h2>
            <p>
              CineFlow 2.5 provides state-of-the-art multimodal AI video generation software. By creating an account or submitting prompts, you agree to these Terms. You retain full ownership of your input media and synthesized outputs generated under active commercial tiers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              2. Acceptable Use & Prohibited Generations
            </h2>
            <p>
              You agree not to use CineFlow to generate content that depicts non-consensual sexual material, child exploitation, defamation, hate speech, actionable fraud, or deliberate impersonation intended to mislead or harm any person or entity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              3. Generation Credits & Refund Policy
            </h2>
            <p>
              Credits represent units of neural GPU computing time. If any video job encounters an automated system failure, network drop, or server-side error, the consumed credits are instantly refunded to your active session balance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              4. Commercial Rights & Trademarks
            </h2>
            <p>
              Users on Creator and Pro subscriptions hold full royalty-free commercial rights to their synthesized outputs. You must possess all necessary rights for any trademarked logos or protected intellectual property provided as reference media.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex justify-between items-center text-xs text-[var(--color-muted)]">
          <span>&copy; {new Date().getFullYear()} CineFlow 2.5 AI Inc.</span>
          <Link to="/privacy" className="text-cyan-400 hover:underline">
            View Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
