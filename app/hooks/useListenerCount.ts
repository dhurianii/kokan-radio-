"use client";

import { useEffect, useState } from "react";

// Lightweight simulated listener count. Replace with a real fetch later.
const SEED = 42;

export function useListenerCount(): number {
  const [count, setCount] = useState<number>(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const drift = Math.floor(Math.random() * 5) - 2; // -2..+2
        const next = c + drift;
        return Math.max(8, Math.min(500, next));
      });
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return count;
}
