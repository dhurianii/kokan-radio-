"use client";

const SAFE_TOP = "max(1rem, env(safe-area-inset-top))";
const SAFE_RIGHT = "max(1rem, env(safe-area-inset-right))";

const LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-2.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: (
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.2ZM10 15.5v-7l6 3.5Z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: (
      <path d="M18.9 3H22l-7.5 8.6L23 21h-6.8l-5.3-6.9L4.8 21H1.6l8-9.2L1 3h6.9l4.8 6.3Zm-1.2 16h1.9L7.3 5H5.3Z" />
    ),
  },
];

export function SocialLinks() {
  return (
    <div
      className="fixed z-30 flex items-center gap-2"
      style={{ top: SAFE_TOP, right: SAFE_RIGHT }}
    >
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={l.label}
          className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/30 text-white/80 backdrop-blur-md transition hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
            aria-hidden
          >
            {l.icon}
          </svg>
        </a>
      ))}
    </div>
  );
}
