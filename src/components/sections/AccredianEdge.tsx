"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const edgeItems = [
  {
    title: "Tailored Solutions",
    desc: "Programs customized to your organization's goals and challenges.",
    logos: [
      { name: "Amazon", domain: "amazon.com" }, 
      { name: "Google", domain: "google.com" }
    ],
  },
  {
    title: "Innovative Framework",
    desc: "Proprietary methods for impactful, application-driven results.",
    logos: [
      { name: "Microsoft", domain: "microsoft.com" }, 
      { name: "IBM", domain: "ibm.com" }
    ],
  },
  {
    title: "Diverse Offerings",
    desc: "Courses across industries, skill levels, and emerging fields.",
    logos: [
      { name: "TCS", domain: "tcs.com" }, 
      { name: "Accenture", domain: "accenture.com" }
    ],
  },
  {
    title: "Flexible Delivery",
    desc: "Online and offline options tailored to your needs.",
    logos: [
      { name: "Apple", domain: "apple.com" }, 
      { name: "Netflix", domain: "netflix.com" }
    ],
  },
  {
    title: "Expert Guidance",
    desc: "Learn from industry leaders with real-world success.",
    logos: [
      { name: "Meta", domain: "meta.com" }, 
      { name: "Spotify", domain: "spotify.com" }
    ],
  },
  {
    title: "Advanced Technology",
    desc: "State-of-the-art LMS for seamless learning experiences.",
    logos: [
      { name: "Oracle", domain: "oracle.com" }, 
      { name: "SAP", domain: "sap.com" }
    ],
  },
  {
    title: "Proven Impact",
    desc: "Trusted by leading organizations for measurable ROI.",
    logos: [
      { name: "Tesla", domain: "tesla.com" }, 
      { name: "Adobe", domain: "adobe.com" }
    ],
  }
];

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word opacity-0 translate-y-6 inline-block">
          {word}
        </span>
      ))}
    </span>
  );
};

export default function AccredianEdge() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate words in the header (Scatter/Stagger effect)
    if (headerRef.current) {
      const words = gsap.utils.toArray(".word", headerRef.current);
      gsap.to(words, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.5)",
      });
    }

    const pinSection = sectionRef.current.querySelector(".pin-section");
    const listItems = gsap.utils.toArray<HTMLElement>(".edge-list-item", sectionRef.current);
    const slides = gsap.utils.toArray<HTMLElement>(".edge-slide", sectionRef.current);
    const fill = sectionRef.current.querySelector(".fill") as HTMLElement;

    if (listItems.length === 0 || slides.length === 0 || !pinSection) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        start: "top top",
        end: "+=" + listItems.length * 60 + "%",
        pin: true,
        scrub: 1,
      },
    });

    if (fill) {
      gsap.set(fill, { scaleY: 0 });
    }

    // Set initial slides state
    slides.forEach((slide, idx) => {
      gsap.set(slide, { autoAlpha: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 30 });
    });

    // Set initial list item colors
    listItems.forEach((item, idx) => {
      gsap.set(item, { color: idx === 0 ? "#0B3D91" : "#94A3B8", opacity: idx === 0 ? 1 : 0.4 });
    });

    // Animate list items and slides sync (as per reference)
    listItems.forEach((item, j) => {
      if (j > 0) {
        tl.set(item, { color: "#0B3D91", opacity: 1 }, 0.5 * j)
          .to(
            slides[j],
            { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
            "<"
          )
          .set(listItems[j - 1], { color: "#94A3B8", opacity: 0.4 }, "<")
          .to(
            slides[j - 1],
            { autoAlpha: 0, y: -30, duration: 0.3, ease: "power2.out" },
            "<"
          );
      } else {
        tl.set(item, { color: "#0B3D91", opacity: 1 }, 0.01).to(
          slides[j],
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "<"
        );
      }
    });

    if (fill) {
      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration(),
        },
        0
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-[#F8FAFC]">
      
      {/* ── Heading and Text Below It (Animated via Scatter) ── */}
      <div ref={headerRef} className="w-full pt-32 pb-16 px-6 lg:px-16 flex flex-col items-center justify-center text-center">
        <span className="inline-block mb-6 text-sm font-semibold tracking-[0.25em] uppercase text-[#0B3D91] bg-[#DCEBFF] px-6 py-2.5 rounded-full word opacity-0 translate-y-6">
          The Accredian Edge
        </span>
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight mb-8 max-w-4xl" 
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <AnimatedText text="Empowering Enterprise Teams with Industry-Leading Expertise" className="justify-center" />
        </h2>
        <div className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed">
          <AnimatedText text="Our strategic training framework bridges the gap between theoretical knowledge and practical execution, partnering with the world's most innovative companies." className="justify-center" />
        </div>
      </div>

      {/* ── Logos Changing According to Scroll (Reference Layout) ── */}
      <div className="pin-section relative w-full h-screen flex flex-col justify-center items-center overflow-hidden py-12 px-6 lg:px-16 bg-[#F8FAFC]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Left Side: List & Vertical Progress Bar */}
          <div className="lg:col-span-5 relative pl-8 flex flex-col justify-center space-y-10">
            {/* Vertical Progress Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-200 rounded-full overflow-hidden">
              <div className="fill w-full h-full bg-[#0B3D91] rounded-full will-change-transform" />
            </div>

            {/* List Items */}
            {edgeItems.map((item, index) => (
              <div
                key={index}
                className="edge-list-item cursor-pointer transition-all duration-300 py-3"
              >
                <div
                  className="text-3xl md:text-4xl font-bold leading-tight mb-2"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {item.title}
                </div>
                <p className="text-lg font-medium opacity-80 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side: Slides Display (Logos changing according to scroll) */}
          <div className="lg:col-span-7 relative h-[450px] w-full">
            {edgeItems.map((item, index) => (
              <div
                key={index}
                className="edge-slide absolute inset-0 rounded-[2rem] p-10 flex flex-col justify-center items-center shadow-xl bg-white border border-slate-100"
                style={{
                  boxShadow: "0 20px 50px rgba(11, 61, 145, 0.08)",
                  background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)"
                }}
              >
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-12 text-center">
                  Trusted Partner Network
                </h3>
                
                {/* Logos Grid */}
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                  {item.logos.map((logo, lIdx) => (
                    <div 
                      key={lIdx} 
                      className="flex-1 min-w-[120px] aspect-video bg-[#F1F5F9] rounded-2xl flex items-center justify-center p-4 border border-slate-200"
                    >
                      <img 
                        src={`/logos/${logo.name.toLowerCase()}.svg`} 
                        alt={logo.name} 
                        className="h-10 md:h-12 max-w-full object-contain pointer-events-none"
                        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-xl md:text-2xl font-black text-[#0F172A] tracking-tight">${logo.name}</span>`}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
