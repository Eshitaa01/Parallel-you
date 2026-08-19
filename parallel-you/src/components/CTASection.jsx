import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ArrowRightLeft } from "lucide-react";

export default function CTASection({ onOpenEarlyAccess, onOpenCompare }) {
  return (
    <section id="cta" className="px-6 py-20 md:py-28 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface px-8 py-16 text-center shadow-card dark:shadow-card-dark md:px-16"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, var(--color-path-ai) 0%, var(--color-path-frontend) 100%)",
          }}
        />

        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1 font-mono text-xs text-fog mb-4">
          <Sparkles className="h-3.5 w-3.5 text-path-ai" />
          <span>Interactive Career Intelligence</span>
        </div>

        <h2 className="mx-auto max-w-xl text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl md:text-5xl">
          Your 2029 self is waiting.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-base text-fog leading-relaxed">
          Save your simulation, calculate customized skill gap timelines, and get notified as new specialized engineering tracks are published.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenEarlyAccess}
            className="flex items-center gap-2 rounded-full bg-paper px-7 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-glow shadow-sm"
          >
            <span>Create your account</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenCompare}
            className="flex items-center gap-2 rounded-full border border-line bg-surface-2 px-6 py-3 text-sm font-medium text-fog transition-colors hover:border-path-ai hover:text-paper"
          >
            <ArrowRightLeft className="h-4 w-4 text-path-ai" />
            <span>Compare paths</span>
          </button>
        </div>

        <p className="mt-4 font-mono text-xs text-fog">
          No credit card required · Free early access · 100% spam-free
        </p>
      </motion.div>
    </section>
  );
}
