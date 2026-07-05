"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-transparent border-t border-white/[0.04] py-12 select-none selection:bg-cyan-500/20">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center gap-8 relative z-10">
        
        {/* Back To Top Button */}
        <motion.button
          whileHover={{ y: -4 }}
          onClick={scrollToTop}
          className="p-3 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>

        {/* Brand Name */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-extrabold tracking-widest text-cyan-400 uppercase">
            Aarya Subhash Nighut
          </span>
          <span className="text-xs text-slate-500 font-semibold text-center">
            AI & Full Stack Developer
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-2xl text-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/aarya-nighut-855939339"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.05] hover:border-cyan-500/20 text-slate-500 hover:text-cyan-400 transition-all duration-300"
          >
            <FaLinkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://github.com/AaryaNighut"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.05] hover:border-cyan-500/20 text-slate-500 hover:text-cyan-400 transition-all duration-300"
          >
            <FaGithub className="w-4.5 h-4.5" />
          </a>
          <a
            href="mailto:aaryanighut07@gmail.com"
            className="p-2 rounded-full border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.05] hover:border-cyan-500/20 text-slate-500 hover:text-cyan-400 transition-all duration-300"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md border-t border-white/[0.04] my-2" />

        {/* Copyright */}
        <div className="flex flex-col items-center gap-1 text-[10px] md:text-xs font-bold text-slate-600 tracking-wider">
          <span>&copy; 2026 Aarya Subhash Nighut</span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1">
            AI & Full Stack Developer
          </span>
        </div>
      </div>
    </footer>
  );
}
