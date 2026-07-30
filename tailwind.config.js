/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-main)',
        surface: 'var(--bg-surface)',
        'surface-hover': 'var(--bg-surface-hover)',
        border: 'var(--border-color)',
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          hover: 'var(--accent-hover)',
          light: 'var(--accent-light)',
        },
        coral: {
          50: '#fff5f5',
          100: '#fed7d7',
          500: '#E06A5E',
          600: '#d15649',
        }
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        serif: ['Newsreader', 'Georgia', 'Garamond', 'serif'],
        reader: ['Literata', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        dyslexic: ['OpenDyslexic', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'book-3d': '0 20px 30px -10px rgba(0, 0, 0, 0.25), 0 10px 15px -5px rgba(0, 0, 0, 0.15)',
        'book-hover': '0 30px 45px -15px rgba(0, 0, 0, 0.35), 0 15px 20px -7px rgba(0, 0, 0, 0.2)',
        'pill': '0 10px 30px -5px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'elevation': '0 12px 40px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        'page-turn': {
          '0%': { transform: 'rotateY(0deg)', transformOrigin: 'left' },
          '100%': { transform: 'rotateY(-180deg)', transformOrigin: 'left' }
        }
      },
      animation: {
        'float': 'float-slow 4s ease-in-out infinite',
        'page-flip': 'page-turn 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards'
      }
    },
  },
  plugins: [],
}
