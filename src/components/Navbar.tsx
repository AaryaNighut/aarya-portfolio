"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = navItems.map((item) => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: item.href.replace("#", ""),
            top: rect.top + window.scrollY - 180,
            bottom: rect.bottom + window.scrollY - 180,
          };
        }
        return null;
      });

      const current = sections.find(
        (sec) => sec && scrollPos >= sec.top && scrollPos < sec.bottom
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#07111F]/75 backdrop-blur-[18px] border-b border-white/[0.05] select-none h-14 lg:h-20 flex items-center transition-all duration-300">
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo: Clean professional coding symbol */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center text-xl md:text-2xl font-black tracking-tight text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span className="group-hover:scale-105 transition-transform duration-300">&lt;/&gt;</span>
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 rounded-xl ${
                    isActive
                      ? "text-yellow-400 bg-white/[0.02] border border-white/[0.08] shadow-[0_0_15px_rgba(255,212,0,0.03)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {item.label}
                  </span>
                </a>
              );
            })}

            {/* Resume Download Button */}
            <a
              href="/Aarya_Nighut_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase text-yellow-400 border border-yellow-400/30 hover:border-yellow-400 bg-yellow-400/5 hover:bg-yellow-400/10 rounded-xl transition-all duration-300 flex items-center gap-1 ml-4"
            >
              Resume
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-14 lg:top-20 z-[9998] mx-4 p-6 bg-[#07111F]/95 border border-white/[0.08] backdrop-blur-2xl rounded-2xl shadow-2xl lg:hidden flex flex-col gap-4 select-none"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-3 text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? "text-yellow-400 bg-white/[0.04] border-l-2 border-l-yellow-400 pl-6"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <a
                href="/Aarya_Nighut_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-xs font-bold tracking-wider uppercase rounded-xl text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 flex items-center justify-between mt-2"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
