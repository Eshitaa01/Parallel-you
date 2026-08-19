import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Simulator from "./components/Simulator.jsx";
import Features from "./components/Features.jsx";
import Roadmap from "./components/Roadmap.jsx";
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";
import CompareModal from "./components/CompareModal.jsx";
import EarlyAccessModal from "./components/EarlyAccessModal.jsx";
import { careerPaths } from "./data/careerPaths.js";

// Konami Code Sequence: Up Up Down Down Left Right Left Right B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function App() {
  // Theme state: 'dark' | 'light' | 'system'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("parallel_you_theme") || "dark";
  });

  const [activePathId, setActivePathId] = useState(careerPaths[0].id);
  const [unlocked, setUnlocked] = useState(false);
  const [multiverseWarp, setMultiverseWarp] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Modal states
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [comparePath1, setComparePath1] = useState("ai-engineer");
  const [comparePath2, setComparePath2] = useState("frontend-engineer");
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  // Synchronize Theme with documentElement and localStorage
  useEffect(() => {
    localStorage.setItem("parallel_you_theme", theme);
    const root = document.documentElement;

    const applyTheme = (isDark) => {
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handleChange = (e) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  // Toast Helper
  const showToast = useCallback((msg, duration = 2800) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, duration);
  }, []);

  // Easter Egg: Double-click Logo
  const handleUnlock = () => {
    setUnlocked((prev) => {
      const next = !prev;
      showToast(next ? "✦ Unlimited Potential mode activated!" : "Returned to standard timeline.");
      return next;
    });
  };

  // Easter Egg: Konami Code Listener
  useEffect(() => {
    let keyIndex = 0;
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const expectedKey = KONAMI_CODE[keyIndex].toLowerCase();

      if (key === expectedKey) {
        keyIndex++;
        if (keyIndex === KONAMI_CODE.length) {
          keyIndex = 0;
          setMultiverseWarp(true);
          showToast("🌌 KONAMI CODE FOUND: Multiverse Warp Unlocked! 🚀");
          try {
            confetti({
              particleCount: 120,
              spread: 100,
              origin: { y: 0.5 },
              colors: ["#7C6FFF", "#43C6AC", "#FF9F5A", "#FF6E9C", "#F1F3F9"],
            });
          } catch {}
          setTimeout(() => setMultiverseWarp(false), 5000);
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showToast]);

  // Handlers for modal interactions
  const handleOpenCompare = (path1Id = activePathId) => {
    setComparePath1(path1Id);
    const otherPath = careerPaths.find((p) => p.id !== path1Id)?.id || "frontend-engineer";
    setComparePath2(otherPath);
    setIsCompareOpen(true);
  };

  const handleOpenEarlyAccess = (pathId = activePathId) => {
    setActivePathId(pathId);
    setIsEarlyAccessOpen(true);
  };

  return (
    <div
      className={`min-h-screen bg-ink text-paper transition-colors duration-200 ${
        unlocked ? "unlimited-potential" : ""
      } ${multiverseWarp ? "multiverse-warp" : ""}`}
    >
      <Navbar
        theme={theme}
        setTheme={setTheme}
        onUnlock={handleUnlock}
        unlocked={unlocked}
        onOpenCompare={() => handleOpenCompare(activePathId)}
        onOpenEarlyAccess={() => handleOpenEarlyAccess(activePathId)}
      />

      <main>
        <Hero
          onOpenCompare={() => handleOpenCompare(activePathId)}
          onSelectHeroPath={(id) => {
            setActivePathId(id);
            const el = document.getElementById("simulator");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          activeHeroPath={activePathId}
        />

        <Simulator
          activeId={activePathId}
          setActiveId={setActivePathId}
          onOpenCompare={handleOpenCompare}
          onOpenEarlyAccess={handleOpenEarlyAccess}
          onShowToast={showToast}
        />

        <Features />

        <Roadmap
          onSelectPath={(id) => {
            setActivePathId(id);
            const el = document.getElementById("simulator");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <CTASection
          onOpenEarlyAccess={() => handleOpenEarlyAccess(activePathId)}
          onOpenCompare={() => handleOpenCompare(activePathId)}
        />
      </main>

      <Footer onUnlock={handleUnlock} />

      {/* Side-by-Side Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialPath1={comparePath1}
        initialPath2={comparePath2}
      />

      {/* Early Access / Save Simulation Modal */}
      <EarlyAccessModal
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        selectedPathId={activePathId}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-xs text-paper shadow-2xl backdrop-blur-md"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
