import { useState, useRef } from 'react';
import { Play, Sparkles, Eye, ArrowUpRight, Film, X, Volume2, VolumeX } from 'lucide-react';
import { SHOWCASE_VIDEOS, ShowcaseVideo } from '../data/mockData';

interface ShowcaseGalleryProps {
  onUsePrompt: (prompt: string) => void;
}

export function ShowcaseGallery({ onUsePrompt }: ShowcaseGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<ShowcaseVideo | null>(null);

  const categories = ['All', 'Ads', 'Product', 'Anime', 'Cinematic', 'Social'];

  const filteredVideos =
    selectedCategory === 'All'
      ? SHOWCASE_VIDEOS
      : SHOWCASE_VIDEOS.filter((v) => v.category === selectedCategory);

  const handleOpenLightbox = (video: ShowcaseVideo) => {
    setLightboxVideo(video);
  };

  const handleUsePromptAndClose = (prompt: string) => {
    setLightboxVideo(null);
    onUsePrompt(prompt);
  };

  return (
    <section id="showcase" className="py-24 bg-[var(--color-bg)] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              <Film className="w-3.5 h-3.5" />
              <span>Community Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[var(--color-text)] tracking-tight">
              Rendered With CineFlow 2.5
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-xl">
              Hover to preview motion sequences. Click any card to open the studio lightbox and remix the prompt.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[var(--color-surface)] p-1.5 rounded-2xl border border-[var(--color-border)]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'gradient-accent text-white shadow-xs'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isHovered={activeHoverId === video.id}
              onMouseEnter={() => setActiveHoverId(video.id)}
              onMouseLeave={() => setActiveHoverId(null)}
              onClick={() => handleOpenLightbox(video)}
              onUsePrompt={onUsePrompt}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black">
              <video
                src={lightboxVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">
                    {lightboxVideo.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] font-mono mt-0.5">
                    Category: {lightboxVideo.category} • Duration: {lightboxVideo.duration} • Ratio: {lightboxVideo.aspectRatio}
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--color-muted)]">
                  Created by {lightboxVideo.author}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs text-[var(--color-text)] leading-relaxed italic">
                &ldquo;{lightboxVideo.prompt}&rdquo;
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => handleUsePromptAndClose(lightboxVideo.prompt)}
                  className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white gradient-accent glow-accent flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Try this prompt in Generator</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function VideoCard({
  video,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onUsePrompt,
}: {
  video: ShowcaseVideo;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onUsePrompt: (prompt: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    onMouseEnter();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-purple-500/40 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Video Container (Autoplays on Hover, Click opens Lightbox) */}
      <div
        className="relative aspect-video sm:aspect-[16/10] bg-black overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          loop
          muted
          playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15">
            {video.category} • {video.duration}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
            {video.aspectRatio}
          </span>
        </div>

        {/* Center Hover Trigger Indicator */}
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Play className="w-4 h-4 ml-0.5 fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Body details */}
      <div className="p-5 sm:p-6 space-y-4">
        <div>
          <h4 className="text-base font-heading font-semibold text-[var(--color-text)] tracking-tight">
            {video.title}
          </h4>
          <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-2 leading-relaxed">
            {video.prompt}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--color-muted)] pt-3 border-t border-[var(--color-border)] font-mono">
          <span>By {video.author}</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {video.views}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onUsePrompt(video.prompt)}
          className="w-full py-2.5 px-3 rounded-xl bg-[var(--color-surface-2)] hover:gradient-accent text-[var(--color-text)] hover:text-white font-medium text-xs border border-[var(--color-border)] hover:border-transparent flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-200" />
          <span>Try this prompt in studio</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
