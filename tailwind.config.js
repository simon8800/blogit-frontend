/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'text-gray-900',
    'text-amber-900',
    'text-slate-800',
    'prose-headings:text-gray-900',
    'prose-headings:text-amber-900',
    'prose-headings:text-slate-800',
    'prose-p:text-gray-900',
    'prose-p:text-amber-900',
    'prose-p:text-slate-800',
    'prose-li:text-gray-900',
    'prose-li:text-amber-900',
    'prose-li:text-slate-800',
    'prose-strong:text-gray-900',
    'prose-strong:text-amber-900',
    'prose-strong:text-slate-800',
  ],
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
      fontFamily: {
        'modern': ['Inter', 'system-ui', 'sans-serif'],
        'classic': ['Libre Baskerville', 'Georgia', 'serif'],
        'book': ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
