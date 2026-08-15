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

export function PlayerMobile(props: Props) {
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
    <div className="fixed inset-x-0 bottom-0 z-20 sm:hidden">
      <div className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div
          className="rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7]"
        >
          <PlaylistSwitcher
            playlists={playlist ? [playlist] : []}
            activeId={playlist?.id ?? ""}
            onChange={onPlaylistChange}
            variant="mobile"
          />

          {/* row 1: 64px vinyl + meta */}
          <div className="mt-2 flex items-center gap-3">
            <Vinyl
              videoId={track.videoId}
              isPlaying={isPlaying}
              iframeRef={iframeRef}
              size={64}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold text-white">
                {track.title}
              </div>
              <div className="truncate text-[12.5px] text-white/70">
                {track.artist || "Unknown artist"}
              </div>
            </div>
          </div>

          {/* row 2: full-width seek */}
          <div className="mt-2">
            <SeekBar elapsed={elapsed} duration={duration} onSeek={onSeek} />
            <div className="mt-0.5 flex justify-between text-[10.5px] text-white/60 tabular-nums">
              <span>{formatTime(elapsed)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* row 3: transport */}
          <div className="mt-1 flex items-center justify-center">
            <Transport
              isPlaying={isPlaying}
              onPrev={onPrev}
              onPlayPause={onPlayPause}
              onNext={onNext}
              size="lg"
              disabled={!track.videoId}
            />
          </div>
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
