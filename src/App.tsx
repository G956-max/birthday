import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurpriseConfig } from './hooks/useSurpriseConfig';
import { AmbientBackground } from './components/AmbientBackground';
import { NavigationHeader } from './components/NavigationHeader';
import { TouchSparkles } from './components/TouchSparkles';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { FlowerScreen } from './components/screens/FlowerScreen';
import { IntroScreen } from './components/screens/IntroScreen';
import { CakeScreen } from './components/screens/CakeScreen';
import { BalloonsScreen } from './components/screens/BalloonsScreen';
import { MemoryLaneScreen } from './components/screens/MemoryLaneScreen';
import { LetterScreen } from './components/screens/LetterScreen';
import { CelebrationScreen } from './components/screens/CelebrationScreen';
import { soundManager } from './utils/audio';

export function App() {
  const {
    config,
    updateConfig,
    currentScreen,
    nextScreen,
    prevScreen,
    goToScreen,
    poppedBalloonIds,
    popBalloon,
    resetBalloons,
    isCandleLit,
    setIsCandleLit,
    resetToDefaults,
    setTheme,
  } = useSurpriseConfig();

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    soundManager.setTrack(config.activeMusicTrack, config.customMusicUrl);
  }, [config.activeMusicTrack, config.customMusicUrl]);

  const handleToggleMusic = () => {
    const playing = soundManager.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleReplay = () => {
    soundManager.playSparkle();
    resetBalloons();
    setIsCandleLit(false);
    goToScreen(1);
  };

  const screenVariants = {
    initial: { opacity: 0, scale: 0.95, y: 14, filter: 'blur(3px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 1.02, y: -14, filter: 'blur(3px)', transition: { duration: 0.35, ease: 'easeInOut' } },
  };

  return (
    <div className="min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-between bg-[#07010e] select-none relative overflow-x-hidden">
      {/* Ambient Animated Romantic Glow Background */}
      <AmbientBackground theme={config.theme} />

      {/* Touch trail sparkles */}
      <TouchSparkles />

      {/* Main Responsive Mobile Container */}
      <div className="relative z-10 w-full max-w-md min-h-[100dvh] flex flex-col justify-between px-3.5 sm:px-5 py-1.5 safe-top safe-bottom">
        {/* Mobile Story Header */}
        <NavigationHeader
          currentScreen={currentScreen}
          totalScreens={8}
          onSelectScreen={goToScreen}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />

        {/* Screen Content Container with smooth mobile transitions */}
        <main className="relative z-10 flex-1 flex flex-col justify-between w-full py-0.5">
          <AnimatePresence mode="wait">
            {currentScreen === 1 && (
              <motion.div key="screen-1" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <WelcomeScreen
                  greeting={config.greeting}
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 2 && (
              <motion.div key="screen-2" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <FlowerScreen
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 3 && (
              <motion.div key="screen-3" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <IntroScreen
                  name={config.name}
                  subtitle={config.introSubtitle}
                  birthdayDate={config.birthdayDate}
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 4 && (
              <motion.div key="screen-4" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <CakeScreen
                  name={config.name}
                  cakeMessage={config.cakeMessage}
                  wishText={config.wishText}
                  isCandleLit={isCandleLit}
                  setIsCandleLit={setIsCandleLit}
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 5 && (
              <motion.div key="screen-5" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <BalloonsScreen
                  balloons={config.balloons}
                  poppedIds={poppedBalloonIds}
                  onPop={popBalloon}
                  onResetBalloons={resetBalloons}
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 6 && (
              <motion.div key="screen-6" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <MemoryLaneScreen
                  photos={config.photos}
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 7 && (
              <motion.div key="screen-7" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <LetterScreen
                  title={config.letterTitle}
                  paragraphs={config.letterParagraphs}
                  signoff={config.letterSignoff}
                  onProceed={nextScreen}
                />
              </motion.div>
            )}

            {currentScreen === 8 && (
              <motion.div key="screen-8" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-between">
                <CelebrationScreen
                  name={config.name}
                  celebrationTitle={config.celebrationTitle}
                  finalWishText={config.finalWishText}
                  onReplay={handleReplay}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Bar / Indicator */}
        <div className="relative z-10 py-1 text-center text-[11px] text-pink-300/50 font-serif italic">
          For {config.name} with endless happiness ❤️
        </div>
      </div>
    </div>
  );
}

export default App;
