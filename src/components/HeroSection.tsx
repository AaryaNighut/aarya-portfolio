"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import { Mail, ArrowRight, Download, Trophy, Folder, FileText, GraduationCap, Brain } from "lucide-react";
import { FaLinkedin, FaGithub, FaJava, FaPython, FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiMongodb, SiMysql, SiLeetcode } from "react-icons/si";



// Stats Details (Matched EXACTLY to resume)
const stats = [
  { value: 3, label: "Achievements", icon: Trophy, suffix: "+" },
  { value: 4, label: "Projects", icon: Folder, suffix: "+" },
  { value: 4, label: "Certificates", icon: FileText, suffix: "+" },
  { value: 9, label: "CGPA", icon: GraduationCap, suffix: "+" },
];

// Count-up helper
function CountUp({ end, decimals = 0 }: { end: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let active = true;
    let startTimestamp: number | null = null;
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = progress * end;
      
      if (active) {
        setCount(value);
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
    return () => {
      active = false;
    };
  }, [end, isInView]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export default function HeroSection() {


  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const particles = [
    { top: "12%", left: "15%", size: 4, delay: 0 },
    { top: "25%", left: "45%", size: 6, delay: 1.5 },
    { top: "50%", left: "8%", size: 5, delay: 0.8 },
    { top: "70%", left: "38%", size: 3, delay: 2.2 },
    { top: "18%", left: "82%", size: 5, delay: 1.2 },
    { top: "45%", left: "88%", size: 4, delay: 0.5 },
    { top: "82%", left: "85%", size: 6, delay: 1.9 },
  ];

  return (
    <section
      id="home"
      className="hero select-none"
    >
      <style>{`
        .hero {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          width: 100%;
          background-color: transparent;
        }
        .hero-image {
          position: absolute;
          right: 8%;
          top: 80px;
          width: 44%;
          height: 82%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          mask-image: linear-gradient(to left, black 75%, transparent 100%),
                      linear-gradient(to top, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, black 75%, transparent 100%),
                              linear-gradient(to top, black 70%, transparent 100%);
          mask-composite: intersect;
          -webkit-mask-composite: destination-in;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        .hero-blend-overlay {
          display: none;
        }
        .hero-container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 60px;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          min-height: 100vh;
          width: 100%;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          width: 48%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0;
          padding-top: 6rem;
          padding-bottom: 2.5rem;
        }
        @media (max-width: 1023px) {
          .hero-image {
            left: 0;
            right: 0;
            top: 80px;
            height: calc(55vh - 80px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.20;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center top;
            mask-image: none;
            -webkit-mask-image: none;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .hero-blend-overlay {
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 80px;
            bottom: 0;
            z-index: 2;
            pointer-events: none;
            background: linear-gradient(
              to bottom,
              rgba(5, 8, 22, 0.4) 0%,
              rgba(5, 8, 22, 0.85) 60%,
              #050816 100%
            );
          }
          .hero-container {
            padding: 0 30px;
            align-items: center;
            justify-content: center;
          }
          .hero-content {
            width: 100%;
            align-items: center;
            text-align: center;
            gap: 0;
          }
        }
      `}</style>

      {/* Faint digital code-grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Ambient background decoration glow lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-yellow-500/[0.035] blur-[150px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/[0.025] blur-[160px] pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-purple-500/[0.015] blur-[140px] pointer-events-none z-[1]" />

      {/* Floating particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-yellow-500/25 z-[1]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6 + idx * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Absolutely Positioned Portrait Layer (z-index 1) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hero-image"
      >
        <img
          src="/images/aarya_portrait_clean.png"
          alt="Aarya Nighut Portrait"
        />
        {/* Soft background blending overlay gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050816] via-[#050816]/40 to-transparent w-[50%] h-full left-0 top-0 z-[2]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent w-full h-[40%] left-0 bottom-0 z-[2]" />
      </motion.div>

      {/* Gradient Blend Overlay (z-index 2) */}
      <div className="hero-blend-overlay" />

      {/* Responsive layout container (z-index 3) */}
      <div className="hero-container">
        
        {/* LEFT COLUMN: Profile Info (46% max width on desktop to prevent overlaps) */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-content"
        >
          {/* HELLO, I'M */}
          <div className="select-none mb-2">
            <span className="text-xs md:text-sm font-extrabold tracking-[3px] text-slate-400 uppercase">
              HELLO, I'M
            </span>
          </div>

          {/* AARYA NIGHUT */}
          <div className="flex flex-col items-center lg:items-start w-full mb-[10px]">
            <h1 className="text-3xl sm:text-5xl lg:text-6.5xl xl:text-7xl font-black tracking-tight text-white leading-none uppercase select-none sm:whitespace-nowrap">
              Aarya <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(250,204,21,0.25)]">Nighut</span>
            </h1>
          </div>

          {/* AI & FULL STACK DEVELOPER */}
          <div className="flex flex-col items-center lg:items-start w-full mb-[18px]">
            <h2 className="text-xs md:text-sm font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 select-none">
              <span className="w-1.5 h-3 bg-yellow-400/80 rounded-full" />
              AI & FULL STACK DEVELOPER
            </h2>
          </div>

          {/* 🟢 OPEN TO OPPORTUNITIES */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 backdrop-blur-md w-fit select-none mb-[20px] mx-auto lg:mx-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-[15px] font-semibold text-[#10b981] tracking-wide">
              OPEN TO OPPORTUNITIES
            </span>
          </div>

          {/* Professional Introduction Paragraph */}
          <p className="max-w-2xl text-slate-400 text-xs md:text-sm leading-[1.8] font-normal w-full text-center lg:text-left mb-[38px]">
            As a passionate AI & Full-Stack Developer, I specialize in engineering intelligent systems
            and responsive web applications. Currently a 4th-year Undergraduate in CSE (AI & ML) at
            Lokmanya Tilak College of Engineering, Navi Mumbai, maintaining a strong 9+ CGPA. I combine Data Structures
            and Algorithms in Java with MERN stack development to build functional, user-centric web applications.
            With hands-on experience in full-stack project workflows and a fundamental understanding of cloud environments
            from my cloud internship, I focus on building efficient, real-world solutions.
          </p>

          {/* Core Technologies Row */}
          <div className="relative z-[12] flex flex-nowrap justify-center lg:justify-start items-center gap-[14px] w-full select-none overflow-x-auto scrollbar-none pt-3 pb-2 mb-[16px]">
            {[
              { name: "Java", Icon: FaJava, color: "text-[#E76F00]", hoverGlow: "hover:border-[#E76F00]/40 hover:shadow-[0_0_20px_rgba(231,111,0,0.18)]" },
              { name: "Python", Icon: FaPython, color: "text-[#387EB8]", hoverGlow: "hover:border-[#387EB8]/40 hover:shadow-[0_0_20px_rgba(56,126,184,0.18)]" },
              { name: "React.js", Icon: FaReact, color: "text-[#61DAFB]", hoverGlow: "hover:border-[#61DAFB]/40 hover:shadow-[0_0_20px_rgba(97,218,251,0.18)]" },
              { name: "Node.js", Icon: FaNodeJs, color: "text-[#339933]", hoverGlow: "hover:border-[#339933]/40 hover:shadow-[0_0_20px_rgba(51,153,51,0.18)]" },
              { name: "MongoDB", Icon: SiMongodb, color: "text-[#47A248]", hoverGlow: "hover:border-[#47A248]/40 hover:shadow-[0_0_20px_rgba(71,162,72,0.18)]" },
              { name: "MySQL", Icon: SiMysql, color: "text-[#00758F]", hoverGlow: "hover:border-[#00758F]/40 hover:shadow-[0_0_20px_rgba(0,117,143,0.18)]" },
              { name: "JavaScript", Icon: SiJavascript, color: "text-[#F7DF1E]", hoverGlow: "hover:border-[#F7DF1E]/40 hover:shadow-[0_0_20px_rgba(247,223,30,0.18)]" },
              { name: "AI / ML", Icon: Brain, color: "text-[#A855F7]", hoverGlow: "hover:border-[#A855F7]/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.18)]" },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`flex flex-col items-center justify-center w-[72px] h-[82px] rounded-xl border border-white/[0.08] bg-[#0C1220]/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group flex-shrink-0 ${tech.hoverGlow}`}
              >
                <tech.Icon className={`w-7 h-7 ${tech.color} group-hover:scale-112 group-hover:rotate-[3deg] transition-all duration-300`} />
                <span className="text-[8.5px] font-bold text-slate-400 tracking-tight mt-1.5 transition-colors duration-300 text-center px-0.5 group-hover:text-white">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* Download Resume | View Projects | Contact Me */}
          <div className="relative z-[12] flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full mb-[22px]">
            <a
              href="/Aarya_Nighut_Resume.pdf"
              download="Aarya_Nighut_Resume.pdf"
              className="h-12 px-7 rounded-xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(250,204,21,0.35)] shadow-md cursor-pointer border border-transparent select-none"
            >
              Download Resume
              <Download className="w-4 h-4 text-black" />
            </a>

            <button
              onClick={() => scrollToSection("#projects")}
              className="h-12 px-7 rounded-xl border border-white/[0.08] hover:border-yellow-500/40 bg-white/[0.02] hover:bg-yellow-500/[0.05] text-slate-300 hover:text-yellow-400 font-bold uppercase tracking-wider text-xs transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(250,204,21,0.1)] cursor-pointer select-none"
            >
              View Projects
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-yellow-400" />
            </button>

            <button
              onClick={() => scrollToSection("#contact")}
              className="h-12 px-5 text-slate-400 hover:text-yellow-400 font-bold uppercase tracking-wider text-xs transition-colors duration-300 flex items-center justify-center cursor-pointer select-none hover:-translate-y-0.5"
            >
              Contact Me
            </button>
          </div>

          {/* Achievements | Projects | Certificates | CGPA Cards */}
          <div className="relative z-[12] max-w-xl w-full py-4.5 px-6 rounded-2xl border border-white/[0.05] bg-[#0C1220]/40 hover:bg-[#0C1220]/60 hover:border-yellow-500/20 backdrop-blur-md shadow-xl transition-all duration-300 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-[22px] hover:shadow-[0_0_35px_rgba(250,204,21,0.03)]">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-1 sm:border-r sm:last:border-r-0 border-white/[0.04] sm:last:pr-0 sm:pr-2">
                <div className="flex items-center justify-center gap-1.5">
                  <stat.icon className="w-4 h-4 text-yellow-400" />
                  <span className="text-base md:text-lg font-black text-white tracking-tight">
                    <CountUp end={stat.value} />
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-[9px] font-extrabold tracking-widest text-slate-500 uppercase mt-0.5 pl-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>


        </motion.div>
      </div>
    </section>
  );
}
