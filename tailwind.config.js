/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Important for theme toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Ensure Inter is loaded via _document.js or globals.css
      },
      colors: {
        "cod-gray": {
          // Example custom color palette - inspired by dark themes
          50: "#F8F9FA",
          100: "#E9ECEF",
          200: "#CED4DA",
          300: "#ADB5BD",
          400: "#6C757D",
          500: "#495057",
          600: "#343A40",
          700: "#212529",
          800: "#1A1D22", // Darker component background
          900: "#121417", // Dark main background
          950: "#0B0C0E", // Even darker main background
        },
        // Theme colors for products
        indigo: { DEFAULT: "#6366F1", ...require("tailwindcss/colors").indigo },
        sky: { DEFAULT: "#0EA5E9", ...require("tailwindcss/colors").sky },
        rose: { DEFAULT: "#F43F5E", ...require("tailwindcss/colors").rose },
        amber: { DEFAULT: "#F59E0B", ...require("tailwindcss/colors").amber },
        teal: { DEFAULT: "#14B8A6", ...require("tailwindcss/colors").teal },
      },
      animation: {
        // Add custom animations if needed beyond Framer Motion
      },
      keyframes: {
        // Add custom keyframes
      },
      typography: (theme) => ({
        // For @tailwindcss/typography plugin
        DEFAULT: {
          css: {
            color: theme("colors.cod-gray.700"),
            a: {
              color: theme("colors.purple.600"),
              "&:hover": { color: theme("colors.purple.700") },
              textDecoration: "none",
            },
            h1: { color: theme("colors.cod-gray.900") },
            h2: { color: theme("colors.cod-gray.900") },
            h3: { color: theme("colors.cod-gray.900") },
            strong: { color: theme("colors.cod-gray.900") },
          },
        },
        invert: {
          // Dark mode prose styles
          css: {
            color: theme("colors.cod-gray.300"),
            a: {
              color: theme("colors.pink.400"),
              "&:hover": { color: theme("colors.pink.500") },
            },
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.white") },
            h3: { color: theme("colors.white") },
            strong: { color: theme("colors.white") },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
