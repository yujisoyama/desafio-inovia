/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    colors: {
    },
    screens: {
    },
    fontFamily: {
      noto: ['Noto Sans', 'sans-serif'],
      open: ['Open Sans', 'sans-serif']
    },
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [

  ],
}

