"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function RevealText({ 
  text, 
  className = "", 
  delay = 0,
  duration = 1.2,
  stagger = 0.04
}: RevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const words = gsap.utils.toArray(".reveal-word", containerRef.current);
    
    gsap.fromTo(
      words,
      { y: '110%', rotateZ: 2 }, // Slight rotation adds premium feel
      {
        y: '0%',
        rotateZ: 0,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
          <span className="reveal-word inline-block translate-y-[110%] will-change-transform origin-top-left">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
