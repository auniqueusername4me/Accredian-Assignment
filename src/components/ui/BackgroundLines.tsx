"use client";

import { useEffect, useRef } from "react";

// Column positions as % from left — scattered, not evenly spaced
const LINE_POSITIONS = [8, 22, 41, 60, 78, 92];

export default function BackgroundLines() {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let maxScroll = 0;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      // Only grow — never shrink
      if (progress > maxScroll) {
        maxScroll = progress;
        linesRef.current.forEach((el) => {
          if (el) {
            el.style.transform = `scaleY(${maxScroll})`;
          }
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {LINE_POSITIONS.map((left, i) => (
        <div
          key={i}
          className="absolute top-0 h-full"
          style={{ left: `${left}%`, width: "1px" }}
        >
          {/* Track (ghost) */}
          <div className="absolute inset-0 bg-blue-200/20" />
          {/* Falling fill */}
          <div
            ref={(el) => { linesRef.current[i] = el; }}
            className="absolute top-0 left-0 w-full h-full bg-blue-400/50"
            style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          />
        </div>
      ))}
    </div>
  );
}
