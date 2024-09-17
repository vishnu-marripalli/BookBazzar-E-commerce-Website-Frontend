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
      'light-voilet':'rgba(198, 137, 198, 0.7)',
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      }, 
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },},
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}

