/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "montserrat-bold": ['Montserrat-Bold'],
        "montserrat-medium": ['Montserrat-Medium'],
        "montserrat-regular": ['Montserrat-Regular'],
        "montserrat-light": ['Montserrat-Light'],
      },
    },
  },
  plugins: [],
};
