/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    minHeight:{
      '80': '20rem',
    }, 
    extend: {
      colors: {
        brownishBlack: "#212021",
        darkGray: "#b1b1b0", //Header color
        lightGray: "#f8f9fa", //bground
        mediumGray: "#a0aab5"
      }
    },
  },
  plugins: [],
};
