import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
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
        // Futuristic brand colors
        midnight: {
          DEFAULT: "#0B1A2C",
          light: "#152439",
          dark: "#050E18",
        },
        teal: {
          DEFAULT: "#1B2A3D",
          light: "#2A3B50",
          dark: "#142131",
        },
        emerald: {
          DEFAULT: "#1B2A3D",
          light: "#2A3B50",
          dark: "#142131",
        },
        silver: {
          DEFAULT: "#D9D9D9",
          light: "#E8E8E8",
          dark: "#B0B0B0",
        },
        white: {
          DEFAULT: "#F5F7FA",
          pure: "#FFFFFF",
        },
        mint: {
          DEFAULT: "#1B2A3D",
          light: "#2A3B50",
          dark: "#142131",
        },
        gold: {
          DEFAULT: "#D7C38A",
          light: "#E4D5A8",
          dark: "#C4B076",
        },
        sage: {
          DEFAULT: "#1B2A3D",
          light: "#2A3B50",
          dark: "#142131",
        },
        mist: {
          DEFAULT: "#F3F7F6",
          light: "#FFFFFF",
          dark: "#E8EDEB",
        },
        // Legacy names for compatibility (will update gradually)
        forest: {
          DEFAULT: "#0B1A2C",
          dark: "#050E18",
          light: "#152439",
        },
        moss: {
          DEFAULT: "#1B2A3D",
          light: "#2A3B50",
          dark: "#142131",
        },
        slate: {
          DEFAULT: "#0B1A2C",
          light: "#152439",
          dark: "#050E18",
        },
        champagne: {
          DEFAULT: "#C6A667",
          light: "#D4B882",
          dark: "#A8914F",
        },
        cream: {
          DEFAULT: "#F5F7FA",
          light: "#FFFFFF",
          dark: "#E8EDF3",
        },
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
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'Sora', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        subhead: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(27, 42, 61, 0.5)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(27, 42, 61, 0.8)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      backgroundSize: {
        "gradient": "200% 200%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

