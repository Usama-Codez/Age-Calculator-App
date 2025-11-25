/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        "purple-primary": "hsl(259, 100%, 65%)",
        "red-error": "hsl(0, 100%, 67%)",
        "grey-light": "hsl(0, 0%, 94%)",
        "grey-medium": "hsl(0, 0%, 86%)",
        "grey-dark": "hsl(0, 1%, 44%)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
