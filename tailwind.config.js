/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        cloud: "#FBFDFF",
        navy: "#16324F",
        slate: "#5C7A93",
        sky: {
          50: "#F1F8FE",
          100: "#E3F1FC",
          200: "#C7E3F9",
          400: "#6FB6EC",
          500: "#4FA8E0",
          600: "#3486C0",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Poppins", "sans-serif"],
        mono: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .7s ease forwards",
      },
    },
  },
  plugins: [],
};
