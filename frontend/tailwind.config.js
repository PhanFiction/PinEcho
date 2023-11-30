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
        turquoise: "#63e2c6",
        aqua: "#6ef9f5",
        mediumseagreen: "#466751",
        darkwhite: "#F8F8F8",
        darkred: "#A71818",
        brightred: "#FF1717",
      },
      fontFamily: {
        itim: "Itim",
        inter: "Inter",
      },
    },
  },
  plugins: [],
}
export default config
