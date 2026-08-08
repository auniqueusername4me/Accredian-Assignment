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

      {/* Section 1 — Hero (Minimalist clean look) */}
      <HeroSection onBookDemoClick={() => setIsModalOpen(true)} />

      {/* Section 3 — Welcome / Intro + facility photo */}
      <WelcomeSection />

      {/* Section 4 — Legacy / About */}
      <AboutSection />

      {/* Section 7 — Features Grid */}
      <Features />

      {/* Section 8 — CAT Framework */}
      <CATFramework />

      {/* Section 8.3 — Tailored Course Segmentation */}
      <CourseSegmentation />

      {/* Section 8.4 — Domain Expertise */}
      <DomainExpertise />

      {/* Section 8.5 — Deliver Results */}
      <DeliverResults />

      {/* Section 8.7 — Testimonials */}
      <Testimonials />

      {/* Section 9 — Track Record (Stats) */}
      <Stats />

      {/* Section 10 — FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Lead capture modal */}
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
