"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PLAYLISTS } from "../lib/playlists";
import { loadYouTubeAPI, type YTPlayer } from "../lib/youtube";
import type { Playlist, Track } from "../types/track";
import { PlayerDesktop } from "./PlayerDesktop";
import { PlayerMobile } from "./PlayerMobile";

// YT PlayerState constants — duplicated locally so we don't have to import the
// whole YT namespace types.
const YT_STATE = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
} as const;

export function Player() {
  const [playlistId, setPlaylistId] = useState<string>(PLAYLISTS[0].id);
  const playlist: Playlist = useMemo(
    () =>
      PLAYLISTS.find((p) => p.id === playlistId) ?? PLAYLISTS[0],
    [playlistId]
  );

  const [trackIndex, setTrackIndex] = useState<number>(0);
  const track: Track = playlist.tracks[trackIndex] ?? playlist.tracks[0];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  /* ------------------------- mount the YouTube player --------------------- */
  useEffect(() => {
    let cancelled = false;

    loadYouTubeAPI().then(() => {
      if (cancelled || !containerRef.current || !window.YT) return;
      // The player is created with NO video so the iframe exists in the artwork
      // slot from the very first render — required by YouTube's policies
      // (no separating audio from video, no hidden players).
      playerRef.current = new window.YT.Player(containerRef.current, {
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 1,        // visible controls so the Skip button is reachable
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            // The play button is intentionally NOT gated on a canplay event —
            // iOS Safari won't fire it before a user gesture.
          },
          onStateChange: (e) => {
            if (e.data === YT_STATE.PLAYING) {
              setIsPlaying(true);
              const d = playerRef.current?.getDuration?.();
              if (d && Number.isFinite(d)) setDuration(d);
            } else if (e.data === YT_STATE.PAUSED) {
              setIsPlaying(false);
            } else if (e.data === YT_STATE.ENDED) {
              handleNext();
            }
          },
          onError: (e) => {
            // Video deleted, embedding disabled, or another error after ship.
            // Skip to the next track and log a analytics event so the operator
            // can find and replace the broken videoId.
            // eslint-disable-next-line no-console
            console.warn("YouTube player error", { code: e.data, videoId: track.videoId });
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("video_error", {
                  detail: { code: e.data, videoId: track.videoId, trackId: track.id },
                })
              );
            }
            handleNext();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------- progress ticker ------------------------------ */
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const t = playerRef.current?.getCurrentTime?.() ?? 0;
      if (Number.isFinite(t)) setElapsed(t);
    }, 250);
    return () => clearInterval(id);
  }, [isPlaying]);

  /* ------------------------- cue the current track ------------------------ */
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !track.videoId) return;
    setElapsed(0);
    setDuration(0);
    player.loadVideoById(track.videoId);
  }, [track.videoId]);

  /* ------------------------- handlers ------------------------------------- */
  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (!track.videoId) {
      // No videoId configured — don't call into the player at all.
      return;
    }
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  }, [isPlaying, track.videoId]);

  const handlePrev = useCallback(() => {
    setTrackIndex((i) => (i === 0 ? playlist.tracks.length - 1 : i - 1));
  }, [playlist.tracks.length]);

  const handleNext = useCallback(() => {
    setTrackIndex((i) => (i + 1) % playlist.tracks.length);
  }, [playlist.tracks.length]);

  const handleSeek = useCallback((seconds: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(seconds, true);
    setElapsed(seconds);
  }, []);

  const handlePlaylistChange = useCallback((id: string) => {
    setPlaylistId(id);
    setTrackIndex(0);
  }, []);

  /* ------------------------- render --------------------------------------- */
  return (
    <>
      <PlayerDesktop
        track={track}
        playlist={playlist}
        isPlaying={isPlaying}
        elapsed={elapsed}
        duration={duration}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onPlaylistChange={handlePlaylistChange}
        iframeRef={containerRef}
      />
      <PlayerMobile
        track={track}
        playlist={playlist}
        isPlaying={isPlaying}
        elapsed={elapsed}
        duration={duration}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onPlaylistChange={handlePlaylistChange}
        iframeRef={containerRef}
      />
    </>
  );
}
