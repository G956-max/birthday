import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';

interface CakeScreenProps {
  name: string;
  cakeMessage: string;
  wishText: string;
  isCandleLit: boolean;
  setIsCandleLit: (lit: boolean) => void;
  onProceed: () => void;
}

export const CakeScreen: React.FC<CakeScreenProps> = ({
  name,
  cakeMessage,
  wishText,
  isCandleLit,
  setIsCandleLit,
  onProceed,
}) => {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleCandleClick = () => {
    if (!isCandleLit) {
      soundManager.playCandleIgnite();
      soundManager.playSparkle();
      setIsCandleLit(true);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fbbf24', '#f472b6', '#ffffff'],
      });
    } else if (!candlesBlown) {
      soundManager.playCelebrationFanfare();
      setCandlesBlown(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#ffd700', '#ff69b4', '#ff1493', '#9370db', '#00ffff'],
      });
    }
  };

  const handleNext = () => {
    soundManager.playChime();
    onProceed();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-2 text-center z-10 w-full max-w-sm mx-auto select-none">
      {/* Title / Instruction */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-900/40 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md mb-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          The Birthday Ritual
        </span>
        <h2 className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          {!isCandleLit 
            ? "Light the Birthday Candle 🕯️" 
            : !candlesBlown 
            ? "Make a wish & blow it out! ✨" 
            : "Your wish is sent to the stars! 🌟"}
        </h2>
        <p className="font-sans text-pink-200/80 text-xs mt-0.5">
          {!isCandleLit 
            ? "Tap the candle to light the flame" 
            : !candlesBlown 
            ? "Tap the glowing flame to blow out candle" 
            : "May all your dreams blossom into reality"}
        </p>
      </motion.div>

      {/* 3D-Style Cake scaled for mobile screens */}
      <div className="relative my-auto py-2 flex flex-col items-center">
        {/* Glow halo */}
        <motion.div
          animate={{
            scale: isCandleLit && !candlesBlown ? [1, 1.15, 1] : 1,
            opacity: isCandleLit && !candlesBlown ? [0.5, 0.8, 0.5] : 0.15,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 w-52 h-52 rounded-full bg-amber-400/25 blur-3xl pointer-events-none"
        />

        {/* CANDLE & FLAME (CLICKABLE) */}
        <div 
          onClick={handleCandleClick}
          className="relative z-30 cursor-pointer group flex flex-col items-center mb-0.5 -translate-y-1 transition-transform active:scale-95"
          title={!isCandleLit ? "Tap to Light Candle" : "Tap to Blow Out"}
        >
          {/* Flame animation */}
          <div className="h-10 flex items-center justify-center relative">
            {isCandleLit && !candlesBlown ? (
              <motion.div
                initial={{ scale: 0, y: 5 }}
                animate={{ scale: [1, 1.15, 0.95, 1], y: [0, -2, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-6 h-9 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 blur-[1px] shadow-[0_0_15px_#f59e0b,0_0_25px_#f43f5e]" />
                <div className="absolute inset-x-1.5 bottom-1 top-2 rounded-full bg-yellow-100 opacity-90 blur-[0.5px]" />
                <div className="absolute inset-x-2 bottom-0 h-2 rounded-full bg-blue-500 opacity-80" />
              </motion.div>
            ) : candlesBlown ? (
              <motion.div
                initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -30, scale: 1.8 }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-white/60 text-sm"
              >
                💨
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-semibold text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-400/30 mb-0.5 animate-pulse">
                  Tap to Light 👆
                </span>
                <div className="w-1 h-3 bg-gray-400 rounded-t" />
              </div>
            )}
          </div>

          {/* Candle Body */}
          <div className="w-4 h-10 rounded-t-sm bg-gradient-to-r from-pink-300 via-white to-pink-200 border-x border-pink-400 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_4px,transparent_4px,transparent_8px)]" />
          </div>
        </div>

        {/* TIER 1: Top Cake Tier */}
        <div className="relative z-20 w-32 h-10 rounded-t-xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 shadow-md border-t border-pink-200 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between px-1.5 -mt-0.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-3.5 h-3 rounded-b-full bg-white/95" />
            ))}
          </div>
          <div className="absolute top-0.5 left-0 right-0 flex justify-around px-2 text-[11px]">
            <span>🍓</span>
            <span>🍒</span>
            <span>🍓</span>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300" />
        </div>

        {/* TIER 2: Middle Cake Tier */}
        <div className="relative z-10 w-44 h-12 bg-gradient-to-r from-rose-700 via-pink-600 to-purple-800 shadow-lg border-t border-pink-400/40 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-around px-1 -mt-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3.5 h-3 rounded-b-full bg-rose-200/90" />
            ))}
          </div>
          <div className="my-auto font-script text-xl text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {name}
          </div>
          <div className="flex justify-center gap-1 py-0.5 bg-black/20">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-200/90 shadow-[0_0_3px_#fbbf24]" />
            ))}
          </div>
        </div>

        {/* TIER 3: Base Cake Tier */}
        <div className="relative z-0 w-54 h-13 rounded-b-lg bg-gradient-to-r from-purple-950 via-rose-900 to-purple-950 shadow-xl border-t border-purple-500/30 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-around px-1.5 -mt-0.5">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="w-3.5 h-3 rounded-b-full bg-pink-100/90" />
            ))}
          </div>
          <div className="flex justify-around text-amber-300 text-[10px] px-4 py-0.5 opacity-80">
            <span>✨</span>
            <span>⭐</span>
            <span>💖</span>
            <span>⭐</span>
            <span>✨</span>
          </div>
          <div className="w-full h-1.5 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500" />
        </div>

        {/* Golden Cake Stand Plate */}
        <div className="w-58 h-3 rounded-b-full bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-700 shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-t border-yellow-100" />
      </div>

      {/* Wish Reveal Card */}
      <AnimatePresence>
        {isCandleLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-pink-500/40 shadow-lg text-center mb-1"
          >
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-semibold text-xs mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{candlesBlown ? "Wish Released to Heaven" : "Make Your Secret Wish"}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="font-serif italic text-pink-100 text-xs sm:text-sm">
              "{wishText}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile CTA Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleNext}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white font-medium text-base shadow-lg shadow-pink-950/50 border border-pink-300/40 flex items-center justify-center gap-2 transition-all active:scale-95 mt-1"
      >
        <span>Pop Your Birthday Balloons</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
