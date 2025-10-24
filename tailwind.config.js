/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: '#5c3d2e', // можно поменять под фирменный цвет
      },
      filter: {
        'grayscale': 'grayscale(100%)',
        'brightness-75': 'brightness(0.75)',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'], // теперь Satoshi — основной
        heading: ['"Space Grotesk"', 'sans-serif'],
        signature: ['"Hurricane"', 'cursive'],
      },
    },
  },
  plugins: [],
};