/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': `linear-gradient(90deg, #0b3a7e, #498bbb 70.71%), 
                           linear-gradient(18deg, #0b3a7e, #013d86 70.71%), 
                           linear-gradient(293deg, #0b3a7e, #0e3b7f 70.71%)`,
      },
      colors: {
        ioclPrimary: '#013d86',
        ioclSecondary: '#f35e04',
        hpdefPrimary: "#002749",
        hpdefSecondary: '#eb1e25',
      },
    },
  },
  plugins: [],
}