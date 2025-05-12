/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    border:{
         brdr: '1px solid beige'
    },
    boxShadow: {
      shdw: '3px 3px whitesmoke',
    },
    screens: {
      sm: '640px',  // Small screens
      md: '768px',  // Medium screens
      lg: '1024px', // Large screens
      xl: '1280px', // Extra large screens
    },
  },
  plugins: [],
}