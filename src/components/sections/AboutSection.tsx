"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Heading mask/translateY reveal tied to scroll
    gsap.fromTo(
      ".about-heading",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 2. Body copy staggered fade-up tied to scroll
    gsap.fromTo(
      ".about-copy > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 3. Background line-art parallax
    gsap.to(".about-vine-illustration", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-section relative w-full bg-white overflow-hidden py-24 md:py-32 px-4 md:px-8 lg:px-16"
    >
      {/* ── Background Botanical Vine SVG (Parallax) ─── */}
      <svg
        className="about-vine-illustration absolute bottom-0 left-0 w-full pointer-events-none opacity-[0.04]"
        viewBox="0 0 1440 260"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0,260 Q200,180 400,220 Q600,260 800,200 Q1000,140 1200,180 Q1350,210 1440,170" stroke="#0B3D91" strokeWidth="2" />
        <path d="M0,240 Q150,160 300,200 Q500,250 700,190 Q900,130 1100,165 Q1300,195 1440,145" stroke="#0B3D91" strokeWidth="1.2" />
        <ellipse cx="300" cy="210" rx="20" ry="10" stroke="#0B3D91" strokeWidth="1" transform="rotate(-20 300 210)" />
        <ellipse cx="600" cy="245" rx="18" ry="9" stroke="#0B3D91" strokeWidth="1" transform="rotate(10 600 245)" />
        <ellipse cx="900" cy="185" rx="16" ry="8" stroke="#0B3D91" strokeWidth="1" transform="rotate(-15 900 185)" />
        <ellipse cx="1200" cy="170" rx="15" ry="7" stroke="#0B3D91" strokeWidth="1" transform="rotate(5 1200 170)" />
        <circle cx="150"  cy="230" r="3" fill="#0B3D91" />
        <circle cx="450"  cy="230" r="2.5" fill="#0B3D91" />
        <circle cx="750"  cy="200" r="3" fill="#0B3D91" />
        <circle cx="1050" cy="170" r="2.5" fill="#0B3D91" />
        <circle cx="1350" cy="155" r="2" fill="#0B3D91" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── Large Serif Heading (Masked Reveal) ─── */}
        <div className="overflow-hidden pb-4">
          <h2
            className="about-heading font-bold leading-[1.1] text-[#0F172A]"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            }}
          >
            A legacy of excellence in <em className="text-[#0B3D91]" style={{ fontStyle: "italic", fontWeight: 400 }}>Education</em>
          </h2>
        </div>

        {/* ── Two-Column Layout ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mt-12 md:mt-16">
          
          {/* Left Column (Empty for spacing) */}
          <div className="hidden md:block" />

          {/* Right Column (Body Copy + Link) */}
          <div className="about-copy flex flex-col gap-7">
            <p className="text-[#334155] leading-relaxed text-lg md:text-xl font-light">
              With years of dedication to professional growth, Accredian Enterprise has built a legacy founded on knowledge, innovation, and career transformation.
            </p>
            <p className="text-[#475569] leading-relaxed text-base md:text-lg font-light">
              Accredian Enterprise bridges the gap between academic theory and industry demand, offering world-class strategic training tailored for the modern workforce. By combining cutting-edge curriculum design with expert mentorship, we create a learning ecosystem where education transcends traditional boundaries to become a holistic, career-accelerating experience.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
