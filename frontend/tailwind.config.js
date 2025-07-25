/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007DDB', // Custom color
        secondary: '#FFD91C',
      },
    },
  },
  plugins: [],
}

