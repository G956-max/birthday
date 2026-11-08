import { useState, useEffect, useCallback } from 'react';
import { SurpriseConfig, MemoryPhoto, ThemeType } from '../types';
import { DEFAULT_CONFIG, STATIC_MEMORIES, EXACT_LETTER_TITLE, EXACT_LETTER_PARAGRAPHS, EXACT_LETTER_SIGNOFF } from '../utils/defaults';

const STORAGE_KEY = 'birthday_surprise_sandhiya_v8';

const NEW_WISH_MESSAGES = [
  "✨ May your smile never fade and your happiness never end.",
  "🌸 You deserve all the happiness this world can offer.",
  "💖 May all your dreams turn into beautiful realities.",
  "🦋 Keep shining in your own unique and beautiful way.",
  "🌷 May life surprise you with countless beautiful moments.",
  "❤️ Stay happy, stay blessed, and keep smiling always."
];

function sanitizeNameToSandhiya(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/Sophia/g, 'Sandhiya')
      .replace(/SOPHIA/g, 'SANDHIYA')
      .replace(/sophia/g, 'sandhiya');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeNameToSandhiya);
  }
  if (obj && typeof obj === 'object') {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      res[key] = sanitizeNameToSandhiya(obj[key]);
    }
    return res;
  }
  return obj;
}

export function useSurpriseConfig() {
  const [config, setConfig] = useState<SurpriseConfig>(() => {
    try {
      localStorage.removeItem('birthday_surprise_custom_config_v1');
      localStorage.removeItem('birthday_surprise_custom_config_v2');
      localStorage.removeItem('birthday_surprise_sandhiya_v3');
      localStorage.removeItem('birthday_surprise_sandhiya_v4');
      localStorage.removeItem('birthday_surprise_sandhiya_v5');
      localStorage.removeItem('birthday_surprise_sandhiya_v6');
      localStorage.removeItem('birthday_surprise_sandhiya_v7');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const sanitized = sanitizeNameToSandhiya(parsed);
        if (sanitized.balloons && Array.isArray(sanitized.balloons)) {
          sanitized.balloons = sanitized.balloons.map((b: any, i: number) => ({
            ...b,
            message: NEW_WISH_MESSAGES[i] || b.message
          }));
        }
        return {
          ...DEFAULT_CONFIG,
          ...sanitized,
          name: 'Sandhiya',
          photos: STATIC_MEMORIES,
          letterTitle: EXACT_LETTER_TITLE,
          letterParagraphs: EXACT_LETTER_PARAGRAPHS,
          letterSignoff: EXACT_LETTER_SIGNOFF
        };
      }
    } catch (e) {
      console.error('Failed to load saved birthday config:', e);
    }
    return {
      ...DEFAULT_CONFIG,
      photos: STATIC_MEMORIES,
      letterTitle: EXACT_LETTER_TITLE,
      letterParagraphs: EXACT_LETTER_PARAGRAPHS,
      letterSignoff: EXACT_LETTER_SIGNOFF
    };
  });

  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [poppedBalloonIds, setPoppedBalloonIds] = useState<number[]>([]);
  const [isCandleLit, setIsCandleLit] = useState<boolean>(false);
  const [isCakeBlown, setIsCakeBlown] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save birthday config to localStorage:', e);
    }
  }, [config]);

  const updateConfig = useCallback((updates: Partial<SurpriseConfig>) => {
    setConfig(prev => {
      const sanitizedUpdates = sanitizeNameToSandhiya(updates);
      const updated = {
        ...prev,
        ...sanitizedUpdates,
        photos: STATIC_MEMORIES,
        letterTitle: EXACT_LETTER_TITLE,
        letterParagraphs: EXACT_LETTER_PARAGRAPHS,
        letterSignoff: EXACT_LETTER_SIGNOFF
      };
      if (sanitizedUpdates.name && sanitizedUpdates.name !== prev.name) {
        if (updated.celebrationTitle.includes(prev.name.toUpperCase())) {
          updated.celebrationTitle = updated.celebrationTitle.replace(prev.name.toUpperCase(), sanitizedUpdates.name.toUpperCase());
        }
      }
      return updated;
    });
  }, []);

  const addPhoto = useCallback((photo: Omit<MemoryPhoto, 'id'>) => {
    const newPhoto: MemoryPhoto = {
      ...photo,
      id: `photo-${Date.now()}`
    };
    setConfig(prev => ({
      ...prev,
      photos: [newPhoto, ...prev.photos]
    }));
  }, []);

  const updatePhoto = useCallback((id: string, updates: Partial<MemoryPhoto>) => {
    setConfig(prev => ({
      ...prev,
      photos: prev.photos.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  }, []);

  const deletePhoto = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== id)
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setPoppedBalloonIds([]);
    setIsCandleLit(false);
    setIsCakeBlown(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const popBalloon = useCallback((balloonId: number) => {
    setPoppedBalloonIds(prev => {
      if (prev.includes(balloonId)) return prev;
      return [...prev, balloonId];
    });
  }, []);

  const resetBalloons = useCallback(() => {
    setPoppedBalloonIds([]);
  }, []);

  const nextScreen = useCallback(() => {
    setCurrentScreen(prev => Math.min(8, prev + 1));
  }, []);

  const prevScreen = useCallback(() => {
    setCurrentScreen(prev => Math.max(1, prev - 1));
  }, []);

  const goToScreen = useCallback((screenNum: number) => {
    if (screenNum >= 1 && screenNum <= 8) {
      setCurrentScreen(screenNum);
    }
  }, []);

  const setTheme = useCallback((theme: ThemeType) => {
    setConfig(prev => ({ ...prev, theme }));
  }, []);

  return {
    config,
    updateConfig,
    currentScreen,
    setCurrentScreen,
    nextScreen,
    prevScreen,
    goToScreen,
    poppedBalloonIds,
    popBalloon,
    resetBalloons,
    isCandleLit,
    setIsCandleLit,
    isCakeBlown,
    setIsCakeBlown,
    addPhoto,
    updatePhoto,
    deletePhoto,
    resetToDefaults,
    setTheme
  };
}
