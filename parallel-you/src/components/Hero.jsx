import { motion } from "framer-motion";
import { ArrowRight, ArrowRightLeft, Sparkles } from "lucide-react";
import ParallelPaths from "./ParallelPaths.jsx";
import { careerPaths } from "../data/careerPaths.js";

export default function Hero({ onOpenCompare, onSelectHeroPath, activeHeroPath }) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-12 md:pb-28 md:pt-20">
      {/* Background ambient mesh glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-3xl opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-path-ai) 0%, var(--color-path-frontend) 40%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 font-mono text-xs text-fog"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-[0.18em] text-[11px]">One Present. Four Timelines.</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl md:text-6xl"
          >
            Meet the future versions of yourself.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-lg text-balance text-base sm:text-lg text-fog leading-relaxed"
          >
            Parallel You simulates where four distinct career trajectories actually lead — the skills you'd need, the production systems you'd ship, and the exact role you'd hold three years out.
          </motion.p>

          {/* Quick Career Selector Pills in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <span className="font-mono text-xs text-fog mr-1">Preview:</span>
            {careerPaths.map((path) => {
              const isSelected = activeHeroPath === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => onSelectHeroPath?.(path.id)}
                  className="rounded-full border px-3 py-1 font-mono text-xs transition-all"
                  style={{
                    borderColor: isSelected ? path.color : "var(--color-line)",
                    backgroundColor: isSelected ? path.colorSoft : "var(--color-surface-2)",
                    color: isSelected ? path.color : "var(--color-fog)",
                  }}
                >
                  {path.shortLabel}
                </button>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <a
              href="#simulator"
              className="flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-glow shadow-sm"
            >
              <span>Run your simulation</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-fog transition-all hover:border-path-ai hover:text-paper"
            >
              <ArrowRightLeft className="h-4 w-4 text-path-ai" />
              <span>Compare 2 paths</span>
            </button>
          </motion.div>

          {/* Micro Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-5 flex items-center gap-1.5 font-mono text-xs text-fog"
          >
            <Sparkles className="h-3.5 w-3.5 text-path-ai" />
            <span>Grounded in actual engineering levels & compensation ladders</span>
          </motion.p>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative rounded-3xl border border-line bg-surface/50 p-4 sm:p-6 backdrop-blur-sm shadow-card dark:shadow-card-dark"
        >
          <div className="flex items-center justify-between border-b border-line pb-3 mb-2">
            <span className="font-mono text-xs text-fog uppercase tracking-wider">
              Interactive Multiverse Projection
            </span>
            <span className="font-mono text-xs text-path-ai font-medium">2026 → 2029</span>
          </div>

          <ParallelPaths
            activeId={activeHeroPath}
            onSelectPath={onSelectHeroPath}
            className="w-full"
          />

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-fog border-t border-line/60 pt-3">
            <span>Today (Decision Point)</span>
            <span>4 Distinct Futures</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
