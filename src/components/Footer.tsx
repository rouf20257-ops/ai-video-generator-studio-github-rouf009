import { Film, Twitter, Github, Youtube, ArrowUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-12 relative text-[var(--color-muted)] text-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--color-border)]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gradient-accent p-0.5">
                <div className="w-full h-full bg-[var(--color-surface)] rounded-[10px] flex items-center justify-center text-white">
                  <Film className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-heading font-bold text-lg text-[var(--color-text)]">CineFlow 2.5</span>
            </div>
            <p className="max-w-sm leading-relaxed text-[var(--color-muted)]">
              Next-generation multimodal AI video synthesis platform. Text-to-video, image animation, and multi-reference consistency up to 4K resolution.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-rose-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h5 className="font-heading font-semibold text-[var(--color-text)] uppercase tracking-wider text-xs">
              Product
            </h5>
            <ul className="space-y-2">
              <li><a href="#generator" className="hover:text-cyan-400 transition-colors">Text to Video</a></li>
              <li><a href="#generator" className="hover:text-cyan-400 transition-colors">Image Animation</a></li>
              <li><a href="#generator" className="hover:text-cyan-400 transition-colors">Multi-Reference Matrix</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Spatial Sound Engine</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Native 4K Pipeline</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h5 className="font-heading font-semibold text-[var(--color-text)] uppercase tracking-wider text-xs">
              Resources
            </h5>
            <ul className="space-y-2">
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Showcase Gallery</a></li>
              <li><a href="#use-cases" className="hover:text-cyan-400 transition-colors">Creator Guides</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><span className="text-[var(--color-muted)]/60">API Reference (Soon)</span></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h5 className="font-heading font-semibold text-[var(--color-text)] uppercase tracking-wider text-xs">
              Company & Legal
            </h5>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Ethics & Safety</a></li>
              <li><span className="text-slate-500">Seedance Architecture</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Language placeholder, copyright, scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-[11px] text-[var(--color-muted)]">
              &copy; {new Date().getFullYear()} CineFlow 2.5 AI. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[var(--color-muted)]">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors text-xs cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
