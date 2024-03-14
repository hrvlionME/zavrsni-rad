/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    extend: {
      colors : {
        primary: {
          base: "#265073",
          shadow: "#1E405C",
        },
        secondary: {
          base: "#2D9596",
          shadow: "#288687",
        },
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

