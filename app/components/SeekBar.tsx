"use client";

import { useCallback, useRef } from "react";

interface Props {
  elapsed: number;
  duration: number;
  onSeek: (seconds: number) => void;
}

export function SeekBar({ elapsed, duration, onSeek }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const ratio = duration > 0 ? Math.min(1, Math.max(0, elapsed / duration)) : 0;

  const seekFromPointer = useCallback(
    (clientX: number) => {
      const el = railRef.current;
      if (!el || duration <= 0) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      onSeek(pct * duration);
    },
    [duration, onSeek]
  );

  return (
    <div
      ref={railRef}
      className="seek-rail"
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.max(0, duration)}
      aria-valuenow={Math.floor(elapsed)}
      onPointerDown={(e) => {
        // onPointerDown (not onClick) so the press+drag works as one gesture,
        // and touch-none keeps the page from scrolling while dragging.
        e.preventDefault();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        seekFromPointer(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 0) return;
        seekFromPointer(e.clientX);
      }}
      onPointerUp={(e) => {
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
    >
      <div className="seek-rail__track" />
      <div
        className="seek-rail__fill"
        style={{ width: `${ratio * 100}%` }}
      />
      <div
        className="seek-rail__knob"
        style={{ left: `${ratio * 100}%` }}
      />
    </div>
  );
}
