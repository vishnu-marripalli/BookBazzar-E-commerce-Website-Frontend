/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#937DC2',
      'white': '#FFFFFF',
      'voilet':{
        100:'rgba(147, 125, 194, 0.21)'
      }
    },
    extend: {},
  },
  plugins: [],
}

