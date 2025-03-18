import { heroui } from "@heroui/theme";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
    fontFamily: {
      h1: ["Archivo Black"],
      display: ["Archivo Narrow"],
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "nextui",
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
    }),
  ],
};
