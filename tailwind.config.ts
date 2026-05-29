import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        aedi: {
          bg: "#1E1B1B",
          gold: "#EAC97C",
          "gold-dark": "#826015",
          panel: "#514733",
          teal: "#0E7490",
          emerald: "#059669",
          text1: "#B7AA91",
          text2: "#C8BAA6",
          text3: "#8F7E5E",
        },
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
export default config;
