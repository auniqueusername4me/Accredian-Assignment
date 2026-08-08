"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "../ui/RevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const domains = [
  {
    number: "01",
    title: "Product & Innovation Hub",
    description: "Driving creativity, product excellence, and innovation strategies.",
    detail: "Equip product teams with the frameworks and design-thinking methodologies that separate world-class products from the rest. From ideation to GTM — your teams build with intent."
  },
  {
    number: "02",
    title: "Gen-AI Mastery",
    description: "Comprehensive training on harnessing Generative AI for business transformation.",
    detail: "Go beyond the hype. We train your workforce on practical LLM deployment, prompt engineering, AI governance, and workflow automation — tailored to your industry's specific risk profile."
  },
  {
    number: "03",
    title: "Leadership Elevation",
    description: "Programs designed to build strong, visionary, and impactful leaders.",
    detail: "Leadership isn't a title — it's a practice. Our programs sharpen executive presence, strategic decision-making, and the emotional intelligence required to lead through ambiguity."
  },
  {
    number: "04",
    title: "Tech & Data Insights",
    description: "Training in cutting-edge technologies, data analytics, and digital tools.",
    detail: "Transform raw data into decisive action. From SQL fundamentals to advanced ML pipelines, we meet your technical teams exactly where they are and take them further."
  },
  {
    number: "05",
    title: "Operations Excellence",
    description: "Enhancing efficiency, process optimization, and operational leadership.",
    detail: "Operational discipline is the competitive moat most organizations overlook. We bring Lean, Six Sigma, and agile operations thinking to your teams in ways that stick."
  },
  {
    number: "06",
    title: "Digital Enterprise",
    description: "Empowering professionals in a fast-paced digital business environment.",
    detail: "Digital transformation is only as strong as the people executing it. We build digital fluency across your entire organization — from the boardroom to the front line."
  },
  {
    number: "07",
    title: "Fintech Innovation Lab",
    description: "Specializing in emerging trends and technologies in the financial sector.",
    detail: "Stay ahead of the curve in an industry being rewritten by blockchain, open banking, and embedded finance. We translate complexity into clear, actionable expertise for your finance teams."
  }
];

export default function DomainExpertise() {
  const containerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header reveal
    gsap.fromTo(".domain-header",
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".domain-header", start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    // Rows stagger in
    const rows = gsap.utils.toArray(".domain-row", containerRef.current);
    rows.forEach((row: any, i) => {
      gsap.fromTo(row,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#0F172A] overflow-hidden">

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative max-w-[1600px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div className="domain-header mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[#4F46E5] bg-indigo-950/60 px-4 py-1.5 rounded-full border border-indigo-800/40">
              Our Domain Expertise
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-xl">
              <RevealText text="Seven domains. Infinite depth." duration={0.6} stagger={0.02} />
            </h2>
          </div>
          <p className="text-slate-400 text-lg max-w-sm md:text-right">
            <RevealText text="Every domain we operate in is led by practitioners — not theorists. Real expertise, delivered with rigour." delay={0.1} duration={0.6} stagger={0.02} />
          </p>
        </div>

        {/* Domain Rows — Accordion / Expandable list */}
        <div className="divide-y divide-white/10">
          {domains.map((domain, i) => (
            <div
              key={i}
              className="domain-row group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-start gap-6 py-7 md:py-8 transition-all duration-300">
                {/* Number */}
                <span
                  className="text-xs font-black tracking-widest mt-1 transition-colors duration-300 shrink-0"
                  style={{ color: hovered === i ? "#4F46E5" : "rgba(255,255,255,0.2)" }}
                >
                  {domain.number}
                </span>

                {/* Main row content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h3
                      className="text-2xl md:text-4xl font-black transition-colors duration-300 leading-tight"
                      style={{ color: hovered === i ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-right max-w-xs hidden md:block">
                      {domain.description}
                    </p>
                  </div>

                  {/* Expanded detail on hover */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: hovered === i ? "120px" : "0px" }}
                  >
                    <p className="pt-4 text-slate-400 text-sm leading-relaxed max-w-2xl">
                      {domain.detail}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="shrink-0 mt-2 transition-all duration-300"
                  style={{
                    opacity: hovered === i ? 1 : 0.2,
                    transform: hovered === i ? "rotate(45deg) translateX(4px)" : "rotate(0deg)"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
