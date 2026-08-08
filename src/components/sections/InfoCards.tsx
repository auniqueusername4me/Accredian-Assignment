"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    title: "10,000+ Professionals",
    desc: "Our programs have transformed careers across industries. From junior engineers to senior leaders, we build skills that matter.",
  },
  {
    title: "Enterprise Training",
    desc: "We work directly with L&D teams to design curriculum that closes skill gaps and drives measurable ROI.",
  },
  {
    title: "Our Specialties",
    desc: "From AI & ML to Cloud Infrastructure and Data Engineering — learn from top-tier instructors from leading companies.",
  },
  {
    title: "Take a Virtual Tour",
    desc: "Explore our live sessions, mentor network, and learning platform. See what 200+ sessions look like.",
  },
];

export default function InfoCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardsRef.current) return;

    const cardEls = cardsRef.current.querySelectorAll<HTMLElement>(".info-card");

    // Each card rises from the bottom, one after another
    gsap.fromTo(
      cardEls,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.18,           // 0.18s gap between each card
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",      // fires as soon as section enters view
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    /* No negative margin — cards start right below the hero */
    <div
      ref={sectionRef}
      className="w-full bg-[#F5EFE6] py-16 px-4 md:px-8 lg:px-14"
    >
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="info-card flex flex-col justify-between rounded-2xl p-6 min-h-[220px] will-change-transform bg-[#EEE4D6]"
            style={{
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            {/* Text content */}
            <div>
              <h3
                className="text-[#2C1810] text-xl font-semibold leading-snug mb-3"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {card.title}
              </h3>
              <p className="text-[#5C4033] text-sm leading-relaxed font-light">
                {card.desc}
              </p>
            </div>

            {/* Terracotta arrow button */}
            <div className="mt-6">
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm transition-transform hover:scale-110 active:scale-95"
                style={{ background: "#A0522D" }}
                aria-label={`Learn more about ${card.title}`}
              >
                ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
