/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        aero: {
          primary: '#75909c',
          light: '#9FB5C4',
          mist: '#DEE6E9',
          fog: '#C9D5DB',
          paper: '#E6E6E6',
          ink: '#273238',
          muted: '#5A6B73',
          link: '#5A85B0',
        },
        midnight: {
          bg: '#0F172A',
          panel: '#1E293B',
          border: '#3B4A64',
          text: '#E2E8F0',
          muted: '#94A3B8',
        },
        status: {
          onTime: '#3E8E5A',
          delayed: '#C98A2C',
          atRisk: '#C0453B',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      keyframes: {
        storyIn: {
          '0%': { opacity: 0, transform: 'scale(0.92)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: 0, maxHeight: '0px' },
          '100%': { opacity: 1, maxHeight: '480px' },
        },
      },
      animation: {
        storyIn: 'storyIn 0.22s ease-out',
        slideDown: 'slideDown 0.28s ease-out',
      },
    },
  },
  plugins: [],
}