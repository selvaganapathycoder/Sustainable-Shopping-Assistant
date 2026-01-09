/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2ECC71", // Eco Green
        secondary: "#27AE60",
        accent: "#F1C40F",
        background: "#F9FAF7",
        text: "#1F2937",
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      }
    },
  },
  plugins: [],
}
