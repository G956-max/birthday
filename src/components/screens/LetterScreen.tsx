import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface LetterScreenProps {
  title?: string;
  paragraphs?: string[];
  signoff?: string;
  onProceed: () => void;
}

const DEFAULT_TITLE = "✨ Happiest Birthday! ❤️🎂";

const DEFAULT_PARAGRAPHS = [
  "May your life always be filled with endless happiness, beautiful memories, and countless reasons to smile. Never stop dreaming, never lose your beautiful smile, and always keep shining wherever life takes you.",
  "You deserve all the happiness, success, love, and everything your heart wishes for. May this new chapter of your life bring you unforgettable moments and wonderful surprises.",
  "Stay blessed, stay happy, and keep being the amazing person you are! ❤️✨"
];

const DEFAULT_SIGNOFF = "Once again, Wishing you the Happiest Birthday My Favourite plot Twist ! 🥳🎉";

export const LetterScreen: React.FC<LetterScreenProps> = ({
  title = DEFAULT_TITLE,
  paragraphs = DEFAULT_PARAGRAPHS,
  signoff = DEFAULT_SIGNOFF,
  onProceed,
}) => {
  const displayTitle = title && title.includes("Happiest Birthday") ? title : DEFAULT_TITLE;
  const displayParagraphs = paragraphs && paragraphs.length === 3 && paragraphs[0].includes("endless happiness") ? paragraphs : DEFAULT_PARAGRAPHS;
  const displaySignoff = signoff && signoff.includes("plot Twist") ? signoff : DEFAULT_SIGNOFF;

  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(1);

  useEffect(() => {
    if (revealedParagraphs < displayParagraphs.length) {
      const timer = setTimeout(() => {
        setRevealedParagraphs(prev => prev + 1);
        soundManager.playSparkle();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [revealedParagraphs, displayParagraphs.length]);

  const handleNext = () => {
    soundManager.playChime();
    onProceed();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-2 text-center z-10 w-full max-w-sm mx-auto select-none">
      {/* Header Info */}
      <div className="w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-900/40 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md mb-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Words From The Heart
        </span>
        <h2 className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          A Letter For You 💌
        </h2>
      </div>

      {/* LUXURY PARCHMENT PAPER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full my-auto rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#fffbf4] via-[#fef7ee] to-[#fbf0e4] text-neutral-800 shadow-[0_15px_40px_rgba(0,0,0,0.85)] border-2 border-amber-300/60 relative text-left"
      >
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif font-bold text-lg sm:text-xl text-rose-900 mb-2 leading-snug tracking-tight"
        >
          {displayTitle}
        </motion.h3>

        {/* Letter Paragraphs with Progressive Fade-in Animation */}
        <div className="space-y-2.5 font-serif text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
          {displayParagraphs.map((paragraph, index) => {
            const isRevealed = index < revealedParagraphs;
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                animate={{
                  opacity: isRevealed ? 1 : 0.2,
                  filter: isRevealed ? 'blur(0px)' : 'blur(3px)',
                  y: isRevealed ? 0 : 6,
                }}
                transition={{ duration: 0.7 }}
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* Signoff & Red Wax Seal Emblem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedParagraphs >= displayParagraphs.length ? 1 : 0.4 }}
          transition={{ duration: 0.8 }}
          className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-between gap-2"
        >
          <div className="whitespace-pre-line font-serif italic text-xs sm:text-[13px] font-semibold text-rose-900 leading-snug">
            {displaySignoff}
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 shadow-md border border-rose-300 flex items-center justify-center text-white/90 shrink-0">
            <Heart className="w-3.5 h-3.5 fill-rose-200 text-rose-200" />
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile CTA Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleNext}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white font-medium text-base shadow-lg shadow-pink-950/60 border border-pink-300/40 flex items-center justify-center gap-2 transition-all mt-1 active:scale-95"
      >
        <span>One Final Grand Surprise...</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
