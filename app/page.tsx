import { Clock } from "./components/Clock";
import { ListenerCount } from "./components/ListenerCount";
import { Player } from "./components/Player";
import { SocialLinks } from "./components/SocialLinks";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background scene — landscape by default, swapped in portrait via CSS.
          bg-contain so the full artwork is visible (no cropping); the body
          fill behind the letterbox keeps it cinematic on extreme aspect ratios. */}
      <div
        className="hero-bg fixed inset-0 -z-20 bg-contain bg-center bg-no-repeat"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none fixed inset-0 -z-10" aria-hidden />

      {/* Top row — fixed corners with safe-area insets */}
      <Clock />
      <ListenerCount />
      <SocialLinks />

      {/* Center label, like a radio station mark */}
      <div className="z-0 mt-24 flex flex-col items-center px-6 text-center sm:mt-32">
        <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur-md">
          On Air
        </div>
      </div>

      {/* Player — bottom-anchored, max-w-xl on desktop, full-width card on mobile */}
      <Player />
    </main>
  );
}
