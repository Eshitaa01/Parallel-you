import { motion } from "framer-motion";
import { GitFork, ShieldCheck, SlidersHorizontal, CheckCircle } from "lucide-react";

const features = [
  {
    icon: GitFork,
    title: "Grounded in real engineering levels",
    body: "Every path maps to verified engineering competencies, project scopes, and organizational milestones from senior and staff ladders — not boilerplate prompt outputs.",
    accent: "var(--color-path-ai)",
  },
  {
    icon: SlidersHorizontal,
    title: "Four paths, one timeline",
    body: "Switch between tracks instantly and see where your time and energy diverge. One starting point today, four distinctly different 2029 outcomes.",
    accent: "var(--color-path-frontend)",
  },
  {
    icon: ShieldCheck,
    title: "No noise, no vanity metrics",
    body: "Zero fabricated testimonials, zero fake user counts, zero stock logos. What you see is an honest simulation tool built for engineers who value substance over hype.",
    accent: "var(--color-path-pm)",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-y border-line/60 bg-surface-2/40 px-6 py-20 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            Why It's Different
          </p>
          <h2 className="mb-4 text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            A simulation engine, not a marketing mood board.
          </h2>
          <p className="text-fog text-base mb-12">
            Most career advice is vague. Parallel You models specific technical deliverables, team interfaces, and required tooling so you can make informed decisions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-3xl border border-line bg-surface p-7 shadow-card dark:shadow-card-dark transition-all duration-200 hover:-translate-y-1 hover:border-path-ai/40"
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: "var(--color-surface-2)",
                    color: f.accent,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2.5 font-display text-xl font-medium text-paper">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-fog">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
