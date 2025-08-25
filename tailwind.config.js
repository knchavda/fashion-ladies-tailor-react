/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ebf8ff",
          100: "#d1efff",
          200: "#a7e0ff",
          300: "#79cdff",
          400: "#4bb7ff",
          500: "#1ea1ff",
          600: "#1780cc",
          700: "#115f99",
          800: "#0b3e66",
          900: "#062033"
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
  },
  plugins: [],
}
