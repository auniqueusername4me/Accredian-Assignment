"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import RevealText from '@/components/ui/RevealText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CATFramework() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Image pop-up animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden flex flex-col items-center"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            <RevealText text="The C.A.T. Framework" />
          </h2>
          <div className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium mb-6">
            <RevealText text="Our Proven Approach to Learning Excellence" className="justify-center" delay={0.2} />
          </div>
          <div className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            <RevealText 
              text="Our proprietary methodology focuses on three core pillars: Concept, Application, and Tools. We start by establishing a strong theoretical foundation, instantly translate those concepts into real-world enterprise applications, and ensure your team masters the industry-standard software required to scale. This holistic approach guarantees maximum retention and immediate, measurable project impact." 
              className="justify-center" 
              delay={0.4} 
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <img 
            ref={imageRef}
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/catV2.svg" 
            alt="C.A.T Framework - Concept, Application, Tools" 
            className="w-full max-w-5xl h-auto rounded-xl drop-shadow-sm will-change-transform"
          />
        </div>

      </div>
    </section>
  );
}
