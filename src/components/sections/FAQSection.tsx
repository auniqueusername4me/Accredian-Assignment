"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import RevealText from '@/components/ui/RevealText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "What types of corporate training programs does Accredian offer?",
    answer: "Accredian provides industry-specific, customizable training programs tailored to meet your organization's unique needs, covering domains like leadership, tech, data, and fintech."
  },
  {
    question: "What domain specializations are available?",
    answer: "We offer expertise in various domains, including Leadership Development, Tech & Data, Fintech, Digital Business, Product Innovation, Operations Management, and Generative AI."
  },
  {
    question: "Can the courses be customized for specific industries or teams?",
    answer: "Absolutely! Our programs are fully customizable, including content, format, timing, and industry-specific focus, to align with your organization’s goals."
  },
  {
    question: "Who are the instructors for these programs?",
    answer: "Our courses are delivered by industry leaders, experienced mentors, and domain experts with real-world insights."
  },
  {
    question: "What formats are the programs delivered in?",
    answer: "Programs can be delivered in various formats, including online, offline, hybrid, and on-demand, based on your team's preferences and requirements."
  },
  {
    question: "What is the ideal team size for corporate training?",
    answer: "Our programs are flexible and can cater to teams of any size, from small groups to large organizational cohorts."
  },
  {
    question: "How do we get started with Accredian?",
    answer: "Get started with Accredian by contacting us or requesting a quote on our website. Our team will guide you through the process—from skill gap analysis to a custom program tailored to your needs."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: sectionRef });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 bg-white overflow-hidden flex flex-col items-center border-b border-slate-200"
    >
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[#0B3D91] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            Support & Clarification
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">
            <RevealText text="Frequently Asked Questions" duration={0.6} stagger={0.02} />
          </h2>
          <div className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            <RevealText text="Everything you need to know about partnering with Accredian Enterprise." className="justify-center" delay={0.1} duration={0.6} stagger={0.02} />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div ref={containerRef} className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`group cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? "bg-white border-[#0B3D91]/20 shadow-[0_8px_30px_rgba(11,61,145,0.08)]" 
                    : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                }`}
              >
                {/* Question */}
                <div className="flex justify-between items-center p-6 md:p-8">
                  <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 pr-8 ${
                    isOpen ? "text-[#0B3D91]" : "text-[#0F172A] group-hover:text-[#0B3D91]"
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${
                    isOpen ? "bg-[#0B3D91] rotate-180" : "bg-slate-200 group-hover:bg-slate-300"
                  }`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={isOpen ? "text-white" : "text-slate-600"}>
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Answer (Animated via max-height) */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed px-6 md:px-8 pb-6 md:pb-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
