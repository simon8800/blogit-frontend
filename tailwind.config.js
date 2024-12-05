/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepOrange: "#D87C4A",
        burntSienna: "#E27D60",
        goldenrod: "#F4A261",
        oliveGreen: "#A3B18A",
        richBrown: "#774936",
        cream: "#F6E8DC",
        lightBeige: "#F3EDE3",
        darkChocolate: "#3B2419",
        primaryText: "#2F2F2F",
        secondaryText: "#5F5F5F",
      },
    },
  },
  plugins: [],
};
