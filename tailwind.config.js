/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#5c3d2e', // можно поменять под фирменный цвет
      },
      filter: {
        'grayscale': 'grayscale(100%)',
        'brightness-75': 'brightness(0.75)',
      },
      fontFamily: {
        sans: ['Satoshi', 'regular'], // теперь Satoshi — основной
        heading: ['"Space Grotesk"', 'sans-serif'],
        signature: ['"Hurricane"', 'cursive'],
      },
    },
  },
  plugins: [],
};