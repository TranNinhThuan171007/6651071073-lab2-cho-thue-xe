/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669', // Emerald #059669 theo yêu cầu C = 1
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
      screens: {
        'sm': '640px',   // tablet: 640px - 1024px
        'lg': '1024px',  // desktop: > 1024px
      }
    },
  },
  plugins: [],
}
