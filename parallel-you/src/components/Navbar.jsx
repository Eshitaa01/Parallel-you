import { useState } from "react";
import { Sun, Moon, Laptop, Menu, X, ArrowRightLeft, Sparkles } from "lucide-react";

export default function Navbar({
  theme,
  setTheme,
  onUnlock,
  unlocked,
  onOpenCompare,
  onOpenEarlyAccess,
}) {
  const [pulse, setPulse] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDoubleClick = () => {
    onUnlock();
    setPulse(true);
    setTimeout(() => setPulse(false), 900);
  };

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-surface/80 backdrop-blur-md transition-colors duration-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onDoubleClick={handleDoubleClick}
            className={`select-none text-left font-display text-xl font-semibold tracking-tight transition-transform ${
              pulse ? "scale-105" : "scale-100"
            } ${unlocked ? "path-title" : "text-paper"}`}
            aria-label="Parallel You home — double-click for a surprise"
            title="Psst — try double-clicking for a surprise!"
          >
            Parallel You
          </button>
          {unlocked && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-path-ai/40 bg-path-ai/10 px-2 py-0.5 font-mono text-[10px] text-path-ai font-medium">
              <Sparkles className="h-3 w-3" />
              <span>Multiverse Mode</span>
            </span>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 text-sm text-fog md:flex">
          <a href="#simulator" className="transition-colors hover:text-paper">
            Simulator
          </a>
          <a href="#features" className="transition-colors hover:text-paper">
            Why It's Different
          </a>
          <a href="#roadmap" className="transition-colors hover:text-paper">
            4-Year Roadmap
          </a>
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 transition-colors hover:text-paper font-medium text-path-ai"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Compare Paths</span>
          </button>
        </div>

        {/* Right Actions: Theme Toggle + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-2 text-fog transition-colors hover:border-path-ai hover:text-paper"
            aria-label={`Current theme: ${theme}. Click to change.`}
            title={`Theme: ${theme} (Click to switch)`}
          >
            {theme === "dark" && <Moon className="h-4 w-4 text-path-ai" />}
            {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
            {theme === "system" && <Laptop className="h-4 w-4 text-fog" />}
          </button>

          {/* Early Access CTA */}
          <button
            onClick={onOpenEarlyAccess}
            className="rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-medium text-paper transition-all hover:border-path-ai hover:bg-surface-hover hover:shadow-sm"
          >
            Get early access
          </button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={cycleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-2 text-fog"
            aria-label="Toggle theme"
          >
            {theme === "dark" && <Moon className="h-4 w-4 text-path-ai" />}
            {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
            {theme === "system" && <Laptop className="h-4 w-4 text-fog" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full border border-line bg-surface-2 p-2 text-fog hover:text-paper"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-surface px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-fog hover:text-paper py-1"
            >
              Simulator
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-fog hover:text-paper py-1"
            >
              Why It's Different
            </a>
            <a
              href="#roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="text-fog hover:text-paper py-1"
            >
              4-Year Roadmap
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompare();
              }}
              className="flex items-center gap-2 text-left text-path-ai font-medium py-1"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span>Compare Career Paths</span>
            </button>

            <div className="pt-2 border-t border-line">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEarlyAccess();
                }}
                className="w-full rounded-full bg-paper py-2.5 text-center text-sm font-semibold text-ink shadow-sm"
              >
                Get early access
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
