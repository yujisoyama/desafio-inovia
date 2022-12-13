/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    colors: {
      background: '#052841',
      backgroundLight: '#094067',
      main: '#fffffe',
      secondary: '#90b4ce',
      buttonText: '#052841',
      button: '#39DCC1',
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

