/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22c55e",
          alt: "#1f9d55"
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          alt: "#e5e7eb"
        },
      },
      backgroundImage: {
        'forms': "url('/forms-bg.svg')",
        'banner': "url('/banner.svg')",
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
