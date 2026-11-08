import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ThemeType } from '../types';
import { THEME_CONFIGS } from '../utils/defaults';

interface AmbientBackgroundProps {
  theme: ThemeType;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ theme }) => {
  const currentTheme = THEME_CONFIGS[theme] || THEME_CONFIGS['purple-burgundy'];

  // Generate persistent random floating stars & sparkles
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  // Generate persistent floating hearts and bokeh orbs
  const hearts = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: 105 + Math.random() * 20,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 80
    }));
  }, []);

  // Light bokeh bubbles
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 260 + 180,
      duration: Math.random() * 14 + 18
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: currentTheme.bgGradient,
        }}
      />

      {/* Subtle animated vignette lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70" />

      {/* Floating Bokeh Glow Orbs */}
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: currentTheme.accentColor,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.25, 0.9, 1],
            opacity: [0.15, 0.28, 0.15]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            opacity: [0.1, star.opacity, 0.1],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Drifting subtle ambient hearts */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300/25 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
          }}
          initial={{
            y: `${heart.startY}vh`,
            opacity: 0,
            rotate: -15
          }}
          animate={{
            y: '-15vh',
            x: [`${heart.x}%`, `${heart.x + heart.drift}%`],
            opacity: [0, 0.4, 0.35, 0],
            rotate: [-15, 20, -10]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Golden Sparkle Crosses */}
      <div className="absolute inset-0">
        {[10, 30, 70, 85].map((posX, idx) => (
          <motion.div
            key={idx}
            className="absolute text-yellow-200/40 select-none text-xs"
            style={{
              left: `${posX}%`,
              top: `${(idx * 23 + 15) % 80}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [0.6, 1.2, 0.6],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 7 + idx * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </div>
  );
};

