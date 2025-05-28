/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blurple: '#5865F2',
          dark: '#23272A',
          grey: '#2C2F33',
          lightGrey: '#99AAB5',
          green: '#57F287',
          yellow: '#FEE75C',
          red: '#ED4245',
        },
      },
    },
  },
  plugins: [],
};
