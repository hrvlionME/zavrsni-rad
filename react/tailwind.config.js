/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: {
          base: "#265073",
          shadow: "#1E405C",
        },
        secondary: "#2D9596",
        accent: "#9AD0C2",
        content: "#F1FADA"
      },
      fontFamily: {
        content: ['Merriweather', 'serif'],
        open: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

