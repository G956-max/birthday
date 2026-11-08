/**
 * Audio manager with Web Audio API synthesis for romantic music and sound effects.
 * Eliminates external MP3 dependency issues while allowing custom audio uploads.
 */

export function triggerHaptic(pattern: number | number[] = 15) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore
    }
  }
}

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private isMusicPlaying = false;
  private isMuted = false;
  private volume = 0.45;
  private customAudio: HTMLAudioElement | null = null;
  private currentTrack = 'romantic-piano';

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
    if (muted && this.isMusicPlaying) {
      this.stopMusic();
    } else if (!muted && !this.isMusicPlaying) {
      this.startMusic();
    }
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public getIsMusicPlaying() {
    return this.isMusicPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public setTrack(trackId: string, customUrl?: string) {
    this.currentTrack = trackId;
    if (trackId === 'custom' && customUrl) {
      if (this.customAudio) {
        this.customAudio.pause();
      }
      this.customAudio = new Audio(customUrl);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
      this.customAudio.muted = this.isMuted;
      if (this.isMusicPlaying) {
        this.customAudio.play().catch(() => {});
      }
    } else {
      if (this.customAudio) {
        this.customAudio.pause();
        this.customAudio = null;
      }
    }
  }

  public startMusic() {
    if (this.isMuted) return;
    this.initContext();
    this.isMusicPlaying = true;

    if (this.currentTrack === 'custom' && this.customAudio) {
      this.customAudio.play().catch(() => {});
      return;
    }

    if (this.musicInterval) return;

    // Romantic music composition using Web Audio synthesizers
    const chordProgressions = [
      { root: 174.61, freqs: [174.61, 220.00, 261.63, 329.63, 392.00] },
      { root: 196.00, freqs: [196.00, 246.94, 293.66, 329.63, 392.00] },
      { root: 164.81, freqs: [164.81, 196.00, 246.94, 293.66, 329.63] },
      { root: 220.00, freqs: [220.00, 261.63, 329.63, 392.00, 493.88] },
      { root: 146.83, freqs: [146.83, 174.61, 220.00, 261.63, 349.23] },
      { root: 196.00, freqs: [196.00, 261.63, 293.66, 392.00, 523.25] },
      { root: 130.81, freqs: [130.81, 196.00, 246.94, 261.63, 329.63, 392.00] },
      { root: 130.81, freqs: [130.81, 164.81, 196.00, 261.63, 329.63] },
    ];

    let step = 0;
    const playNextBar = () => {
      if (!this.isMusicPlaying || this.isMuted) return;

      const chord = chordProgressions[step % chordProgressions.length];
      step++;

      this.playTone(chord.root, 'sine', 3.8, this.volume * 0.28, 0.4);

      chord.freqs.forEach((freq, i) => {
        const delay = i * 0.35 + (Math.random() * 0.08);
        setTimeout(() => {
          if (!this.isMusicPlaying || this.isMuted) return;
          this.playTone(freq * (Math.random() > 0.4 ? 2 : 1), 'triangle', 2.0, this.volume * 0.16, 0.1);
        }, delay * 1000);
      });

      if (Math.random() > 0.3) {
        const bellFreq = chord.freqs[Math.floor(Math.random() * chord.freqs.length)] * 2;
        setTimeout(() => {
          if (!this.isMusicPlaying || this.isMuted) return;
          this.playTone(bellFreq, 'sine', 1.8, this.volume * 0.12, 0.05);
        }, 1600);
      }
    };

    playNextBar();
    this.musicInterval = window.setInterval(playNextBar, 3200);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic();
    } else {
      this.setMuted(false);
      this.startMusic();
    }
    return this.isMusicPlaying;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, gainVal: number, attack = 0.05) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainVal, this.ctx.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  public playPop() {
    triggerHaptic([25, 30, 20]);
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, startTime);
      osc.frequency.exponentialRampToValueAtTime(60, startTime + 0.12);

      gain.gain.setValueAtTime(this.volume * 0.8, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.13);
    } catch {
      // ignore
    }
  }

  public playChime() {
    triggerHaptic(15);
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 1.2, this.volume * 0.3, 0.02);
        }, idx * 100);
      });
    } catch {
      // ignore
    }
  }

  public playCandleIgnite() {
    triggerHaptic([40, 50, 30]);
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [440, 554.37, 659.25, 880, 1108.73];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'triangle', 1.5, this.volume * 0.25, 0.08);
        }, i * 80);
      });
    } catch {
      // ignore
    }
  }

  public playSparkle() {
    triggerHaptic(12);
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [783.99, 987.77, 1174.66, 1318.51, 1567.98];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'sine', 0.6, this.volume * 0.2, 0.02);
        }, i * 60);
      });
    } catch {
      // ignore
    }
  }

  public playHeartbeat() {
    triggerHaptic([30, 60, 35]);
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.playTone(65, 'sine', 0.15, this.volume * 0.4, 0.02);
      setTimeout(() => {
        this.playTone(55, 'sine', 0.2, this.volume * 0.35, 0.02);
      }, 160);
    } catch {
      // ignore
    }
  }

  public playCelebrationFanfare() {
    triggerHaptic([50, 40, 50, 70]);
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [
        { f: 523.25, d: 0.15 },
        { f: 523.25, d: 0.15 },
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.4 },
        { f: 783.99, d: 0.3 },
        { f: 1046.50, d: 0.8 },
      ];

      let elapsed = 0;
      notes.forEach((note) => {
        setTimeout(() => {
          this.playTone(note.f, 'triangle', note.d, this.volume * 0.35, 0.03);
          this.playTone(note.f * 0.5, 'sine', note.d, this.volume * 0.2, 0.03);
        }, elapsed * 1000);
        elapsed += note.d * 0.85;
      });
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
