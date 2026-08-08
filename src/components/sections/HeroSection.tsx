"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const drawerLinks = [
  { label: "Solutions",           href: "#features",      featured: false },
  { label: "Curriculum",          href: "#cat-framework", featured: false },
  { label: "Enterprise Programs", href: "#programs",      featured: true  },
  { label: "Impact",              href: "#stats",         featured: false },
  { label: "Partnerships",        href: "#partners",      featured: false },
  { label: "Guides",              href: "#guides",        featured: false },
  { label: "Resources",           href: "#resources",     featured: false },
  { label: "Contact Us",          href: "#footer",        featured: false },
];

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
          <span 
            className="hero-word inline-block translate-y-[120%] rotate-2 will-change-transform origin-top-left"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

interface HeroSectionProps {
  onBookDemoClick?: () => void;
}

export default function HeroSection({ onBookDemoClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ─── Headline Entrance Animation (Cinematic Reveal) ──────────── */
  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Parallax background scale-in
    if (bgRef.current) {
      tl.fromTo(bgRef.current,
        { scale: 1.1, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.8, ease: "power3.out" }
      );
    }

    // 1. Navbar pops out from the top
    if (navRef.current) {
      tl.fromTo(navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1.4"
      );

      // 2. Text animation for herobar items
      const navItems = gsap.utils.toArray(".nav-anim", navRef.current);
      tl.fromTo(navItems,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 },
        "-=1.0"
      );
    }

    // 3. Animate words staggered with masked slide-up
    const words = gsap.utils.toArray(".hero-word", heroRef.current);
    tl.to(words, {
      y: '0%',
      rotateZ: 0,
      duration: 1.4,
      stagger: 0.04,
    }, "-=1.0");

    // Fade in buttons and glow
    tl.fromTo(
      ".hero-fade-in",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // Subtle breathing animation for the background glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, { scope: heroRef });

  /* ─── Drawer Animations ─────────────────────────────────────────── */
  const openDrawer = () => {
    setMenuOpen(true);
    gsap.fromTo(
      drawerRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.55, ease: "power3.out" }
    );
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 }
    );
    if (drawerRef.current) {
      const links = drawerRef.current.querySelectorAll(".nav-link");
      gsap.fromTo(
        links,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, delay: 0.2, ease: "power2.out" }
      );
    }
  };

  const closeDrawer = () => {
    gsap.to(drawerRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setMenuOpen(false),
    });
  };

  return (
    <div ref={heroRef} className="relative w-full min-h-screen bg-[#F9F6F0] overflow-hidden flex flex-col">
      {/* ── Soft Glow Background Effect ── */}
      <div 
        ref={glowRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          background: "radial-gradient(circle at 30% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(0, 255, 255, 0.3) 0%, transparent 40%)",
          filter: "blur(60px)"
        }}
      />

      {/* ── NAV BAR (Minimalist Beige Theme) ── */}
      <nav ref={navRef} className="relative z-20 flex justify-between items-center px-8 md:px-16 py-8 w-full invisible-on-load">
        {/* Logo */}
        <div className="flex items-center select-none nav-anim">
          <span className="text-[#1a1a1a] text-3xl md:text-[2.5rem] font-black tracking-tighter uppercase leading-none">
            Accredian
          </span>
        </div>

        {/* Center/Right Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: "Solutions", hasDropdown: true },
            { label: "Curriculum", hasDropdown: true },
            { label: "Programs", hasDropdown: true },
            { label: "Portfolio", hasDropdown: false },
            { label: "Resources", hasDropdown: true },
          ].map((link, idx) => (
            <div key={idx} className="flex items-center gap-1.5 cursor-pointer group nav-anim">
              <span className="text-[15px] font-semibold text-[#1a1a1a] hover:opacity-70 transition-opacity">
                {link.label}
              </span>
              {link.hasDropdown && (
                <span className="text-[17px] font-medium text-[#1a1a1a] group-hover:opacity-70 transition-opacity leading-none pb-0.5">
                  +
                </span>
              )}
            </div>
          ))}
          
          <button
            onClick={onBookDemoClick}
            className="ml-2 px-8 py-3 bg-[#D6E68A] text-[#1a1a1a] rounded-full text-[15px] font-bold tracking-wide hover:bg-[#c9da7b] transition-colors nav-anim"
          >
            Get Started
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={openDrawer}
          className="flex flex-col justify-center gap-[5px] p-2 lg:hidden"
          aria-label="Open navigation"
        >
          <span className="block w-6 h-[2px] bg-[#1a1a1a]" />
          <span className="block w-6 h-[2px] bg-[#1a1a1a]" />
          <span className="block w-6 h-[2px] bg-[#1a1a1a]" />
        </button>
      </nav>

      {/* ── CENTERED HERO CONTENT ── */}
      <div ref={bgRef} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
        
        {/* Top Tagline */}
        <div className="hero-fade-in opacity-0 translate-y-6 mb-4 text-[#4F46E5] font-semibold tracking-widest uppercase text-sm">
          Accredian Enterprise Learning
        </div>

        {/* Massive Title */}
        <h1 
          className="text-[#0F172A] font-black leading-tight mb-8"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "-0.04em",
          }}
        >
          <AnimatedText text="Upskill Your Workforce." className="justify-center" />
        </h1>

        {/* Subtitle / Caption — exact copy from enterprise.accredian.com */}
        <div className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          <AnimatedText text="Cultivate high-performance teams through expert learning." className="justify-center" />
        </div>

        {/* CTA Button with Glow (hero-fade-in) */}
        <div className="hero-fade-in opacity-0">
          <button 
            onClick={onBookDemoClick}
            className="relative px-10 py-4 rounded-full text-white font-bold text-lg tracking-wide shadow-2xl transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
            }}
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* ════ FULL-PANEL RIGHT DRAWER (Mobile/Hamburger Menu) ════ */}
      {menuOpen && (
        <div
          ref={backdropRef}
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          style={{ opacity: 0 }}
        />
      )}

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full z-40 flex flex-col bg-white border-l border-slate-100"
        style={{
          width: "clamp(280px, 40vw, 500px)",
          transform: "translateX(100%)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <button
            onClick={closeDrawer}
            className="text-slate-400 hover:text-black transition-colors text-xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
          <button
            onClick={() => { closeDrawer(); setTimeout(() => onBookDemoClick?.(), 400); }}
            className="text-[11px] font-bold tracking-widest text-[#0F172A] hover:text-black uppercase transition-colors"
          >
            Join Now
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-1 overflow-y-auto">
          {drawerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeDrawer}
              className="nav-link group flex items-center justify-end gap-4 py-4 border-b border-slate-50 last:border-0"
              style={{ opacity: 0 }}
            >
              {link.featured && (
                <span className="text-[#4F46E5] text-base flex-shrink-0">↗</span>
              )}
              <span
                className={`text-right text-2xl md:text-[1.65rem] tracking-tight transition-colors duration-200 leading-snug ${
                  link.featured
                    ? "font-bold text-[#4F46E5]"
                    : "font-medium text-slate-400 group-hover:text-black"
                }`}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
