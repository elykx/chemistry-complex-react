/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blackGreen: '#06160E',
        darkGreen: '#12221a',
        lightGreen: '#365043'
      },
    },
  },
  plugins: [],
}
