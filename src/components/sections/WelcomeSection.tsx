"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "@/components/ui/RevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WelcomeSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Text slides up
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Image scales up from slightly smaller + fades in
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.94, y: 40 },
      {
        opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-24 px-4 md:px-8 lg:px-16"
    >
      {/* ── Faint blue wave / arc decorative SVG (top-right) ─── */}
      <svg
        className="absolute top-0 right-0 w-[420px] opacity-[0.07] pointer-events-none"
        viewBox="0 0 500 300" fill="none"
      >
        <path d="M500,0 Q350,120 200,80 Q80,50 0,150" stroke="#0B3D91" strokeWidth="2" />
        <path d="M500,50 Q360,160 220,110 Q90,75 0,190" stroke="#0B3D91" strokeWidth="1.5" />
        <path d="M500,100 Q370,200 240,150 Q100,110 0,230" stroke="#0B3D91" strokeWidth="1" />
        <circle cx="460" cy="20" r="4" fill="#0B3D91" />
        <circle cx="380" cy="60" r="3" fill="#0B3D91" />
        <circle cx="300" cy="80" r="2.5" fill="#0B3D91" />
        <circle cx="220" cy="95" r="2" fill="#0B3D91" />
      </svg>

      {/* ── Faint blue dotted arc (bottom-left) ─────────────── */}
      <svg
        className="absolute bottom-0 left-0 w-[320px] opacity-[0.07] pointer-events-none"
        viewBox="0 0 400 250" fill="none"
      >
        <path d="M0,250 Q100,100 250,150 Q350,180 400,80" stroke="#0B3D91" strokeWidth="1.5" strokeDasharray="6 8" />
        <path d="M0,220 Q120,80 270,130 Q360,160 400,50" stroke="#0B3D91" strokeWidth="1" strokeDasharray="4 10" />
      </svg>

      <div className="max-w-4xl mx-auto">

        {/* ── Centered welcome text ─────────────────────────── */}
        <div ref={textRef} className="text-center mb-16">
          <span className="inline-block mb-5 text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D91] bg-[#DCEBFF] px-4 py-1.5 rounded-full">
            <RevealText text="Welcome" />
          </span>
          <div
            className="text-[#0F172A] leading-relaxed"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
              fontWeight: 400,
            }}
          >
            <RevealText text="Welcome to Accredian Enterprise. Empowering your workforce with world-class education and strategic learning experiences." className="justify-center" />
          </div>
        </div>

        {/* ── Facility photo ────────────────────────────────── */}
        <div
          ref={imageRef}
          className="w-full rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(11,61,145,0.12)]"
          style={{ aspectRatio: "16/7" }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Accredian Enterprise modern learning space"
            className="w-full h-full object-cover"
          />
          {/* Blue duotone tint overlay */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "rgba(11,61,145,0.04)", mixBlendMode: "multiply" }}
          />
        </div>
      </div>
    </section>
  );
}
