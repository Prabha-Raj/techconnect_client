// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        animation: {
          "fade-in": "fadeIn 0.6s ease-out forwards",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0", transform: "scale(0.98)" },
            "100%": { opacity: "1", transform: "scale(1)" },
          },
        },
      },
    },
    plugins: [],
  };
  