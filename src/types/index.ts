export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  note?: string;
  isVideo?: boolean;
}

export interface BalloonItem {
  id: number;
  color: string;
  accent: string;
  message: string;
  popped: boolean;
  xOffset: number;
  speed: number;
}

export type ThemeType = 'purple-burgundy' | 'midnight-gold' | 'rose-blush' | 'velvet-ruby';

export interface SurpriseConfig {
  name: string;
  nickname: string;
  greeting: string;
  birthdayDate: string;
  introSubtitle: string;
  cakeMessage: string;
  wishText: string;
  balloons: BalloonItem[];
  photos: MemoryPhoto[];
  letterTitle: string;
  letterParagraphs: string[];
  letterSignoff: string;
  celebrationTitle: string;
  finalWishText: string;
  theme: ThemeType;
  customMusicUrl?: string;
  activeMusicTrack: string;
}
