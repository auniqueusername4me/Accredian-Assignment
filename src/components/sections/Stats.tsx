"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "@/components/ui/RevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
  {
    id: 1,
    value: "200K+",
    label: "square feet currently under construction",
  },
  {
    id: 2,
    value: "18",
    label: "States with active home design & development projects",
  },
  {
    id: 3,
    value: "5.0%",
    label: "Average build costs are within 5% of our pre-design estimates",
  },
  {
    id: 4,
    value: "5,000+",
    label: "land parcels evaluated",
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".stat-card", containerRef.current);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full py-32 bg-[#F9F9F8]" // Light beige/warm white background matching the screenshot
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <h2 className="text-[#0F172A] font-semibold text-lg md:text-xl">
            <RevealText text="Still don't believe it?" duration={0.6} stagger={0.02} />
          </h2>
        </div>

        {/* Masonry / Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-16 md:gap-y-0">
          
          {/* Left Column (Items 1 and 3) */}
          <div className="flex flex-col gap-y-24">
            <div className="stat-card border-t border-[#0F172A]/20 pt-10">
              <div 
                className="text-[6rem] lg:text-[8rem] leading-none font-medium text-[#0F172A] mb-4 tracking-tighter"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {statsData[0].value}
              </div>
              <p className="text-[#0F172A] text-lg lg:text-xl font-medium max-w-sm">
                {statsData[0].label}
              </p>
            </div>

            <div className="stat-card border-t border-[#0F172A]/20 pt-10">
              <div 
                className="text-[6rem] lg:text-[8rem] leading-none font-medium text-[#0F172A] mb-4 tracking-tighter"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {statsData[2].value}
              </div>
              <p className="text-[#0F172A] text-lg lg:text-xl font-medium max-w-sm">
                {statsData[2].label}
              </p>
            </div>
          </div>

          {/* Right Column (Items 2 and 4, Staggered Down) */}
          <div className="flex flex-col gap-y-24 md:pt-32">
            <div className="stat-card border-t border-[#0F172A]/20 pt-10">
              <div className="relative inline-block">
                {/* Decorative sparkles */}
                <div className="absolute -top-16 -right-12 hidden lg:block text-[#0F172A] opacity-80 pointer-events-none">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0" fill="#0F172A" />
                  </svg>
                </div>
                <div 
                  className="text-[6rem] lg:text-[8rem] leading-none font-medium text-[#0F172A] mb-4 tracking-tighter"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {statsData[1].value}
                </div>
              </div>
              <p className="text-[#0F172A] text-lg lg:text-xl font-medium max-w-sm">
                {statsData[1].label}
              </p>
            </div>

            <div className="stat-card border-t border-[#0F172A]/20 pt-10">
              <div className="relative inline-block">
                {/* Decorative dash marks */}
                <div className="absolute -top-8 -right-16 hidden lg:flex gap-2 rotate-[15deg]">
                  <div className="w-2 h-6 rounded-full bg-[#0F172A]"></div>
                  <div className="w-2 h-8 rounded-full bg-[#0F172A] -translate-y-2"></div>
                  <div className="w-2 h-6 rounded-full bg-[#0F172A]"></div>
                </div>
                <div 
                  className="text-[6rem] lg:text-[8rem] leading-none font-medium text-[#0F172A] mb-4 tracking-tighter"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {statsData[3].value}
                </div>
              </div>
              <p className="text-[#0F172A] text-lg lg:text-xl font-medium max-w-sm">
                {statsData[3].label}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
