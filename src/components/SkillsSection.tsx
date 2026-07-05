"use client";

import { motion } from "framer-motion";
import { 
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaBootstrap, FaGitAlt, FaGithub, FaFigma, FaAws 
} from "react-icons/fa";
import { 
  SiCplusplus, SiJavascript, SiNextdotjs, SiExpress, SiMongodb, SiMysql, SiScikitlearn, SiFastapi, SiVercel, SiFirebase, SiRender 
} from "react-icons/si";
import { VscVscode, VscAzure } from "react-icons/vsc";
import { Code, Cpu, Database, Wrench, Brain, BookOpen, Cloud, Sparkles, Layers, Terminal, Network, Palette } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const skillIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "Java": FaJava,
  "Python": FaPython,
  "JavaScript": SiJavascript,
  "HTML5": FaHtml5,
  "CSS": FaCss3Alt,
  "C Programming": Code,
  "C++": SiCplusplus,
  "React.js": FaReact,
  "Next.js": SiNextdotjs,
  "Node.js": FaNodeJs,
  "Express.js": SiExpress,
  "Bootstrap": FaBootstrap,
  "MERN Stack": FaReact,
  "MVC Architecture": Layers,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "SQL": Database,
  "Firebase": SiFirebase,
  "Git": FaGitAlt,
  "GitHub": FaGithub,
  "VS Code": VscVscode,
  "Canva": Palette,
  "Figma": FaFigma,
  "Artificial Intelligence": Sparkles,
  "Machine Learning": Brain,
  "Data Analysis": Database,
  "Data Visualization": Layers,
  "FastAPI": SiFastapi,
  "Scikit-learn": SiScikitlearn,
  "Data Structures": Layers,
  "Algorithms": Cpu,
  "Object-Oriented Programming": Code,
  "DBMS": Database,
  "Operating Systems": Terminal,
  "Computer Networks": Network,
  "Problem Solving": Code,
  "AWS": FaAws,
  "Azure": VscAzure,
  "Vercel": SiVercel,
  "Render": SiRender,
};

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code,
    skills: ["Java", "Python", "JavaScript", "HTML5", "CSS", "C Programming", "C++"],
  },
  {
    title: "Frameworks",
    icon: Cpu,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Bootstrap", "MERN Stack", "MVC Architecture"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "SQL"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Canva", "Figma"],
  },
  {
    title: "AI & GenAI",
    icon: Brain,
    skills: ["Artificial Intelligence", "Machine Learning", "Data Analysis", "Data Visualization", "FastAPI"],
  },
  {
    title: "CS Fundamentals",
    icon: BookOpen,
    skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks", "Problem Solving"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: ["AWS", "Azure", "Vercel", "Render"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.03,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 3 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
    },
  },
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative pt-6 pb-16 bg-transparent overflow-hidden"
    >
      {/* Background Lights */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-yellow-500/3 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-start gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 text-left select-none">
          <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-yellow-400 uppercase">
            {"// TECHNICAL EXPERTISE"}
          </span>
        </div>

        {/* Staggered Cards Grid centered immediately below heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-[24px] w-full mt-4"
        >
          {skillCategories.map((category) => {
            const CardIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.015,
                  y: -5,
                  boxShadow: "0 0 30px rgba(250, 204, 21, 0.08)"
                }}
                transition={{
                  type: "spring" as const,
                  stiffness: 150,
                  damping: 18,
                }}
                className="group relative p-6 rounded-2xl border border-white/[0.08] bg-[#111827]/80 hover:bg-[#111827] hover:border-[#FACC15] transition-all duration-300 ease-out cursor-default flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-grow-0 flex-shrink-0 min-h-[260px]"
              >
                {/* Glow Border Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500/5 via-transparent to-yellow-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
 
                {/* Content wrapper */}
                <div className="relative z-10 w-full flex flex-col justify-between h-full">
                  <div>
                    {/* Card Title & Icon */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="p-2.5 rounded-xl bg-white/[0.01] border border-white/[0.05] group-hover:border-yellow-500/20 group-hover:bg-yellow-500/[0.02] text-yellow-400 transition-all duration-300">
                        <CardIcon className="w-4.5 h-4.5 group-hover:rotate-[10deg] transition-transform duration-300 ease-out" />
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                    </div>
 
                    {/* Skills Badge Container */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={badgeVariants}
                          whileHover={{ scale: 1.03, y: -1 }}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-[#0a1128] border border-white/[0.05] hover:border-yellow-400/30 hover:text-white text-[11.5px] font-semibold text-slate-400 hover:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all duration-200 cursor-default select-none"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
