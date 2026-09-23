/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titanium: {
          50: '#f6f7f9',
          100: '#eceff2',
          200: '#d5dae0',
          300: '#b0b9c5',
          400: '#8493a5',
          500: '#64748b',
          600: '#4f5d73',
          700: '#404c5e',
          800: '#373f4e',
          900: '#0f172a',
          950: '#080c15',
        },
        apple: {
          blue: '#0071e3',
          darkBlue: '#0058b0',
          purple: '#6e40c9',
          gold: '#cba052',
          black: '#1d1d1f',
          gray: '#86868b',
          lightGray: '#f5f5f7'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
}
