/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {colors: {
      'primary': '#937DC2',
      'white': '#FFFFFF',
      'black':'#000000',
      'voilet':{
        100:'rgba(147, 125, 194, 0.21)'
      },
      'star':'#FFC700',
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
    },},
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}

