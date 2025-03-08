/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
      "./node_modules/flowbite-react/dist/**/*.js"
  ],
  theme: {
      extend: {},
  },
  darkMode: "class",
  plugins: [
      require("flowbite/plugin")
  ],
};
