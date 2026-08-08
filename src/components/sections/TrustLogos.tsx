"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const partners = [
  { name: "IBM", file: "ibm.png" },
  { name: "ADP", file: "adp.png" },
  { name: "CRIF", file: "crif.png" },
  { name: "HCL", file: "hcl.png" },
];

export default function TrustLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const icons = gsap.utils.toArray<HTMLElement>(".partner-icon", containerRef.current);

    // Continuous floating animation for desktop icons
    icons.forEach((icon, i) => {
      gsap.to(icon, {
        y: "random(-15, 15)",
        x: "random(-15, 15)",
        rotation: "random(-5, 5)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    // Mobile marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }

  }, { scope: containerRef });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      zIndex: 10,
      duration: 0.4,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
      zIndex: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section 
      className="w-full py-28 bg-white overflow-hidden border-t border-slate-100"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-20">
          Our Proven Partnerships
        </h2>

        {/* ── Interactive Floating Icons Grid ── */}
        <div className="hidden md:flex flex-wrap justify-center gap-12 lg:gap-16 relative">
          {partners.map((partner, index) => (
            <div
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="partner-icon relative flex items-center justify-center w-48 h-28 lg:w-56 lg:h-32 bg-white rounded-3xl shadow-sm border border-slate-100 cursor-pointer will-change-transform p-6"
            >
              <img 
                src={`/final_logos/${partner.file}`} 
                alt={partner.name} 
                className="w-full h-full object-contain select-none pointer-events-none mix-blend-multiply opacity-80 transition-opacity duration-300 hover:opacity-100"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold text-slate-800">${partner.name}</span>`}}
              />
            </div>
          ))}
        </div>

        {/* ── Backup Marquee Slider for Mobile ── */}
        <div className="md:hidden flex overflow-hidden whitespace-nowrap relative w-full group">
          <div ref={marqueeRef} className="inline-flex gap-8 px-4 items-center">
            {partners.concat(partners).map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-40 h-24 bg-white rounded-2xl shadow-sm border border-slate-100 shrink-0 p-4"
              >
                <img 
                  src={`/final_logos/${partner.file}`} 
                  alt={partner.name} 
                  className="w-full h-full object-contain select-none pointer-events-none mix-blend-multiply opacity-80"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-base font-bold text-slate-800">${partner.name}</span>`}}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
