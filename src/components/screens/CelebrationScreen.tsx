import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Heart, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';

interface CelebrationScreenProps {
  name: string;
  celebrationTitle: string;
  finalWishText: string;
  onReplay: () => void;
  onOpenSettings?: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  name,
  celebrationTitle,
  finalWishText,
  onReplay,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    soundManager.playCelebrationFanfare();

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#fbbf24', '#e11d48'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#a855f7', '#ec4899', '#ffffff'],
      });
    }, 400);

    const interval = setInterval(() => {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 45,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#fbbf24', '#f472b6'],
      });
      confetti({
        particleCount: 20,
        angle: 120,
        spread: 45,
        origin: { x: 1, y: 0.7 },
        colors: ['#a855f7', '#fbbf24', '#e11d48'],
      });
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const triggerFireworks = () => {
    soundManager.playSparkle();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff1493', '#00ffff', '#ffffff'],
    });
  };

  const triggerHeartShower = () => {
    soundManager.playHeartbeat();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      shapes: ['star'],
      colors: ['#f43f5e', '#ec4899', '#ffffff'],
    });
  };

  const handleShare = async () => {
    soundManager.playSparkle();
    const shareData = {
      title: `A Special Birthday Surprise For ${name} ❤️`,
      text: `Wishing you the happiest birthday, ${name}! Here is a digital surprise created with love for you 🎂✨`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user dismissed share sheet
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center py-0.5 text-center z-10 w-full max-w-sm mx-auto select-none">
      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/25 to-pink-500/25 border border-amber-300/30 text-amber-200 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md mb-0.5"
      >
        <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
        <span>Grand Birthday Finale</span>
        <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
      </motion.div>

      {/* Center Grand Typography */}
      <div className="my-auto py-0.5 w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-serif font-extrabold text-2xl sm:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100 drop-shadow-[0_2px_12px_rgba(244,63,94,0.6)] leading-tight px-1"
        >
          Happy Birthday
          <span className="block text-base sm:text-lg font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-200 to-amber-200 mt-0.5">
            My Favourite plot Twist
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="font-script text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-amber-300 drop-shadow-[0_2px_15px_rgba(244,63,94,0.8)] my-0.5 flex items-center justify-center gap-1.5"
        >
          <span>{name}</span>
          <Heart className="w-6 h-6 text-rose-400 fill-rose-500 animate-pulse" />
        </motion.div>

        {/* Emojis row */}
        <div className="flex items-center justify-center gap-2 text-sm my-0.5">
          <span>✨</span>
          <span>🎉</span>
          <span>🥂</span>
          <span>👑</span>
          <span>🎂</span>
          <span>💖</span>
          <span>✨</span>
        </div>

        {/* Final Wish Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-2.5 rounded-xl bg-black/45 backdrop-blur-xl border border-pink-400/30 shadow-md my-1 w-full max-w-xs"
        >
          <p className="font-serif italic text-pink-100/95 text-xs sm:text-[13px] leading-relaxed">
            "{finalWishText}"
          </p>
        </motion.div>
      </div>

      {/* Action Buttons Grid */}
      <div className="w-full space-y-1.5 mt-0.5">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={triggerFireworks}
            className="py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-xs shadow-md border border-amber-300/40 flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>🎆 Fireworks</span>
          </button>

          <button
            onClick={triggerHeartShower}
            className="py-2 px-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium text-xs shadow-md border border-pink-300/40 flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Hearts</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleShare}
            className="py-2 px-3 rounded-full bg-pink-900/50 hover:bg-pink-800 text-pink-200 text-xs font-medium border border-pink-500/30 flex items-center justify-center gap-1.5 active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Share Wish"}</span>
          </button>

          <button
            onClick={onReplay}
            className="py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-medium border border-white/20 flex items-center justify-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
