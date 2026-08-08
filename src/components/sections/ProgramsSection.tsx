"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const programsData = [
  {
    id: "data-science",
    heading: "Data Science & AI Leadership",
    subheading: "Equip your engineering teams with advanced analytics capabilities and generative AI expertise.",
    list: ["Foundations", "Machine Learning", "Deep Learning", "AI Strategy"],
    slides: [
      {
        title: "Foundations",
        badge: "01 / Module",
        desc: "Core statistics, Python programming, and data wrangling for enterprise datasets.",
        logos: ["Amazon", "Google", "Microsoft"],
        stats: "100% Core Mastery",
      },
      {
        title: "Machine Learning",
        badge: "02 / Module",
        desc: "Predictive modeling, classification, and classical ML applied to business problems.",
        logos: ["TCS", "Accenture", "Meta"],
        stats: "Production Ready",
      },
      {
        title: "Deep Learning",
        badge: "03 / Module",
        desc: "Neural networks, natural language processing, and computer vision foundations.",
        logos: ["Amazon", "Microsoft", "TCS"],
        stats: "Advanced Tier",
      },
      {
        title: "AI Strategy",
        badge: "04 / Module",
        desc: "Deploying and managing AI solutions at enterprise scale with governance.",
        logos: ["Google", "Meta", "Accenture"],
        stats: "Executive Focus",
      }
    ]
  },
  {
    id: "product-management",
    heading: "Product Management Excellence",
    subheading: "Transform your product teams to build scalable solutions that drive enterprise growth.",
    list: ["Ideation", "Strategy", "Execution", "Scaling"],
    slides: [
      {
        title: "Ideation",
        badge: "01 / Phase",
        desc: "Identifying market needs, user research, and validating enterprise problems.",
        logos: ["Google", "Meta", "Amazon"],
        stats: "Customer Centric",
      },
      {
        title: "Strategy",
        badge: "02 / Phase",
        desc: "Roadmapping, feature prioritization, and aligning with corporate OKRs.",
        logos: ["Microsoft", "Accenture", "TCS"],
        stats: "Strategic Alignment",
      },
      {
        title: "Execution",
        badge: "03 / Phase",
        desc: "Agile delivery, sprint planning, and cross-functional team leadership.",
        logos: ["Amazon", "TCS", "Meta"],
        stats: "Fast Delivery",
      },
      {
        title: "Scaling",
        badge: "04 / Phase",
        desc: "Growth loops, market expansion, and enterprise lifecycle management.",
        logos: ["Google", "Microsoft", "Accenture"],
        stats: "Exponential Growth",
      }
    ]
  }
];

export default function ProgramsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const pinSections = gsap.utils.toArray<HTMLElement>(".pin-section", containerRef.current);
    const lists = gsap.utils.toArray<HTMLElement>(".program-list", containerRef.current);

    pinSections.forEach((section, i) => {
      const list = lists[i];
      const fill = section.querySelector(".fill") as HTMLElement;
      const listItems = gsap.utils.toArray<HTMLElement>("li", list);
      const slides = gsap.utils.toArray<HTMLElement>(".slide", section);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + listItems.length * 70 + "%",
          pin: true,
          scrub: 1,
          id: `pin-${i}`,
        }
      });

      if (fill) {
        gsap.set(fill, { scaleY: 0 });
      }

      listItems.forEach((item, j) => {
        if (listItems[j - 1]) {
          tl.set(item, { color: "#0B3D91", opacity: 1 }, 0.5 * j)
            .to(
              slides[j],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.2
              },
              "<"
            )
            .set(listItems[j - 1], { color: "#94A3B8", opacity: 0.5 }, "<")
            .to(
              slides[j - 1],
              {
                autoAlpha: 0,
                y: -20,
                duration: 0.2
              },
              "<"
            );
        } else {
          tl.set(item, { color: "#0B3D91", opacity: 1 }, 0.01).to(
            slides[j],
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.2
            },
            "<"
          );
        }
      });

      tl.to({}, {}).to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration() - 0.5
        },
        0
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-[#F8FAFC]">
      {programsData.map((program) => (
        <section key={program.id} className="pin-section relative w-full h-screen flex flex-col justify-center items-center overflow-hidden py-12 px-6 lg:px-16 border-t border-slate-200 bg-[#F8FAFC]">
          
          {/* Section Header */}
          <div className="w-full max-w-6xl mx-auto mb-10 text-center lg:text-left">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {program.heading}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              {program.subheading}
            </p>
          </div>

          <div className="content w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
            
            {/* Left List */}
            <div className="lg:w-5/12 relative pl-6 flex flex-col justify-center space-y-6">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-slate-200 rounded-full overflow-hidden">
                <div className="fill w-full h-full bg-[#0B3D91] rounded-full will-change-transform" />
              </div>

              <ul className="program-list m-0 p-0 list-none">
                {program.list.map((listItem, lIndex) => (
                  <li 
                    key={lIndex} 
                    className="text-xl md:text-2xl font-bold leading-tight py-4 text-[#94A3B8] opacity-50 transition-all duration-300"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Slides */}
            <div className="right lg:w-7/12 relative h-[360px] md:h-[400px] w-full">
              {program.slides.map((slide, sIndex) => (
                <div
                  key={sIndex}
                  className="slide absolute inset-0 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl bg-white border border-slate-100 opacity-0 invisible translate-y-5"
                  style={{ boxShadow: "0 20px 50px rgba(11, 61, 145, 0.08)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-wider uppercase bg-[#F5F8FC] text-[#0B3D91] px-3 py-1 rounded-md border border-[#DCEBFF]">
                        {slide.badge}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        {slide.stats}
                      </span>
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                      {slide.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
                      Relevant For Teams At
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      {slide.logos.map((logo, lIdx) => (
                        <span
                          key={lIdx}
                          className="px-3.5 py-1.5 bg-[#F5F8FC] text-slate-700 font-semibold text-xs rounded-lg border border-slate-200/80"
                        >
                          {logo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}
