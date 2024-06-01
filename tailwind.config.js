/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm:"480px",
      md:"768px",
      lg:"1020px",
      xl:"1440px"
    },
    extend: {
      colors: {
        brown: 'hsla(21, 53%, 26%, 1)',
        zpink: 'hsla(28, 48%, 94%, 1)',
      },
    },
  },
  plugins: [],
}