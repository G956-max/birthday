import { SurpriseConfig, ThemeType } from '../types';

export const THEME_CONFIGS: Record<ThemeType, {
  name: string;
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  textColor: string;
}> = {
  'purple-burgundy': {
    name: 'Purple & Burgundy (Signature)',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #4a0e2e 0%, #200827 50%, #0d0314 100%)',
    accentColor: '#e04374',
    glowColor: 'rgba(224, 67, 116, 0.45)',
    textColor: '#fae3b4'
  },
  'midnight-gold': {
    name: 'Midnight & Gold',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f172a 60%, #030712 100%)',
    accentColor: '#f6d860',
    glowColor: 'rgba(246, 216, 96, 0.45)',
    textColor: '#fef08a'
  },
  'rose-blush': {
    name: 'Rose Gold & Blush',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #581c87 0%, #4c0519 55%, #180313 100%)',
    accentColor: '#fb7185',
    glowColor: 'rgba(251, 113, 133, 0.45)',
    textColor: '#ffe4e6'
  },
  'velvet-ruby': {
    name: 'Velvet Ruby & Noir',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #881337 0%, #2e081a 60%, #0a0107 100%)',
    accentColor: '#fda4af',
    glowColor: 'rgba(253, 164, 175, 0.45)',
    textColor: '#fff1f2'
  }
};

export const STATIC_MEMORIES = [
  {
    id: "memory-video-1",
    url: "/memory-video.mp4",
    isVideo: true,
    caption: "Our Most Precious Video Moment 🎥✨",
    date: "Special Video Memory",
    note: "Every second with you is a moment to treasure forever."
  },
  {
    id: "photo-1",
    url: "/sandhiya-1.jpg",
    isVideo: false,
    caption: "Your lovely, radiant smile ✨",
    date: "Sweet Moments",
    note: "The gentlest, most beautiful smile that lights up my world."
  },
  {
    id: "photo-2",
    url: "/sandhiya-2.jpg",
    isVideo: false,
    caption: "Blossoming in nature's grace 🌸",
    date: "Pure Elegance",
    note: "Like a flower dancing under the sky, graceful and free."
  },
  {
    id: "photo-3",
    url: "/sandhiya-3.jpg",
    isVideo: false,
    caption: "A timeless, angelic grace 🕊️",
    date: "Angelic Moments",
    note: "Looking at you reminds me of everything pure and good."
  },
  {
    id: "photo-4",
    url: "/sandhiya-4.jpg",
    isVideo: false,
    caption: "Starlight beauty in the night 🌙",
    date: "Moonlit Night",
    note: "You outshine every star in the dark night sky."
  },
  {
    id: "photo-5",
    url: "/sandhiya-5.jpg",
    isVideo: false,
    caption: "Unconditionally loved, today and always 💕",
    date: "Forever & Always",
    note: "Here is to you, my dear Sandhiya, the most precious blessing in my life."
  }
];

export const EXACT_LETTER_TITLE = "✨ Happiest Birthday! ❤️🎂";

export const EXACT_LETTER_PARAGRAPHS = [
  "May your life always be filled with endless happiness, beautiful memories, and countless reasons to smile. Never stop dreaming, never lose your beautiful smile, and always keep shining wherever life takes you.",
  "You deserve all the happiness, success, love, and everything your heart wishes for. May this new chapter of your life bring you unforgettable moments and wonderful surprises.",
  "Stay blessed, stay happy, and keep being the amazing person you are! ❤️✨"
];

export const EXACT_LETTER_SIGNOFF = "Once again, Wishing you the Happiest Birthday My Favourite plot Twist ! 🥳🎉";

export const DEFAULT_CONFIG: SurpriseConfig = {
  name: "Sandhiya",
  nickname: "My Love",
  greeting: "Hi Beautiful ❤️",
  birthdayDate: "Today",
  introSubtitle: "Today is dedicated to celebrating the most radiant, wonderful, and extraordinary soul in the world.",
  cakeMessage: "Make a wish and light the candle 🕯️",
  wishText: "May all your dreams sparkle into reality!",
  balloons: [
    {
      id: 1,
      color: "from-rose-500 to-pink-600",
      accent: "#f43f5e",
      message: "✨ May your smile never fade and your happiness never end.",
      popped: false,
      xOffset: 12,
      speed: 5
    },
    {
      id: 2,
      color: "from-amber-400 to-orange-500",
      accent: "#f59e0b",
      message: "🌸 You deserve all the happiness this world can offer.",
      popped: false,
      xOffset: 27,
      speed: 6.2
    },
    {
      id: 3,
      color: "from-purple-500 to-indigo-600",
      accent: "#a855f7",
      message: "💖 May all your dreams turn into beautiful realities.",
      popped: false,
      xOffset: 45,
      speed: 5.5
    },
    {
      id: 4,
      color: "from-red-500 to-rose-700",
      accent: "#e11d48",
      message: "🦋 Keep shining in your own unique and beautiful way.",
      popped: false,
      xOffset: 62,
      speed: 6.8
    },
    {
      id: 5,
      color: "from-pink-400 to-rose-500",
      accent: "#ec4899",
      message: "🌷 May life surprise you with countless beautiful moments.",
      popped: false,
      xOffset: 78,
      speed: 5.2
    },
    {
      id: 6,
      color: "from-yellow-300 to-amber-500",
      accent: "#fbbf24",
      message: "❤️ Stay happy, stay blessed, and keep smiling always.",
      popped: false,
      xOffset: 90,
      speed: 6.5
    }
  ],
  photos: STATIC_MEMORIES,
  letterTitle: EXACT_LETTER_TITLE,
  letterParagraphs: EXACT_LETTER_PARAGRAPHS,
  letterSignoff: EXACT_LETTER_SIGNOFF,
  celebrationTitle: "Happy Birthday My Favourite plot Twist",
  finalWishText: "May your new age be filled with boundless joy, unforgettable adventures, sweet surprises, and unconditional love. Keep shining like the brilliant star you are, Sandhiya!",
  theme: "purple-burgundy",
  activeMusicTrack: "romantic-piano"
};
