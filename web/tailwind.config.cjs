/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    colors: {
      background: '#031827',
      backgroundLight: '#0B324D',
      main: '#fffffe',
      secondary: '#90b4ce',
      highlight: '#39DCC1',
      buttonText: '#052841',
      button: '#39DCC1',
      buttonHover: '#43FFE0',
      alertBackground: '#eb9393',
      alert: '#EF4565'
    },
    screens: {

    },
    fontFamily: {
      noto: ['Noto Sans', 'sans-serif'],
      open: ['Open Sans', 'sans-serif']
    },
  },
  plugins: [

  ],
}

