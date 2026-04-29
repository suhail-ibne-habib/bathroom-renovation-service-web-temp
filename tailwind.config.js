/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A1128',
          primary: '#1F51FF',
          light: '#F0F8FF',
          accent: '#00D1FF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
