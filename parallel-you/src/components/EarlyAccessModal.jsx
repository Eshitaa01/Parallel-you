import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, Copy, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import { careerPaths } from "../data/careerPaths.js";

export default function EarlyAccessModal({ isOpen, onClose, selectedPathId = "ai-engineer" }) {
  const [email, setEmail] = useState("");
  const [targetYear, setTargetYear] = useState("2029");
  const [pathId, setPathId] = useState(selectedPathId);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedPathId) setPathId(selectedPathId);
  }, [selectedPathId, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const activePath = careerPaths.find((p) => p.id === pathId) || careerPaths[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7C6FFF", "#43C6AC", "#FF9F5A", "#FF6E9C", "#F1F3F9"],
      });
    } catch {
      // Fallback gracefully if canvas-confetti fails
    }
  };

  const handleCopySummary = () => {
    const text = `Parallel You Simulation:
Target Career: ${activePath.label} (by ${targetYear})
Target Role: ${activePath.timeline[targetYear]?.role || activePath.trajectory2029}
Core Stack: ${activePath.technologies.slice(0, 4).join(", ")}
Learn more at Parallel You.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-2xl my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-line p-2 text-fog transition-colors hover:bg-surface-2 hover:text-paper"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-fog">
                  <Sparkles className="h-3.5 w-3.5 text-path-ai" />
                  <span>Save Your Simulation</span>
                </div>

                <h3 id="early-access-title" className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  Lock in your 2029 trajectory.
                </h3>
                <p className="mt-2 text-sm text-fog">
                  Get early access to multi-path simulations, personalized skill gap roadmaps, and custom milestone tracking.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Select Career Path */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-fog mb-1.5">
                      Selected Career Track
                    </label>
                    <select
                      value={pathId}
                      onChange={(e) => setPathId(e.target.value)}
                      className="w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm font-medium text-paper focus:outline-none focus:ring-2 focus:ring-path-ai"
                    >
                      {careerPaths.map((cp) => (
                        <option key={cp.id} value={cp.id}>
                          {cp.label} ({cp.demandTrend})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Horizon */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-fog mb-1.5">
                      Target Horizon
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["2026", "2027", "2028", "2029"].map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => setTargetYear(year)}
                          className={`rounded-xl border py-2 font-mono text-xs font-medium transition-all ${
                            targetYear === year
                              ? "border-path-ai bg-path-ai/10 text-paper font-semibold"
                              : "border-line bg-surface-2 text-fog hover:text-paper"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-fog mb-1.5">
                      Your Work or Personal Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-fog" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@domain.com"
                        className="w-full rounded-xl border border-line bg-surface-2 py-2.5 pl-10 pr-3.5 text-sm text-paper placeholder-fog-muted focus:outline-none focus:ring-2 focus:ring-path-ai"
                      />
                    </div>
                    {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
                  </div>

                  {/* Privacy note */}
                  <div className="flex items-center gap-2 text-[11px] text-fog">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>No spam. No selling data. Pure simulation updates.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-full bg-paper py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-glow text-sm"
                  >
                    <span>Save Simulation & Request Access</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-paper">
                  Simulation Locked In!
                </h3>
                <p className="mt-2 text-sm text-fog">
                  We've reserved your early access spot for <span className="font-semibold text-paper">{email}</span>.
                </p>

                {/* Simulation snapshot card */}
                <div className="mt-5 rounded-2xl border border-line bg-surface-2 p-4 text-left">
                  <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
                    <span className="font-mono text-xs text-fog uppercase">Simulation Snapshot</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: activePath.color }}>
                      {targetYear} Target
                    </span>
                  </div>
                  <p className="font-display text-base font-medium text-paper">
                    {activePath.label} → {activePath.timeline[targetYear]?.role || activePath.trajectory2029}
                  </p>
                  <p className="mt-1 text-xs text-fog">
                    Key Deliverable: {activePath.timeline[targetYear]?.deliverable}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    onClick={handleCopySummary}
                    className="flex-1 flex items-center justify-center gap-2 rounded-full border border-line bg-surface-2 py-2.5 text-xs font-medium text-paper transition-colors hover:border-path-ai"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copied ? "Copied to clipboard!" : "Copy Simulation"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-full bg-paper py-2.5 text-xs font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Back to Simulator
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
