import { useState, useEffect, useCallback } from 'react';
import { Generation } from '../types/video';

const STORAGE_KEY_GENERATIONS = 'cineflow_generations_v3';

const INITIAL_GENERATIONS: Generation[] = [
  {
    id: 'gen_seedance_01',
    modality: 'video',
    modelName: 'Gemini Omni Flash 1.1 Video',
    params: {
      modality: 'video',
      modelFamily: 'gemini',
      mode: 'text',
      prompt: 'A cyberpunk courier in glowing iridescent streetwear dashing through rain-soaked neon alleyways of Neo-Tokyo, holographic billboards reflecting on dark wet asphalt.',
      negativePrompt: 'low quality, blurry, flicker',
      files: [],
      duration: 10,
      resolution: '1080p',
      aspectRatio: '16:9',
      audio: true,
      cameraMotion: 'Handheld',
      seed: 489201,
      model: 'gemini-omni-1.1-flash',
      outputs: 1,
    },
    status: 'done',
    progress: 100,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 3600000 * 2,
    creditsUsed: 0,
    favorite: true,
    generationSeconds: 11,
  },
  {
    id: 'gen_seedance_02',
    modality: 'image',
    modelName: 'Imagen 3 Ultra-HD',
    params: {
      modality: 'image',
      modelFamily: 'gemini',
      mode: 'image',
      prompt: 'Extreme macro slow-motion capture of a morning dew drop quivering on a scarlet rose petal, catching the early morning sunrise and magnifying tiny pollen grains.',
      negativePrompt: 'grain, noise',
      files: [],
      duration: 6,
      resolution: '4K',
      aspectRatio: '16:9',
      audio: false,
      cameraMotion: 'Zoom in',
      seed: 812903,
      model: 'imagen-3',
      outputs: 1,
    },
    status: 'done',
    progress: 100,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now() - 3600000 * 24,
    creditsUsed: 0,
    favorite: false,
    generationSeconds: 4,
  },
];

export function useGenerationsHistory() {
  const [generations, setGenerations] = useState<Generation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GENERATIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return INITIAL_GENERATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GENERATIONS, JSON.stringify(generations));
    } catch {}
  }, [generations]);

  const addGeneration = useCallback((item: Generation) => {
    setGenerations((prev) => [item, ...prev]);
  }, []);

  const deleteGeneration = useCallback((id: string) => {
    setGenerations((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setGenerations((prev) =>
      prev.map((g) => (g.id === id ? { ...g, favorite: !g.favorite } : g))
    );
  }, []);

  return {
    generations,
    addGeneration,
    deleteGeneration,
    toggleFavorite,
  };
}
