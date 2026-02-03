"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black text-white overflow-hidden">
      {/* Noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[url('/noise.png')]" />

      {/* Glitch text */}
      <div className="relative text-center">
        <h1
          className="text-5xl font-extrabold tracking-tight glitch"
          data-text="INITIALIZING"
        >
          INITIALIZING
        </h1>

        <p className="mt-4 text-sm tracking-widest text-white/60">
          SYSTEM BOOT {String(tick % 100).padStart(2, "0")}%
        </p>
      </div>

      <style jsx>{`
        .glitch {
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
        }
        .glitch::before {
          top: -2px;
          color: #00ffff;
          animation: glitchTop 1.2s infinite linear alternate-reverse;
        }
        .glitch::after {
          top: 2px;
          color: #ff00ff;
          animation: glitchBottom 1s infinite linear alternate-reverse;
        }

        @keyframes glitchTop {
          0% {
            clip-path: inset(0 0 80% 0);
          }
          100% {
            clip-path: inset(0 0 20% 0);
          }
        }

        @keyframes glitchBottom {
          0% {
            clip-path: inset(80% 0 0 0);
          }
          100% {
            clip-path: inset(20% 0 0 0);
          }
        }
      `}</style>
    </div>
  );
}