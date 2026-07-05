"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Shield } from "lucide-react";

interface PortfolioLoaderProps {
  onComplete: () => void;
}

const terminalLogs = [
  "CONNECTING PORTFOLIO DATA STREAMS...",
  "RETRIEVING BIOMETRIC TEMPLATE...",
  "SCANNING PORTRAIT IDENTIFIER...",
  "DECRYPTING PROJECTS & EXPERIENCE DATABASE...",
  "ANALYZING SKILLS AND SERVICE MATRICES...",
];

export default function PortfolioLoader({ onComplete }: PortfolioLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let startTimestamp: number | null = null;
    const duration = 3500; // 3.5 seconds scan

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(progressValue);

      if (progressValue < 100) {
        requestAnimationFrame(animate);
      } else {
        // Small delay for transition
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    const animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [mounted, onComplete]);

  // Determine active logs based on progress values
  const visibleLogs = terminalLogs.filter((_, idx) => {
    if (idx === 0) return progress >= 0;
    if (idx === 1) return progress >= 20;
    if (idx === 2) return progress >= 45;
    if (idx === 3) return progress >= 70;
    if (idx === 4) return progress >= 90;
    return false;
  });

  // Grid background animation
  const gridVariants: Variants = {
    animate: {
      backgroundPosition: ["0px 0px", "40px 40px"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050816] flex items-center justify-center overflow-hidden select-none">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0 }
          50% { opacity: 1 }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      {/* Moving Grid Background */}
      <motion.div 
        variants={gridVariants}
        animate="animate"
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(250,204,21,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient background soft lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-yellow-500/[0.015] blur-[140px] pointer-events-none" />

      {/* Floating particles - Client only to prevent hydration mismatches from Math.random() */}
      {mounted && Array.from({ length: 15 }).map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-[#FACC15]/20"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Futuristic Cyber-Security Panel Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-[440px] w-[92%] p-5 md:p-6 rounded-2xl border border-[#FACC15]/20 bg-[#0C1220]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(250,204,21,0.06),inset_0_0_20px_rgba(255,255,255,0.01)] flex flex-col"
      >
        {/* Glowing cyber corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FACC15]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FACC15]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FACC15]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FACC15]" />

        {/* Card Header */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-[#FACC15]/65 border-b border-white/[0.08] pb-3 mb-5">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#FACC15]/80" />
            <span>SYSTEM SECURITY : ONLINE</span>
          </div>
          <span>PORT_LOAD_v2.0</span>
        </div>

        {/* Large Centered Scanner Circular Portrait Frame */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center mb-6 shrink-0">
          {/* Spinning dashed HUD ring */}
          <div className="absolute inset-0 border border-dashed border-[#FACC15]/30 rounded-full animate-spin [animation-duration:32s]" />
          
          {/* Inner Circular Frame */}
          <div className="w-[88%] h-[88%] rounded-full border border-[#FACC15]/25 bg-[#070a12] p-1 flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src="/images/aarya_portrait_new.jpg"
                alt="Aarya Portrait Scan"
                className="w-full h-full object-cover object-center contrast-[1.02] saturate-[1.02]"
              />
              
              {/* Scan laser line - Client only to prevent hydration warnings */}
              {mounted && (
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-[#FACC15] shadow-[0_0_12px_#FACC15]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              
            </div>
          </div>
        </div>

        {/* Grid Info Details Block */}
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 text-left text-[11px] font-mono border-t border-white/[0.08] pt-4 mb-4 select-text">
          <div>
            <span className="text-[#FACC15]/75 mr-1.5 uppercase font-bold text-[9px] tracking-wider">ID:</span>
            <span className="text-[#FACC15] font-black">AARYA_NIGHUT</span>
          </div>
          <div className="text-right">
            <span className="text-[#FACC15]/75 mr-1.5 uppercase font-bold text-[9px] tracking-wider">MATCH:</span>
            <span className="text-[#FACC15] font-black">99.9%</span>
          </div>
          <div>
            <span className="text-[#FACC15]/75 mr-1.5 uppercase font-bold text-[9px] tracking-wider">LOC:</span>
            <span className="text-white font-medium">19.1970° N, 72.9635° E</span>
          </div>
          <div className="text-right">
            <span className="text-[#FACC15]/75 mr-1.5 uppercase font-bold text-[9px] tracking-wider">ROLE:</span>
            <span className="text-white font-medium">DEVELOPER</span>
          </div>
        </div>

        {/* Progress bar container */}
        <div className="w-full flex flex-col gap-2 mt-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#FACC15] tracking-wider font-bold">
            <span>DECRYPTING PROTOCOLS</span>
            <span>{mounted ? Math.floor(progress) : 0}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-[6px] bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.08]">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 via-[#FACC15] to-amber-400 shadow-[0_0_12px_#FACC15]"
              style={{ width: `${mounted ? progress : 0}%` }}
            />
          </div>
        </div>

        {/* Console Box with terminal logs */}
        <div className="w-full bg-black/40 border border-white/[0.04] rounded-lg p-3 text-left font-mono text-[9.5px] text-[#FACC15]/80 flex flex-col gap-1.5 min-h-[110px] mt-4 overflow-hidden select-text">
          {mounted && visibleLogs.map((log, idx) => {
            const isActive = idx === visibleLogs.length - 1 && progress < 100;
            return (
              <div key={idx} className="flex items-center gap-1.5 leading-tight">
                <span className="text-[#FACC15] font-bold shrink-0">&gt;&gt;</span>
                <span className={isActive ? "text-[#FACC15] animate-pulse font-medium" : "text-slate-300"}>
                  {log}
                </span>
                {isActive && <span className="w-1 h-3 bg-[#FACC15] animate-blink shrink-0" />}
              </div>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
}
