import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cake, ArrowRight, Crown } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface IntroScreenProps {
  name: string;
  subtitle: string;
  birthdayDate: string;
  onProceed: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  name,
  subtitle,
  birthdayDate,
  onProceed,
}) => {
  const handleNext = () => {
    soundManager.playSparkle();
    soundManager.playChime();
    onProceed();
  };

  const titleWords = "Happy Birthday!".split(" ");

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-3 text-center z-10 w-full max-w-sm mx-auto">
      {/* Crown Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="mt-1"
      >
        <div className="p-2.5 rounded-full bg-gradient-to-tr from-amber-500/30 to-pink-500/20 border border-amber-300/40 shadow-[0_0_20px_rgba(251,191,36,0.4)] backdrop-blur-md">
          <Crown className="w-6 h-6 text-amber-300 drop-shadow-[0_2px_6px_rgba(251,191,36,0.6)]" />
        </div>
      </motion.div>

      {/* Center Cinematic Section */}
      <div className="my-auto py-2">
        {/* Date badge */}
        {birthdayDate && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-pink-200 text-xs backdrop-blur-md mb-3"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="font-sans tracking-wider uppercase font-semibold text-[10px]">
              Celebrating {birthdayDate}
            </span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </motion.div>
        )}

        {/* Happy Birthday! */}
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {titleWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15 }}
              className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-200 to-amber-200 drop-shadow-[0_4px_16px_rgba(244,63,94,0.6)]"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Birthday Girl's Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, type: 'spring' }}
          className="relative my-2"
        >
          <h2 className="font-script text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-amber-300 drop-shadow-[0_4px_25px_rgba(244,63,94,0.8)] px-2 leading-tight">
            {name}
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="h-1 w-40 mx-auto rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.8)] mt-1"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-serif italic text-pink-100/90 text-sm sm:text-base max-w-xs mx-auto mt-4 leading-relaxed font-light px-2"
        >
          "{subtitle}"
        </motion.p>
      </div>

      {/* Mobile CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleNext}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-medium text-base shadow-[0_8px_25px_rgba(224,67,116,0.5)] border border-amber-300/40 flex items-center justify-center gap-2.5 transition-all mt-2 active:scale-95"
      >
        <Cake className="w-4 h-4 text-amber-200" />
        <span className="font-sans font-semibold tracking-wide">Time To Cut The Cake</span>
        <ArrowRight className="w-4 h-4 text-amber-200" />
      </motion.button>
    </div>
  );
};
