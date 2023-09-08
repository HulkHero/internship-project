import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [daisyui],
  theme: {
    extend: {
      colors: {
        darkRed: "#EB2027",
        brightRed: "#F50000",
        smoke: "#F6F6F6",
        dark: "#181818",

        ligtDark: "#272727",
        textDark: "#181818",
        textGray: "#5A5A5A",
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#EB2027",

          "secondary": "#F50000",

          "accent": "#92400e",

          "neutral": "#171320",

          "base-100": "#F6F6F6",

          "info": "#8f9ddb",

          "success": "#4dea99",

          "warning": "#f9d162",

          "error": "#f33f57",
        },
      },

    ]
  }

}

