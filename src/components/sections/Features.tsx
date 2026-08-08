"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { featuresData } from '@/data/mockData';
import RevealText from '@/components/ui/RevealText';

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.feature-icon');
    
    // Card lift and glow
    gsap.to(card, {
      y: -6,
      borderColor: 'rgba(29, 78, 216, 0.4)', // Blue border glow
      boxShadow: '0 20px 40px rgba(29, 78, 216, 0.1)',
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Icon smooth scaling
    if (icon) {
      gsap.to(icon, {
        scale: 1.15,
        color: '#1D4ED8', // Primary Royal Blue
        duration: 0.3,
        ease: "back.out(1.5)",
        overwrite: "auto"
      });
    }
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.feature-icon');
    
    gsap.to(card, {
      y: 0,
      borderColor: 'rgba(226, 232, 240, 1)', // slate-200
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // default shadow-sm
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1,
        color: '#334155', // slate-700
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  });

  return (
    <section 
      ref={sectionRef}
      className="w-full py-24 bg-[#F8FAFC]" // Light Slate Background
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            <RevealText text="Enterprise Features Built for Scale" />
          </h2>
          <div className="text-lg text-slate-600">
            <RevealText text="Everything your organization needs to deploy, manage, and measure technical upskilling across global teams." className="justify-center" delay={0.2} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, idx) => (
            <div
              key={feature.id}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm cursor-pointer will-change-transform"
            >
              <div className="feature-icon text-3xl text-slate-700 mb-5 inline-block origin-bottom-left transition-colors duration-200">
                {/* Fallback icons mapped by index for the mock data */}
                {idx === 0 ? "🎯" : idx === 1 ? "⚡" : idx === 2 ? "📊" : "🛡️"}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
