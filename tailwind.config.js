/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F8F8F8",
        bgSecondary: "",
        textPrimary: "",
        textSecondary: "",
        react: "#2E69DB",
        gsap: "#57A818",
        // add more colors here
      },
    },
  },
  plugins: [],
};
