/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#f4fbfb',
        teal: {
          50: '#f0fbfb',
          100: '#ccf2f2',
          200: '#99e6e6',
          300: '#66d9d9',
          400: '#33cccc',
          500: '#0ea5a4',
          600: '#0b8686',
          700: '#086a6a',
          800: '#064e4e',
          900: '#033333',
        },
      },
      boxShadow: {
        calm: '0 10px 25px -5px rgba(14,165,164,0.25), 0 8px 10px -6px rgba(2, 6, 23, 0.2)',
      },
    },
  },
  plugins: [],
};
