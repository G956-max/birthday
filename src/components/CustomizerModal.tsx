import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Sparkles, Palette, Music, RotateCcw, Check } from 'lucide-react';
import { SurpriseConfig, ThemeType } from '../types';
import { THEME_CONFIGS } from '../utils/defaults';
import { soundManager } from '../utils/audio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SurpriseConfig;
  onUpdateConfig: (updates: Partial<SurpriseConfig>) => void;
  onResetToDefaults: () => void;
  onSetTheme: (theme: ThemeType) => void;
}

type TabType = 'general' | 'letter' | 'balloons' | 'theme';

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefaults,
  onSetTheme,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [savedNotification, setSavedNotification] = useState(false);

  if (!isOpen) return null;

  const triggerSaveNotice = () => {
    soundManager.playSparkle();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      onUpdateConfig({ customMusicUrl: audioUrl, activeMusicTrack: 'custom' });
      soundManager.setTrack('custom', audioUrl);
      triggerSaveNotice();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="relative w-full max-w-sm sm:max-w-md h-[90vh] sm:h-[84vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#140822] border-t sm:border border-pink-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <div>
              <h2 className="font-serif text-base font-bold text-pink-100">
                Personalize Surprise
              </h2>
              <p className="text-[10px] text-pink-300/70">
                Edit name, letter, balloons & music
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 bg-black/20 border-b border-white/5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'general', label: 'General', icon: User },
            { id: 'letter', label: 'Letter', icon: Mail },
            { id: 'balloons', label: 'Balloons', icon: Sparkles },
            { id: 'theme', label: 'Theme', icon: Palette },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-medium text-xs ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm'
                    : 'text-pink-200/70 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Birthday Person's Name:
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={e => {
                    onUpdateConfig({ name: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                  placeholder="e.g. Sandhiya"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Affectionate Nickname:
                </label>
                <input
                  type="text"
                  value={config.nickname}
                  onChange={e => {
                    onUpdateConfig({ nickname: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                  placeholder="e.g. My Love"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Welcome Greeting:
                </label>
                <input
                  type="text"
                  value={config.greeting}
                  onChange={e => {
                    onUpdateConfig({ greeting: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                  placeholder="e.g. Hi Beautiful ❤️"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Birthday Date:
                </label>
                <input
                  type="text"
                  value={config.birthdayDate}
                  onChange={e => {
                    onUpdateConfig({ birthdayDate: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Intro Subtitle:
                </label>
                <textarea
                  rows={2}
                  value={config.introSubtitle}
                  onChange={e => {
                    onUpdateConfig({ introSubtitle: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Candle Wish Reveal Text:
                </label>
                <input
                  type="text"
                  value={config.wishText}
                  onChange={e => {
                    onUpdateConfig({ wishText: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Grand Finale Wish Text:
                </label>
                <textarea
                  rows={2}
                  value={config.finalWishText}
                  onChange={e => {
                    onUpdateConfig({ finalWishText: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 2: LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Letter Title:
                </label>
                <input
                  type="text"
                  value={config.letterTitle}
                  onChange={e => {
                    onUpdateConfig({ letterTitle: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-script text-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Body Paragraphs:
                </label>
                <textarea
                  rows={6}
                  value={config.letterParagraphs.join("\n\n")}
                  onChange={e => {
                    const parts = e.target.value.split("\n\n").map(p => p.trim()).filter(Boolean);
                    onUpdateConfig({ letterParagraphs: parts });
                    triggerSaveNotice();
                  }}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs font-serif leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Signoff:
                </label>
                <input
                  type="text"
                  value={config.letterSignoff}
                  onChange={e => {
                    onUpdateConfig({ letterSignoff: e.target.value });
                    triggerSaveNotice();
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-script text-lg"
                />
              </div>
            </div>
          )}

          {/* TAB 3: BALLOONS */}
          {activeTab === 'balloons' && (
            <div className="space-y-2">
              <span className="text-[11px] text-pink-300/80 block mb-1">
                Customize 6 secret messages inside balloons:
              </span>

              {config.balloons.map((balloon, index) => (
                <div
                  key={balloon.id}
                  className="p-2 rounded-xl bg-black/30 border border-white/10 flex items-center gap-2"
                >
                  <span className="text-[11px] font-bold text-pink-300 w-16 shrink-0">
                    #{index + 1}:
                  </span>
                  <input
                    type="text"
                    value={balloon.message}
                    onChange={e => {
                      const updated = config.balloons.map(b => b.id === balloon.id ? { ...b, message: e.target.value } : b);
                      onUpdateConfig({ balloons: updated });
                      triggerSaveNotice();
                    }}
                    className="flex-1 px-2.5 py-1 rounded-lg bg-black/50 border border-white/15 text-white text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: THEME & MUSIC */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-2">
                  Theme Preset:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(THEME_CONFIGS) as ThemeType[]).map(themeKey => {
                    const themeObj = THEME_CONFIGS[themeKey];
                    const isSelected = config.theme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        onClick={() => {
                          onSetTheme(themeKey);
                          triggerSaveNotice();
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-white/15 border-pink-400 ring-1 ring-pink-400'
                            : 'bg-black/30 border-white/10'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full shrink-0 border border-white/30"
                          style={{ background: themeObj.accentColor }}
                        />
                        <span className="text-[11px] font-medium text-white truncate">
                          {themeObj.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Music Settings */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="block text-[11px] font-semibold uppercase text-pink-300 mb-1">
                  Romantic Audio:
                </label>
                
                <label className="cursor-pointer w-full py-2 px-3 rounded-xl bg-pink-900/40 border border-pink-400/30 text-pink-200 text-xs font-medium flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5" />
                    <span>{config.customMusicUrl ? 'Change MP3' : 'Upload MP3 Song'}</span>
                  </div>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleCustomAudioUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Reset to Defaults */}
              <div className="pt-2 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    if (window.confirm("Reset all customizations to defaults?")) {
                      onResetToDefaults();
                      triggerSaveNotice();
                    }
                  }}
                  className="text-[11px] text-rose-300 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Template Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-black/40">
          <div className="text-[11px] text-emerald-400">
            {savedNotification ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved!
              </span>
            ) : (
              <span className="text-white/40 text-[10px]">Saved to device</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium text-xs shadow-md"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
