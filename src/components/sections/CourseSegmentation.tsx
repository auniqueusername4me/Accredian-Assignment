"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "../ui/RevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const segments = [
  {
    title: "Program Specific",
    tag: "Case Study 01",
    description: "Certificate, Executive, Post Graduate Certificate",
    image: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/project-management-v2.webp",
    caseStudy: {
      client: "Consulting Sector",
      industry: "Management Consulting",
      overview: "Organizations operating across consulting disciplines require credential pathways that reflect genuine seniority. A tiered program structure — Certificate, Executive, Post Graduate Certificate — allows each professional to enter at the right level and progress at a pace that respects their existing expertise.",
      approach: "We design program-specific curricula that map directly to organizational hierarchies. Content depth, case complexity, and project requirements scale with the credential level — ensuring that a C-suite executive is never in a classroom built for an analyst.",
      tags: ["Tiered Credentialing", "Role-Aligned Learning", "Flexible Pacing", "Verified Outcomes"]
    }
  },
  {
    title: "Industry Specific",
    tag: "Case Study 02",
    description: "IT, Healthcare, Retail, Finance, Education, Manufacturing",
    image: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/digital-transformation-v2.webp",
    caseStudy: {
      client: "Cross-Sector Enterprises",
      industry: "Healthcare, Finance, Retail & More",
      overview: "Generic training fails industries with high compliance demands, domain-specific terminology, and regulated workflows. Healthcare teams cannot learn data ethics from a module written for e-commerce. Finance teams need risk frameworks baked into every lesson.",
      approach: "Every Accredian industry track is built ground-up for that sector. Regulatory context, domain vocabulary, and real industry challenges are embedded at the content layer — not as an afterthought. The result is training that feels native to your team's daily reality.",
      tags: ["Industry-Native Content", "Regulatory Context", "Domain Vocabulary", "Sector Case Studies"]
    }
  },
  {
    title: "Topic Specific",
    tag: "Case Study 03",
    description: "Machine Learning, Design, Analytics, Cybersecurity, Cloud",
    image: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/data-science-v2.webp",
    caseStudy: {
      client: "Technology Teams",
      industry: "Tech, Product & Engineering",
      overview: "When a team has a specific technical gap — an engineering team that needs ML depth, a product team that needs design systems fluency — a broad program wastes time and budget. Topic-specific tracks go deep on exactly what's needed, nothing more.",
      approach: "We isolate the precise skill gap and build a focused curriculum around it. Sprint-based delivery keeps the content intense and applied. Teams learn by doing — through live labs, peer review, and real tooling — not through slide decks.",
      tags: ["Precision Upskilling", "Sprint-Based Delivery", "Live Labs", "Applied Tooling"]
    }
  },
  {
    title: "Level Specific",
    tag: "Case Study 04",
    description: "Senior Leadership, Mid-Career Professionals, Freshers",
    image: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/senior-management-v2.webp",
    caseStudy: {
      client: "Large Enterprises",
      industry: "Consumer Goods, FMCG, Conglomerates",
      overview: "Large organizations face a layered learning challenge: the strategic thinking a VP needs is fundamentally different from the foundational knowledge a fresher requires. One-size-fits-all training consistently fails both ends of the spectrum.",
      approach: "Accredian builds parallel, level-calibrated tracks that run simultaneously across the organization. Senior cohorts work through strategic frameworks and leadership simulations while junior cohorts build business fundamentals — all sharing a common organizational vocabulary.",
      tags: ["Level Calibration", "Parallel Cohorts", "Strategic + Foundational", "Shared Vocabulary"]
    }
  }
];

export default function CourseSegmentation() {
  const containerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState<typeof segments[0] | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray(".segment-card", containerRef.current);
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" }
        }
      );
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (activeSegment) {
      document.documentElement.style.overflow = "hidden";
      if (panelRef.current) {
        gsap.fromTo(panelRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.65, ease: "power4.out" }
        );
      }
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [activeSegment]);

  const closePanel = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      x: "100%", duration: 0.45, ease: "power3.in",
      onComplete: () => setActiveSegment(null)
    });
  };

  return (
    <>
      <section ref={containerRef} className="relative w-full py-32 bg-[#F9F6F0] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="mb-20">
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.2em] uppercase text-[#4F46E5] bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
              Tailored Course Segmentation
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] leading-[1.05] tracking-tight max-w-3xl">
              <RevealText text="Every learner deserves a curriculum built for them." duration={0.6} stagger={0.02} />
            </h2>
            <p className="mt-6 text-lg text-slate-500 max-w-xl">
              <RevealText text="From the C-suite to the classroom — four segmentation pillars ensure precision fit at every level of your organization." delay={0.1} duration={0.6} stagger={0.02} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map((seg, i) => (
              <div
                key={i}
                className="segment-card group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ minHeight: "400px" }}
                onClick={() => setActiveSegment(seg)}
              >
                <img src={seg.image} alt={seg.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <span className="text-[#4F46E5] text-xs font-bold tracking-[0.2em] uppercase mb-2">{seg.tag}</span>
                  <h3 className="text-3xl font-black text-white mb-2 leading-tight">{seg.title}</h3>
                  <p className="text-slate-300 text-sm mb-5">{seg.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/50 group-hover:text-white transition-colors duration-300">
                    <span>Read Overview</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study Panel — exactly viewport height, no scroll ── */}
      {activeSegment && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
            onClick={closePanel}
          />

          {/* Panel — fixed to screen height, no overflow */}
          <div
            ref={panelRef}
            className="fixed top-0 right-0 z-[70] bg-white flex flex-col"
            style={{ width: "min(680px, 100vw)", height: "100vh", transform: "translateX(100%)" }}
          >
            {/* Hero image — fixed height */}
            <div className="relative shrink-0 overflow-hidden" style={{ height: "220px" }}>
              <img src={activeSegment.image} alt={activeSegment.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />

              <button
                onClick={closePanel}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="absolute bottom-5 left-7 right-7">
                <span className="text-[#4F46E5] text-xs font-bold tracking-[0.2em] uppercase">{activeSegment.tag}</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mt-1 leading-tight">{activeSegment.title}</h2>
              </div>
            </div>

            {/* Body — fills remaining height with no overflow */}
            <div className="flex-1 px-8 md:px-10 py-8 flex flex-col gap-6 overflow-hidden">

              {/* Meta */}
              <div className="flex items-center gap-6 pb-5 border-b border-slate-100 shrink-0">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sector</span>
                  <p className="text-[#0F172A] font-bold text-sm mt-0.5">{activeSegment.caseStudy.client}</p>
                </div>
                <div className="w-px h-7 bg-slate-200" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Industry</span>
                  <p className="text-[#0F172A] font-bold text-sm mt-0.5">{activeSegment.caseStudy.industry}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 shrink-0">
                {activeSegment.caseStudy.tags.map((t, i) => (
                  <span key={i} className="text-xs font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Overview</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{activeSegment.caseStudy.overview}</p>
              </div>

              {/* Approach — dark block, fills rest of space */}
              <div className="bg-[#0F172A] rounded-2xl p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-400">Accredian's Approach</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">{activeSegment.caseStudy.approach}</p>
                </div>
                <p className="text-slate-600 text-xs mt-4">Click backdrop to close</p>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}
