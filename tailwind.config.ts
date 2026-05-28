import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chip: {
          cyan: "hsl(var(--chip-cyan))",
          blue: "hsl(var(--chip-blue))",
          purple: "hsl(var(--chip-purple))",
          green: "hsl(var(--chip-green))",
          gold: "hsl(var(--chip-gold))",
          glow: "hsl(var(--chip-glow))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-20" },
        },
        "wave-flow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-60px) scale(0)", opacity: "0" },
        },
        "etch-progress": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "ion-implant": {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(30px)", opacity: "0" },
        },
        "deposition-fall": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(5px)", opacity: "0.8" },
        },
        "polish-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "test-scan": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "float-up": "float-up 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "dash-flow": "dash-flow 1s linear infinite",
        "wave-flow": "wave-flow 3s linear infinite",
        "particle-rise": "particle-rise 2s ease-out infinite",
        "etch-progress": "etch-progress 3s ease-in-out forwards",
        "ion-implant": "ion-implant 1.5s ease-in infinite",
        "deposition-fall": "deposition-fall 2s ease-in infinite",
        "polish-sweep": "polish-sweep 2s ease-in-out infinite",
        "test-scan": "test-scan 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
