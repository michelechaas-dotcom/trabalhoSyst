/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./telas/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
      verde: '#1C3B35',
      grafite: '#1D2020',
      marrom: '#332605',
      menu: '#403A3A',
      },
    },
  },
  plugins: [],
};
