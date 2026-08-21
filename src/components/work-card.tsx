"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data";

function PathWatchVisual() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={200} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 40} x2={320} y2={i * 40} />
        ))}
      </g>
      {[
        [60, 60],
        [140, 40],
        [170, 110],
        [230, 90],
        [260, 150],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
      <path
        d="M40 150 L 60 60 L 140 40 L 170 110 L 230 90 L 260 150 L 295 60"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="295" cy="60" r="5" fill="var(--color-orange)" />
      <circle cx="295" cy="60" r="9" fill="none" stroke="var(--color-orange)" opacity="0.4" />
    </svg>
  );
}

function WerkzVisual() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <g fill="currentColor" opacity="0.35">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={`${8 + i * 14}%`}
            y={i * 42 + 12}
            width={`${42 - i * 3}%`}
            height="16"
            rx="2"
          />
        ))}
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={`d${i}`}
          cx={`${6 + i * 14}%`}
          cy={-4 + i * 42 + 20}
          r="4"
          fill={i < 3 ? "var(--color-orange)" : "none"}
          stroke={i < 3 ? "none" : "currentColor"}
          opacity="0.7"
        />
      ))}
      <rect x="8%" y="196" width="52%" height="3" fill="var(--color-orange)" opacity="0.8" />
    </svg>
  );
}

function MountVisual() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.55">
        <rect x="40" y="40" width="110" height="52" rx="3" />
        <rect x="180" y="64" width="110" height="52" rx="3" />
        <circle cx="166" cy="90" r="7" />
      </g>
      <path
        d="M150 66 Q 160 90 166 90 M 166 90 Q 172 90 180 90"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="2"
      />
      <g stroke="var(--color-orange)" strokeOpacity="0.6">
        <path d="M55 44 h30" strokeWidth="2.5" strokeDasharray="3 6" />
        <path d="M55 88 h40" strokeWidth="2.5" />
        <path d="M195 68 h26" strokeWidth="2.5" strokeDasharray="3 6" />
        <path d="M195 112 h24" strokeWidth="2.5" />
      </g>
      <circle cx="55" cy="92" r="3" fill="var(--color-orange)" />
      <text
        x="255"
        y="140"
        textAnchor="middle"
        style={{ font: "11px var(--font-geist-mono)" }}
        fill="var(--color-white-mute)"
      >
        queue clear
      </text>
    </svg>
  );
}

export default function WorkCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={cardRef}
      data-cursor="VIEW"
      onMouseMove={onMove}
      className="work-card group relative flex h-[420px] w-[85vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-orange/40 hover:shadow-[0_24px_60px_-20px_var(--color-orange-glow)] md:h-[560px] md:w-[560px]"
    >
      {/* cursor-follow orange glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), var(--color-orange-glow), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* visual */}
      <div className="relative m-4 mb-0 flex h-1/2 items-center justify-center overflow-hidden rounded-xl bg-white-deep text-ink md:m-6 md:mb-0">
        <div className="h-[85%] w-[92%] text-ink transition-transform duration-700 ease-out group-hover:scale-[1.05]">
          {project.visual === "pathwatch" && <PathWatchVisual />}
          {project.visual === "werkz" && <WerkzVisual />}
          {project.visual === "mount" && <MountVisual />}
        </div>
        <span
          className="small-label absolute right-3 top-3 rounded-full bg-orange px-2.5 py-1 text-ink"
        >
          {project.type}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[1.7rem] font-bold uppercase leading-none tracking-tight transition-transform duration-500 group-hover:-translate-x-1 md:text-[2.4rem]">
              {project.name}
            </h3>
            <span
              className="text-2xl text-ink/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-orange-deep md:text-3xl"
              aria-hidden="true"
            >
              {"\u2197"}
            </span>
          </div>
          <p className="small-label mt-2 text-white-mute">
            {project.scope}
          </p>
        </div>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
          {project.desc}
        </p>

        {/* expanding glass metadata */}
        <p
          className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-ink/55 opacity-60 blur-[1px] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none"
        >
          {project.tags.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-orange" aria-hidden="true" />
              {t}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}