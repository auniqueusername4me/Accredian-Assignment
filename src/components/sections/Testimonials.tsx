"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "../ui/RevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    review: "We would like to thank Accredian for the wonderful support and the beautiful journey. The team turned our vision into reality with unparalleled dedication, service, and expertise throughout the entire process.",
    company_logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/adp.svg",
    name: "ADP"
  },
  {
    review: "Accredian's commitment to excellence is unmatched. They consistently go the extra mile to ensure our needs are met and exceeded, providing reliable support and high-quality service every step of the way.",
    company_logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/bayer.svg",
    name: "Bayer"
  },
  {
    review: "Choosing Accredian for the learning & development of our employees was a beneficial decision. The value derived from the course is immense & their support team is always there to help our employees.",
    company_logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/rel.png",
    name: "Reliance"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const cards = gsap.utils.toArray(".testimonial-card", cardsRef.current);
    
    cards.forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-32 bg-[#F8FAFC] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:flex lg:gap-20 xl:gap-32">
        
        {/* Left Side: Sticky Headers (Awwwards Style) */}
        <div className="lg:w-1/3 mb-16 lg:mb-0 relative">
          <div className="lg:sticky lg:top-[30vh]">
            
            {/* Massive Background Decorative Quote */}
            <div className="absolute -top-20 -left-10 text-[250px] text-[#4F46E5]/[0.03] font-serif leading-none select-none pointer-events-none z-0">
              "
            </div>

            <div className="relative z-10">
              <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[#4F46E5] bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                Testimonials from Our Partners
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] leading-[1.1] tracking-tight">
                <RevealText text="What Our Clients Are Saying" duration={0.6} stagger={0.02} />
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-[#1E293B] mb-6 leading-tight max-w-sm">
                <RevealText text="Trusted by industry leaders to deliver exceptional enterprise learning outcomes." delay={0.1} duration={0.6} stagger={0.02} />
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                <span className="inline-block relative">
                  <span className="absolute -left-2 top-0 text-slate-300 text-3xl font-serif">"</span>
                  <RevealText text="Our corporate training solutions are designed to bridge skill gaps and empower your workforce. Partnering with top-tier organizations, we ensure that every learning journey translates directly into measurable business impact." delay={0.2} duration={0.6} stagger={0.015} />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Testimonial Cards Stack */}
        <div ref={cardsRef} className="lg:w-2/3 flex flex-col gap-8 md:gap-12 pt-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card relative bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 will-change-transform transform-gpu"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)"
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-10 right-10 opacity-10">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L16.411 14.205C16.634 13.567 16.75 12.923 16.75 12.28C16.75 10.428 15.657 9 13.57 9C13.25 9 12.94 9.04 12.648 9.117C12.99 7.027 14.887 5.767 17.514 5.378L18 5.302V2L17.5 2.03C13.064 2.27 10.36 4.707 9.874 8.783L9.816 9.387L9.23 9.418C8.583 9.452 8 9.948 8 10.584C8 11.238 8.528 11.75 9.176 11.75C9.75 11.75 10.158 12.019 10.395 12.518C10.744 13.25 10.73 14.475 10.354 16.143L9.932 18H14.017ZM5.017 21L7.411 14.205C7.634 13.567 7.75 12.923 7.75 12.28C7.75 10.428 6.657 9 4.57 9C4.25 9 3.94 9.04 3.648 9.117C3.99 7.027 5.887 5.767 8.514 5.378L9 5.302V2L8.5 2.03C4.064 2.27 1.36 4.707 0.874 8.783L0.816 9.387L0.23 9.418C-0.417 9.452 -1 9.948 -1 10.584C-1 11.238 -0.472 11.75 0.176 11.75C0.75 11.75 1.158 12.019 1.395 12.518C1.744 13.25 1.73 14.475 1.354 16.143L0.932 18H5.017Z" />
                </svg>
              </div>

              {/* Company Logo */}
              <div className="h-12 mb-8 flex items-center">
                <img 
                  src={testimonial.company_logo} 
                  alt={testimonial.name} 
                  className="h-10 w-auto object-contain mix-blend-multiply"
                  style={{ filter: "grayscale(100%) brightness(0.6) contrast(1.2)" }}
                />
              </div>

              {/* Review */}
              <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-serif mb-8">
                "{testimonial.review}"
              </p>

              {/* Name indicator */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-[2px] bg-[#4F46E5]"></div>
                <span className="font-bold text-[#0F172A] tracking-wider uppercase text-sm">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
