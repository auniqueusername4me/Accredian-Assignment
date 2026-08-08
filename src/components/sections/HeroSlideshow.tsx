"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Warm, intimate, professional photos — swap with your own assets
const slides = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=90",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1920&q=90",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1920&q=90",
  "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=90",
];

const drawerLinks = [
  { label: "Solutions",          href: "#features",      featured: false },
  { label: "Curriculum",         href: "#cat-framework", featured: false },
  { label: "Enterprise Programs",href: "#programs",      featured: true  },
  { label: "Impact",             href: "#stats",         featured: false },
  { label: "Partnerships",       href: "#partners",      featured: false },
  { label: "Guides",             href: "#guides",        featured: false },
  { label: "Resources",          href: "#resources",     featured: false },
  { label: "Contact Us",         href: "#footer",        featured: false },
];

interface HeroSlideshowProps {
  onBookDemoClick?: () => void;
}

export default function HeroSlideshow({ onBookDemoClick }: HeroSlideshowProps) {
  const sectionRef   = useRef<HTMLElement>(null);
  const slidesRef    = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const drawerRef    = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const currentSlide = useRef(0);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const [dotIndex, setDotIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Init slides ────────────────────────────────────────────────
  useEffect(() => {
    if (!slidesRef.current) return;
    const els = Array.from(slidesRef.current.children) as HTMLElement[];
    els.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1 }));
  }, []);

  // ── Slide transition ───────────────────────────────────────────
  const goTo = useCallback((next: number) => {
    if (!slidesRef.current) return;
    const els    = Array.from(slidesRef.current.children) as HTMLElement[];
    const inEl   = els[next];
    const outEl  = els[currentSlide.current];

    gsap.set(inEl,  { opacity: 0, scale: 1.06, zIndex: 2 });
    gsap.set(outEl, { zIndex: 1 });
    gsap.to(inEl,  { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" });
    gsap.to(outEl, {
      opacity: 0, scale: 1.03, duration: 1.4, ease: "power2.out",
      onComplete: () => gsap.set(outEl, { zIndex: 0 }),
    });

    currentSlide.current = next;
    setDotIndex(next);
  }, []);

  // ── Auto-advance ───────────────────────────────────────────────
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo((currentSlide.current + 1) % slides.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [goTo]);

  const handleDot = (i: number) => {
    if (i === currentSlide.current) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    goTo(i);
    intervalRef.current = setInterval(() => {
      goTo((currentSlide.current + 1) % slides.length);
    }, 5000);
  };

  // ── Headline entrance ──────────────────────────────────────────
  useGSAP(() => {
    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.1, delay: 0.5, ease: "back.out(1.4)" }
    );
  }, { scope: sectionRef });

  // ── Full-panel Drawer (slides in from right) ───────────────────
  const openDrawer = () => {
    setMenuOpen(true);
    // Drawer panel slides in
    gsap.fromTo(drawerRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "power3.out" }
    );
    // Dark overlay fades in
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    );
    // Stagger nav links in
    if (drawerRef.current) {
      const links = drawerRef.current.querySelectorAll(".drawer-link");
      gsap.fromTo(links,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, delay: 0.25, ease: "power2.out" }
      );
    }
  };

  const closeDrawer = () => {
    gsap.to(drawerRef.current,  { x: "100%", duration: 0.45, ease: "power3.in" });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.35,
      onComplete: () => setMenuOpen(false),
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* ── Background Slides ──────────────────────────────────── */}
      <div ref={slidesRef} className="absolute inset-0 z-0">
        {slides.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-center bg-cover bg-no-repeat will-change-transform"
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </div>

      {/* ── Subtle bottom gradient for headline legibility ─────── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

      {/* ── Nav bar ───────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-10 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2C14 2 5 8 5 16C5 20.4 9.1 24 14 24C18.9 24 23 20.4 23 16C23 8 14 2 14 2Z"
              stroke="white" strokeWidth="1.5" fill="none"
            />
            <circle cx="14" cy="16" r="3" fill="white" />
          </svg>
          <span className="text-white text-[15px] font-semibold tracking-[0.15em] uppercase">
            Accredian Enterprise
          </span>
        </div>

        {/* Right: pill + hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBookDemoClick}
            className="hidden sm:inline-flex px-5 py-2.5 bg-white text-slate-900 rounded-full text-[13px] font-semibold tracking-wide hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            BOOK AN APPOINTMENT
          </button>

          {/* 3-line hamburger — plain, no circle */}
          <button
            onClick={openDrawer}
            className="flex flex-col justify-center gap-[5px] p-1"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-white" />
            <span className="block w-6 h-[1.5px] bg-white" />
            <span className="block w-6 h-[1.5px] bg-white" />
          </button>
        </div>
      </nav>

      {/* ── Headline (bottom-center) ──────────────────────────── */}
      <div className="relative z-10 h-full flex items-center justify-center px-8 md:px-14">
        <h1
          ref={headlineRef}
          className="opacity-0 text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] text-center max-w-3xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.22)" }}
        >
          Because learning<br />
          should always feel{" "}
          <em className="font-light" style={{ fontStyle: "italic", fontWeight: 300 }}>
            personal
          </em>
        </h1>
      </div>

      {/* ── Slide Dots (bottom-right pill style) ─────────────── */}
      <div className="absolute bottom-8 right-10 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === dotIndex
                ? "w-6 h-[5px] bg-white"
                : "w-[5px] h-[5px] bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════
          FULL-HEIGHT RIGHT PANEL DRAWER
      ═══════════════════════════════════════════════════════════ */}

      {/* Dark overlay behind drawer */}
      {menuOpen && (
        <div
          ref={overlayRef}
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/30 z-30"
          style={{ opacity: 0 }}
        />
      )}

      {/* The drawer panel itself */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full z-40 flex flex-col"
        style={{
          width: "clamp(300px, 42vw, 520px)",
          background: "#FAF7F3",         /* warm cream — matches Namaha */
          transform: "translateX(100%)", /* starts off-screen */
        }}
      >
        {/* Drawer top bar */}
        <div className="flex items-center justify-between px-8 py-6">
          {/* ✕ close */}
          <button
            onClick={closeDrawer}
            className="text-slate-500 hover:text-slate-800 transition-colors text-xl leading-none font-light"
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* "BOOK AN APPOINTMENT" text link — top-right of drawer */}
          <button
            onClick={() => { closeDrawer(); setTimeout(() => onBookDemoClick?.(), 400); }}
            className="text-[11px] font-semibold tracking-widest text-slate-600 hover:text-slate-900 transition-colors uppercase"
          >
            Book an Appointment
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 mx-8" />

        {/* Nav links — right-aligned, large serif-style */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1 overflow-y-auto">
          {drawerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeDrawer}
              className="drawer-link group flex items-center justify-end gap-4 py-4 border-b border-slate-100 last:border-0"
              style={{ opacity: 0 }} /* GSAP will animate this in */
            >
              {/* Arrow icon for featured link */}
              {link.featured && (
                <span className="text-[#A0522D] text-base mt-0.5 flex-shrink-0">↗</span>
              )}

              <span
                className={`text-right text-2xl md:text-3xl font-light tracking-tight transition-colors duration-200 leading-snug ${
                  link.featured
                    ? "italic text-[#A0522D] font-medium"         /* terracotta accent for featured */
                    : "text-slate-400 group-hover:text-slate-800" /* muted → dark on hover */
                }`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Drawer bottom padding */}
        <div className="h-10" />
      </div>
    </section>
  );
}
