import { Sparkles, Terminal } from "lucide-react";

export default function Footer({ onUnlock }) {
  return (
    <footer className="border-t border-line/60 bg-surface/50 px-6 py-12 transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-paper text-lg">Parallel You</span>
            <span className="rounded-full border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-fog">
              v1.0
            </span>
          </div>
          <p className="mt-2 max-w-md text-xs text-fog leading-relaxed">
            A career simulation engine built to model authentic technical futures — not sell marketing hype. Grounded in real production systems and compensation ladders.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 text-xs text-fog sm:items-end">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Terminal className="h-3.5 w-3.5 text-path-ai" />
            <span>Try typing Konami code (↑ ↑ ↓ ↓ ← → ← → B A)</span>
          </div>
          <p className="font-mono text-xs">
            © {new Date().getFullYear()} Parallel You · Made by Eshita Aggarwal
          </p>
        </div>
      </div>
    </footer>
  );
}
