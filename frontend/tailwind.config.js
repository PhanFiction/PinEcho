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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: "#fff",
        turquoise: "#63e2c6",
        aqua: "#6ef9f5",
        mediumseagreen: "#466751",
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
