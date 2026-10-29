import { useState } from 'react';
import { X, Sparkles, Coins, ArrowRight, Film, Check, Settings, Trash2, RotateCcw } from 'lucide-react';
import { useToast } from './Toast';
import { CreditTopUp } from '../data/mockData';

interface DemoAuthModalProps {
  isOpen: boolean;
  isSignUpDefault?: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export function DemoAuthModal({ isOpen, isSignUpDefault = false, onClose, onLogin }: DemoAuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    const finalName = name.trim() || (isSignUp ? 'New Creator' : 'Alex Mercer');
    const finalEmail = email.trim();

    onLogin(finalName, finalEmail);
    showToast({
      type: 'success',
      title: isSignUp ? 'Demo Account Created!' : 'Welcome Back!',
      message: `Signed in as ${finalName}. 100 free credits available.`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center text-white font-bold shadow-md">
            <Film className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-lg text-[var(--color-text)]">CineFlow 2.5</span>
        </div>

        <h3 className="text-xl font-heading font-bold text-[var(--color-text)] mt-3">
          {isSignUp ? 'Create your Creator Account' : 'Sign In to CineFlow Studio'}
        </h3>
        <p className="text-xs text-[var(--color-muted)] mt-1">
          Demo sandbox authentication. Saved locally in your browser with 100 free starting credits.
        </p>

        {/* Demo Alert Badge */}
        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-start gap-2.5 text-xs text-purple-300">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            <strong>Demo Sandbox Mode:</strong> Real password not required. Instantly unlock the 4K synthesis tool with full creative capabilities.
          </span>
        </div>

        {error && (
          <div className="mt-3 p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
                Creator / Studio Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. Apex Visuals"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:border-purple-500 text-xs transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              placeholder="e.g. director@studio.com"
              className="w-full px-3.5 py-2.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:border-purple-500 text-xs transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white gradient-accent glow-accent hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            <span>{isSignUp ? 'Start Generating Free (100 cr)' : 'Sign In To Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[var(--color-muted)] hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isSignUp ? 'Already have a profile? Sign in' : "Don't have an account? Sign up free"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefillFreeCredits: () => void;
}

export function InsufficientCreditsModal({ isOpen, onClose, onRefillFreeCredits }: InsufficientCreditsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[var(--color-surface)] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">
          100% Free Compute Active
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2 leading-relaxed">
          CineFlow 2.5 is completely free for everyone. Click below to instantly refill your generation wallet with unlimited bonus compute!
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onRefillFreeCredits}
            className="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white gradient-accent glow-accent hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Refill +99,999 Free Credits</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface EarlyAccessModalProps {
  isOpen: boolean;
  planName: string;
  onClose: () => void;
  onAwardBonusCredits: (amount: number) => void;
}

export function EarlyAccessModal({ isOpen, planName, onClose, onAwardBonusCredits }: EarlyAccessModalProps) {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleActivateFree = () => {
    onAwardBonusCredits(50000);
    showToast({
      type: 'success',
      title: `${planName} Unlocked 100% Free!`,
      message: 'Unlimited 4K generation compute active.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[var(--color-surface)] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">
          {planName} – 100% Free Tier
        </h3>

        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          No payments, subscriptions, or credit card required. All features including 4K rendering, 30s clips, and multi-reference control are unlocked for everyone.
        </p>

        <button
          type="button"
          onClick={handleActivateFree}
          className="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white gradient-accent glow-accent hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Enjoy All Features Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface TopUpModalProps {
  topup: CreditTopUp | null;
  onClose: () => void;
  onConfirm: (credits: number) => void;
}

export function TopUpModal({ topup, onClose, onConfirm }: TopUpModalProps) {
  if (!topup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 text-center space-y-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center text-white mx-auto shadow-md">
          <Coins className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-heading font-bold text-[var(--color-text)]">
          Add +{topup.credits.toLocaleString()} Credits
        </h3>

        <p className="text-xs text-[var(--color-muted)]">
          Demo sandbox checkout. Confirm below to instantly add {topup.credits} compute credits to your balance for testing.
        </p>

        <button
          onClick={() => onConfirm(topup.credits)}
          className="w-full py-3 rounded-xl gradient-accent text-white font-semibold text-xs cursor-pointer shadow-xs"
        >
          Confirm Free Sandbox Top-Up
        </button>
      </div>
    </div>
  );
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetCredits: () => void;
  onClearHistory: () => void;
}

export function SettingsModal({ isOpen, onClose, onResetCredits, onClearHistory }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-heading font-bold text-[var(--color-text)]">
            Studio Preferences & Cache
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] space-y-2">
            <span className="font-semibold text-[var(--color-text)] block">Credit Balance Utility</span>
            <p className="text-[var(--color-muted)]">Reset your sandbox balance to 100 default credits if needed.</p>
            <button
              onClick={onResetCredits}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Balance to 100</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] space-y-2">
            <span className="font-semibold text-[var(--color-text)] block">Local Library Storage</span>
            <p className="text-[var(--color-muted)]">Clear all stored video metadata from localStorage.</p>
            <button
              onClick={onClearHistory}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Generations Library</span>
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface DailyBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => number;
  credits: number;
  streakDays: number;
  rolloverCredits: number;
  daysRemaining: number;
  licenseExpiry: string;
}

export function DailyBonusModal({
  isOpen,
  onClose,
  onClaim,
  credits,
  streakDays,
  rolloverCredits,
  daysRemaining,
  licenseExpiry,
}: DailyBonusModalProps) {
  const [claimed, setClaimed] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleClaim = () => {
    const amt = onClaim();
    setClaimed(true);
    setClaimedAmount(amt);
    showToast({
      type: 'success',
      title: `+${amt} Credits Deposited!`,
      message: 'Daily credits & streak bonus added. Unused credits roll over forever.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[var(--color-surface)] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with 2-Year Free License Badge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 mb-1">
              <span>2-Year Free Creator Pass • Active</span>
            </div>
            <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">
              Daily 1,000 Credits & Rollover
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          You receive <strong>1,000 fresh credits every day</strong> for 2 years (2026–2028).
          If you don't use your credits today, they <strong>never expire</strong>—they accumulate into your balance automatically!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-center">
            <span className="text-[10px] uppercase font-semibold text-[var(--color-muted)] block">Today's Drop</span>
            <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">+1,000 cr</span>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-center">
            <span className="text-[10px] uppercase font-semibold text-[var(--color-muted)] block">Daily Streak</span>
            <span className="text-base sm:text-lg font-bold font-mono text-amber-400">{streakDays} Days 🔥</span>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-center">
            <span className="text-[10px] uppercase font-semibold text-[var(--color-muted)] block">Rollover Bank</span>
            <span className="text-base sm:text-lg font-bold font-mono text-cyan-400">+{rolloverCredits.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-center">
            <span className="text-[10px] uppercase font-semibold text-[var(--color-muted)] block">Free License</span>
            <span className="text-base sm:text-lg font-bold font-mono text-purple-400">{daysRemaining}d Left</span>
          </div>
        </div>

        {/* Feature Unlocks Notice */}
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs space-y-1.5">
          <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-cyan-400" />
            All Models & Modalities Unlocked Free:
          </span>
          <p className="text-[var(--color-muted)] text-[11px] leading-relaxed">
            • <strong>Google Gemini:</strong> Gemini Omni Flash 1.1 Video, Veo 2 Cinema, Imagen 3 Studio, Lyria 3 AudioFX.<br />
            • <strong>OpenAI ChatGPT:</strong> Sora 2.0 Cinema, Sora Turbo, DALL·E 3 Ultra-HD, Voice Engine HD.<br />
            • <strong>Valid Through:</strong> {licenseExpiry} (100% Free Forever, No Credit Card).
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!claimed ? (
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white gradient-accent glow-accent hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Coins className="w-5 h-5 text-amber-300" />
              <span>Claim Today's 1,000 Credits (+Streak Bonus)</span>
            </button>
          ) : (
            <div className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>+{claimedAmount} Credits Deposited! Next drop in 24 hours.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
