import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export function PrivacyPage() {
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
            <Lock className="w-4 h-4" />
            <span>Privacy & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[var(--color-muted)]">
            How CineFlow protects creator data, reference inputs, and local session caches.
          </p>
        </div>

        <div className="space-y-6 text-sm text-[var(--color-muted)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              1. Information We Collect
            </h2>
            <p>
              We collect user authentication information (name, email) and prompt input strings solely for executing generative video inference and maintaining your account balance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              2. Uploaded Media & Model Training
            </h2>
            <p>
              Your uploaded reference media (images, video, audio) is securely processed in volatile GPU memory during generation. <strong>We do not use your private uploaded creative assets to train public foundation models</strong> without your explicit written agreement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              3. Local Storage & Cookies
            </h2>
            <p>
              CineFlow utilizes your browser’s localStorage to persist your active credit balance, recent generations, and studio interface preferences so you never lose ongoing progress.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">
              4. Data Deletion
            </h2>
            <p>
              You can delete any generated video clip from your local studio history at any time using the trash icon in the &ldquo;My Generations&rdquo; panel.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex justify-between items-center text-xs text-[var(--color-muted)]">
          <span>&copy; {new Date().getFullYear()} CineFlow 2.5 AI Inc.</span>
          <Link to="/terms" className="text-cyan-400 hover:underline">
            View Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
