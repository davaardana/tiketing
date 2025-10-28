import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./tiketing/index.html', './tiketing/src/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          foreground: '#f9fafb'
        }
      }
    }
  },
  plugins: []
};

export default config;
