"use client";

interface Props {
  isPlaying: boolean;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  size: "md" | "lg";
  disabled?: boolean;
}

export function Transport({
  isPlaying,
  onPrev,
  onPlayPause,
  onNext,
  size,
  disabled,
}: Props) {
  const btn = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const playSize = size === "lg" ? 52 : 40;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onPrev}
        className={`grid place-items-center rounded-full text-white/80 transition hover:text-white ${btn}`}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
          <path d="M6 5h2v14H6Zm3.5 7 9 7V5Z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onPlayPause}
        disabled={disabled}
        className="grid place-items-center rounded-full bg-gradient-to-b from-[color:var(--color-accent)] to-[color:var(--color-accent-soft)] text-white ring-1 ring-white/25 transition active:scale-95 disabled:opacity-50 shadow-accent"
        style={{ width: playSize, height: playSize }}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
            <path d="M6 5h4v14H6Zm8 0h4v14h-4Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7Z" />
          </svg>
        )}
      </button>

      <button
        type="button"
        aria-label="Next track"
        onClick={onNext}
        className={`grid place-items-center rounded-full text-white/80 transition hover:text-white ${btn}`}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
          <path d="M16 5h2v14h-2ZM6 5v14l9-7Z" />
        </svg>
      </button>
    </div>
  );
}
