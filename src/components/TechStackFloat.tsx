"use client";

import { motion } from "framer-motion";

const symbols = [
  { text: "</>", top: "15%", left: "8%", size: "text-lg", duration: 12 },
  { text: "{ }", top: "48%", left: "5%", size: "text-2xl", duration: 15 },
  { text: "[]", top: "78%", left: "10%", size: "text-xl", duration: 14 },
  { text: "const", top: "25%", left: "85%", size: "text-sm", duration: 16 },
  { text: "async", top: "55%", left: "88%", size: "text-xs", duration: 13 },
  { text: "await", top: "82%", left: "82%", size: "text-sm", duration: 17 },
  { text: "=>", top: "12%", left: "55%", size: "text-xl", duration: 11 },
  { text: "AI", top: "35%", left: "45%", size: "text-sm", duration: 18 },
  { text: "ML", top: "68%", left: "40%", size: "text-base", duration: 15 },
  { text: "MERN", top: "52%", left: "12%", size: "text-xs", duration: 16 },
  { text: "1010", top: "28%", left: "32%", size: "text-xs", duration: 13 },
  { text: "0101", top: "72%", left: "68%", size: "text-xs", duration: 14 },
];

const dots = [
  { top: "22%", left: "22%", size: "w-1 h-1", duration: 8 },
  { top: "52%", left: "68%", size: "w-1.5 h-1.5", duration: 10 },
  { top: "82%", left: "32%", size: "w-1 h-1", duration: 9 },
  { top: "32%", left: "72%", size: "w-1 h-1", duration: 7 },
  { top: "68%", left: "18%", size: "w-1.5 h-1.5", duration: 11 },
  { top: "12%", left: "78%", size: "w-1 h-1", duration: 8 },
];

export default function TechStackFloat() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4] select-none">
      {/* Premium subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />

      {/* Blurred gradient background orbs (Very low opacity: 4%) */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-yellow-500/[0.03] blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[15%] right-[8%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: "15s" }} />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/[0.02] blur-[110px] pointer-events-none animate-pulse" style={{ animationDuration: "18s" }} />

      {/* Floating coding symbols */}
      {symbols.map((item, index) => (
        <motion.div
          key={`sym-${index}`}
          className={`absolute font-mono text-slate-500/35 hover:text-yellow-400/40 select-none ${item.size} transition-colors duration-300`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.div>
      ))}

      {/* Floating subtle dots */}
      {dots.map((item, index) => (
        <motion.div
          key={`dot-${index}`}
          className={`absolute rounded-full bg-yellow-400/30 ${item.size}`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
