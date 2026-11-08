import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface FlowerScreenProps {
  onProceed: () => void;
}

export const FlowerScreen: React.FC<FlowerScreenProps> = ({ onProceed }) => {
  const [clickedPetals, setClickedPetals] = useState<{ id: number; x: number; y: number }[]>([]);

  // Generate mobile-tuned falling flowers and petals
  const petals = useMemo(() => {
    const flowerTypes = ['🌸', '🌺', '🌹', '✨', '💐', '🌷'];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      char: flowerTypes[i % flowerTypes.length],
      left: Math.random() * 90 + 5,
      delay: Math.random() * 4,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 12 + 18,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 720 + 360,
      drift: (Math.random() - 0.5) * 80,
    }));
  }, []);

  const handlePetalClick = (e: React.MouseEvent, id: number) => {
    soundManager.playSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    setClickedPetals(prev => [...prev, { id: Date.now() + id, x: rect.left, y: rect.top }]);
  };

  const handleNext = () => {
    soundManager.playChime();
    onProceed();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-3 text-center z-10 w-full max-w-sm mx-auto relative overflow-hidden">
      {/* Falling Flower Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            onClick={(e) => handlePetalClick(e, petal.id)}
            className="absolute select-none cursor-pointer pointer-events-auto filter drop-shadow-[0_4px_8px_rgba(244,63,94,0.4)]"
            style={{
              left: `${petal.left}%`,
              fontSize: `${petal.size}px`,
            }}
            initial={{
              y: '-8vh',
              rotate: petal.rotateStart,
              opacity: 0,
            }}
            animate={{
              y: '100vh',
              x: [0, petal.drift, petal.drift * 0.5, petal.drift],
              rotate: petal.rotateEnd,
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'easeInOut',
            }}
          >
            {petal.char}
          </motion.div>
        ))}
      </div>

      {/* Sparkle burst feedback */}
      <AnimatePresence>
        {clickedPetals.map(burst => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed pointer-events-none text-lg z-50 text-yellow-300 font-bold"
            style={{ left: burst.x, top: burst.y }}
          >
            ✨💖✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Center Flower Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="my-auto w-full p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-pink-500/30 shadow-[0_15px_35px_rgba(45,10,30,0.6)] flex flex-col items-center"
      >
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/30 to-rose-400/20 border border-pink-400/40 flex items-center justify-center text-4xl mb-4 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
        >
          🌸
        </motion.div>

        <div className="flex items-center gap-1.5 text-pink-300 text-[11px] font-semibold tracking-widest uppercase mb-2">
          <Sparkles className="w-3 h-3 text-pink-400" />
          <span>A Sweet Whisper</span>
          <Sparkles className="w-3 h-3 text-pink-400" />
        </div>

        <h2 className="font-script text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 leading-tight mb-3">
          Something special is waiting for you...
        </h2>

        <p className="font-serif italic text-pink-200/80 text-sm leading-relaxed max-w-xs mb-3">
          Like blossoms dancing in the gentle breeze, every moment today is painted with love and sweet promises.
        </p>

        <p className="text-white/40 text-[10px] mt-1">
          Tap falling blossoms for sparkles ✨
        </p>
      </motion.div>

      {/* Mobile CTA Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleNext}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white font-medium text-base shadow-lg shadow-pink-900/40 border border-pink-300/40 flex items-center justify-center gap-2 transition-all mt-2 active:scale-95"
      >
        <span>Open What Comes Next</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
