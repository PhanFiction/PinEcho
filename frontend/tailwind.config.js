/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkslategray: {
          "100": "#424d46",
          "200": "#3b4949",
          "300": "#26413c",
          "400": "#303030",
        },
        black: "#000",
        indianred: {
          "100": "#c56262",
          "200": "#d24d4d",
        },
        lightgray: "#d0d0d0",
        gray: "rgba(21, 21, 21, 0.8)",
        darkgray: "#9caea9",
        lightcyan: "#c9e9e0",
        snow: "#fffbfb",
        whitesmoke: "#f8f8f8",
        firebrick: {
          "100": "#a71818",
          "200": "#aa0202",
        },
        red: "#ff1717",
        blue: "#004ba9",
        lightdarkred: "#A66"
      },
      fontFamily: {
        montserrat: "Montserrat",
        "open-sans": "'Open Sans'",
        "merge-one": "'Merge One'",
        "original-surfer": "'Original Surfer'",
        salsa: "Salsa"
      },
      screens: {
        'desktop-large': '1440px',
      }
    },
  },
  plugins: [],
}
export default config;
