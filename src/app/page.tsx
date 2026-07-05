"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TechStackFloat from "@/components/TechStackFloat";
import CursorSpotlight from "@/components/CursorSpotlight";
import PortfolioLoader from "@/components/PortfolioLoader";
 
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <PortfolioLoader key="loader" onComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative min-h-screen bg-transparent overflow-x-hidden flex flex-col w-full"
        >
          {/* Spotlight following cursor */}
          <CursorSpotlight />
     
          {/* Dynamic Background elements */}
          <TechStackFloat />
          
          {/* Header / Navigation */}
          <Navbar />
          
          {/* Main Sections */}
          <main className="flex-grow flex flex-col w-full">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ServicesSection />
            <ProjectsSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          
          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

