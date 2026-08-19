import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Layers,
  ArrowRightLeft,
  Bookmark,
  Copy,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layout,
  Compass,
  BarChart3,
} from "lucide-react";
import { careerPaths } from "../data/careerPaths.js";
import ParallelPaths from "./ParallelPaths.jsx";

const iconMap = {
  Cpu: Cpu,
  Layout: Layout,
  Compass: Compass,
  BarChart3: BarChart3,
};

export default function Simulator({
  activeId,
  setActiveId,
  onOpenCompare,
  onOpenEarlyAccess,
  onShowToast,
}) {
  const [selectedYear, setSelectedYear] = useState("2027");
  const [checkedSkills, setCheckedSkills] = useState({});

  const active = careerPaths.find((p) => p.id === activeId) || careerPaths[0];
  const IconComponent = iconMap[active.icon] || Cpu;

  // Toggle skill check for current path
  const toggleSkill = (skillId) => {
    setCheckedSkills((prev) => {
      const currentPathSkills = prev[activeId] || [];
      const exists = currentPathSkills.includes(skillId);
      const updated = exists
        ? currentPathSkills.filter((id) => id !== skillId)
        : [...currentPathSkills, skillId];
      return { ...prev, [activeId]: updated };
    });
  };

  const currentPathChecked = checkedSkills[activeId] || [];
  const totalSkills = active.skillsChecklist?.length || 6;
  const readinessPercent = Math.round((currentPathChecked.length / totalSkills) * 100);

  const handleCopySummary = () => {
    const text = `Parallel You Simulation - ${active.label}
Timeline (${selectedYear}): ${active.timeline[selectedYear]?.role || active.trajectory2029}
Focus: ${active.timeline[selectedYear]?.focus || active.coreFocus}
Deliverable: ${active.timeline[selectedYear]?.deliverable}
Readiness Score: ${readinessPercent}% (${currentPathChecked.length}/${totalSkills} skills verified)
Stack: ${active.technologies.join(", ")}`;

    navigator.clipboard.writeText(text);
    onShowToast?.("Simulation summary copied to clipboard!");
  };

  return (
    <section id="simulator" className="px-6 py-20 md:py-28 relative">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
              The Interactive Simulator
            </p>
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl md:text-5xl">
              Pick a path. Watch the future update.
            </h2>
            <p className="mt-4 text-base text-fog">
              Explore four authentic career trajectories. Scrub through years (2026–2029) to see your role, deliverables, and skill requirements evolve.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenCompare?.(activeId)}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-fog transition-colors hover:border-path-ai hover:text-paper"
            >
              <ArrowRightLeft className="h-3.5 w-3.5 text-path-ai" />
              <span>Compare with another path</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-fog transition-colors hover:border-path-ai hover:text-paper"
              title="Copy current simulation summary"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy summary</span>
            </button>
          </div>
        </div>

        {/* Path Selector Tabs */}
        <div className="mb-8 flex flex-wrap gap-2.5 sm:gap-3">
          {careerPaths.map((path) => {
            const isActive = path.id === activeId;
            const PathIcon = iconMap[path.icon] || Cpu;
            return (
              <button
                key={path.id}
                onClick={() => setActiveId(path.id)}
                className="group relative flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  borderColor: isActive ? path.color : "var(--color-line)",
                  backgroundColor: isActive ? path.colorSoft : "var(--color-surface)",
                  color: isActive ? "var(--color-paper)" : "var(--color-fog)",
                }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-xs"
                  style={{
                    backgroundColor: isActive ? path.color : "var(--color-surface-2)",
                    color: isActive ? "#ffffff" : path.color,
                  }}
                >
                  <PathIcon className="h-3.5 w-3.5" />
                </span>
                <span>{path.label}</span>
                <span
                  className="rounded-full px-1.5 py-0.2 font-mono text-[10px] font-semibold"
                  style={{
                    backgroundColor: isActive ? "var(--color-surface)" : "var(--color-surface-2)",
                    color: path.color,
                  }}
                >
                  {path.demandTrend}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Left mini visual + Right Simulator Dashboard */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sticky Left Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-card dark:shadow-card-dark">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-xs uppercase text-fog">Path Convergence</span>
                <span className="font-mono text-xs font-semibold" style={{ color: active.color }}>
                  {active.shortLabel}
                </span>
              </div>

              <ParallelPaths
                activeId={activeId}
                onSelectPath={setActiveId}
                compact
                className="w-full"
              />

              <div className="flex items-center justify-between font-mono text-xs text-fog border-t border-line/60 pt-3">
                <span>Today</span>
                <span>→</span>
                <span>2029 Goal</span>
              </div>

              {/* Quick Readiness Widget */}
              <div className="mt-4 rounded-2xl border border-line bg-surface-2 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase text-fog">Readiness Score</span>
                  <span className="font-mono text-xs font-bold" style={{ color: active.color }}>
                    {readinessPercent}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{ width: `${readinessPercent}%`, backgroundColor: active.color }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-fog leading-tight">
                  {currentPathChecked.length} of {totalSkills} core competencies checked.
                </p>
              </div>

              <button
                onClick={() => onOpenEarlyAccess?.(activeId)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-paper py-2.5 text-xs font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Save This Simulation</span>
              </button>
            </div>
          </div>

          {/* Right Dashboard Area */}
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-card dark:shadow-card-dark transition-colors duration-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: active.colorSoft, color: active.color }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-paper">
                        {active.label}
                      </h3>
                      <p className="text-xs text-fog">{active.tagline}</p>
                    </div>
                  </div>

                  <span
                    className="rounded-full px-3 py-1 font-mono text-xs font-semibold"
                    style={{ backgroundColor: active.colorSoft, color: active.color }}
                  >
                    Demand: {active.demandTrend}
                  </span>
                </div>

                {/* Interactive Year Timeline Scrubber */}
                <div className="my-6 rounded-2xl border border-line bg-surface-2 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-fog" />
                      <span className="font-mono text-xs uppercase tracking-wider text-fog">
                        Interactive Year Progression
                      </span>
                    </div>
                    <span className="font-mono text-xs text-fog">
                      Active Year: <strong className="text-paper font-semibold">{selectedYear}</strong>
                    </span>
                  </div>

                  {/* Year Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {["2026", "2027", "2028", "2029"].map((year) => {
                      const isYearActive = selectedYear === year;
                      return (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className="relative flex flex-col items-center justify-center rounded-xl border py-2.5 transition-all"
                          style={{
                            borderColor: isYearActive ? active.color : "var(--color-line)",
                            backgroundColor: isYearActive ? active.colorSoft : "var(--color-surface)",
                            color: isYearActive ? "var(--color-paper)" : "var(--color-fog)",
                          }}
                        >
                          <span className="font-mono text-xs font-bold">{year}</span>
                          <span className="mt-0.5 hidden sm:block text-[10px] text-fog truncate max-w-[90%]">
                            {active.timeline[year]?.role?.split(" ")[0] || "Target"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Year Snapshot Detail */}
                  {active.timeline[selectedYear] && (
                    <motion.div
                      key={`${activeId}-${selectedYear}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-xl border border-line bg-surface p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[11px] uppercase text-fog">
                            {selectedYear} Role & Focus
                          </span>
                          <h4 className="font-display text-lg font-semibold text-paper" style={{ color: active.color }}>
                            {active.timeline[selectedYear].role}
                          </h4>
                        </div>
                        <span className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-fog">
                          Focus: {active.timeline[selectedYear].focus}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="text-xs">
                          <span className="font-mono uppercase text-fog block text-[10px] mb-1">
                            Core Challenge
                          </span>
                          <p className="text-fog leading-relaxed">
                            {active.timeline[selectedYear].challenge}
                          </p>
                        </div>
                        <div className="text-xs">
                          <span className="font-mono uppercase text-fog block text-[10px] mb-1">
                            Key Deliverable Shipped
                          </span>
                          <p className="text-paper font-medium leading-relaxed">
                            {active.timeline[selectedYear].deliverable}
                          </p>
                        </div>
                      </div>

                      {/* Time Split */}
                      {active.timeline[selectedYear].split && (
                        <div className="mt-3 pt-3 border-t border-line/60">
                          <span className="font-mono uppercase text-fog block text-[10px] mb-1.5">
                            Estimated Weekly Time Allocation
                          </span>
                          <div className="flex flex-wrap gap-3">
                            {Object.entries(active.timeline[selectedYear].split).map(([activity, pct]) => (
                              <div key={activity} className="flex items-center gap-1.5 font-mono text-[11px] text-fog">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                                <span>{activity}:</span>
                                <span className="font-semibold text-paper">{pct}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* 2-Column Content Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Interactive Skill Gap Checklist */}
                  <div className="rounded-2xl border border-line bg-surface-2 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wide" style={{ color: active.color }}>
                          Skill Gap & Readiness Check
                        </p>
                        <p className="text-[11px] text-fog">Check off skills you currently have:</p>
                      </div>
                      <span className="font-mono text-xs font-bold" style={{ color: active.color }}>
                        {readinessPercent}%
                      </span>
                    </div>

                    <div className="space-y-2 mt-3">
                      {active.skillsChecklist?.map((skill) => {
                        const isChecked = currentPathChecked.includes(skill.id);
                        return (
                          <button
                            key={skill.id}
                            type="button"
                            onClick={() => toggleSkill(skill.id)}
                            className="w-full flex items-start gap-3 rounded-xl border p-2.5 text-left transition-colors"
                            style={{
                              borderColor: isChecked ? active.color : "var(--color-line)",
                              backgroundColor: isChecked ? "var(--color-surface)" : "transparent",
                            }}
                          >
                            <div
                              className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors"
                              style={{
                                borderColor: isChecked ? active.color : "var(--color-fog-muted)",
                                backgroundColor: isChecked ? active.color : "transparent",
                                color: "#ffffff",
                              }}
                            >
                              {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                            </div>
                            <div className="flex-1">
                              <span className={`text-xs leading-snug block ${isChecked ? "text-paper font-medium" : "text-fog"}`}>
                                {skill.name}
                              </span>
                              <span className="mt-0.5 inline-block font-mono text-[9px] uppercase tracking-wider text-fog-muted">
                                {skill.level}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2028 Projects & Recommended Stack */}
                  <div className="space-y-6">
                    {/* Projects to Build */}
                    <div className="rounded-2xl border border-line bg-surface-2 p-5">
                      <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: active.color }}>
                        High-Impact Deliverables (2028)
                      </p>
                      <ul className="space-y-2.5">
                        {active.projects2028.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-fog leading-relaxed">
                            <span className="font-mono font-semibold mt-0.5" style={{ color: active.color }}>
                              0{i + 1}.
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Toolchain & Stack */}
                    <div className="rounded-2xl border border-line bg-surface-2 p-5">
                      <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: active.color }}>
                        Core Toolchain & Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {active.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-line bg-surface px-2.5 py-1 font-mono text-xs text-paper"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Trajectory 2029 */}
                <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4" style={{ color: active.color }} />
                    <p className="font-mono text-xs uppercase tracking-wide" style={{ color: active.color }}>
                      2029 Target Trajectory
                    </p>
                  </div>
                  <p className="text-sm font-medium text-paper leading-relaxed">
                    {active.trajectory2029}
                  </p>
                </div>

                {/* Bottom Action Strip */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <button
                    onClick={() => onOpenCompare?.(activeId)}
                    className="flex items-center gap-2 text-xs font-medium text-path-ai hover:underline"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    <span>Compare with another career path →</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopySummary}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-fog hover:border-path-ai hover:text-paper"
                    >
                      Copy summary
                    </button>
                    <button
                      onClick={() => onOpenEarlyAccess?.(activeId)}
                      className="rounded-full bg-paper px-5 py-2 text-xs font-semibold text-ink hover:shadow-glow transition-transform hover:-translate-y-0.5"
                    >
                      Save this simulation
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
