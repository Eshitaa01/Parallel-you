/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-hover": "var(--color-surface-hover)",
        line: "var(--color-line)",
        "line-subtle": "var(--color-line-subtle)",
        fog: "var(--color-fog)",
        "fog-muted": "var(--color-fog-muted)",
        paper: "var(--color-paper)",
        path: {
          ai: "var(--color-path-ai)",
          frontend: "var(--color-path-frontend)",
          pm: "var(--color-path-pm)",
          data: "var(--color-path-data)",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "path-gradient":
          "linear-gradient(90deg, #7C6FFF 0%, #43C6AC 33%, #FF9F5A 66%, #FF6E9C 100%)",
        "mesh-pattern":
          "radial-gradient(circle at 50% 0%, var(--glow-color, rgba(124, 111, 255, 0.12)) 0%, transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 50px -10px var(--glow-color, rgba(124, 111, 255, 0.35))",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        "card-dark": "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
};
