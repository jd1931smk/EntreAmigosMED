/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBF5',
          100: '#FFF6E9',
          200: '#FFE7C3',
          300: '#FFD89D',
          400: '#FFC977',
          500: '#FFBA51',
          600: '#CC9541',
        },
        beige: {
          50: '#F9F6F3',
          100: '#F3EDE7',
          200: '#E7DBCF',
          300: '#DBC9B7',
          400: '#CFB79F',
          500: '#C3A587',
          600: '#9C846C',
        },
      },
    },
  },
  plugins: [],
};