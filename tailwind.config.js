/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-x": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateY(0%)" },
        },
        "-slide-x": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(30%)" },
          to: { opacity: "1", transform: "translateY(0%)" },
        },
        "pop-up": {
          from: { opacity: "0", transform: "scale(.2)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "slide-x": "slide-x 0.2s ease-in-out",
        "-slide-x": "-slide-x 0.2s ease-in-out",
        "fade-in": "fade-in 0.2s ease-in-out",
        "pop-up": "pop-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
};
