import { motion } from "framer-motion";
import { careerPaths } from "../data/careerPaths.js";

// The signature visual: one line (today) diverging into four colored futures.
// Reused, smaller and quieter, in the simulator and roadmap sections.
export default function ParallelPaths({
  activeId,
  onSelectPath,
  className = "",
  compact = false,
}) {
  const height = compact ? 220 : 420;
  const startX = 40;
  const startY = height / 2;
  const endX = 760;

  const endYs = compact
    ? [40, 90, 140, 190].map((v) => v + (height - 220) / 2)
    : [60, 160, 260, 360];

  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      className={`${className} transition-opacity duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {careerPaths.map((path) => (
          <linearGradient
            key={`grad-${path.id}`}
            id={`grad-${path.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--color-fog-muted)" stopOpacity="0.4" />
            <stop offset="60%" stopColor={path.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={path.color} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>

      {/* Background connecting curves */}
      {careerPaths.map((path, i) => {
        const isActive = activeId ? activeId === path.id : true;
        const d = `M ${startX} ${startY} C ${startX + 220} ${startY}, ${
          endX - 220
        } ${endYs[i]}, ${endX} ${endYs[i]}`;

        return (
          <g key={path.id} className="cursor-pointer" onClick={() => onSelectPath?.(path.id)}>
            {/* Glow / Active Shadow Path */}
            {isActive && activeId && (
              <path
                d={d}
                stroke={path.color}
                strokeWidth={compact ? 4 : 6}
                strokeOpacity={0.25}
                strokeLinecap="round"
              />
            )}

            {/* Main Path Line */}
            <motion.path
              d={d}
              stroke={isActive ? path.color : "var(--color-line)"}
              strokeWidth={isActive ? (compact ? 2.5 : 3) : 1.2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: isActive ? 1 : 0.35 }}
              animate={
                activeId
                  ? {
                      opacity: isActive ? 1 : 0.2,
                      strokeWidth: isActive ? (compact ? 2.5 : 3) : 1,
                    }
                  : undefined
              }
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: "easeOut" }}
            />

            {/* Target Node Pin */}
            <circle
              cx={endX}
              cy={endYs[i]}
              r={isActive ? (compact ? 6 : 8) : (compact ? 3.5 : 4.5)}
              fill={isActive ? path.color : "var(--color-line)"}
              className="transition-all duration-300 hover:scale-125"
            />
            {isActive && (
              <circle
                cx={endX}
                cy={endYs[i]}
                r={compact ? 10 : 14}
                stroke={path.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
                fill="none"
                className="animate-ping"
                style={{ transformOrigin: `${endX}px ${endYs[i]}px` }}
              />
            )}
          </g>
        );
      })}

      {/* Starting Present Moment Node */}
      <circle
        cx={startX}
        cy={startY}
        r={compact ? 5 : 7}
        fill="var(--color-paper)"
        className="transition-colors"
      />
      <circle
        cx={startX}
        cy={startY}
        r={compact ? 9 : 12}
        stroke="var(--color-paper)"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />
    </svg>
  );
}
