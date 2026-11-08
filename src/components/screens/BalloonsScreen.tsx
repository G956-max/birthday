import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BalloonItem } from '../../types';
import { soundManager } from '../../utils/audio';

interface BalloonsScreenProps {
  balloons: BalloonItem[];
  poppedIds: number[];
  onPop: (id: number) => void;
  onResetBalloons: () => void;
  onProceed: () => void;
}

const BALLOON_POSITIONS = [
  { left: '8%', top: '12%' },
  { left: '40%', top: '8%' },
  { left: '72%', top: '12%' },
  { left: '16%', top: '50%' },
  { left: '48%', top: '46%' },
  { left: '78%', top: '50%' },
];

export const BalloonsScreen: React.FC<BalloonsScreenProps> = ({
  balloons,
  poppedIds,
  onPop,
  onResetBalloons,
  onProceed,
}) => {
  const handleBalloonClick = (balloon: BalloonItem, e?: React.MouseEvent) => {
    if (poppedIds.includes(balloon.id)) return;

    soundManager.playPop();
    soundManager.playSparkle();

    const rect = e?.currentTarget?.getBoundingClientRect();
    onPop(balloon.id);

    const xRatio = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const yRatio = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: xRatio, y: yRatio },
      colors: [balloon.accent, '#ffffff', '#fbbf24'],
    });

    if (poppedIds.length + 1 >= balloons.length) {
      setTimeout(() => {
        soundManager.playCelebrationFanfare();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
        });
      }, 350);
    }
  };

  const handleNext = () => {
    soundManager.playChime();
    onProceed();
  };

  const totalBalloons = balloons.length;
  const countPopped = poppedIds.length;

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2 py-1 text-center z-10 w-full max-w-sm mx-auto select-none">
      {/* Top Header */}
      <div className="w-full">
        <div className="flex items-center justify-between px-1">
          <div className="text-left">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-pink-300">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              Pop & Reveal
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 leading-tight">
              Pop The Balloons 🎈
            </h2>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-950/70 border border-pink-500/30 text-[11px] text-pink-200 shadow-sm">
            <span className="font-semibold text-rose-400">{countPopped} of {totalBalloons} popped</span>
            {countPopped > 0 && (
              <button
                onClick={onResetBalloons}
                className="ml-1 text-white/60 hover:text-white underline text-[9px]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Balloons Area */}
      <div className="relative w-full h-44 sm:h-48 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-xs overflow-visible">
        {balloons.map((balloon, index) => {
          const isPopped = poppedIds.includes(balloon.id);
          const pos = BALLOON_POSITIONS[index] || { left: `${15 * index}%`, top: '20%' };

          return (
            <AnimatePresence key={balloon.id}>
              {!isPopped ? (
                <motion.div
                  className="absolute cursor-pointer flex flex-col items-center touch-manipulation z-20"
                  style={{
                    left: pos.left,
                    top: pos.top,
                  }}
                  animate={{
                    y: [0, -10, 0, -15, 0],
                    x: [0, 4, -4, 3, 0],
                    rotate: [0, 3, -3, 1, 0],
                  }}
                  transition={{
                    duration: balloon.speed * 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => handleBalloonClick(balloon, e)}
                >
                  {/* Balloon Body */}
                  <div className="relative w-12 h-16 sm:w-14 sm:h-18 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.5)]">
                    <div className={`w-full h-full rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${balloon.color} border border-white/20`} />
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-5 rounded-full bg-white/40 -rotate-45 filter blur-[0.5px]" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs pointer-events-none drop-shadow">
                      <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-[10px] text-pink-100 border border-white/20">
                        {index + 1}
                      </span>
                    </div>
                    <div
                      className="w-2 h-1.5 mx-auto -mt-0.5 rounded-b-sm"
                      style={{ backgroundColor: balloon.accent }}
                    />
                    <svg className="w-3.5 h-9 -mt-0.5 mx-auto overflow-visible pointer-events-none">
                      <path
                        d="M 6 0 Q 3 8 6 16 T 6 30"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          );
        })}
      </div>

      {/* The Six Pill-Shaped Wish Cards in Two-Column Layout (Revealed upon popping) */}
      <div className="w-full grid grid-cols-2 gap-1.5 my-1 px-0.5">
        {balloons.map((b, index) => {
          const isPopped = poppedIds.includes(b.id);
          return (
            <AnimatePresence mode="wait" key={b.id}>
              {isPopped ? (
                <motion.div
                  key={`revealed-${b.id}`}
                  initial={{ opacity: 0, scale: 0.85, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => soundManager.playSparkle()}
                  className="cursor-default text-[10px] sm:text-[11px] px-2.5 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/60 text-pink-100 flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.35)] text-left"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] leading-tight text-left flex-1 font-medium">{b.message}</span>
                </motion.div>
              ) : (
                <motion.button
                  key={`locked-${b.id}`}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0.75 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleBalloonClick(b, e)}
                  className="cursor-pointer text-[10px] sm:text-[11px] px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-dashed border-pink-400/30 text-pink-300/60 flex items-center gap-1.5 transition-all active:scale-95 group text-left"
                  title="Click to pop balloon"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-[8px] text-pink-300 shrink-0 group-hover:scale-110 transition-transform">
                    🎈
                  </span>
                  <span className="text-[10px] leading-tight text-left flex-1 font-serif italic text-pink-300/60 group-hover:text-pink-200">
                    Pop Balloon #{index + 1} ✨
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Mobile CTA Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleNext}
        className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white font-medium text-sm sm:text-base shadow-lg shadow-pink-950/50 border border-pink-300/40 flex items-center justify-center gap-2 transition-all mt-1 active:scale-95"
      >
        <span>Walk Down Memory Lane</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
