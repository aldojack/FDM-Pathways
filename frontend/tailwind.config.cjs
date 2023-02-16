/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-background': "url('/header-bg1.jpg')"
      }, 
      colors: {
        ghost: '#EDF1FF',
        richblack: '#141E28',
        dodgerblue: '#116FF7',
        ultramarine: '#3C08FF',
        vividviolet: '#942DFF',
      }
    },
  },
  plugins: [],
}