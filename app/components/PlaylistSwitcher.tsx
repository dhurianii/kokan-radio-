"use client";

import { useState } from "react";
import { PLAYLISTS } from "../lib/playlists";
import type { Playlist } from "../types/track";

interface Props {
  playlists: Playlist[];        // currently only one is active, but accept any
  activeId: string;
  onChange: (id: string) => void;
  variant: "desktop" | "mobile";
}

/**
 * The active playlist is passed in. To let the user pick a different playlist
 * we use the full PLAYLISTS list — same source of truth, just looked up
 * client-side.
 */
export function PlaylistSwitcher({ activeId, onChange, variant }: Props) {
  const [open, setOpen] = useState(false);
  const active = PLAYLISTS.find((p) => p.id === activeId) ?? PLAYLISTS[0];

  if (variant === "desktop") {
    return (
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 backdrop-blur-md">
          {PLAYLISTS.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange(p.id)}
                className={
                  "rounded-full px-3 py-1 text-[11px] font-medium transition " +
                  (isActive
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white")
                }
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-left text-[12px] text-white backdrop-blur-md"
      >
        <span className="font-semibold">{active.name}</span>
        <span className="text-white/60">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="absolute inset-x-0 bottom-full z-30 mb-2 overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl">
          {PLAYLISTS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(p.id);
                  setOpen(false);
                }}
                className={
                  "block w-full px-3 py-2 text-left text-[12px] " +
                  (p.id === activeId
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5")
                }
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
