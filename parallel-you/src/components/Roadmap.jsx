import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Milestone } from "lucide-react";
import { careerPaths } from "../data/careerPaths.js";

export default function Roadmap({ onSelectPath }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  return (
    <section id="roadmap" className="px-6 py-20 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-12">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
              The 4-Year Progression
            </p>
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Four timelines, one starting point.
            </h2>
            <p className="mt-3 max-w-lg text-fog text-base">
              Every path begins from today. Follow each trajectory from first milestone to org-wide leadership.
            </p>
          </div>
          <span className="font-mono text-xs text-fog">
            Click any career to simulate in detail ↓
          </span>
        </div>

        <div className="space-y-4">
          {careerPaths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-card dark:shadow-card-dark transition-all duration-200 hover:border-path-ai/40"
            >
              <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
                {/* Career Label + Trigger */}
                <button
                  onClick={() => onSelectPath?.(path.id)}
                  className="flex items-center justify-between text-left group-hover:opacity-90"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: path.color }}
                    />
                    <div>
                      <span className="font-display font-semibold text-paper block text-base sm:text-lg">
                        {path.label}
                      </span>
                      <span className="font-mono text-[11px] text-fog">
                        {path.demandTrend}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-fog transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper" />
                </button>

                {/* Milestones timeline track */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 right-0 h-0.5 bg-line" />
                  <div className="flex w-full justify-between relative z-10">
                    {path.milestones.map((m) => {
                      const isHovered = selectedMilestone === `${path.id}-${m.year}`;
                      return (
                        <div
                          key={m.year}
                          className="relative flex flex-col items-center px-1"
                          onMouseEnter={() => setSelectedMilestone(`${path.id}-${m.year}`)}
                          onMouseLeave={() => setSelectedMilestone(null)}
                        >
                          <span
                            className="mb-2 h-3.5 w-3.5 rounded-full ring-4 ring-surface transition-transform duration-200 group-hover:scale-110 cursor-pointer"
                            style={{ backgroundColor: path.color }}
                          />
                          <span className="font-mono text-xs font-semibold text-paper">
                            {m.year}
                          </span>
                          <span className="mt-1.5 hidden max-w-[130px] text-center text-xs leading-snug text-fog sm:block">
                            {m.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
