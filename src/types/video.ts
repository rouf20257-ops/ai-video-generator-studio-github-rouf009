export type Modality = 'video' | 'image' | 'audio';
export type Mode = 'text' | 'image' | 'reference';
export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3' | '21:9';
export type VideoResolution = '480p' | '720p' | '1080p' | '4K';
export type ImageStyle = 'photorealistic' | 'anime' | 'cyberpunk' | '3d-render' | 'cinematic-film' | 'oil-painting';
export type AudioGenre = 'cinematic-score' | 'ambient-foley' | 'cyberpunk-electronic' | 'lofi-chill' | 'orchestral-epic' | 'vocal-narration';

export type ModelFamily = 'gemini' | 'openai';

export interface AIModel {
  id: string;
  name: string;
  family: ModelFamily;
  modality: Modality;
  badge: string;
  description: string;
  resolutionSupport: string;
  speed: 'Ultra Fast' | 'Standard' | 'Cinema Ultra';
}

export const ALL_AI_MODELS: AIModel[] = [
  // Google Gemini Video
  {
    id: 'gemini-veo-2',
    name: 'Gemini Veo 2 Cinema',
    family: 'gemini',
    modality: 'video',
    badge: 'Google 4K Cinema',
    description: 'Premier cinematic video generator with realistic physics, lighting & temporal consistency.',
    resolutionSupport: 'Up to 4K',
    speed: 'Cinema Ultra',
  },
  {
    id: 'gemini-omni-1.1-flash',
    name: 'Gemini Omni Flash 1.1 Video',
    family: 'gemini',
    modality: 'video',
    badge: 'Omni Flash 1.1 (Free)',
    description: 'Next-gen Google Omni Flash 1.1 multimodal video model. Rapid generation, fluid camera dynamics, and native audio.',
    resolutionSupport: 'Up to 4K',
    speed: 'Ultra Fast',
  },
  {
    id: 'imagen-video-hd',
    name: 'Imagen Video Pro',
    family: 'gemini',
    modality: 'video',
    badge: 'Google Imagen',
    description: 'High dynamic range video with rich artistic textures and studio color grading.',
    resolutionSupport: 'Up to 1080p',
    speed: 'Standard',
  },

  // OpenAI ChatGPT Video
  {
    id: 'sora-2',
    name: 'OpenAI Sora 2.0 Cinema',
    family: 'openai',
    modality: 'video',
    badge: 'ChatGPT Sora 2',
    description: 'World-model video diffusion simulating physical motion and complex continuous interactions.',
    resolutionSupport: 'Up to 4K',
    speed: 'Cinema Ultra',
  },
  {
    id: 'sora-turbo',
    name: 'Sora Turbo Fast-Render',
    family: 'openai',
    modality: 'video',
    badge: 'ChatGPT Sora Turbo',
    description: 'High-speed video rendering optimized for rapid prototyping and dynamic camera pans.',
    resolutionSupport: 'Up to 1080p',
    speed: 'Ultra Fast',
  },

  // Google Gemini Image
  {
    id: 'imagen-3',
    name: 'Imagen 3 Ultra-HD',
    family: 'gemini',
    modality: 'image',
    badge: 'Google Imagen 3',
    description: 'State-of-the-art photorealistic image synthesis with immaculate text and micro-textures.',
    resolutionSupport: 'Up to 4K',
    speed: 'Cinema Ultra',
  },
  {
    id: 'gemini-3.1-flash-image',
    name: 'Gemini 3.1 Flash Image',
    family: 'gemini',
    modality: 'image',
    badge: 'Gemini Flash Image',
    description: 'Instant sub-second image generation with high prompt obedience and vivid colors.',
    resolutionSupport: 'Up to 2K',
    speed: 'Ultra Fast',
  },
  {
    id: 'gemini-3-pro-image',
    name: 'Gemini 3 Pro Vision Studio',
    family: 'gemini',
    modality: 'image',
    badge: 'Gemini Pro Vision',
    description: 'Master-level creative studio composition, nuanced lighting, and intricate styling.',
    resolutionSupport: 'Up to 4K',
    speed: 'Standard',
  },

  // OpenAI ChatGPT Image
  {
    id: 'dall-e-3',
    name: 'DALL·E 3 Ultra-HD',
    family: 'openai',
    modality: 'image',
    badge: 'ChatGPT DALL·E 3',
    description: 'Exceptional visual concept synthesis with exact prompt execution and high artistic fidelity.',
    resolutionSupport: 'Up to 4K',
    speed: 'Standard',
  },
  {
    id: 'gpt-4o-vision-gen',
    name: 'GPT-4o Vision Creative',
    family: 'openai',
    modality: 'image',
    badge: 'ChatGPT GPT-4o',
    description: 'Multimodal vision generation combining deep semantic reasoning with sharp rendering.',
    resolutionSupport: 'Up to 2K',
    speed: 'Ultra Fast',
  },

  // Google Gemini Audio
  {
    id: 'lyria-3-clip',
    name: 'Lyria 3 Music & AudioFX',
    family: 'gemini',
    modality: 'audio',
    badge: 'Google Lyria 3',
    description: 'Full musical score generation, cinematic orchestra, and dynamic environmental foley.',
    resolutionSupport: 'Lossless Hi-Res',
    speed: 'Cinema Ultra',
  },
  {
    id: 'gemini-3.8-spatial-audio',
    name: 'Gemini 3.8 Spatial Sound',
    family: 'gemini',
    modality: 'audio',
    badge: 'Gemini Spatial',
    description: '3D binaural sound design, environmental acoustics, and realistic physical soundscapes.',
    resolutionSupport: 'Binaural 3D',
    speed: 'Standard',
  },
  {
    id: 'gemini-3.8-tts',
    name: 'Gemini Flash Voice & Narration',
    family: 'gemini',
    modality: 'audio',
    badge: 'Gemini Flash Voice',
    description: 'Human-like expressive vocal narration, cinematic trailers, and dramatic voiceovers.',
    resolutionSupport: 'Studio Voice',
    speed: 'Ultra Fast',
  },

  // OpenAI ChatGPT Audio
  {
    id: 'voice-engine-pro',
    name: 'OpenAI Voice Engine HD',
    family: 'openai',
    modality: 'audio',
    badge: 'ChatGPT Voice Engine',
    description: 'Natural voice synthesis with realistic emotional cadence, tone, and pacing.',
    resolutionSupport: 'Studio Voice',
    speed: 'Ultra Fast',
  },
  {
    id: 'sora-spatial-foley',
    name: 'OpenAI Sora Audio Foley',
    family: 'openai',
    modality: 'audio',
    badge: 'ChatGPT Sora Audio',
    description: 'Deep cinematic impact swells, sub-bass rumbles, and multi-layered cinematic atmospheres.',
    resolutionSupport: 'Binaural 3D',
    speed: 'Standard',
  },
];

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tag: string; // e.g. '@ref1', '@ref2'
  category: 'image' | 'video' | 'audio';
  role?: 'character' | 'style' | 'lighting' | 'motion' | 'audio';
}

export interface GenerationParams {
  modality: Modality;
  mode: Mode;
  prompt: string;
  negativePrompt?: string;
  files: UploadedFile[];
  duration: number; // for video & audio
  resolution: '480p' | '720p' | '1080p' | '4K';
  aspectRatio: AspectRatio;
  audio: boolean;
  cameraMotion: string;
  seed?: number;
  model: string; // Model ID
  modelFamily: ModelFamily;
  outputs: number;
  imageStyle?: ImageStyle;
  audioGenre?: AudioGenre;
}

export interface Generation {
  id: string;
  modality: Modality;
  params: GenerationParams;
  status: 'queued' | 'generating' | 'rendering' | 'done' | 'error';
  progress: number;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  createdAt: number;
  creditsUsed: number;
  error?: string;
  favorite: boolean;
  stageMessage?: string;
  generationSeconds?: number;
  modelName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  plan: 'free' | 'creator' | 'pro';
  lastClaimDate: string; // YYYY-MM-DD
  streakDays: number;
  rolloverCredits: number;
  licenseYears: number; // 2
  licenseExpiry: string; // "October 2028"
  daysRemaining: number;
}

export interface JobStatus {
  id: string;
  status: 'queued' | 'generating' | 'rendering' | 'done' | 'error';
  progress: number;
  stageMessage: string;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  modality?: Modality;
}

export interface VideoProvider {
  name: string;
  generate(params: GenerationParams): Promise<string>;
  poll(jobId: string): Promise<JobStatus>;
  cancel(jobId: string): Promise<boolean>;
}
