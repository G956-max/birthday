import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, RotateCw, Heart, Calendar, Play } from 'lucide-react';
import { MemoryPhoto } from '../../types';
import { soundManager } from '../../utils/audio';

interface MemoryLaneScreenProps {
  photos: MemoryPhoto[];
  onProceed: () => void;
}

export const MemoryLaneScreen: React.FC<MemoryLaneScreenProps> = ({
  photos,
  onProceed,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentPhoto = photos[currentIndex] || photos[0];

  useEffect(() => {
    if (videoRef.current) {
      if (!currentPhoto.isVideo) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [currentIndex, currentPhoto.isVideo]);

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playSparkle();
    setIsFlipped(false);
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playSparkle();
    setIsFlipped(false);
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  const handleFlipCard = () => {
    if (currentPhoto.isVideo) return;
    soundManager.playHeartbeat();
    setIsFlipped(!isFlipped);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNextPhoto();
    } else if (info.offset.x > 40) {
      handlePrevPhoto();
    }
  };

  const handleToggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        soundManager.stopMusic();
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        soundManager.startMusic();
      }
    }
  };

  const handleNext = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    soundManager.playChime();
    onProceed();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-2 text-center z-10 w-full max-w-sm mx-auto select-none">
      {/* Header Info */}
      <div className="w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-900/40 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md mb-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Precious Chapters
        </span>
        <h2 className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          Memory Lane 📸
        </h2>
        <p className="font-sans text-pink-200/80 text-xs mt-0.5">
          {currentPhoto.isVideo 
            ? "Tap video to play our special moments 🎥" 
            : "Swipe left/right to browse • Tap to read note!"}
        </p>
      </div>

      {/* POLAROID 3D FLIP-BOOK STAGE */}
      <div className="relative w-full my-auto flex flex-col items-center py-1">
        {/* Navigation Buttons on sides */}
        <button
          onClick={handlePrevPhoto}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/70 hover:bg-pink-950 border border-pink-500/30 text-white shadow-lg active:scale-90"
          title="Previous Memory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextPhoto}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/70 hover:bg-pink-950 border border-pink-500/30 text-white shadow-lg active:scale-90"
          title="Next Memory"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 3D Card Container */}
        <div 
          className="relative w-[270px] sm:w-[290px] h-[315px] sm:h-[335px] cursor-pointer perspective-1000"
          onClick={handleFlipCard}
        >
          {/* Aesthetic washi tape on top of polaroid */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-amber-200/80 border border-amber-300/40 rounded-sm -rotate-2 shadow-sm z-30 backdrop-blur-xs pointer-events-none" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPhoto.id + (isFlipped ? '-flipped' : '-front')}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{
                opacity: 0,
                x: direction > 0 ? 50 : -50,
                rotateY: isFlipped ? 180 : 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: isFlipped ? 180 : 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -50 : 50,
                scale: 0.95
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="w-full h-full rounded-2xl bg-gradient-to-b from-[#fffafb] to-[#f5e6ea] p-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-pink-200/60 flex flex-col justify-between text-neutral-800 relative overflow-hidden touch-pan-y"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {!isFlipped ? (
                /* FRONT VIEW: VIDEO OR PHOTO */
                <>
                  <div className="relative w-full h-[74%] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-300/40 shadow-inner flex items-center justify-center">
                    {currentPhoto.isVideo ? (
                      /* HTML5 Video Player */
                      <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <video
                          ref={videoRef}
                          src={currentPhoto.url}
                          playsInline
                          loop
                          controls
                          className="w-full h-full object-cover"
                          onPlay={() => {
                            setIsVideoPlaying(true);
                            soundManager.stopMusic();
                          }}
                          onPause={() => {
                            setIsVideoPlaying(false);
                            soundManager.startMusic();
                          }}
                        />
                        {/* Custom Play button overlay when paused */}
                        {!isVideoPlaying && (
                          <div 
                            onClick={handleToggleVideo}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] pointer-events-auto"
                          >
                            <div className="w-12 h-12 rounded-full bg-rose-600/90 border border-white/40 flex items-center justify-center shadow-lg transform active:scale-95 transition-transform">
                              <Play className="w-6 h-6 text-white ml-1 fill-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* High Quality Image */
                      <img
                        src={currentPhoto.url}
                        alt={currentPhoto.caption}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="lazy"
                      />
                    )}

                    {currentPhoto.date && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1 border border-white/20 z-10">
                        <Calendar className="w-2.5 h-2.5 text-pink-300" />
                        <span>{currentPhoto.date}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 px-1 flex flex-col justify-center">
                    <h3 className="font-script text-xl text-rose-900 line-clamp-1">
                      {currentPhoto.caption}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-0.5">
                      {!currentPhoto.isVideo ? (
                        <span className="flex items-center gap-1 text-pink-700 font-medium">
                          <RotateCw className="w-2.5 h-2.5" /> Tap to read note
                        </span>
                      ) : (
                        <span className="text-rose-600 font-medium flex items-center gap-1">
                          🎥 Video Memory
                        </span>
                      )}
                      <span>{currentIndex + 1} / {photos.length}</span>
                    </div>
                  </div>
                </>
              ) : (
                /* BACK: VINTAGE HANDWRITTEN LOVE NOTE */
                <div 
                  className="w-full h-full p-4 flex flex-col justify-between rounded-xl bg-[#fff7f0] border-2 border-dashed border-rose-300 text-neutral-800"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="flex justify-between items-center border-b border-rose-200 pb-1">
                    <span className="text-[10px] uppercase tracking-wider text-rose-500 font-semibold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-500" /> Memory Note
                    </span>
                    <span className="text-[10px] text-neutral-500 font-serif italic">{currentPhoto.date}</span>
                  </div>

                  <div className="my-auto text-center px-1">
                    <p className="font-serif italic text-base text-neutral-800 leading-relaxed">
                      "{currentPhoto.note || currentPhoto.caption}"
                    </p>
                  </div>

                  <div className="border-t border-rose-200 pt-1 flex justify-between items-center text-[10px] text-neutral-500">
                    <span className="font-script text-lg text-rose-800">Always yours</span>
                    <span className="text-pink-600 flex items-center gap-0.5">
                      <RotateCw className="w-2.5 h-2.5" /> Tap for photo
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                soundManager.playSparkle();
                setIsFlipped(false);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-5 bg-gradient-to-r from-rose-500 to-pink-400' 
                  : 'w-1.5 bg-white/30'
              }`}
              title={p.caption}
            />
          ))}
        </div>
      </div>

      {/* Mobile CTA Button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleNext}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white font-medium text-base shadow-lg shadow-pink-950/50 border border-pink-300/40 flex items-center justify-center gap-2 transition-all mt-2 active:scale-95"
      >
        <span>A Personal Letter For You</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
