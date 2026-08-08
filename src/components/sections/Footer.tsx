"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    // 1. Footer Entrance Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".footer-col",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    ).fromTo(
      ".footer-bottom",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // 2. Continuous Floating Animation for ACCREDIAN
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -15,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full bg-[#0F172A] pt-24 pb-10 px-8 md:px-16 text-[#F9F6F0] overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row justify-between gap-20 xl:gap-12">
        
        {/* Left Side: Massive Logo */}
        <div className="footer-col xl:w-2/5 flex-shrink-0 flex flex-col justify-center">
          <h2 
            ref={logoRef}
            className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tighter uppercase break-words will-change-transform"
          >
            ACCREDIAN
          </h2>
        </div>
        
        {/* Right Side: Links Grid */}
        <div className="xl:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          
          {/* Col 1 — Navigation (from the site's nav menu) */}
          <div className="footer-col flex flex-col">
            <h4 className="font-bold text-sm tracking-tight mb-7">Navigation</h4>
            <div className="flex flex-col gap-5 font-serif text-[17px] opacity-90" style={{ fontFamily: "'Georgia', serif" }}>
              <a href="#" className="hover:opacity-60 transition-opacity">Home</a>
              <a href="#clients" className="hover:opacity-60 transition-opacity">Clients</a>
              <a href="#accredianEdge" className="hover:opacity-60 transition-opacity">Accredian Edge</a>
              <a href="#cat" className="hover:opacity-60 transition-opacity">CAT Framework</a>
              <a href="#howItWorks" className="hover:opacity-60 transition-opacity">How It Works</a>
            </div>
          </div>
          
          {/* Col 2 — More */}
          <div className="footer-col flex flex-col">
            <h4 className="font-bold text-sm tracking-tight mb-7">More</h4>
            <div className="flex flex-col gap-5 font-serif text-[17px] opacity-90" style={{ fontFamily: "'Georgia', serif" }}>
              <a href="#faqs" className="hover:opacity-60 transition-opacity">FAQs</a>
              <a href="#testimonials" className="hover:opacity-60 transition-opacity">Testimonials</a>
              <a href="#stats" className="hover:opacity-60 transition-opacity">Our Impact</a>
              <a href="https://accredian.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Accredian.com ↗</a>
            </div>
          </div>
          
          {/* Col 3 — Contact */}
          <div className="footer-col flex flex-col">
            <h4 className="font-bold text-sm tracking-tight mb-7">Contact</h4>
            <div className="flex flex-col gap-5 font-serif text-[17px] opacity-90" style={{ fontFamily: "'Georgia', serif" }}>
              <a href="mailto:enterprise@accredian.com" className="hover:opacity-60 transition-opacity">enterprise@accredian.com</a>
              <a href="https://accredian.com/contact-us" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Contact Us ↗</a>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* ── Bottom Bar ── */}
      <div className="footer-bottom max-w-[1600px] mx-auto mt-32 flex flex-col-reverse md:flex-row items-center justify-between text-[11px] sm:text-xs font-semibold tracking-wide gap-8">
        
        {/* Left: Copyright & Legal */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-8 w-full md:w-auto">
          <span>©2026 Accredian</span>
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="https://accredian.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
            <a href="https://accredian.com/term-condition" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Terms of Use</a>
          </div>
        </div>
        
        {/* Right: Real Social Icons from enterprise.accredian.com */}
        <div className="flex items-center justify-center md:justify-end gap-6 w-full md:w-auto">
          <a href="https://facebook.com/accredianlearn" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://twitter.com/accredianedu" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.813l4.263 5.638 5.918-5.638ZM17.083 20.027h1.835L6.996 4.13H5.026l12.057 15.897Z"/></svg>
          </a>
          <a href="https://www.instagram.com/accredian_edu" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/accredianedu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCE0L_4ADPU2iyKnDJ0xRzyA" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-70 transition-opacity">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
