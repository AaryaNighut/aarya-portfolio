"use client";
 
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code, Award, GraduationCap } from "lucide-react";
 
// Stat Counters for Achievement Cards
const stats = [
  { value: 3, label: "Achievements", icon: Trophy, suffix: "+" },
  { value: 4, label: "Projects", icon: Code, suffix: "+" },
  { value: 4, label: "Certificates", icon: Award, suffix: "+" },
  { value: 9, label: "CGPA", icon: GraduationCap, suffix: "+", decimals: 0 },
];
 
// Stats Card Count-up helper
function CountUp({ end, duration = 1.5, decimals = 0 }: { end: number; duration?: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
 
  useEffect(() => {
    if (!isInView) return;
 
    let startTime: number | null = null;
 
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = progress * end;
      setCount(currentCount);
 
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
 
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);
 
  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}
 
const fullCode = `const aarya = {
  name: "Aarya Subhash Nighut",
  role: "AI & Full Stack Developer",
  degree: "B.E. Computer Science and Engineering (AI & ML)",
  college: "Lokmanya Tilak College of Engineering",
  year: "Fourth Year Undergraduate",
  cgpa: "9+ CGPA",
  location: "Thane, Maharashtra, India",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Development",
    "Cloud Computing",
    "Data Structures & Algorithms",
    "Problem Solving",
    "Software Development",
    "Hackathons & Innovation"
  ]
};
 
console.log("Profile Loaded Successfully ✓");`;
 
// VS Code Coding Terminal sub-component
function CodingTerminal() {
  const [codeText, setCodeText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
 
  useEffect(() => {
    if (!isInView) return;
 
    let isMounted = true;
 
    const runSequence = async () => {
      let currentText = "";
      for (let i = 0; i < fullCode.length; i++) {
        if (!isMounted) return;
        currentText += fullCode[i];
        setCodeText(currentText);
        const isWhitespace = fullCode[i] === " " || fullCode[i] === "\n";
        await new Promise(r => setTimeout(r, isWhitespace ? 3 : 11));
      }
    };
 
    runSequence();
 
    return () => {
      isMounted = false;
    };
  }, [isInView]);
 
  const lineArray = codeText.split("\n");
  const totalCodeLines = fullCode.split("\n").length;
 
  const renderTokens = (line: string, isLastLine: boolean) => {
    if (!line) {
      return (
        <span>
          {isLastLine ? (
            <span className="inline-block w-1.5 h-3.5 bg-yellow-400 animate-pulse ml-0.5" />
          ) : (
            <span>&nbsp;</span>
          )}
        </span>
      );
    }
 
    const regex = /(".*?"|\bconst\b|\bconsole\b|\blog\b|\baarya\b|\bname\b|\brole\b|\bdegree\b|\bcollege\b|\byear\b|\bcgpa\b|\blocation\b|\binterests\b|\b\d+\b|[\{\}\[\]\(\):=,\.]|\s+|\S+)/g;
    const tokens = line.match(regex) || [line];
 
    return (
      <>
        {tokens.map((token, idx) => {
          if (token.startsWith('"') && token.endsWith('"')) {
            return (
              <span key={idx} className="text-[#34D399] font-medium">
                {token}
              </span>
            );
          }
          if (token === "const" || token === "console" || token === "log") {
            return (
              <span key={idx} className="text-[#60A5FA] font-semibold">
                {token}
              </span>
            );
          }
          if (token === "aarya") {
            return (
              <span key={idx} className="text-[#A78BFA]">
                {token}
              </span>
            );
          }
          if (
            ["name", "role", "degree", "college", "year", "cgpa", "location", "interests"].includes(token)
          ) {
            return (
              <span key={idx} className="text-[#FACC15]">
                {token}
              </span>
            );
          }
          if (/^\d+$/.test(token)) {
            return (
              <span key={idx} className="text-[#F472B6]">
                {token}
              </span>
            );
          }
          if (["{", "}", "[", "]"].includes(token)) {
            return (
              <span key={idx} className="text-[#E2E8F0] font-bold">
                {token}
              </span>
            );
          }
          if ([":", ",", ".", "=", "(", ")"].includes(token)) {
            return (
              <span key={idx} className="text-[#94A3B8]">
                {token}
              </span>
            );
          }
          return <span key={idx}>{token}</span>;
        })}
        {isLastLine && (
          <span className="inline-block w-1.5 h-3.5 bg-yellow-400 animate-pulse ml-0.5" />
        )}
      </>
    );
  };
 
  return (
    <div
      ref={containerRef}
      style={{
        boxShadow: "0 25px 60px rgba(0,0,0,.35)",
      }}
      className="w-full h-[520px] rounded-[24px] border-[1.5px] border-[rgba(250,204,21,0.45)] hover:border-[#FACC15] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(250,204,21,0.15)] transition-all duration-[0.35s] ease-[ease] bg-[#111827] backdrop-blur-xl overflow-hidden font-mono text-xs text-slate-300 flex flex-col relative z-10"
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1321] border-b border-white/[0.05] select-none flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[2px] font-sans pl-4">PROFILE.JS</span>
        <div className="w-12" />
      </div>
 
      {/* Terminal Display */}
      <div className="p-4 flex-grow overflow-y-auto max-h-full">
        <div className="flex flex-col">
          {Array.from({ length: totalCodeLines }).map((_, idx) => {
            const line = lineArray[idx] || "";
            const isLastLine = idx === lineArray.length - 1;
            return (
              <div key={idx} className="flex items-start gap-3.5 min-h-[1.5rem]">
                <span className="w-4 text-right select-none text-slate-600 text-[10px] pt-0.5 font-bold">
                  {idx + 1}
                </span>
                <span className="flex-1 whitespace-pre-wrap break-words sm:whitespace-pre sm:overflow-x-auto leading-relaxed select-text font-mono text-[11px] sm:text-xs">
                  {renderTokens(line, isLastLine)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative pt-16 pb-16 bg-transparent border-y border-white/[0.02] selection:bg-yellow-500/20 overflow-hidden"
    >
      {/* Decorative Dotted Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-[0]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
 
      {/* Decorative Blurred Accent Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-yellow-500/[0.02] blur-[120px] pointer-events-none z-[0]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] rounded-full bg-yellow-500/[0.005] blur-[140px] pointer-events-none z-[0]" />
 
      {/* Outer alignment container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full flex flex-col gap-y-8 relative z-10">
        
        {/* Two-Column Grid: Left Side (Bio, Stats) & Right Side (Code Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* LEFT SIDE: About Me Text & Statistics */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-4">
            
            {/* ABOUT ME Accent Label */}
            <div className="select-none mb-1">
              <h2 className="text-2xl md:text-[48px] font-extrabold tracking-[1px] text-[#F8FAFC] uppercase leading-none">
                ABOUT ME
              </h2>
            </div>
 
            {/* Biography Paragraph */}
            <p className="text-slate-300 text-xs md:text-sm leading-[1.8] font-normal max-w-2xl">
              I am Aarya Subhash Nighut, an AI & Full Stack Developer passionate about building intelligent and
              scalable web applications. I enjoy solving real-world problems using Artificial Intelligence and
              the MERN Stack. Currently pursuing my 4th-year B.E. in Computer Science and Engineering (AI & ML) at
              Lokmanya Tilak College of Engineering with a 9+ CGPA, I focus on combining algorithms with modern frameworks to create secure, user-centric products.
            </p>
 
            {/* Resume Download Button */}
            <div className="mt-2">
              <a
                href="/Aarya_Nighut_Resume.pdf"
                download="Aarya_Nighut_Resume.pdf"
                className="h-10 px-5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider text-[10px] transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:scale-[1.01] cursor-pointer border border-transparent select-none"
              >
                Download Resume
              </a>
            </div>
 
            {/* Statistics Cards (2x2 grid layout: 2 above, 2 below) */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-6 select-none">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="group relative w-full h-[76px] rounded-[14px] border border-white/[0.08] hover:border-[#FACC15] bg-[#111827]/75 backdrop-blur-md hover:shadow-[0_0_15px_rgba(234,179,8,0.06)] transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md cursor-pointer overflow-hidden"
                  >
                    <div className="absolute -inset-px rounded-[14px] bg-gradient-to-tr from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div className="flex items-center gap-1.5 justify-center">
                      <Icon className="w-4 h-4 text-yellow-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                      <span className="text-sm md:text-base font-black text-white tracking-tight">
                        <CountUp end={stat.value} decimals={stat.decimals} />
                        {stat.suffix}
                      </span>
                    </div>
 
                    <span className="text-[8.5px] font-bold tracking-wider text-slate-500 uppercase mt-1 pl-0.5">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
 
          </div>
 
          {/* RIGHT SIDE: Coding Terminal Panel (VS Code Style) */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full"
            >
              <CodingTerminal />
            </motion.div>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
