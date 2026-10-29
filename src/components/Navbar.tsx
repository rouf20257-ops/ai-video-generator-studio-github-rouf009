import { useState, useEffect } from 'react';
import {
  Film,
  Coins,
  Sun,
  Moon,
  Menu,
  X,
  User,
  CreditCard,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { User as UserType } from '../types/video';

interface NavbarProps {
  user: UserType;
  credits: number;
  onOpenAuth: (isSignUp?: boolean) => void;
  onLogout: () => void;
  onOpenPricing: () => void;
  onOpenSettings: () => void;
  isMockMode: boolean;
  onToggleMockMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenDailyBonus?: () => void;
}

export function Navbar({
  user,
  credits,
  onOpenAuth,
  onLogout,
  onOpenPricing,
  onOpenSettings,
  isMockMode,
  onToggleMockMode,
  isDarkMode,
  onToggleDarkMode,
  onOpenDailyBonus,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('generator');

  const navLinks = [
    { label: 'Generator', href: '#generator', id: 'generator' },
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Showcase', href: '#showcase', id: 'showcase' },
    { label: 'Use Cases', href: '#use-cases', id: 'use-cases' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLoggedIn = Boolean(user.email);

  return (
    <header className="sticky top-0 z-40 w-full h-[72px] backdrop-blur-xl bg-[var(--color-bg)]/85 border-b border-[var(--color-border)] transition-colors">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Left: Logo Mark + Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-xl gradient-accent p-0.5 shadow-lg shadow-purple-950/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[var(--color-surface)] rounded-[10px] flex items-center justify-center">
              <Film className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-tight text-[var(--color-text)]">
                CineFlow
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                2.5
              </span>
            </div>
            <span className="text-[10px] text-[var(--color-muted)] hidden sm:block tracking-wide">
              Multimodal AI Video
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links with active indicator */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-surface)]/60 px-3 py-1.5 rounded-full border border-[var(--color-border)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-sm'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Demo / Live Engine toggle */}
          <button
            onClick={onToggleMockMode}
            title={isMockMode ? 'Switch to Live Gemini API Mode' : 'Switch to Demo Simulator Mode'}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
              isMockMode
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isMockMode ? 'bg-amber-400' : 'bg-emerald-400'
              } animate-pulse`}
            />
            <span>{isMockMode ? 'Demo Mode' : 'Gemini Engine'}</span>
          </button>

          {/* 2-Year Free Pass & Daily 1,000 Credits Button */}
          <button
            type="button"
            onClick={onOpenDailyBonus || onOpenPricing}
            className="flex items-center gap-1.5 bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] border border-emerald-500/40 rounded-full pl-2.5 pr-3 py-1 text-xs shadow-xs transition-colors cursor-pointer group"
            title="Click to view 2-Year Free Pass and claim Daily 1,000 Credits with Rollover"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-emerald-400 font-mono">
              {credits.toLocaleString()} cr
            </span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden sm:inline">
              +1k Daily Drop
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold hidden md:inline">
              • 2-Yr Free
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Toggle dark/light theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-cyan-500" />}
          </button>

          {/* User Auth: Login & Sign up buttons OR Avatar Dropdown */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth(false)}
                className="hidden sm:inline-block px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => onOpenAuth(true)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white gradient-accent glow-accent hover:opacity-95 transition-all cursor-pointer"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-violet-500/40 transition-colors cursor-pointer"
                aria-label="User account dropdown"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-2 shadow-2xl shadow-black/40 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
                    <p className="text-xs font-semibold text-[var(--color-text)] truncate">{user.name}</p>
                    <p className="text-[11px] text-[var(--color-muted)] truncate">{user.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-semibold uppercase">
                        {user.plan} Plan
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono">
                        {user.credits} cr
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      const el = document.getElementById('my-generations');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[var(--color-text)] hover:bg-[var(--color-surface-2)] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    <span>My Videos</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenPricing();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[var(--color-text)] hover:bg-[var(--color-surface-2)] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Billing & Credits</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[var(--color-text)] hover:bg-[var(--color-surface-2)] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-purple-400" />
                    <span>Settings</span>
                  </button>

                  <div className="my-1 border-t border-[var(--color-border)]" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Open mobile navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Full-Height Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs h-full bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-250">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-accent p-0.5">
                    <div className="w-full h-full bg-[var(--color-surface)] rounded-[6px] flex items-center justify-center">
                      <Film className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                  <span className="font-heading font-bold text-base text-[var(--color-text)]">
                    CineFlow 2.5
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-[var(--color-border)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-muted)]">Engine Mode</span>
                  <button
                    onClick={onToggleMockMode}
                    className="font-medium px-2.5 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-border)]"
                  >
                    {isMockMode ? 'Demo Mode' : 'Gemini Engine'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-muted)]">Credits Balance</span>
                  <span className="font-bold text-amber-400 font-mono">{credits} credits</span>
                </div>
              </div>
            </div>

            {/* Bottom drawer auth actions */}
            <div className="pt-6 border-t border-[var(--color-border)] space-y-2">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth(false);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-medium text-[var(--color-text)] bg-[var(--color-surface-2)] border border-[var(--color-border)]"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth(true);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold text-white gradient-accent"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20"
                >
                  Log out ({user.name})
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
