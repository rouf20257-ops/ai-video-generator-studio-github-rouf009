import { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Play, Pause, Volume2, VolumeX, Clapperboard, Film, Layers, Camera } from 'lucide-react';

interface HeroProps {
  onStartGenerating: () => void;
  onWatchExamples: () => void;
}

export function Hero({ onStartGenerating, onWatchExamples }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Animated radial gradient blobs & faint grid pattern background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Faint grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Gradient Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-purple-600/25 via-blue-600/20 to-cyan-500/20 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, CTAs & Trust Chips */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-7">
            {/* Small pill badge above title */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-emerald-500/40 text-xs text-[var(--color-text)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-emerald-400">
                2-Year Free Access Active (2026–2028)
              </span>
              <span className="text-[var(--color-muted)]">• Gemini & ChatGPT Engines</span>
            </div>

            {/* H1: Turn Ideas Into Cinematic AI Videos, Images & Audio */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-extrabold tracking-tight text-[var(--color-text)] leading-[1.12]">
              Create AI Videos, Images & Audio With{' '}
              <span className="gradient-accent-text drop-shadow-[0_4px_30px_rgba(124,58,237,0.35)]">
                Gemini & ChatGPT
              </span>
            </h1>

            {/* Subtitle (2 lines) */}
            <p className="text-base sm:text-lg text-[var(--color-muted)] max-w-xl font-normal leading-relaxed">
              Powered by <strong>Gemini Omni Flash 1.1</strong>, Veo 2 Cinema, OpenAI Sora 2.0, Imagen 3, and DALL·E 3. Enjoy <strong>1,000 daily credits</strong> that roll over and accumulate forever!
            </p>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStartGenerating}
                className="px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-white gradient-accent glow-accent hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>Start Generating (100% Free)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onWatchExamples}
                className="px-6 py-4 rounded-xl font-medium text-sm sm:text-base text-[var(--color-text)] hover:bg-[var(--color-surface-2)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span>Watch Examples</span>
              </button>
            </div>

            {/* Trust row: 4 stat chips */}
            <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center gap-2.5 text-xs text-[var(--color-muted)]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold">2-Yr Free License ($0)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold text-[var(--color-text)]">+1k Daily Credits Rollover</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-semibold text-[var(--color-text)]">Gemini Omni Flash 1.1</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="font-semibold text-[var(--color-text)]">OpenAI Sora & DALL·E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Showcase Video Card with Floating Glass Chips */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[24px] p-2 bg-gradient-to-b from-purple-500/25 via-blue-500/10 to-cyan-500/20 backdrop-blur-xl shadow-2xl shadow-purple-950/40">
              <div className="relative rounded-[20px] overflow-hidden bg-black aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] group border border-[var(--color-border)]">
                {/* Loop Video */}
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                />

                {/* Floating Glass Chips that gently float */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium animate-bounce shadow-md">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Text to Video</span>
                </div>

                <div className="absolute top-16 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-md">
                  <Camera className="w-3.5 h-3.5 text-purple-400" />
                  <span>Image to Video</span>
                </div>

                <div className="absolute bottom-24 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-md">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>References (Up to 9)</span>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white flex flex-col gap-2">
                  <p className="text-xs text-slate-200 line-clamp-1 italic">
                    &ldquo;Cyberpunk courier dashing through rain-soaked neon alleyways of Neo-Tokyo...&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-300" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-mono">
                      <span>4K • 60 FPS • Binaural Audio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
