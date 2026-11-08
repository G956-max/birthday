/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          dark: '#0f051d',
          deep: '#1a092a',
          burgundy: '#3d0c24',
          wine: '#5a1236',
          ruby: '#8e1948',
          rose: '#e04374',
          blush: '#f687b3',
          gold: '#f6d860',
          champagne: '#fae3b4',
          cream: '#fff5f7'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'candle-flicker': 'flicker 1.5s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        flicker: {
          '0%, 100%': { transform: 'scale(1) skewX(0deg)', opacity: '1' },
          '25%': { transform: 'scale(1.08, 0.95) skewX(2deg)', opacity: '0.9' },
          '50%': { transform: 'scale(0.92, 1.05) skewX(-2deg)', opacity: '0.95' },
          '75%': { transform: 'scale(1.04, 0.98) skewX(1deg)', opacity: '0.85' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}

