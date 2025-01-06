/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#5D4037', // Primary color for text and accents
          light: '#8D6E63'
        },
        orange: {
          DEFAULT: '#FFA500', // Highlight color
          gold: '#DAA520'
        }
      }
    },
  },
  plugins: [],
}