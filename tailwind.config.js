/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      // {
      //   mytheme: {
      //     primary: "#734b5e",
      //     secondary: "#bcbdc0",
      //     teritary: "#8a8d91",
      //     four: "#f5d3c8",
      //     accent: "#565857",
      //     neutral: "#292929",
      //     "base-100": "#fffbff",
      //     info: "#0cc6ff",
      //     success: "#00f6b6",
      //     warning: "#e39a00",
      //     error: "#ff0039",
      //   },
      // },
      'night',
    ],
  },
  plugins: [require("daisyui")],
};
