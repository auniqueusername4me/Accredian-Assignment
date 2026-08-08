"use client";

import { useState } from "react";
import HeroSection     from "@/components/sections/HeroSection";
import WelcomeSection  from "@/components/sections/WelcomeSection";
import AboutSection    from "@/components/sections/AboutSection";
import Features           from "@/components/sections/Features";
import CATFramework       from "@/components/sections/CATFramework";
import CourseSegmentation from "@/components/sections/CourseSegmentation";
import DomainExpertise    from "@/components/sections/DomainExpertise";
import Stats              from "@/components/sections/Stats";
import DeliverResults  from "@/components/sections/DeliverResults";
import Testimonials    from "@/components/sections/Testimonials";
import FAQSection      from "@/components/sections/FAQSection";
import LeadFormModal   from "@/components/sections/LeadFormModal";

import Footer          from "@/components/sections/Footer";

// ── Main page ─────────────────────────────────────────────────────
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative bg-transparent overflow-x-hidden selection:bg-slate-900 selection:text-white">

      {/* Section 1 — Hero */}
      <div id="hero">
        <HeroSection onBookDemoClick={() => setIsModalOpen(true)} />
      </div>

      {/* Section 3 — Welcome / Intro */}
      <div id="about">
        <WelcomeSection />
      </div>

      {/* Section 4 — Legacy / About */}
      <AboutSection />

      {/* Section 7 — Features Grid */}
      <div id="features">
        <Features />
      </div>

      {/* Section 8 — CAT Framework */}
      <div id="approach">
        <CATFramework />
      </div>

      {/* Section 8.3 — Tailored Course Segmentation */}
      <div id="segmentation">
        <CourseSegmentation />
      </div>

      {/* Section 8.4 — Domain Expertise */}
      <div id="domains">
        <DomainExpertise />
      </div>

      {/* Section 8.5 — Deliver Results */}
      <div id="results">
        <DeliverResults />
      </div>

      {/* Section 8.7 — Testimonials */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Section 9 — Track Record (Stats) */}
      <div id="stats">
        <Stats />
      </div>

      {/* Section 10 — FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* Footer */}
      <div id="footer">
        <Footer />
      </div>

      {/* Lead capture modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
