import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface WelcomeScreenProps {
  greeting: string;
  onProceed: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ greeting, onProceed }) => {
  const handleClick = () => {
    soundManager.playHeartbeat();
    soundManager.playSparkle();
    soundManager.startMusic();
    onProceed();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-3 text-center z-10 w-full max-w-sm mx-auto">
      {/* Top Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-900/40 border border-pink-500/30 text-pink-200 text-xs backdrop-blur-md shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
        <span className="tracking-wider uppercase text-[10px] font-semibold text-pink-300">A special surprise for you</span>
      </motion.div>

      {/* Main Greeting */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="my-auto py-4"
      >
        <h1 className="font-script text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 drop-shadow-[0_4px_16px_rgba(224,67,116,0.6)] leading-tight px-2">
          {greeting}
        </h1>

        {/* Animated Glowing 3D Heart */}
        <div 
          className="relative my-6 cursor-pointer mx-auto flex items-center justify-center"
          onClick={() => soundManager.playHeartbeat()}
        >
          {/* Pulsing Glow Rings */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 rounded-full bg-pink-500 blur-xl pointer-events-none"
          />

          {/* Central Heart Icon with Heartbeat Animation */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1.04, 1.18, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 via-pink-600 to-purple-800 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.7)] border-2 border-pink-300/40"
          >
            <Heart className="w-12 h-12 text-rose-100 fill-rose-100 drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]" />
          </motion.div>
        </div>

        {/* Subtitle Message */}
        <p className="font-serif italic text-pink-200/90 text-base sm:text-lg max-w-xs mx-auto leading-relaxed font-light px-2">
          I created something genuinely magical just for you. Take a deep breath and step inside...
        </p>
      </motion.div>

      {/* Clickable Mobile CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleClick}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-medium text-base shadow-[0_8px_25px_rgba(224,67,116,0.5)] border border-pink-300/40 flex items-center justify-center gap-2.5 transition-all mt-2 active:scale-95"
      >
        <Heart className="w-4 h-4 text-rose-200 fill-rose-200" />
        <span className="font-sans font-semibold tracking-wide">A Little Surprise For You</span>
        <ArrowRight className="w-4 h-4 text-rose-200" />
      </motion.button>
    </div>
  );
};
