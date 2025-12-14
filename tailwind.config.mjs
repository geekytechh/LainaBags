// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A365D",
        secondary: "#4D96FF",
        accent: "#C19A6B",
        background: "#fafafa",
        foreground: "#1A1A1A",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        logo: ["var(--font-parisienne)", "cursive"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-shadow-logo": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        },
      });
    },
  ],
};

export default config;
