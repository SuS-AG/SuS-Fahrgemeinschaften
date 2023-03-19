/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "1fr minmax(10px, auto)",
      },
    },
  },
  plugins: [],
};
