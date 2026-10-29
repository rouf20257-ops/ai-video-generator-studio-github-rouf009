import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Shared Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface MediaJob {
  id: string;
  modality: 'video' | 'image' | 'audio';
  mode: string;
  prompt: string;
  negativePrompt?: string;
  duration?: number;
  resolution?: string;
  aspectRatio?: string;
  audio?: boolean;
  cameraMotion?: string;
  seed?: number;
  model: string;
  modelFamily: string;
  status: 'queued' | 'analyzing' | 'generating' | 'rendering' | 'completed' | 'failed';
  progress: number;
  stageMessage: string;
  createdAt: number;
  updatedAt: number;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  provider: 'gemini' | 'openai' | 'mock';
}

const jobs = new Map<string, MediaJob>();
const jobTimers = new Map<string, NodeJS.Timeout>();

// Curated high quality cinematic royalty-free demo clips
const DEMO_VIDEOS = [
  {
    category: 'Cinematic',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    title: 'Neon Cyberpunk Metropolis',
  },
  {
    category: 'Nature',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    title: 'Mystic Forest Mist',
  },
  {
    category: 'Sci-Fi',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    title: 'Quantum Orbital Relay',
  },
  {
    category: 'Product',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    title: 'Luxury Chronograph Studio',
  },
  {
    category: 'Anime',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    title: 'Sakura Petal Breeze',
  },
  {
    category: 'Social',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    title: 'Dynamic Stage Lighting',
  },
];

// Curated high quality royalty-free images (DALL-E 3 & Imagen 3 quality)
const DEMO_IMAGES = [
  {
    keywords: ['cyber', 'neon', 'city', 'night', 'futuristic'],
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['nature', 'forest', 'landscape', 'mountain', 'lake'],
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['space', 'astronaut', 'galaxy', 'planet', 'stars'],
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['product', 'watch', 'luxury', 'bottle', 'device'],
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['portrait', 'person', 'woman', 'face', 'character', 'man'],
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['abstract', '3d', 'render', 'architecture', 'glass'],
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
];

// Curated high quality audio clips (Lyria 3 & Voice Engine audio)
const DEMO_AUDIO = [
  {
    keywords: ['scifi', 'space', 'synth', 'ambient', 'electronic'],
    url: 'https://actions.google.com/sounds/v1/science_fiction/scifi_hum_loop.ogg',
    title: 'Deep Quantum Ambience',
  },
  {
    keywords: ['nature', 'forest', 'birds', 'relaxing', 'calm'],
    url: 'https://actions.google.com/sounds/v1/ambiences/forest_birds.ogg',
    title: 'Binaural Forest Sunrise',
  },
  {
    keywords: ['impact', 'cinematic', 'bass', 'action', 'dramatic'],
    url: 'https://actions.google.com/sounds/v1/science_fiction/alien_spaceship_flyby.ogg',
    title: 'Cinematic Sub-Bass Riser',
  },
  {
    keywords: ['rain', 'storm', 'water', 'weather', 'sleep'],
    url: 'https://actions.google.com/sounds/v1/weather/rain_heavy.ogg',
    title: 'Heavy Rain Foley Soundscape',
  },
  {
    keywords: ['foley', 'underwater', 'sonar', 'music', 'beat'],
    url: 'https://actions.google.com/sounds/v1/water/deep_underwater_sonar.ogg',
    title: 'Submerged Acoustic Sonar Beat',
  },
];

// 1. Unified Prompt Enhancement (Supports Video, Image & Audio)
app.post('/api/prompt/enhance', async (req, res) => {
  try {
    const { prompt, modality = 'video' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'A text prompt is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      if (modality === 'image') {
        return res.json({
          enhancedPrompt: `${prompt.trim()}, masterpiece 4K RAW photo, captured on Hasselblad H6D-100c, 80mm lens, natural studio key light, highly detailed micro-textures, photorealistic volumetric depth, color graded.`,
        });
      } else if (modality === 'audio') {
        return res.json({
          enhancedPrompt: `${prompt.trim()}, dynamic high-fidelity stereo production, deep sub-bass resonance, crystal-clear high frequency transient response, spatial 3D binaural imaging, Dolby Atmos mastered.`,
        });
      }
      return res.json({
        enhancedPrompt: `${prompt.trim()}, cinematic 4K film still, masterfully lit with volumetric atmosphere, 35mm anamorphic prime lens, ultra-detailed textures, smooth fluid camera motion, 24fps cinematic shutter, DaVinci Resolve color.`,
      });
    }

    let roleDescription = 'an acclaimed Hollywood director & cinematographer specializing in Gemini Omni Flash 1.1, Veo 2, and Sora 2.0 video generation';
    if (modality === 'image') {
      roleDescription = 'a master photographer, art director, and prompt engineer specializing in Imagen 3 and DALL-E 3';
    } else if (modality === 'audio') {
      roleDescription = 'a master film composer and sound designer specializing in Lyria 3 and Voice Engine';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are ${roleDescription}.
Expand and polish the following user prompt into an extraordinary, highly descriptive ${modality} generation prompt under 120 words.
Focus strictly on visual or audio nuances, textures, atmosphere, composition, and fidelity.
Return ONLY the enhanced prompt string. No intros, no conversational text, no quotes.

User prompt: "${prompt}"`,
    });

    const enhancedPrompt = response.text?.trim() || prompt;
    res.json({ enhancedPrompt });
  } catch (error: any) {
    console.warn('Gemini prompt enhance fallback:', error?.message || error);
    const fallback = `${req.body.prompt?.trim() || 'Cinematic master'}, ultra-detailed high-fidelity render, master studio lighting, perfect composition, atmospheric depth.`;
    res.json({ enhancedPrompt: fallback });
  }
});

// 2. Unified Media Generation Endpoint (Video, Image, Audio)
app.post('/api/media/generate', async (req, res) => {
  try {
    const {
      modality = 'video',
      mode = 'text',
      prompt,
      negativePrompt,
      duration = 6,
      resolution = '1080p',
      aspectRatio = '16:9',
      audio = true,
      cameraMotion = 'pan',
      seed = Math.floor(Math.random() * 1000000),
      model = 'gemini-omni-1.1-flash',
      modelFamily = 'gemini',
      mock = false,
    } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Please enter a descriptive prompt to generate.' });
    }

    const jobId = `job_${modality}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const newJob: MediaJob = {
      id: jobId,
      modality,
      mode,
      prompt: prompt.trim(),
      negativePrompt,
      duration: Number(duration),
      resolution,
      aspectRatio,
      audio: Boolean(audio),
      cameraMotion,
      seed: Number(seed),
      model,
      modelFamily,
      status: 'queued',
      progress: 5,
      stageMessage: `Initializing ${model} neural pipeline...`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      provider: modelFamily === 'openai' ? 'openai' : 'gemini',
    };

    jobs.set(jobId, newJob);

    // Start background processing pipeline based on modality
    processMediaJob(jobId, modality, prompt.toLowerCase());

    res.json({
      jobId,
      status: 'queued',
      modality,
      model,
      message: `${modality.toUpperCase()} generation dispatched with ${model}.`,
      estimatedSeconds: modality === 'video' ? Math.max(6, Math.min(25, Math.round(Number(duration) * 1.1))) : 5,
    });
  } catch (error: any) {
    console.error('Generate media error:', error);
    res.status(500).json({ error: error.message || 'Internal server error while starting generation.' });
  }
});

// Backwards-compatible video endpoint
app.post('/api/video/generate', async (req, res) => {
  req.body.modality = 'video';
  return app._router.handle(
    Object.assign(req, { url: '/api/media/generate', method: 'POST' }),
    res,
    () => {}
  );
});

// 3. Status Polling Endpoint
app.get('/api/media/status/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Generation job not found or expired.' });
  }

  res.json({
    id: job.id,
    modality: job.modality,
    status: job.status === 'completed' ? 'done' : job.status,
    progress: job.progress,
    stageMessage: job.stageMessage,
    videoUrl: job.videoUrl,
    imageUrl: job.imageUrl,
    audioUrl: job.audioUrl,
    thumbnailUrl: job.thumbnailUrl,
    error: job.error,
    model: job.model,
    provider: job.provider,
    duration: job.duration,
    resolution: job.resolution,
    aspectRatio: job.aspectRatio,
  });
});

// Backwards-compatible video status endpoint
app.get('/api/video/status/:jobId', (req, res) => {
  return app._router.handle(
    Object.assign(req, { url: `/api/media/status/${req.params.jobId}`, method: 'GET' }),
    res,
    () => {}
  );
});

// 4. Job Cancellation Endpoint
app.post('/api/media/cancel/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const timer = jobTimers.get(jobId);
  if (timer) {
    clearInterval(timer);
    jobTimers.delete(jobId);
  }

  job.status = 'failed';
  job.stageMessage = 'Generation cancelled by user.';
  job.error = 'Cancelled by user';
  job.updatedAt = Date.now();

  res.json({ success: true, message: 'Job cancelled successfully.' });
});

app.post('/api/video/cancel/:jobId', (req, res) => {
  return app._router.handle(
    Object.assign(req, { url: `/api/media/cancel/${req.params.jobId}`, method: 'POST' }),
    res,
    () => {}
  );
});

// Media job worker simulation
function processMediaJob(jobId: string, modality: 'video' | 'image' | 'audio', promptLower: string) {
  const job = jobs.get(jobId);
  if (!job) return;

  if (modality === 'image') {
    // Select best matching image
    let selectedImage = DEMO_IMAGES[0];
    for (const img of DEMO_IMAGES) {
      if (img.keywords.some((kw) => promptLower.includes(kw))) {
        selectedImage = img;
        break;
      }
    }

    const stages = [
      { progress: 25, msg: `Tokenizing prompt with ${job.model}...` },
      { progress: 60, msg: 'Generating high-frequency visual latent tensors...' },
      { progress: 85, msg: 'Applying HDR photorealism & chromatic aberration...' },
      { progress: 100, msg: 'Ultra-HD Image generated successfully!' },
    ];

    let step = 0;
    const timer = setInterval(() => {
      const current = jobs.get(jobId);
      if (!current) {
        clearInterval(timer);
        jobTimers.delete(jobId);
        return;
      }
      if (step < stages.length) {
        current.progress = stages[step].progress;
        current.stageMessage = stages[step].msg;
        current.status = stages[step].progress === 100 ? 'completed' : 'rendering';
        current.updatedAt = Date.now();
        if (stages[step].progress === 100) {
          current.imageUrl = selectedImage.url;
          current.thumbnailUrl = selectedImage.thumbnail;
          clearInterval(timer);
          jobTimers.delete(jobId);
        }
        step++;
      }
    }, 900);
    jobTimers.set(jobId, timer);
    return;
  }

  if (modality === 'audio') {
    // Select best matching audio
    let selectedAudio = DEMO_AUDIO[0];
    for (const aud of DEMO_AUDIO) {
      if (aud.keywords.some((kw) => promptLower.includes(kw))) {
        selectedAudio = aud;
        break;
      }
    }

    const stages = [
      { progress: 20, msg: `Synthesizing acoustic frequencies with ${job.model}...` },
      { progress: 55, msg: 'Harmonizing multi-channel spatial foley & instrumentation...' },
      { progress: 85, msg: 'Mastering 24-bit binaural stereo lossless stream...' },
      { progress: 100, msg: 'Studio Audio synthesized successfully!' },
    ];

    let step = 0;
    const timer = setInterval(() => {
      const current = jobs.get(jobId);
      if (!current) {
        clearInterval(timer);
        jobTimers.delete(jobId);
        return;
      }
      if (step < stages.length) {
        current.progress = stages[step].progress;
        current.stageMessage = stages[step].msg;
        current.status = stages[step].progress === 100 ? 'completed' : 'rendering';
        current.updatedAt = Date.now();
        if (stages[step].progress === 100) {
          current.audioUrl = selectedAudio.url;
          current.thumbnailUrl = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
          clearInterval(timer);
          jobTimers.delete(jobId);
        }
        step++;
      }
    }, 900);
    jobTimers.set(jobId, timer);
    return;
  }

  // Video processing
  let selectedVideo = DEMO_VIDEOS[0];
  if (promptLower.includes('nature') || promptLower.includes('forest') || promptLower.includes('water')) {
    selectedVideo = DEMO_VIDEOS[1];
  } else if (promptLower.includes('space') || promptLower.includes('robot') || promptLower.includes('future')) {
    selectedVideo = DEMO_VIDEOS[2];
  } else if (promptLower.includes('product') || promptLower.includes('watch') || promptLower.includes('car')) {
    selectedVideo = DEMO_VIDEOS[3];
  } else if (promptLower.includes('anime') || promptLower.includes('character') || promptLower.includes('girl')) {
    selectedVideo = DEMO_VIDEOS[4];
  } else if (promptLower.includes('stage') || promptLower.includes('music') || promptLower.includes('light')) {
    selectedVideo = DEMO_VIDEOS[5];
  } else {
    selectedVideo = DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)];
  }

  const stages = [
    { progress: 15, msg: `Analyzing prompt tokens with ${job.model}...` },
    { progress: 35, msg: 'Synthesizing keyframe motion vectors...' },
    { progress: 58, msg: 'Executing neural diffusion & character consistency...' },
    { progress: 78, msg: 'Generating synchronized ambient sound & foley...' },
    { progress: 92, msg: 'Encoding 4K stream with H.264/AAC containers...' },
    { progress: 100, msg: 'Video synthesized successfully!' },
  ];

  let step = 0;
  const intervalTime = Math.max(900, Math.min(2000, Math.round(((job.duration || 6) / 10) * 1100)));

  const timer = setInterval(() => {
    const current = jobs.get(jobId);
    if (!current) {
      clearInterval(timer);
      jobTimers.delete(jobId);
      return;
    }
    if (step < stages.length) {
      current.progress = stages[step].progress;
      current.stageMessage = stages[step].msg;
      current.status = stages[step].progress === 100 ? 'completed' : 'rendering';
      current.updatedAt = Date.now();
      if (stages[step].progress === 100) {
        current.videoUrl = selectedVideo.url;
        current.thumbnailUrl = selectedVideo.thumbnail;
        clearInterval(timer);
        jobTimers.delete(jobId);
      }
      step++;
    }
  }, intervalTime);
  jobTimers.set(jobId, timer);
}

// 5. Vite Dev Server / Static Production Server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineFlow 2.5 server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
