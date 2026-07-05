"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import confetti from "canvas-confetti";

interface Achievement {
  title: string;
  org: string;
  date: string;
  description: string;
  badge: string;
}

const achievementsData: Achievement[] = [
  {
    title: "Cloud Internship (30 Hours)",
    org: "iFuture Technologies Pvt. Ltd.",
    date: "July 2024",
    description: "Successfully completed a 30-hour Cloud Internship with practical exposure to Microsoft Server Management, Virtualization, and Private Cloud environments.",
    badge: "Internship",
  },
  {
    title: "3rd Rank – Technical Poster Presentation",
    org: "IIIE Belapur & LTCE",
    date: "January 2025",
    description: "Secured 3rd Rank in Technical Poster Presentation by presenting the AI-powered School Bus Management System.",
    badge: "Achievement",
  },
  {
    title: "3rd Rank – UAI Hackathon 2026",
    org: "Universal AI University",
    date: "March 2026",
    description: "Won 3rd Rank for developing an Off-Road Semantic Scene Segmentation System achieving 79.4% Pixel Accuracy and 0.521 IoU Score.",
    badge: "Hackathon",
  },
  {
    title: "Top 10 Finalist – Nirman Hackathon 2026",
    org: "Amity University Mumbai",
    date: "April 2026",
    description: "Secured 7th Position and finished as a Top 10 Finalist by presenting the AI-powered Rural Healthcare Triage System.",
    badge: "Hackathon",
  },
  {
    title: "Electrowiz National Level Project Presentation",
    org: "Electrowiz National Competition",
    date: "2026",
    description: "Presented an AI-based innovative project at the national-level technical competition and successfully represented the department.",
    badge: "Competition",
  },
];

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll progress over the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#eab308", "#ffffff", "#ca8a04"],
    });
  };

  return (
    <section
      id="achievements"
      className="relative pt-6 pb-16 bg-transparent selection:bg-yellow-500/20 overflow-hidden"
    >
      {/* Background decoration lights */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-yellow-500/2 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] rounded-full bg-purple-500/2 blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-6 select-none relative z-10 w-full">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Achievements
          </h2>
        </div>

        {/* Timeline container */}
        <div
          ref={containerRef}
          className="relative w-full flex flex-col gap-12 md:gap-16 z-10"
        >
          {/* Background grey tracking line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.04] -translate-x-1/2 pointer-events-none" />

          {/* Active yellow scroll-filling line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600 origin-top -translate-x-1/2 shadow-[0_0_10px_rgba(234,179,8,0.4)] pointer-events-none"
          />

          {achievementsData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`group relative flex flex-col md:flex-row w-full items-center ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline point (Glowing Yellow Circle) */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#0a1128] border-4 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)] -translate-x-1/2 z-20 transition-all duration-500 group-hover:scale-125 group-hover:border-yellow-400 group-hover:shadow-[0_0_18px_rgba(234,179,8,0.9)]" />

                {/* Card Container (Occupies 45% width on desktop) */}
                <div
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isLeft ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ 
                      type: "spring" as const,
                      stiffness: 85,
                      damping: 15,
                      delay: 0.05
                    }}
                    onClick={triggerConfetti}
                    className={`relative p-6 md:p-8 rounded-3xl border border-white/[0.08] hover:border-[#FACC15] bg-[#111827]/85 hover:bg-[#111827] hover:shadow-[0_0_30px_rgba(234,179,8,0.12)] cursor-pointer transition-all duration-500 ease-out flex flex-col gap-4 overflow-hidden transform hover:-translate-y-1.5 ${
                      isLeft 
                        ? "hover:-translate-x-1 md:hover:translate-x-1.5" 
                        : "hover:-translate-x-1 md:hover:-translate-x-1.5"
                    }`}
                  >
                    {/* Hover border glow overlay */}
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-yellow-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                    {/* Badge and Date */}
                    <div className="flex items-center justify-between relative z-20">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 select-none group-hover:scale-105 transition-transform duration-300">
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold font-mono select-none">
                        {item.date}
                      </span>
                    </div>

                    {/* Title and Organization */}
                    <div className="flex flex-col gap-1.5 relative z-20">
                      <h3 className="text-base md:text-lg font-extrabold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-semibold select-none">
                        {item.org}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-[13px] text-slate-400 leading-relaxed font-normal pt-3 border-t border-white/[0.04] mt-1 relative z-20">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Symmetrical spacer box for desktop alignment */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
