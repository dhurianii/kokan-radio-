"use client";

import type { RefObject } from "react";

interface Props {
  videoId: string;
  isPlaying: boolean;
  iframeRef: RefObject<HTMLDivElement | null>;
  size: number;
}

/**
 * Vinyl on the outside, iframe on the inside.
 * The iframe sits in the artwork slot and IS visible — per YouTube's policies
 * we don't hide it in a 1×1 / opacity-0 container. When the cover art for a
 * track is available as an image we would layer it on top, but for now the
 * YouTube player is the artwork.
 *
 * The CSS animation is on the outer disc and its play/pause state is toggled
 * via animationPlayState — the iframe inside does not get remounted on
 * progress ticks because Vinyl is defined at module scope.
 */
export function Vinyl({ videoId, isPlaying, iframeRef, size }: Props) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        boxShadow:
          "0 6px 20px -4px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.12)",
      }}
      aria-hidden={!videoId}
    >
      {/* The spinning wrapper holds both the iframe and the centre spindle so
          they stay aligned as a unit. */}
      <div
        className="absolute inset-0 animate-vinyl"
        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
      >
        {/* iframe slot — YouTube replaces this div with its player. */}
        <div
          ref={iframeRef}
          className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full"
        />
        {/* Black spindle hole on top. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"
          style={{ width: 12, height: 12 }}
        />
      </div>
    </div>
  );
}
