/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,php}", // Keeps scanning files inside the src folder
    "./public/**/*.{html,js,php}", // Add this if you have a public folder
    "./*.{html,js,php}", // This will scan files in the root directory
    "./other-folder/**/*.{html,js,php}", // Scan files in another folder outside src
  ],
  theme: {
    extend: {
      colors: {
        goldLight: "#c1a860",
        goldDark: "#cf9936",
        darkGray: "#0d0d0d",
      },
      screens: {
        "3xl": "1920px",
      },
      fontSize: {
        p: "18px",
        h2: "50px",
        h3: "35px",
        "20px": "20px",
        "75px": "75px",
        "50px": "50px",
      },
      lineHeight: {
        "39px": "39px",
        "75px": "75px",
      },
      fontFamily: {
        avianoSans: ["aviano-sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      display: {
        // unset: "unset",
        // initial: "initial",
      },
    },
  },
  plugins: [],
};
