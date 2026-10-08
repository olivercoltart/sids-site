"use client";

import { useSyncExternalStore } from "react";

// 10pm UK time on 25 Oct 2026. Clocks go back that morning, so UK time is GMT (UTC+0).
const TARGET = new Date("2026-10-25T22:00:00+00:00").getTime();

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getSecond = () => Math.floor(Date.now() / 1000);
// null on the server, so the first client render matches the HTML.
const getServerSecond = () => null;

function remaining(nowSec: number) {
  const s = Math.max(0, Math.floor(TARGET / 1000) - nowSec);
  return [
    { label: "Days", value: Math.floor(s / 86400) },
    { label: "Hours", value: Math.floor(s / 3600) % 24 },
    { label: "Mins", value: Math.floor(s / 60) % 60 },
    { label: "Secs", value: s % 60 },
  ];
}

export default function Countdown() {
  const now = useSyncExternalStore(subscribe, getSecond, getServerSecond);

  return (
    <section aria-label="Countdown" className="flex justify-center gap-3 sm:gap-6">
      {remaining(now ?? 0).map(({ label, value }) => (
        <div key={label} className="min-w-16 rounded-lg border border-foreground/15 px-3 py-2 text-center">
          <div className="font-mono text-2xl font-semibold tabular-nums sm:text-4xl">
            {now === null ? "--" : String(value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-wide opacity-60">{label}</div>
        </div>
      ))}
    </section>
  );
}
