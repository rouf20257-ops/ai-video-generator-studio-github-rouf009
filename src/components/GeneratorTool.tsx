import { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import {
  Sparkles,
  Upload,
  Film,
  Camera,
  Layers,
  Volume2,
  VolumeX,
  Sliders,
  Dices,
  Lock,
  Unlock,
  Play,
  Pause,
  Download,
  Share2,
  RefreshCw,
  Heart,
  Trash2,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  X,
  FileVideo,
  Music,
  ArrowRight,
  Maximize2,
  Coins,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  RotateCcw,
  Zap,
  Radio,
  FileAudio,
} from 'lucide-react';
import {
  Modality,
  Mode,
  GenerationParams,
  Generation,
  UploadedFile,
  ALL_AI_MODELS,
  AIModel,
  ImageStyle,
  AudioGenre,
} from '../types/video';
import { EXAMPLE_PROMPTS, ExamplePrompt } from '../data/mockData';
import {
  generateVideo,
  pollJob,
  cancelJob,
  enhancePrompt,
  calculateCreditCost,
} from '../services/videoService';
import { useToast } from './Toast';

interface GeneratorToolProps {
  userCredits: number;
  streakDays?: number;
  rolloverCredits?: number;
  daysRemaining?: number;
  onDeductCredits: (amount: number) => boolean;
  onRefundCredits: (amount: number) => void;
  generations: Generation[];
  onAddGeneration: (media: Generation) => void;
  onDeleteGeneration: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpenDailyBonus?: () => void;
  isMockMode: boolean;
}

export function GeneratorTool({
  userCredits,
  streakDays = 3,
  rolloverCredits = 3000,
  daysRemaining = 730,
  onDeductCredits,
  onRefundCredits,
  generations,
  onAddGeneration,
  onDeleteGeneration,
  onToggleFavorite,
  onOpenDailyBonus,
  isMockMode,
}: GeneratorToolProps) {
  const { showToast } = useToast();

  // Modality & Mode
  const [modality, setModality] = useState<Modality>('video');
  const [mode, setMode] = useState<Mode>('text');

  // Model Family & Selected Model
  const [modelFamilyFilter, setModelFamilyFilter] = useState<'all' | 'gemini' | 'openai'>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>('gemini-omni-1.1-flash');

  // Input states
  const [prompt, setPrompt] = useState<string>(
    'A cyberpunk courier in glowing iridescent streetwear dashing through rain-soaked neon alleyways of Neo-Tokyo, holographic billboards reflecting on dark wet asphalt, anamorphic blue-violet lens flare, rapid handheld camera tracking.'
  );
  const [previousPrompt, setPreviousPrompt] = useState<string | null>(null);
  const [negativePrompt, setNegativePrompt] = useState<string>(
    'low resolution, blur, distorted anatomy, text watermark, flicker'
  );
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Modality-specific parameters
  const [duration, setDuration] = useState<number>(6);
  const [resolution, setResolution] = useState<'480p' | '720p' | '1080p' | '4K'>('1080p');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '4:3' | '21:9'>('16:9');
  const [audio, setAudio] = useState<boolean>(true);
  const [cameraMotion, setCameraMotion] = useState<string>('Handheld');
  const [imageStyle, setImageStyle] = useState<ImageStyle>('cinematic-film');
  const [audioGenre, setAudioGenre] = useState<AudioGenre>('cinematic-score');
  const [seed, setSeed] = useState<number>(489201);
  const [isSeedLocked, setIsSeedLocked] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<number>(1);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Enhancer states
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);

  // Active Job & Generation Lifecycle
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [stageMessage, setStageMessage] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [lastDeductedCredits, setLastDeductedCredits] = useState<number>(0);

  // Active result player
  const [activeMedia, setActiveMedia] = useState<Generation | null>(
    generations.length > 0 ? generations[0] : null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [mediaDuration, setMediaDuration] = useState<number>(0);
  const [showDetailsAccordion, setShowDetailsAccordion] = useState<boolean>(false);

  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // History filtering & sorting
  const [historyFilter, setHistoryFilter] = useState<'all' | 'video' | 'image' | 'audio' | 'favorites'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Available models for current modality & family filter
  const availableModels = ALL_AI_MODELS.filter((m) => {
    if (m.modality !== modality) return false;
    if (modelFamilyFilter === 'all') return true;
    return m.family === modelFamilyFilter;
  });

  // Switch default model when modality changes
  useEffect(() => {
    if (modality === 'video') {
      setSelectedModelId('gemini-omni-1.1-flash');
      setPrompt('A cyberpunk courier in glowing iridescent streetwear dashing through rain-soaked neon alleyways of Neo-Tokyo, holographic billboards reflecting on dark wet asphalt, anamorphic blue-violet lens flare, rapid handheld camera tracking.');
    } else if (modality === 'image') {
      setSelectedModelId('imagen-3');
      setPrompt('Ultra-detailed studio portrait of a futuristic cybernetic geisha with porcelain and carbon fiber skin, glowing teal fiber-optic floral hairpins, hyper-detailed eyes, shot on 85mm f/1.2 lens.');
    } else if (modality === 'audio') {
      setSelectedModelId('lyria-3-clip');
      setPrompt('Dramatic cinematic orchestral score with thunderous Taiko drums, brooding cello harmonies, brass swells, and a soaring violin crescendo leading to a massive sub-bass impact drop.');
    }
  }, [modality]);

  const currentModel = ALL_AI_MODELS.find((m) => m.id === selectedModelId) || availableModels[0] || ALL_AI_MODELS[0];

  const currentParams: GenerationParams = {
    modality,
    mode,
    prompt: prompt.trim(),
    negativePrompt: negativePrompt.trim(),
    files,
    duration,
    resolution,
    aspectRatio,
    audio,
    cameraMotion,
    seed,
    model: currentModel.id,
    modelFamily: currentModel.family,
    outputs,
    imageStyle,
    audioGenre,
  };

  const isPromptValid = prompt.trim().length > 0;

  // File uploads
  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);

    const maxAllowed = mode === 'image' ? 1 : 9;
    const remainingSlots = maxAllowed - files.length;
    if (remainingSlots <= 0) {
      setUploadError(`Maximum ${maxAllowed} file(s) allowed in ${mode} mode.`);
      return;
    }

    const filesToProcess = Array.from(fileList).slice(0, remainingSlots);
    const newUploadedFiles: UploadedFile[] = [];

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      let cat: 'image' | 'video' | 'audio' = 'image';
      let maxSize = 10 * 1024 * 1024; // 10MB default image

      if (file.type.startsWith('image/')) {
        cat = 'image';
        maxSize = 10 * 1024 * 1024;
      } else if (file.type.startsWith('video/')) {
        cat = 'video';
        maxSize = 100 * 1024 * 1024;
      } else if (file.type.startsWith('audio/')) {
        cat = 'audio';
        maxSize = 20 * 1024 * 1024;
      } else {
        setUploadError(`Unsupported format: ${file.name}. Only images, videos, and audio are accepted.`);
        continue;
      }

      if (file.size > maxSize) {
        setUploadError(`"${file.name}" exceeds max allowed size (${Math.round(maxSize / 1024 / 1024)}MB).`);
        continue;
      }

      const dummyUrl = URL.createObjectURL(file);
      const tagIndex = files.length + newUploadedFiles.length + 1;
      newUploadedFiles.push({
        id: `file_${Date.now()}_${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: dummyUrl,
        tag: `@ref${tagIndex}`,
        category: cat,
      });
    }

    if (newUploadedFiles.length > 0) {
      setFiles((prev) => [...prev, ...newUploadedFiles]);
      showToast({
        type: 'success',
        title: 'Assets Attached',
        message: `Added ${newUploadedFiles.length} reference asset(s) to synthesis queue.`,
      });
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleSelectPromptChip = (chip: ExamplePrompt) => {
    setPrompt(chip.prompt);
    if (chip.aspectRatio) setAspectRatio(chip.aspectRatio);
    if (chip.cameraMotion) setCameraMotion(chip.cameraMotion);
    showToast({
      type: 'info',
      title: 'Preset Scene Applied',
      message: `Loaded "${chip.title}" prompt into studio.`,
    });
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    setPreviousPrompt(prompt);
    try {
      const enhanced = await enhancePrompt(prompt, modality);
      setPrompt(enhanced);
      showToast({
        type: 'success',
        title: 'AI Prompt Director Applied',
        message: `Upgraded prompt using Gemini director neural expander.`,
      });
    } catch {
      showToast({
        type: 'error',
        title: 'Enhance Failed',
        message: 'Could not enhance prompt. Please check connection.',
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleUndoEnhance = () => {
    if (previousPrompt) {
      setPrompt(previousPrompt);
      setPreviousPrompt(null);
      showToast({
        type: 'info',
        title: 'Reverted Prompt',
        message: 'Restored your original prompt text.',
      });
    }
  };

  const handleRandomizeSeed = () => {
    if (isSeedLocked) return;
    setSeed(Math.floor(Math.random() * 1000000));
  };

  // Launch generation
  const handleGenerate = async () => {
    if (!isPromptValid || isGenerating) return;

    onDeductCredits(0);
    setLastDeductedCredits(0);
    setIsGenerating(true);
    setProgress(5);
    setStageMessage(`Submitting to ${currentModel.name}...`);
    setElapsedSeconds(0);

    try {
      const jobId = await generateVideo(currentParams);
      setActiveJobId(jobId);
    } catch (err: any) {
      setIsGenerating(false);
      showToast({
        type: 'error',
        title: 'Generation Failed',
        message: err?.message || 'Could not start generation job.',
      });
    }
  };

  const handleCancelGeneration = async () => {
    if (!activeJobId) return;
    await cancelJob(activeJobId);
    onRefundCredits(lastDeductedCredits);
    setIsGenerating(false);
    setActiveJobId(null);
    setProgress(0);
    showToast({
      type: 'info',
      title: 'Generation Cancelled',
      message: 'Job cancelled successfully.',
    });
  };

  // Polling Effect
  useEffect(() => {
    let pollTimer: NodeJS.Timeout | null = null;
    let stopwatch: NodeJS.Timeout | null = null;

    if (isGenerating && activeJobId) {
      stopwatch = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      pollTimer = setInterval(async () => {
        try {
          const res = await pollJob(activeJobId);
          setProgress(res.progress);
          setStageMessage(res.stageMessage);

          if (res.status === 'done') {
            clearInterval(pollTimer!);
            clearInterval(stopwatch!);
            setIsGenerating(false);

            const newGen: Generation = {
              id: `gen_${Date.now()}`,
              modality,
              params: currentParams,
              status: 'done',
              progress: 100,
              videoUrl: res.videoUrl,
              imageUrl: res.imageUrl,
              audioUrl: res.audioUrl,
              thumbnailUrl: res.thumbnailUrl || (modality === 'image' ? res.imageUrl : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'),
              createdAt: Date.now(),
              creditsUsed: 0,
              favorite: false,
              generationSeconds: elapsedSeconds + 1,
              modelName: currentModel.name,
            };

            onAddGeneration(newGen);
            setActiveMedia(newGen);

            if (!isSeedLocked) {
              setSeed(Math.floor(Math.random() * 1000000));
            }

            showToast({
              type: 'success',
              title: `${modality.toUpperCase()} Synthesized!`,
              message: `Generated with ${currentModel.name} (100% Free).`,
            });
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 1200);
    }

    return () => {
      if (pollTimer) clearInterval(pollTimer);
      if (stopwatch) clearInterval(stopwatch);
    };
  }, [isGenerating, activeJobId, currentParams, currentModel.name, elapsedSeconds, isSeedLocked, modality, onAddGeneration, showToast]);

  // Video playback controls
  const handlePlayPause = () => {
    if (activeMedia?.modality === 'audio') {
      if (audioPlayerRef.current) {
        if (isPlaying) {
          audioPlayerRef.current.pause();
        } else {
          audioPlayerRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
      return;
    }

    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
      } else {
        videoPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (activeMedia?.modality === 'audio' && audioPlayerRef.current) {
      setCurrentTime(audioPlayerRef.current.currentTime);
      setMediaDuration(audioPlayerRef.current.duration || 0);
    } else if (videoPlayerRef.current) {
      setCurrentTime(videoPlayerRef.current.currentTime);
      setMediaDuration(videoPlayerRef.current.duration || 0);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (activeMedia?.modality === 'audio' && audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = time;
    } else if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = time;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (activeMedia?.modality === 'audio' && audioPlayerRef.current) {
      audioPlayerRef.current.playbackRate = speed;
    } else if (videoPlayerRef.current) {
      videoPlayerRef.current.playbackRate = speed;
    }
  };

  const handleDownload = () => {
    if (!activeMedia) return;
    const downloadUrl = activeMedia.videoUrl || activeMedia.imageUrl || activeMedia.audioUrl;
    if (!downloadUrl) return;

    const ext = activeMedia.modality === 'video' ? 'mp4' : activeMedia.modality === 'image' ? 'png' : 'mp3';
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `cineflow_${activeMedia.modality}_${activeMedia.id}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast({
      type: 'info',
      title: 'Download Started',
      message: `Exporting master ${ext.toUpperCase()} stream to device.`,
    });
  };

  const handleCopyLink = () => {
    if (!activeMedia) return;
    const url = activeMedia.videoUrl || activeMedia.imageUrl || activeMedia.audioUrl || window.location.href;
    navigator.clipboard.writeText(url);
    showToast({
      type: 'success',
      title: 'Share Link Copied',
      message: 'Direct media link copied to clipboard.',
    });
  };

  const handleUsePromptFromMedia = (media: Generation) => {
    setPrompt(media.params.prompt);
    setModality(media.modality || 'video');
    if (media.params.aspectRatio) setAspectRatio(media.params.aspectRatio);
    if (media.params.cameraMotion) setCameraMotion(media.params.cameraMotion);
    showToast({
      type: 'info',
      title: 'Prompt Loaded to Studio',
      message: 'Parameters populated in left control deck.',
    });
  };

  const handleVariationSeed = () => {
    setSeed((prev) => prev + 1);
    showToast({
      type: 'info',
      title: 'Variation Seed Set (Seed+1)',
      message: `Seed set to ${seed + 1} for micro-variation testing.`,
    });
    handleGenerate();
  };

  // Filtered library items
  const filteredGenerations = generations.filter((item) => {
    if (historyFilter === 'favorites') return item.favorite;
    if (historyFilter === 'video') return item.modality === 'video';
    if (historyFilter === 'image') return item.modality === 'image';
    if (historyFilter === 'audio') return item.modality === 'audio';
    return true;
  });

  const relevantPromptChips = EXAMPLE_PROMPTS.filter((p) => p.modality === modality);

  return (
    <section id="generator" className="py-20 md:py-28 bg-[var(--color-bg)] relative">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Row with 2-Year Free License & 1,000 Daily Credits Rollover */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-[var(--color-surface)] border border-emerald-500/30 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                2-Year Free Creator Pass (2026–2028)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold text-xs border border-cyan-500/30">
                Gemini Omni Flash 1.1 + Sora 2.0
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[var(--color-text)]">
              CineFlow Multimodal Studio: Video, Image & Audio
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Daily <strong>1,000 credits</strong> automatically granted. Unused credits <strong>accumulate & roll over forever</strong> with zero fees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenDailyBonus}
              className="px-4 py-2.5 rounded-2xl bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] border border-emerald-500/40 text-left transition-all cursor-pointer flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Coins className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {userCredits.toLocaleString()} Credits Available
                </span>
                <span className="text-[10px] text-[var(--color-muted)]">
                  {streakDays}d Streak • +1,000 Daily Drop
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Studio Primary Modality Switcher (Video | Image | Audio) */}
        <div className="flex items-center justify-center">
          <div className="p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setModality('video')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                modality === 'video'
                  ? 'gradient-accent text-white shadow-md'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Video Generation</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-white/20">
                Omni 1.1 / Veo 2
              </span>
            </button>

            <button
              type="button"
              onClick={() => setModality('image')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                modality === 'image'
                  ? 'gradient-accent text-white shadow-md'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image Studio</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-white/20">
                Imagen 3 / DALL·E 3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setModality('audio')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                modality === 'audio'
                  ? 'gradient-accent text-white shadow-md'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Audio & Foley</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full bg-white/20">
                Lyria 3 / Voice HD
              </span>
            </button>
          </div>
        </div>

        {/* Generator Main Split Deck: Left 46% controls, Right 54% preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Controls Card */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-5 sm:p-7 shadow-xl card-highlight space-y-6">
            {/* Model Selector Section with Family Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI Neural Model Engine</span>
                </label>
                <div className="flex items-center gap-1 bg-[var(--color-surface-2)] p-1 rounded-lg border border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setModelFamilyFilter('all')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      modelFamilyFilter === 'all' ? 'bg-purple-600 text-white' : 'text-[var(--color-muted)]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelFamilyFilter('gemini')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      modelFamilyFilter === 'gemini' ? 'bg-cyan-500 text-white' : 'text-[var(--color-muted)]'
                    }`}
                  >
                    Gemini
                  </button>
                  <button
                    type="button"
                    onClick={() => setModelFamilyFilter('openai')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      modelFamilyFilter === 'openai' ? 'bg-emerald-500 text-white' : 'text-[var(--color-muted)]'
                    }`}
                  >
                    ChatGPT
                  </button>
                </div>
              </div>

              {/* Model Cards Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableModels.map((m) => {
                  const isSelected = m.id === selectedModelId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModelId(m.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[var(--color-surface-2)] border-cyan-400 shadow-md ring-1 ring-cyan-400/30'
                          : 'bg-[var(--color-surface-2)]/60 border-[var(--color-border)] hover:border-purple-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-xs text-[var(--color-text)] line-clamp-1">
                            {m.name}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase shrink-0 ${
                              m.family === 'gemini'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {m.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-[var(--color-muted)] line-clamp-2 leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[9px] text-[var(--color-muted)]">
                        <span>{m.resolutionSupport}</span>
                        <span className="font-semibold text-cyan-400">{m.speed}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode Tabs (Only for Video: Text to Video | Image to Video | Reference to Video) */}
            {modality === 'video' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text)]">
                  <span>Input Mode:</span>
                </div>
                <div className="grid grid-cols-3 gap-1 bg-[var(--color-surface-2)] p-1 rounded-2xl border border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setMode('text')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mode === 'text'
                        ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm border border-[var(--color-border)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Text to Video</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('image')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mode === 'image'
                        ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm border border-[var(--color-border)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-purple-400" />
                    <span>Image to Video</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('reference')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mode === 'reference'
                        ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm border border-[var(--color-border)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>References (≤9)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Prompt Textarea Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text)]">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span>Generation Prompt</span>
                  <span className="text-[11px] text-[var(--color-muted)] font-normal font-mono">
                    ({prompt.length}/2000)
                  </span>
                </span>

                <div className="flex items-center gap-2">
                  {previousPrompt && (
                    <button
                      type="button"
                      onClick={handleUndoEnhance}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Undo</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !prompt.trim()}
                    className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
                    <span>{isEnhancing ? 'Enhancing...' : 'Enhance with Gemini'}</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={5}
                maxLength={2000}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe your ${modality}: subject, action, lighting, textures, camera movement, or audio cues...`}
                className="w-full p-4 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:border-cyan-400 text-sm leading-relaxed resize-y transition-colors"
              />

              {/* Preset Scene Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-[var(--color-muted)] font-medium">
                  Preset Scene Chips:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {relevantPromptChips.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectPromptChip(item)}
                      className="px-2.5 py-1 rounded-lg bg-[var(--color-surface-2)] hover:bg-purple-900/20 border border-[var(--color-border)] hover:border-purple-500/30 text-xs text-[var(--color-text)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Zone (For Image / Reference Modes in Video) */}
            {modality === 'video' && (mode === 'image' || mode === 'reference') && (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text)]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    {mode === 'image' ? 'Starting Frame Image' : `Reference Media (${files.length}/9)`}
                  </span>
                  <span className="text-[var(--color-muted)] text-[11px]">
                    {mode === 'image' ? '≤10MB Image' : 'Image ≤10MB • Video ≤100MB • Audio ≤20MB'}
                  </span>
                </div>

                {uploadError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="relative group p-2 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex flex-col gap-1 text-xs"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40">
                        {file.category === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center text-purple-400">
                            <FileVideo className="w-6 h-6" />
                          </div>
                        ) : file.category === 'audio' ? (
                          <div className="w-full h-full flex items-center justify-center text-cyan-400">
                            <Music className="w-6 h-6" />
                          </div>
                        ) : (
                          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-slate-300 hover:text-rose-400"
                          aria-label="Remove asset"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-cyan-400 font-bold">{file.tag}</span>
                        <span className="text-[var(--color-muted)] uppercase tracking-wider">{file.category}</span>
                      </div>
                    </div>
                  ))}

                  {files.length < (mode === 'image' ? 1 : 9) && (
                    <label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        dragActive
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-[var(--color-border)] hover:border-purple-500/50 bg-[var(--color-surface-2)]/40'
                      }`}
                    >
                      <Upload className="w-5 h-5 text-[var(--color-muted)]" />
                      <span className="text-[11px] font-medium text-[var(--color-muted)]">
                        Drop or Browse
                      </span>
                      <input
                        type="file"
                        multiple={mode === 'reference'}
                        accept="image/*,video/*,audio/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Modality Specific Settings */}
            <div className="space-y-4 pt-1">
              {/* Aspect Ratio Row (For Video & Image) */}
              {modality !== 'audio' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text)]">Aspect Ratio</label>
                  <div className="flex flex-wrap gap-2">
                    {(['16:9', '9:16', '1:1', '4:3', '21:9'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                          aspectRatio === ratio
                            ? 'gradient-accent text-white border-transparent shadow-sm'
                            : 'bg-[var(--color-surface-2)] text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Specific: Duration, Resolution, Camera Motion */}
              {modality === 'video' && (
                <>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--color-text)]">Duration</span>
                      <span className="font-mono text-cyan-400 font-bold">{duration} seconds</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={30}
                      step={1}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--color-text)]">Resolution</label>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                      >
                        <option value="480p">480p Fast</option>
                        <option value="720p">720p Standard</option>
                        <option value="1080p">1080p Full HD</option>
                        <option value="4K">4K Ultra HD (Unlocked Free)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--color-text)]">Camera Motion</label>
                      <select
                        value={cameraMotion}
                        onChange={(e) => setCameraMotion(e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                      >
                        <option value="Auto">Auto Directed</option>
                        <option value="Static">Static Locked Tripod</option>
                        <option value="Pan">Horizontal Pan</option>
                        <option value="Tilt">Vertical Tilt</option>
                        <option value="Zoom in">Dolly Zoom In</option>
                        <option value="Orbit">360° Subject Orbit</option>
                        <option value="Handheld">Dynamic Handheld</option>
                        <option value="Drone">FPV Drone Flight</option>
                      </select>
                    </div>
                  </div>

                  {/* Audio Synthesis Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="font-semibold text-[var(--color-text)] block">
                          Native Spatial Audio
                        </span>
                        <span className="text-[10px] text-[var(--color-muted)]">
                          Synthesize synchronized sound effects & score
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAudio(!audio)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                        audio ? 'gradient-accent' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          audio ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </>
              )}

              {/* Image Specific Controls */}
              {modality === 'image' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-text)]">Aesthetic Style</label>
                    <select
                      value={imageStyle}
                      onChange={(e) => setImageStyle(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                    >
                      <option value="cinematic-film">Cinematic Film</option>
                      <option value="photorealistic">Photorealistic RAW</option>
                      <option value="anime">Anime & Manga</option>
                      <option value="cyberpunk">Cyberpunk Neon</option>
                      <option value="3d-render">3D Octane Render</option>
                      <option value="oil-painting">Oil Painting</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-text)]">Output Quality</label>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                    >
                      <option value="1080p">Standard HD</option>
                      <option value="4K">4K Ultra-HD Master (Free)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Audio Specific Controls */}
              {modality === 'audio' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-text)]">Audio Genre / Mood</label>
                    <select
                      value={audioGenre}
                      onChange={(e) => setAudioGenre(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                    >
                      <option value="cinematic-score">Cinematic Score</option>
                      <option value="ambient-foley">3D Ambient Foley</option>
                      <option value="cyberpunk-electronic">Cyberpunk Electronic</option>
                      <option value="lofi-chill">Lo-Fi Chill Beat</option>
                      <option value="orchestral-epic">Epic Orchestral</option>
                      <option value="vocal-narration">Vocal & Narration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--color-text)]">Audio Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                    >
                      <option value={10}>10 Seconds (Sample)</option>
                      <option value={30}>30 Seconds (Standard)</option>
                      <option value={60}>60 Seconds (Extended)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Advanced Accordion (Negative prompt, Seed) */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] font-semibold cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Advanced Parameters</span>
                  {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showAdvanced && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[var(--color-text)]">Negative Prompt</label>
                      <input
                        type="text"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="e.g. blurry, deformed faces, watermark"
                        className="w-full px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-text)] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-medium text-[var(--color-text)]">Seed</label>
                        <button
                          type="button"
                          onClick={() => setIsSeedLocked(!isSeedLocked)}
                          className="flex items-center gap-1 text-[11px] text-[var(--color-muted)] hover:text-cyan-400"
                        >
                          {isSeedLocked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                          <span>{isSeedLocked ? 'Seed Locked' : 'Unlock Seed'}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={seed}
                          onChange={(e) => setSeed(Number(e.target.value))}
                          disabled={isSeedLocked}
                          className="w-full px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-xs font-mono text-[var(--color-text)] focus:outline-none disabled:opacity-50"
                        />
                        <button
                          type="button"
                          onClick={handleRandomizeSeed}
                          disabled={isSeedLocked}
                          className="px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] hover:bg-[var(--color-surface-2)] flex items-center gap-1 shrink-0 disabled:opacity-50 cursor-pointer"
                        >
                          <Dices className="w-4 h-4 text-cyan-400" />
                          <span>Random</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button & Cost Bar */}
            <div className="pt-4 border-t border-[var(--color-border)] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--color-muted)]">Cost:</span>
                  <span className="font-bold font-mono text-emerald-400 text-sm">
                    0 Credits (100% Free)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="text-[var(--color-muted)]">Selected:</span>
                  <span className="font-bold text-cyan-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentModel.name}
                  </span>
                </div>
              </div>

              <div className="relative group">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || !isPromptValid}
                  className="w-full h-14 rounded-2xl font-bold text-sm text-white gradient-accent glow-accent hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-cyan-200" />
                      <span>Synthesizing with {currentModel.name} ({progress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-cyan-200" />
                      <span>Generate {modality.toUpperCase()} Free (Omni & Sora)</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[var(--color-muted)] leading-relaxed text-center">
                2-Year Free License Active • Unused credits accumulate daily • Powered by Google Gemini & OpenAI
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Results Preview & Video Player */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-5 sm:p-7 shadow-xl card-highlight flex flex-col justify-between min-h-[580px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Synthesizer Canvas</span>
                </span>
                {activeMedia && (
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {activeMedia.modelName || activeMedia.params.model}
                  </span>
                )}
              </div>

              {/* Progress Skeleton state */}
              {isGenerating ? (
                <div className="p-8 rounded-2xl bg-[var(--color-surface-2)] border border-purple-500/30 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl gradient-accent glow-accent flex items-center justify-center text-white mx-auto animate-pulse">
                    <RefreshCw className="w-8 h-8 animate-spin text-cyan-200" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg text-[var(--color-text)]">
                      Synthesizing {modality.toUpperCase()} with {currentModel.name}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] min-h-[20px]">
                      {stageMessage}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[var(--color-surface)] rounded-full h-2.5 overflow-hidden border border-[var(--color-border)]">
                    <div
                      className="h-full gradient-accent transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--color-muted)] font-mono">
                    <span>Elapsed: {elapsedSeconds}s</span>
                    <span className="font-bold text-cyan-400">{progress}%</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelGeneration}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 cursor-pointer"
                  >
                    Cancel Generation
                  </button>
                </div>
              ) : activeMedia ? (
                /* Result Previewer (Video / Image / Audio) */
                <div className="space-y-4">
                  {/* Media Content Display */}
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-[var(--color-border)] group">
                    {activeMedia.modality === 'video' ? (
                      <video
                        ref={videoPlayerRef}
                        src={activeMedia.videoUrl}
                        playsInline
                        loop={isLooping}
                        muted={isMuted}
                        onTimeUpdate={handleTimeUpdate}
                        onClick={handlePlayPause}
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    ) : activeMedia.modality === 'image' ? (
                      <img
                        src={activeMedia.imageUrl || activeMedia.thumbnailUrl}
                        alt="AI Generated Still"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      /* Audio Visualizer Card */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gradient-to-br from-purple-950/40 to-slate-950">
                        <audio
                          ref={audioPlayerRef}
                          src={activeMedia.audioUrl}
                          loop={isLooping}
                          onTimeUpdate={handleTimeUpdate}
                        />
                        <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-white shadow-lg shadow-purple-950/40">
                          <Music className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text)]">
                            {activeMedia.params.audioGenre?.toUpperCase() || 'HIGH-FIDELITY AUDIO'}
                          </h4>
                          <p className="text-xs text-[var(--color-muted)] max-w-xs mt-1">
                            Synthesized with {activeMedia.modelName || 'Lyria 3 Engine'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Playback Controls (For Video & Audio) */}
                  {(activeMedia.modality === 'video' || activeMedia.modality === 'audio') && (
                    <div className="p-3 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] space-y-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handlePlayPause}
                          className="p-2 rounded-xl gradient-accent text-white cursor-pointer"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>

                        <input
                          type="range"
                          min={0}
                          max={mediaDuration || 1}
                          step={0.1}
                          value={currentTime}
                          onChange={handleSeek}
                          className="flex-1 accent-cyan-400 cursor-pointer"
                        />

                        <span className="text-[11px] font-mono text-[var(--color-muted)] min-w-[65px] text-right">
                          {Math.floor(currentTime)}s / {Math.floor(mediaDuration || 10)}s
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-1 text-[var(--color-muted)] hover:text-[var(--color-text)]"
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsLooping(!isLooping)}
                            className={`p-1 text-[11px] font-semibold ${
                              isLooping ? 'text-cyan-400' : 'text-[var(--color-muted)]'
                            }`}
                          >
                            Loop
                          </button>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          {[0.5, 1, 1.5, 2].map((spd) => (
                            <button
                              key={spd}
                              type="button"
                              onClick={() => handleSpeedChange(spd)}
                              className={`px-1.5 py-0.5 rounded ${
                                playbackSpeed === spd
                                  ? 'bg-purple-600 text-white font-bold'
                                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                              }`}
                            >
                              {spd}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Bar (Download, Share, Favorite, Variation) */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs text-white gradient-accent glow-accent flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Master</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleVariationSeed}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Dices className="w-4 h-4 text-cyan-400" />
                      <span>Variation (Seed+1)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(activeMedia.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ml-auto ${
                        activeMedia.favorite
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : 'bg-[var(--color-surface-2)] text-[var(--color-muted)] border-[var(--color-border)] hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${activeMedia.favorite ? 'fill-rose-400' : ''}`} />
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty state with guidance */
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-cyan-400 mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-[var(--color-text)]">
                      Studio Ready to Generate
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] max-w-sm mx-auto">
                      Choose <strong>Gemini Omni Flash 1.1</strong>, Veo 2, or OpenAI Sora 2.0. Click Generate Video or Image to begin your free render.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info note */}
            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-muted)]">
              <span>All formats 100% Free & Commercial Ready</span>
              <span className="text-emerald-400 font-semibold font-mono">1,000 cr / day active</span>
            </div>
          </div>
        </div>

        {/* MY GENERATIONS HISTORY LIBRARY */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-heading font-bold text-[var(--color-text)]">
                Generation Studio Library
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                Stored in browser storage • Filter by modality or favorites
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['all', 'video', 'image', 'audio', 'favorites'] as const).map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setHistoryFilter(flt)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                    historyFilter === flt
                      ? 'gradient-accent text-white border-transparent'
                      : 'bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredGenerations.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center text-xs text-[var(--color-muted)]">
              No creations matching "{historyFilter}". Generate your first video, image, or audio track above!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredGenerations.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-md flex flex-col justify-between transition-all hover:-translate-y-1"
                >
                  <div
                    onClick={() => setActiveMedia(item)}
                    className="relative aspect-video bg-black cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.thumbnailUrl || item.imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'}
                      alt={item.params.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1 uppercase">
                      {item.modality === 'video' ? <Film className="w-3 h-3 text-cyan-400" /> : item.modality === 'image' ? <ImageIcon className="w-3 h-3 text-purple-400" /> : <Music className="w-3 h-3 text-emerald-400" />}
                      <span>{item.modality}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-rose-400"
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.favorite ? 'fill-rose-400 text-rose-400' : ''}`} />
                    </button>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[var(--color-text)] line-clamp-2 leading-relaxed">
                        {item.params.prompt}
                      </p>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold block mt-1">
                        {item.modelName || item.params.model}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[10px] text-[var(--color-muted)]">
                      <button
                        type="button"
                        onClick={() => handleUsePromptFromMedia(item)}
                        className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                      >
                        Reuse Prompt
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteGeneration(item.id)}
                        className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
