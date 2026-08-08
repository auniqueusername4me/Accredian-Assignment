"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RevealText from '@/components/ui/RevealText';
import { Search, PenTool, LayoutDashboard } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Skill Gap Analysis",
    description: "Assess team skill gaps and developmental needs.",
    icon: Search,
  },
  {
    id: 2,
    title: "Customized Training Plan",
    description: "Create a tailored roadmap addressing organizational goals.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Flexible Program Delivery",
    description: "Deliver adaptable programs aligned with industry and organizational needs.",
    icon: LayoutDashboard,
  }
];

export default function DeliverResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardsRef.current) return;

    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            <RevealText text="How We Deliver Results That Matter?" duration={0.6} stagger={0.02} />
          </h2>
          <div className="text-lg md:text-xl text-slate-600 font-medium">
            <RevealText text="A Structured Three-Step Approach to Skill Development" className="justify-center" delay={0.2} duration={0.6} stagger={0.02} />
          </div>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="flex flex-wrap justify-center gap-8 px-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className="relative bg-[#F4F7FC] border border-[#E2E8F0] rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col items-center text-center max-w-[20rem] w-full will-change-transform"
              >
                {/* Decorative left/right bars */}
                <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-1.5 h-16 sm:h-24 bg-[#0B3D91] rounded-r-lg opacity-80" />
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-1.5 h-16 sm:h-24 bg-[#0B3D91] rounded-l-lg opacity-80" />

                {/* Step Number Badge */}
                <div className="absolute left-4 top-4 w-8 h-8 border-2 border-[#CBD5E1] bg-white rounded-full flex justify-center items-center font-bold text-[#0B3D91] shadow-sm">
                  {step.id}
                </div>

                {/* Icon Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[#0B3D91] text-white rounded-full shadow-md mt-6 mb-6">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
