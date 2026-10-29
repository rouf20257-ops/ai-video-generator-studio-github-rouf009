import { AspectRatio, Modality } from '../types/video';

export interface ExamplePrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  cameraMotion?: string;
  aspectRatio: AspectRatio;
  modality: Modality;
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  // Video Presets
  {
    id: 'p1',
    category: 'Cyberpunk',
    title: 'Neon Tokyo Runner',
    prompt: 'A cyberpunk courier in glowing iridescent streetwear dashing through rain-soaked neon alleyways of Neo-Tokyo, holographic billboards reflecting on dark wet asphalt, anamorphic blue-violet lens flare, rapid handheld camera tracking.',
    cameraMotion: 'Handheld',
    aspectRatio: '16:9',
    modality: 'video',
  },
  {
    id: 'p2',
    category: 'Product',
    title: 'Obsidian Chronograph',
    prompt: 'Close-up studio commercial shot of a matte black luxury chronograph floating weightlessly, intricate golden gear movement ticking, liquid mercury droplets swirling around the dial, soft studio rim lighting.',
    cameraMotion: 'Orbit',
    aspectRatio: '1:1',
    modality: 'video',
  },
  {
    id: 'p3',
    category: 'Cinematic',
    title: 'Nordic Fjord Sunrise',
    prompt: 'Breathtaking cinematic FPV drone flight gliding over frozen turquoise fjords at golden hour dawn, mist rising from ice fractures, crystal mountain peaks catching warm radiant sunbeams.',
    cameraMotion: 'Drone',
    aspectRatio: '16:9',
    modality: 'video',
  },
  {
    id: 'p4',
    category: 'Nature',
    title: 'Macro Dew Drop',
    prompt: 'Extreme macro slow-motion capture of a morning dew drop quivering on a scarlet rose petal, catching the early morning sunrise and magnifying tiny pollen grains, gentle breeze vibration.',
    cameraMotion: 'Zoom in',
    aspectRatio: '16:9',
    modality: 'video',
  },
  {
    id: 'p5',
    category: 'Anime',
    title: 'Sakura Train Station',
    prompt: 'Makoto Shinkai aesthetic anime scene of a tranquil countryside train station platform under blooming cherry blossom trees, gentle pastel breeze scattering pink petals across iron train rails.',
    cameraMotion: 'Pan',
    aspectRatio: '16:9',
    modality: 'video',
  },
  {
    id: 'p6',
    category: 'Sci-Fi',
    title: 'Orbital Terraformer',
    prompt: 'Deep space panoramic master shot of a colossal ring-shaped terraforming station igniting atmospheric engines above an alien sapphire ocean planet, volumetric particle trail.',
    cameraMotion: 'Static',
    aspectRatio: '21:9',
    modality: 'video',
  },

  // Image Presets (DALL-E 3 & Imagen 3)
  {
    id: 'p7',
    category: 'Portrait',
    title: 'Cyberpunk Geisha 4K',
    prompt: 'Ultra-detailed studio portrait of a futuristic cybernetic geisha with porcelain and carbon fiber skin, glowing teal fiber-optic floral hairpins, hyper-detailed eyes, shot on 85mm f/1.2 lens.',
    aspectRatio: '9:16',
    modality: 'image',
  },
  {
    id: 'p8',
    category: 'Landscape',
    title: 'Alpine Bioluminescent Lake',
    prompt: 'Surreal night landscape of an alpine lake glowing with turquoise bioluminescence under the Milky Way galaxy, towering snowcapped granite peaks, crisp reflections, long exposure RAW.',
    aspectRatio: '16:9',
    modality: 'image',
  },
  {
    id: 'p9',
    category: 'Concept Art',
    title: 'Solarpunk Glass Metropolis',
    prompt: 'Isometric architectural concept render of a solarpunk vertical garden city with suspended monorails, crystal biodomes, cascading waterfalls, and lush terrace flora in radiant golden light.',
    aspectRatio: '1:1',
    modality: 'image',
  },

  // Audio Presets (Lyria 3 & Voice Engine)
  {
    id: 'p10',
    category: 'Score',
    title: 'Epic Cinematic Trailer',
    prompt: 'Dramatic cinematic orchestral score with thunderous Taiko drums, brooding cello harmonies, brass swells, and a soaring violin crescendo leading to a massive sub-bass impact drop.',
    aspectRatio: '16:9',
    modality: 'audio',
  },
  {
    id: 'p11',
    category: 'Foley',
    title: 'Neon Rain & Footsteps',
    prompt: 'High-fidelity 3D binaural foley recording of steady rain pouring on asphalt puddles, distant city siren echo, and wet sneaker footsteps splashing rhythmically in an alley.',
    aspectRatio: '16:9',
    modality: 'audio',
  },
  {
    id: 'p12',
    category: 'Electronic',
    title: 'Cyberpunk Synthwave Beat',
    prompt: 'Driving retro-futuristic darksynth beat featuring a punchy 80s analog bassline, lush arpeggiated synths, crisp gated snares, and warm tape saturation distortion.',
    aspectRatio: '16:9',
    modality: 'audio',
  },
];

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    icon: 'Clock',
    title: 'Long 30-Second Clips',
    description: 'Break free from short 4-second micro-clips. Generate long, cohesive scenes with persistent subject continuity and narrative pacing.',
    badge: '30s Continuous',
  },
  {
    id: 'f2',
    icon: 'Sparkles',
    title: 'Native 4K Quality',
    description: 'True ultra-high definition rasterization with crisp edge micro-contrast, intricate fabric textures, and zero upscaling noise.',
    badge: '3840 x 2160',
  },
  {
    id: 'f3',
    icon: 'Layers',
    title: 'Multi-Reference Control',
    description: 'Upload up to 9 reference files: characters, style boards, lighting guides, and motion tracks to guarantee prompt fidelity.',
    badge: 'Up to 9 Inputs',
  },
  {
    id: 'f4',
    icon: 'UserCheck',
    title: 'Consistent Characters',
    description: 'Keep face geometry, outfits, hairstyle, and distinctive scars unified across diverse angles, lighting, and action scenes.',
    badge: 'Zero Facial Drift',
  },
  {
    id: 'f5',
    icon: 'Volume2',
    title: 'Built-in Sound Synthesis',
    description: 'Intelligent spatial audio engine automatically matches environmental ambiences, foley footsteps, and cinematic impact swells.',
    badge: 'Binaural Stereo',
  },
  {
    id: 'f6',
    icon: 'Video',
    title: 'Cinematic Camera Control',
    description: 'Choreograph fluid 6-axis camera movements: panoramic pans, vertigo dolly zooms, orbital sweeps, and FPV drone flythroughs.',
    badge: '6-Axis Kinematics',
  },
];

export interface ShowcaseVideo {
  id: string;
  title: string;
  category: 'Ads' | 'Product' | 'Anime' | 'Cinematic' | 'Social';
  prompt: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  aspectRatio: string;
  views: string;
  author: string;
}

export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: 'sc1',
    title: 'Futuristic Cyberpunk Alleyway',
    category: 'Cinematic',
    prompt: 'Neon cyber warrior walking through rainy Tokyo alleyway with volumetric steam and holographic signs.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    duration: '15s',
    aspectRatio: '16:9',
    views: '124K',
    author: 'Elena R.',
  },
  {
    id: 'sc2',
    title: 'Luxury Perfume Elegance',
    category: 'Product',
    prompt: 'Crystalline perfume bottle submerging in golden elixir with sparkling micro-bubbles and liquid ripple physics.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    duration: '10s',
    aspectRatio: '9:16',
    views: '98K',
    author: 'Studio Veloce',
  },
  {
    id: 'sc3',
    title: 'Neon Energy Drink Drop',
    category: 'Ads',
    prompt: 'High-speed 1000fps splash of ice cubes and energetic citrus slices colliding with an aluminum can, electric vapor.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    duration: '8s',
    aspectRatio: '16:9',
    views: '185K',
    author: 'Pulse Agency',
  },
  {
    id: 'sc4',
    title: 'Celestial Spirit Maiden',
    category: 'Anime',
    prompt: 'Anime cinematic sequence of a magical shrine maiden weaving threads of starlight beneath a colossal celestial comet.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    duration: '20s',
    aspectRatio: '16:9',
    views: '240K',
    author: 'Kaito Studio',
  },
  {
    id: 'sc5',
    title: 'Alpine Drone Dive',
    category: 'Cinematic',
    prompt: 'FPV drone plunging down a sheer 2000ft snowy cliff face into misty evergreen tree canopies at twilight.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    duration: '25s',
    aspectRatio: '16:9',
    views: '88K',
    author: 'Marco D.',
  },
  {
    id: 'sc6',
    title: 'Streetwear Reel Trend',
    category: 'Social',
    prompt: 'Dynamic urban transition video of a dancer changing streetwear fits on beat with chromatic aberration glitch cut.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    duration: '12s',
    aspectRatio: '9:16',
    views: '310K',
    author: 'ChromaX',
  },
  {
    id: 'sc7',
    title: 'Wireless Audio Commercial',
    category: 'Product',
    prompt: 'Minimalist product reveal of titanium active noise-cancelling headphones rotating amid soundwave dust particles.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    duration: '10s',
    aspectRatio: '1:1',
    views: '76K',
    author: 'Apex Labs',
  },
  {
    id: 'sc8',
    title: 'Sneaker Launch Teaser',
    category: 'Ads',
    prompt: 'Holographic runner shoe deconstructing into aerodynamic sole cushions and woven threads over a glowing grid.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    duration: '15s',
    aspectRatio: '16:9',
    views: '164K',
    author: 'Velocity Media',
  },
  {
    id: 'sc9',
    title: 'Cosmic Nebula Explorer',
    category: 'Cinematic',
    prompt: 'Interstellar astronaut touching a crystal monolith inside a glowing magenta nebula with starry reflections.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    duration: '30s',
    aspectRatio: '21:9',
    views: '190K',
    author: 'Astra VFX',
  },
];

export interface UseCaseItem {
  id: string;
  tab: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  samplePrompt: string;
  metric: string;
  metricLabel: string;
  videoUrl: string;
  imageUrl: string;
}

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'uc1',
    tab: 'Marketing Ads',
    title: 'High-Converting Performance Commercials',
    tagline: 'Scale video ad creatives 10x faster without booking expensive studio sets.',
    description: 'Transform static product briefs into broadcast-ready video ads formatted for TikTok, Meta, and YouTube with synchronized voiceover hooks and sound effects.',
    benefits: ['Zero physical filming costs', 'Instant 9:16 and 16:9 multi-format variations', 'A/B test 50+ hooks per week'],
    samplePrompt: 'Energetic lifestyle shot of a fitness model drinking refreshing electrolyte water during sunrise sprint on Venice Beach.',
    metric: '8.4x',
    metricLabel: 'Faster Creative Turnaround',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uc2',
    tab: 'Product Videos',
    title: '3D Hyper-Realistic Product Visualizations',
    tagline: 'Animate luxury watches, apparel, and electronics in cinematic 4K.',
    description: 'Upload a single PNG of your packaging or product. CineFlow preserves exact logo geometry and proportions while rendering flawless reflections, smoke, water, and slow-motion reveals.',
    benefits: ['Accurate product silhouette preservation', 'Studio lighting and zero-gravity orbits', 'Ready for Shopify & Amazon hero banners'],
    samplePrompt: 'Close-up slow pan of matte ceramic coffee tumbler steaming in morning golden light on Scandinavian wooden table.',
    metric: '42%',
    metricLabel: 'Higher Store Conversion',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uc3',
    tab: 'Social Content',
    title: 'Viral TikTok & Shorts Generator',
    tagline: 'Hook viewers in the first 0.5s with thumb-stopping dynamic motion.',
    description: 'Effortlessly generate viral storytelling reels, urban transitions, and surreal visual concepts with built-in trending sound design and fast camera whip pans.',
    benefits: ['Native 9:16 vertical ratio', 'Dynamic camera acceleration', 'High visual saturation tuned for mobile feeds'],
    samplePrompt: 'Fast-paced street fashion transition of girl stepping into neon puddle that ripples into a futuristic metropolis.',
    metric: '3.2M+',
    metricLabel: 'Viral Organic Views Reached',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uc4',
    tab: 'Storytelling & Film',
    title: 'Pre-Visualization & Indie Filmmaking',
    tagline: 'Pitch scripts and bring complex cinematic storyboards to life instantly.',
    description: 'Director-grade camera controls and multi-reference character consistency allow filmmakers to direct seamless 30-second continuous scenes before spending budget on production.',
    benefits: ['Character consistency across scenes', 'Precise lens & shutter speed directives', 'Multi-reference storyboard inputs'],
    samplePrompt: 'A solitary astronaut walking across an ancient desert monument on Mars as twin moons rise over distant dunes.',
    metric: '90%',
    metricLabel: 'Pre-Production Budget Saved',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uc5',
    tab: 'Education',
    title: 'Visual Conceptual Explanations',
    tagline: 'Make complex scientific phenomena and history vivid and intuitive.',
    description: 'Simulate cellular biology, astrophysics, architectural history, and engineering schematics in breathtaking motion that keeps students engaged.',
    benefits: ['Photorealistic scientific particle rendering', 'Seamless temporal timeline shifts', 'Ideal for ed-tech and course creators'],
    samplePrompt: 'Cinematic 3D cross-section dive through human DNA helix unzipping with glowing nucleotide bonds and enzyme motors.',
    metric: '94%',
    metricLabel: 'Student Comprehension Boost',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
  },
];

export interface PricingPlan {
  id: 'free' | 'creator' | 'pro';
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  credits: number;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    tagline: 'Instant free access for experimenting with AI video generation.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: 99999,
    features: [
      '100% Free Forever ($0)',
      'Up to 1080p HD resolution',
      'Clips up to 10 seconds',
      'Text & Image to Video',
      'No watermarks',
      'Instant access without payment',
    ],
    buttonText: 'Use Free Forever',
  },
  {
    id: 'creator',
    name: 'Creator Studio',
    tagline: 'Full unlocked access for filmmakers, creators & designers.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: 99999,
    isPopular: true,
    features: [
      '100% Free Forever ($0)',
      'Native 1080p Full HD resolution',
      'Clips up to 20 seconds',
      'Multi-reference matrix (up to 9 files)',
      'Native spatial audio synthesis',
      'Zero watermarks on export',
      'High-speed generation queue',
      'Full commercial usage rights',
    ],
    buttonText: 'Active & Free (Default)',
  },
  {
    id: 'pro',
    name: 'Pro 4K Cinema',
    tagline: 'Maximum 4K resolution and 30s clips unlocked for all users free.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: 99999,
    features: [
      '100% Free Forever ($0)',
      'Native 4K Ultra-HD synthesis',
      'Full 30-second extended shots',
      'Full 9 multi-reference inputs',
      'Highest VIP priority queue',
      'Director camera kinematics & seed lock',
      'Broadcast commercial rights',
      'Direct API webhook access',
    ],
    buttonText: 'Use 4K Pro Free',
  },
];

export interface CreditTopUp {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
}

export const CREDIT_TOP_UPS: CreditTopUp[] = [
  { id: 'topup_500', credits: 5000, price: 0 },
  { id: 'topup_1500', credits: 15000, price: 0, popular: true },
  { id: 'topup_5000', credits: 50000, price: 0 },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Lin',
    role: 'Creative Director',
    company: 'Aura Media NYC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'CineFlow 2.5 is the first tool where multi-reference actually preserves our brand character faces and clothing textures. We pitched three client commercials in 48 hours without renting a single studio.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'VFX Lead & Filmmaker',
    company: 'Vance Cinema Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'The 30-second duration and native 4K output are absolute game-changers. The camera motion isn’t erratic like older models—it moves with the deliberate weight of an actual cinematic dolly.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Amara Chen',
    role: 'Head of Growth',
    company: 'HyperScale D2C',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'Our cost per ad creative dropped from $1,200 to practically zero. We tested 30 product variations over the weekend and discovered 3 high-converting angles that doubled our ROAS.',
    rating: 5,
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is CineFlow 2.5 and how does it compare to Seedance 2.5?',
    answer: 'CineFlow 2.5 is a cutting-edge multimodal AI video generator inspired by modern Seedance-class architectures. It supports text-to-video, image animation, and advanced multi-reference video generation (combining characters, style, and lighting) with native binaural audio synthesis and up to 30s clips in 4K resolution.',
  },
  {
    id: 'faq2',
    question: 'Do I get free credits or a free trial to test the generator?',
    answer: 'Yes! Every new account automatically receives 100 free generation credits stored in your browser session. You can generate multiple high-definition test clips right away without entering any credit card details.',
  },
  {
    id: 'faq3',
    question: 'What is the maximum duration for generated video clips?',
    answer: 'You can generate videos ranging from 4 seconds up to a full 30 seconds in length. Our advanced temporal attention mechanisms ensure fluid physical movement, realistic momentum, and zero character drift throughout the entire duration.',
  },
  {
    id: 'faq4',
    question: 'What resolutions and aspect ratios are supported?',
    answer: 'We support resolutions from 480p preview up to Native 4K (3840x2160). You can export in all standard industry aspect ratios: 16:9 (YouTube & landscape), 9:16 (TikTok, Shorts, Reels), 1:1 (Square social feed), 4:3 (Classic Academy format), and 21:9 (Cinemascope ultra-wide).',
  },
  {
    id: 'faq5',
    question: 'What file formats and sizes can I upload as references?',
    answer: 'In Reference mode, you can upload PNG/JPG/WEBP images up to 10MB, MP4 videos up to 100MB, and MP3/WAV audio files up to 20MB. You can tag each reference (e.g. @ref1, @ref2) and mention them directly in your prompt.',
  },
  {
    id: 'faq6',
    question: 'How do generation credits work?',
    answer: 'Credits are consumed dynamically based on resolution, duration, model tier, and outputs: Base by model × duration × resolution multiplier × outputs. Audio adds +2 credits. If a generation ever fails or is cancelled, your credits are automatically refunded.',
  },
  {
    id: 'faq7',
    question: 'Can I use generated videos for commercial projects and client work?',
    answer: 'Yes. All videos created on the Creator and Pro plans come with a full commercial usage license. You own the synthesized outputs and can use them freely in broadcast commercials, YouTube monetized channels, client deliverables, and e-commerce campaigns.',
  },
  {
    id: 'faq8',
    question: 'What is your content policy regarding likeness and deepfakes?',
    answer: 'We strictly prohibit generating non-consensual likenesses of real individuals, deceptive political disinformation, hate speech, explicit content, or dangerous activities. All prompts pass through multi-layer automated safety validation.',
  },
  {
    id: 'faq9',
    question: 'What is your refund policy if a generation fails or gets cancelled?',
    answer: 'Our credit system has automated failure detection. If a generation encounters a network error, safety filter block, or user cancellation, the exact credits deducted for that job are immediately credited back to your balance.',
  },
  {
    id: 'faq10',
    question: 'How is data privacy handled for my uploaded media?',
    answer: 'Your uploaded reference media and prompt drafts are processed strictly in memory during model inference. We never use your private uploaded files to train public models.',
  },
];
