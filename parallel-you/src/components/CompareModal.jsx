import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRightLeft, Check, Sparkles } from "lucide-react";
import { careerPaths } from "../data/careerPaths.js";

export default function CompareModal({ isOpen, onClose, initialPath1 = "ai-engineer", initialPath2 = "frontend-engineer" }) {
  const [pathId1, setPathId1] = useState(initialPath1);
  const [pathId2, setPathId2] = useState(initialPath2);

  // Sync state if props change when opening
  useEffect(() => {
    if (initialPath1) setPathId1(initialPath1);
    if (initialPath2) setPathId2(initialPath2);
  }, [initialPath1, initialPath2, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const p1 = careerPaths.find((p) => p.id === pathId1) || careerPaths[0];
  const p2 = careerPaths.find((p) => p.id === pathId2) || careerPaths[1];

  const swapPaths = () => {
    setPathId1(pathId2);
    setPathId2(pathId1);
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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl rounded-3xl border border-line bg-surface p-6 shadow-2xl md:p-8 my-auto max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-modal-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-line pb-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-fog">
                  <ArrowRightLeft className="h-3.5 w-3.5 text-path-ai" />
                  <span>Side-by-Side Trajectory Comparator</span>
                </div>
                <h3 id="compare-modal-title" className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  Compare Two Parallel Futures
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-fog">
                  Evaluate how two career paths diverge in focus, technology stack, and day-to-day deliverables.
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full border border-line p-2 text-fog transition-colors hover:bg-surface-2 hover:text-paper"
                aria-label="Close comparator"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Selectors Bar */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 p-4 sm:flex-row">
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <span className="font-mono text-xs text-fog uppercase">Path A:</span>
                <select
                  value={pathId1}
                  onChange={(e) => setPathId1(e.target.value)}
                  className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm font-medium text-paper focus:outline-none focus:ring-2 focus:ring-path-ai sm:w-56"
                >
                  {careerPaths.map((cp) => (
                    <option key={`p1-${cp.id}`} value={cp.id} disabled={cp.id === pathId2}>
                      {cp.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={swapPaths}
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-fog transition-colors hover:border-path-ai hover:text-paper"
                title="Swap paths"
              >
                <ArrowRightLeft className="h-3.5 w-3.5" />
                <span>Swap</span>
              </button>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <span className="font-mono text-xs text-fog uppercase">Path B:</span>
                <select
                  value={pathId2}
                  onChange={(e) => setPathId2(e.target.value)}
                  className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm font-medium text-paper focus:outline-none focus:ring-2 focus:ring-path-ai sm:w-56"
                >
                  {careerPaths.map((cp) => (
                    <option key={`p2-${cp.id}`} value={cp.id} disabled={cp.id === pathId1}>
                      {cp.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Path 1 Column */}
              <PathComparisonColumn path={p1} label="Path A" />
              {/* Path 2 Column */}
              <PathComparisonColumn path={p2} label="Path B" />
            </div>

            {/* Footer Action */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <div className="flex items-center gap-2 text-xs text-fog">
                <Sparkles className="h-4 w-4 text-path-ai" />
                <span>Both paths represent realistic 3-year production trajectories.</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-paper px-6 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-glow"
              >
                Done comparing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function PathComparisonColumn({ path, label }) {
  return (
    <div className="rounded-2xl border border-line bg-ink/40 p-5 sm:p-6">
      {/* Path Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-fog">{label}</span>
        <span
          className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold"
          style={{ backgroundColor: path.colorSoft, color: path.color }}
        >
          {path.demandTrend}
        </span>
      </div>

      <h4 className="mt-2 font-display text-xl font-semibold text-paper" style={{ color: path.color }}>
        {path.label}
      </h4>
      <p className="mt-1 text-xs italic text-fog">{path.tagline}</p>

      {/* Trajectory 2029 */}
      <div className="mt-5 rounded-xl border border-line bg-surface p-4">
        <p className="font-mono text-xs uppercase text-fog">2029 Target Trajectory</p>
        <p className="mt-1.5 text-sm font-medium leading-snug text-paper">{path.trajectory2029}</p>
      </div>

      {/* Core Focus & Primary Surface */}
      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="font-mono text-[11px] uppercase text-fog">Core Technical Surface</p>
          <p className="mt-1 text-xs text-paper">{path.comparison?.primarySurface || path.coreFocus}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="font-mono text-[11px] uppercase text-fog">Math & Theory Rigor</p>
          <p className="mt-1 text-xs text-paper">{path.comparison?.mathLevel}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="font-mono text-[11px] uppercase text-fog">Key Stakeholders</p>
          <p className="mt-1 text-xs text-paper">{path.comparison?.stakeholderInteraction}</p>
        </div>
      </div>

      {/* Technologies */}
      <div className="mt-4">
        <p className="mb-2 font-mono text-[11px] uppercase text-fog">Core Toolchain & Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {path.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-paper"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 2028 Key Projects */}
      <div className="mt-4 border-t border-line/60 pt-4">
        <p className="mb-2 font-mono text-[11px] uppercase text-fog">Sample 2028 Deliverables</p>
        <ul className="space-y-1.5">
          {path.projects2028.map((p) => (
            <li key={p} className="flex items-start gap-2 text-xs text-fog">
              <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: path.color }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
