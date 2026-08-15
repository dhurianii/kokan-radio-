"use client";

import { useClock } from "../hooks/useClock";

const SAFE_TOP = "max(1rem, env(safe-area-inset-top))";
const SAFE_LEFT = "max(1rem, env(safe-area-inset-left))";

export function Clock() {
  const { hours, minutes, ampm } = useClock();
  return (
    <div
      className="fixed z-30 text-white/85"
      style={{ top: SAFE_TOP, left: SAFE_LEFT }}
    >
      <div className="flex items-baseline gap-1 text-sm font-medium tabular-nums drop-shadow">
        <span>{hours}</span>
        <span className="colon-blink">:</span>
        <span>{minutes}</span>
        <span className="ml-1 text-[10px] uppercase tracking-wider text-white/60">
          {ampm} · IST
        </span>
      </div>
    </div>
  );
}
