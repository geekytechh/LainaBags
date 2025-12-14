/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-poppins)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "var(--font-poppins)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-poppins)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        logo: ["var(--font-parisienne)", "cursive"],
      },
      colors: {
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
      boxShadow: {
        soft:
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), " +
          "0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        hover:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), " +
          "0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      transitionTimingFunction: {
        "bounce-in-out": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".animation-delay-1000": { "animation-delay": "1000ms" },
        ".animation-delay-2000": { "animation-delay": "2000ms" },
        ".animation-delay-3000": { "animation-delay": "3000ms" },
      });
    },
  ],
};
