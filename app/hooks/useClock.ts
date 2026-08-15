"use client";

import { useEffect, useState } from "react";

const FORMATTER = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function useClock(): { hours: string; minutes: string; ampm: string } {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return { hours: "--", minutes: "--", ampm: "" };
  const parts = FORMATTER.formatToParts(now);
  const hours = parts.find((p) => p.type === "hour")?.value ?? "--";
  const minutes = parts.find((p) => p.type === "minute")?.value ?? "--";
  const ampm = parts.find((p) => p.type === "dayPeriod")?.value ?? "";
  return { hours, minutes, ampm };
}
