/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'slide-in':  'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out': 'slideOut 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards',
        'progress':  'progress linear forwards',
      },
      keyframes: {
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(60px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        slideOut: {
          '0%':   { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(60px) scale(0.96)' },
        },
        progress: {
          '0%':   { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
}
