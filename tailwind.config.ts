import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0C0D0F",
          subtle: "#141619",
          border: "#23272D",
          surface: "#1A1D23",
        },
        "text-muted-dark": "#5A5D64",
        "text-muted-light": "#9B9FA8",
        brass: {
          DEFAULT: "#C6A260",
          light: "#DFBF83",
          dark: "#A38245",
          muted: "rgba(198, 162, 96, 0.15)",
        },
        bone: {
          DEFAULT: "#F0ECE3",
          pure: "#FAF8F5",
          card: "#E8E3D8",
          border: "#D8D2C4",
          muted: "#A7A195",
        },
        oxblood: {
          DEFAULT: "#621F24",
          light: "#8E2B33",
          dark: "#441418",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        widestEditorial: "0.25em",
        tighterEditorial: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
