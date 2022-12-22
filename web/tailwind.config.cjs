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
      highlight: '#1de9b6',
      buttonText: '#052841',
      button: '#1de9b6',
      buttonHover: '#64ffda',
      alertBackground: '#eb9393',
      alert: '#EF4565'
    },
    screens: {
      'mobile': { 'max': '700px' }
    },
    fontFamily: {
      noto: ['Noto Sans', 'sans-serif'],
      open: ['Open Sans', 'sans-serif']
    },
  },
  plugins: [

  ],
}

