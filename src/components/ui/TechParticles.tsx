"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const glyphs = [
  "{ }", "</>", "AI", "SQL", "Python", "ML", "Cloud", "Data", "Security", "DevOps"
];

// Generate randomized initial positions
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    text: glyphs[i % glyphs.length],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.max(1, Math.random() * 2)}rem`,
    rotation: Math.random() * 45 - 22.5,
  }));
};

export default function TechParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef(generateParticles(15));

  useGSAP(() => {
    if (!containerRef.current) return;
    const elements = gsap.utils.toArray<HTMLElement>('.tech-particle');

    // Animation 1: Infinite slow Y-axis drift
    elements.forEach((el) => {
      const speed = Math.random() * 5 + 3;
      const yOffset = Math.random() * 30 + 15;
      
      gsap.to(el, {
        y: `-=${yOffset}`,
        duration: speed,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * -5,
      });
    });

    // Animation 2: Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(elements, {
        x: (index) => x * (index % 3 + 1), // varying depth
        y: (index) => y * (index % 3 + 1),
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="tech-particle absolute font-bold text-[#1D4ED8] opacity-[0.08] select-none"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.fontSize,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
