"use client";

import type { RefObject } from "react";
import type { Playlist, Track } from "../types/track";
import { PlaylistSwitcher } from "./PlaylistSwitcher";
import { SeekBar } from "./SeekBar";
import { Vinyl } from "./Vinyl";
import { Transport } from "./Transport";

interface Props {
  track: Track;
  playlist: Playlist;
  isPlaying: boolean;
  elapsed: number;
  duration: number;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onPlaylistChange: (id: string) => void;
  iframeRef: RefObject<HTMLDivElement | null>;
}

export function PlayerDesktop(props: Props) {
  const {
    track,
    playlist,
    isPlaying,
    elapsed,
    duration,
    onPlayPause,
    onPrev,
    onNext,
    onSeek,
    onPlaylistChange,
    iframeRef,
  } = props;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden justify-center pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex">
      <div className="pointer-events-auto mx-4 w-full max-w-xl">
        <PlaylistSwitcher
          playlists={playlist ? [playlist] : []}
          activeId={playlist?.id ?? ""}
          onChange={onPlaylistChange}
          variant="desktop"
        />

        <div
          className="mt-2 flex items-center gap-4 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 pr-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7]"
        >
          <Vinyl
            videoId={track.videoId}
            isPlaying={isPlaying}
            iframeRef={iframeRef}
            size={80}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="truncate text-[15px] font-semibold text-white">
              {track.title}
            </div>
            <div className="truncate text-[12.5px] text-white/70">
              {track.artist || "Unknown artist"}
            </div>
            <div className="mt-1">
              <SeekBar
                elapsed={elapsed}
                duration={duration}
                onSeek={onSeek}
              />
            </div>
            <div className="-mt-1 flex justify-between text-[10.5px] text-white/60 tabular-nums">
              <span>{formatTime(elapsed)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <Transport
            isPlaying={isPlaying}
            onPrev={onPrev}
            onPlayPause={onPlayPause}
            onNext={onNext}
            size="md"
            disabled={!track.videoId}
          />
        </div>
      </div>
    </div>
  );
}

function formatTime(s: number): string {
  if (!s || !Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
