import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavigationHeaderProps {
  currentScreen: number;
  totalScreens: number;
  onSelectScreen: (screen: number) => void;
  onOpenSettings?: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

const SCREEN_TITLES = [
  "Welcome",
  "Blossoms",
  "Celebration",
  "Cake & Wish",
  "Pop Balloons",
  "Memories",
  "Letter",
  "Grand Finale"
];

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  totalScreens,
  onSelectScreen,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="w-full pt-1.5 pb-1 px-1 sm:px-2 z-40 select-none">
      {/* Header Bar: Back, Current Title, Audio */}
      <div className="flex items-center justify-between">
        {/* Left: Back button or Brand */}
        <div className="flex items-center gap-1.5">
          {currentScreen > 1 ? (
            <button
              onClick={() => {
                soundManager.playChime();
                onSelectScreen(currentScreen - 1);
              }}
              className="p-1.5 rounded-full bg-black/40 hover:bg-white/10 border border-white/10 text-pink-200 active:scale-90 transition-all flex items-center gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium text-[11px] pr-1">Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-900/30 border border-pink-500/20 text-pink-300 text-xs">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span className="font-serif italic font-semibold text-[11px]">Special Birthday</span>
            </div>
          )}

          <span className="text-xs font-semibold text-pink-200/90 font-sans tracking-wide ml-1">
            {SCREEN_TITLES[currentScreen - 1]}
          </span>
        </div>

        {/* Right: Audio toggle */}
        <div className="flex items-center gap-2">
          {/* Music Button */}
          <button
            onClick={onToggleMusic}
            className={`px-2.5 py-1 rounded-full border backdrop-blur-md transition-all flex items-center gap-1.5 text-xs active:scale-95 ${
              isMusicPlaying
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                : 'bg-black/40 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-pink-300" />
                <div className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 h-full bg-pink-400 animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-pink-300 animate-pulse" />
                  <span className="w-0.5 h-full bg-rose-400 animate-pulse" />
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
