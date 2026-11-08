import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
}

export const TouchSparkles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const symbols = ['✨', '💖', '🌸', '⭐', '💕'];

    const addParticle = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastTime < 70) return; // throttle for silky smooth 60fps
      lastTime = now;

      const newP: Particle = {
        id: now + Math.random(),
        x,
        y,
        char: symbols[Math.floor(Math.random() * symbols.length)],
      };

      setParticles(prev => [...prev.slice(-15), newP]);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        addParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, scale: 0.6, x: p.x - 10, y: p.y - 10 }}
            animate={{ opacity: 0, scale: 1.4, y: p.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute text-sm select-none drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

