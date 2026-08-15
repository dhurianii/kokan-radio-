"use client";

import { useListenerCount } from "../hooks/useListenerCount";

const SAFE_TOP = "max(1rem, env(safe-area-inset-top))";

export function ListenerCount() {
  const count = useListenerCount();
  return (
    <div
      className="fixed left-1/2 z-30 -translate-x-1/2 text-white/80"
      style={{ top: SAFE_TOP }}
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-medium backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
        </span>
        <span className="tabular-nums">{count}</span>
        <span className="text-white/60">listening</span>
      </div>
    </div>
  );
}
