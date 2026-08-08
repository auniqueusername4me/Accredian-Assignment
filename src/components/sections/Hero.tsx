"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  onBookDemoClick?: () => void;
}

export default function Hero({ onBookDemoClick }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Staggered bounce entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } });

    tl.fromTo(badgeRef.current, 
      { opacity: 0, y: 30, scale: 0.8 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
      "-=0.4"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-10 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Floating Glassmorphic Pill Badge */}
        <div 
          ref={badgeRef}
          className="opacity-0 mb-6 px-6 py-2 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-[20px] shadow-sm flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse"></span>
          <span className="text-sm font-semibold text-[#1D4ED8] tracking-wide uppercase">
            Enterprise Grade Upskilling
          </span>
        </div>

        {/* Headline */}
        <h1 
          ref={titleRef}
          className="opacity-0 text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6"
        >
          Next-Gen Expertise <br className="hidden md:block" /> 
          for Your <span className="text-[#1D4ED8]">Enterprise</span>
        </h1>

        {/* Description */}
        <p 
          ref={descRef}
          className="opacity-0 text-lg md:text-xl text-[#0F172A]/70 max-w-2xl mb-10 leading-relaxed"
        >
          Bridge the skill gap in your workforce with precision learning modules, ROI-driven dashboards, and accelerated technical training for the modern era.
        </p>

        {/* Action Buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={onBookDemoClick}
            className="opacity-0 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1D4ED8] text-white font-bold text-lg shadow-[0_10px_20px_rgba(29,78,216,0.3)] hover:bg-[#1e40af] hover:-translate-y-1 transition-all duration-300"
          >
            Book a Demo
          </button>
          
          <button 
            className="opacity-0 w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#0F172A] font-bold text-lg shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            Explore Solutions
          </button>
        </div>
      </div>
    </section>
  );
}
