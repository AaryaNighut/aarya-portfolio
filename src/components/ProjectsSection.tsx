"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  title: string;
  category: "ai" | "web";
  description: string;
  image: string;
  images: string[];
  tech: string[];
  github: string;
  demo?: string;
  status: "Completed" | "Active" | "In Progress";
  stars: number;
  updatedAt: string;
}

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
  language: string | null;
  default_branch: string;
}

const fallbackProjects: Omit<Project, "id" | "images">[] = [
  {
    name: "Library-Management-System",
    title: "Library Management System",
    category: "web",
    description: "A digital library management system that automates book search, user access, and issue-returns with secure portals and database integrations.",
    image: "https://opengraph.githubassets.com/1/AaryaNighut/Library-Management-System",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
    github: "https://github.com/AaryaNighut/Library-Management-System",
    status: "Completed",
    stars: 0,
    updatedAt: "Dec 2025",
  },
  {
    name: "School-Bus-Management",
    title: "School Bus Management System",
    category: "web",
    description: "A school bus management system with route scheduling, booking automation, and secure role-based portals for admins, drivers, and parents.",
    image: "https://opengraph.githubassets.com/1/AaryaNighut/School-Bus-Management",
    tech: ["HTML", "CSS", "JavaScript", "JWT", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/AaryaNighut/School-Bus-Management",
    status: "Completed",
    stars: 0,
    updatedAt: "Mar 2026",
  },
  {
    name: "AlertExa",
    title: "AlertExa – Online Examination System",
    category: "ai",
    description: "An AI-powered proctoring and quiz system combining camera face-api.js monitoring, noise detection, and secure tab-switch exam validation.",
    image: "https://opengraph.githubassets.com/1/AaryaNighut/AlertExa",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap 5", "face-api.js", "Web Audio API", "SweetAlert"],
    github: "https://github.com/AaryaNighut/AlertExa",
    status: "Completed",
    stars: 0,
    updatedAt: "Apr 2026",
  },
  {
    name: "MediAI",
    title: "MediAI – AI Healthcare Bot",
    category: "ai",
    description: "An AI-powered healthcare assistant designed for early symptom analysis, disease prediction, and health guidance with doctor recommendations.",
    image: "https://opengraph.githubassets.com/1/AaryaNighut/MediAI",
    tech: ["Next.js", "React.js", "Tailwind CSS", "FastAPI", "MongoDB", "Python", "Scikit-Learn", "JWT"],
    github: "https://github.com/AaryaNighut/MediAI",
    status: "Completed",
    stars: 0,
    updatedAt: "Jun 2026",
  },
];

const projectOrder = [
  "Library-Management-System",
  "School-Bus-Management",
  "AlertExa",
  "MediAI"
];

const CACHE_KEY = "aarya-github-projects-cache-v5";
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

function cleanMarkdown(md: string): string {
  let text = md.replace(/#+\s+.*?\n/g, ""); // Remove markdown headers
  text = text.replace(/!\[.*?\]\(.*?\)/g, ""); // Remove images
  text = text.replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, ""); // Remove nested badge links
  text = text.replace(/\[!\[.*?\]\(.*?\)/g, ""); // Remove badges
  text = text.replace(/<[^>]*>/g, ""); // Remove HTML tags
  text = text.replace(/[\*_~`]+/g, ""); // Remove bold/italic formatting
  text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1"); // Remove links, preserve anchor text
  text = text.replace(/\s+/g, " ").trim(); // Remove multiple spaces
  return text;
}

function parseReadmeDescription(readme: string): string {
  const paragraphs = readme.split(/\n\s*\n/);
  for (const p of paragraphs) {
    const clean = cleanMarkdown(p);
    if (
      clean.length > 50 &&
      !clean.startsWith("#") &&
      !clean.startsWith("!") &&
      !clean.includes("shields.io") &&
      !clean.startsWith("[") &&
      !clean.startsWith("<") &&
      !clean.startsWith("|")
    ) {
      return clean.length > 180 ? clean.substring(0, 177) + "..." : clean;
    }
  }
  return "";
}

function parseReadmeImages(readme: string, repo: string, branch: string): string[] {
  const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
  const htmlImgRegex = /<img.*?src=["'](.*?)["']/g;
  
  let match;
  const imageUrls: string[] = [];
  
  while ((match = mdImgRegex.exec(readme)) !== null) {
    imageUrls.push(match[1]);
  }
  while ((match = htmlImgRegex.exec(readme)) !== null) {
    imageUrls.push(match[1]);
  }
  
  const validImages: string[] = [];
  
  for (let imgUrl of imageUrls) {
    imgUrl = imgUrl.split("?")[0].trim();
    if (
      imgUrl.includes("shields.io") ||
      imgUrl.includes("badge") ||
      imgUrl.includes("license") ||
      imgUrl.includes("logo") ||
      imgUrl.includes("icon") ||
      imgUrl.endsWith(".svg")
    ) {
      continue;
    }
    
    let resolvedUrl = imgUrl;
    if (!imgUrl.startsWith("http://") && !imgUrl.startsWith("https://")) {
      const cleanPath = imgUrl.replace(/^\.\//, "").replace(/^\//, "");
      resolvedUrl = `https://raw.githubusercontent.com/AaryaNighut/${repo}/${branch}/${cleanPath}`;
    }
    
    if (!validImages.includes(resolvedUrl)) {
      validImages.push(resolvedUrl);
    }
  }
  
  return validImages;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(() => {
    return fallbackProjects.map((f) => ({
      id: f.name,
      name: f.name,
      title: f.title,
      category: f.category,
      description: f.description,
      image: f.image,
      images: [f.image],
      tech: f.tech,
      github: f.github,
      demo: f.demo,
      status: f.status,
      stars: f.stars,
      updatedAt: f.updatedAt,
    }));
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.projects?.length > 0) {
              setProjects(parsed.projects);
              return;
            }
          }
        } catch (e) {
          console.warn("Error reading localStorage cache", e);
        }
      }

      try {
        const reposRes = await fetch("https://api.github.com/users/AaryaNighut/repos?sort=updated&per_page=100");
        if (!reposRes.ok) {
          throw new Error(`GitHub API returned status ${reposRes.status}`);
        }
        
        const repos: GithubRepo[] = await reposRes.json();
        
        const filteredRepos = repos.filter((repo) =>
          projectOrder.some((name) => name.toLowerCase() === repo.name.toLowerCase())
        );

        filteredRepos.sort((a, b) => {
          const aIndex = projectOrder.findIndex((name) => name.toLowerCase() === a.name.toLowerCase());
          const bIndex = projectOrder.findIndex((name) => name.toLowerCase() === b.name.toLowerCase());
          return aIndex - bIndex;
        });

        const projectList: Project[] = await Promise.all(
          filteredRepos.map(async (repo) => {
            let readmeContent = "";
            let parsedImages: string[] = [];
            let parsedDesc = "";
            const defaultBranch = repo.default_branch || "main";

            try {
              const readmeRes = await fetch(
                `https://raw.githubusercontent.com/AaryaNighut/${repo.name}/${defaultBranch}/README.md`
              );
              if (readmeRes.ok) {
                readmeContent = await readmeRes.text();
                parsedImages = parseReadmeImages(readmeContent, repo.name, defaultBranch);
                parsedDesc = parseReadmeDescription(readmeContent);
              }
            } catch (err) {
              console.warn(`Failed to fetch raw README for ${repo.name}`, err);
            }

            const fallback = fallbackProjects.find(
              (p) => p.name.toLowerCase() === repo.name.toLowerCase()
            );

            let finalImages = parsedImages;
            if (finalImages.length === 0) {
              if (fallback?.image) {
                finalImages = [fallback.image];
              } else {
                finalImages = [`https://opengraph.githubassets.com/1/AaryaNighut/${repo.name}`];
              }
            }
            
            const finalDesc = parsedDesc || fallback?.description || repo.description || "A clean, modern repository containing application source files.";

            const techSet = new Set<string>();
            if (repo.language) techSet.add(repo.language);
            repo.topics.forEach((t) => {
              if (t.toLowerCase() === "nextjs") techSet.add("Next.js");
              else if (t.toLowerCase() === "react") techSet.add("React.js");
              else if (t.toLowerCase() === "mongodb") techSet.add("MongoDB");
              else if (t.toLowerCase() === "nodejs") techSet.add("Node.js");
              else if (t.toLowerCase() === "express") techSet.add("Express.js");
              else if (t.toLowerCase() === "fastapi") techSet.add("FastAPI");
              else techSet.add(t.charAt(0).toUpperCase() + t.slice(1));
            });
            if (fallback?.tech) {
              fallback.tech.forEach((t: string) => techSet.add(t));
            }
            
            const cleanTitle = fallback?.title || repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

            const formattedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });

            return {
              id: repo.name,
              name: repo.name,
              title: cleanTitle,
              category: repo.name.toLowerCase().includes("ai") || repo.name.toLowerCase().includes("proctor") ? ("ai" as const) : ("web" as const),
              description: finalDesc,
              image: finalImages[0],
              images: finalImages,
              tech: Array.from(techSet).slice(0, 8),
              github: repo.html_url,
              demo: repo.homepage || fallback?.demo || undefined,
              status: fallback?.status || "Completed",
              stars: repo.stargazers_count,
              updatedAt: formattedDate,
            };
          })
        );

        setProjects(projectList);

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                projects: projectList,
              })
            );
          } catch (e) {
            console.warn("Error setting localStorage cache", e);
          }
        }
      } catch (err) {
        console.error("Failed fetching projects from GitHub API", err);
      }
    }

    loadProjects();
  }, []);

  // Preload all screenshot images in the browser cache once projects are loaded
  useEffect(() => {
    if (projects.length === 0) return;
    projects.forEach((project) => {
      const imageUrls = project.images && project.images.length > 0 ? project.images : [project.image];
      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    });
  }, [projects]);

  // Update left/right scroll arrow visibility
  const updateArrowVisibility = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 15
    );
  };

  // Convert vertical mouse wheel into horizontal scroll on the viewport
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (container.scrollWidth <= container.clientWidth) return;
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 1.2,
          behavior: "auto"
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [projects]);

  // Auto-scroll effect (automatically advances slides and pauses when hovered or dragged)
  useEffect(() => {
    if (loading || projects.length <= 1) return;

    const interval = setInterval(() => {
      if (isDragging || isHovered) return;

      if (scrollRef.current) {
        const container = scrollRef.current;
        const cardElement = container.querySelector(".project-card-wrapper");
        if (cardElement) {
          const cardWidth = cardElement.clientWidth;
          const gap = 32; // gap-8
          const nextIdx = (activeIndex + 1) % projects.length;
          container.scrollTo({
            left: nextIdx * (cardWidth + gap),
            behavior: "smooth"
          });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [projects.length, loading, isDragging, isHovered, activeIndex]);

  // Handle active dot index pagination on scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardElement = container.querySelector(".project-card-wrapper");
    if (cardElement) {
      const cardWidth = cardElement.clientWidth;
      const gap = 32; // gap-8 is 32px
      const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
      if (newIndex >= 0 && newIndex < projects.length) {
        setActiveIndex(newIndex);
      }
    }
    updateArrowVisibility();
  };

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Click handler for chevron arrows
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardElement = container.querySelector(".project-card-wrapper");
    if (cardElement) {
      const cardWidth = cardElement.clientWidth;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative pt-6 pb-16 bg-transparent selection:bg-yellow-500/20 overflow-hidden"
    >
      <style>{`
        #projects-scroll-container::-webkit-scrollbar {
          display: none;
        }
        #projects-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Background decoration lights */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-yellow-500/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col items-center relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-6 select-none relative z-10 w-full">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Projects
          </h2>
        </div>

        {/* Error notification if fallback was loaded */}
        {error && (
          <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full select-none z-10">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Projects Viewport Wrapper */}
        <div className="w-full relative z-10">
          {/* Navigation chevrons (Visible on desktop if content overflow exists) */}
          {!loading && projects.length > 0 && (
            <>
              {showLeftArrow && (
                <button
                  onClick={() => scroll("left")}
                  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#0C1220]/90 border border-white/[0.08] hover:border-yellow-500/30 text-white hover:bg-[#0C1220] hover:scale-105 hover:shadow-[0_0_15px_rgba(255, 212, 0, 0.15)] transition-all duration-300 shadow-xl cursor-pointer"
                  title="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {showRightArrow && (
                <button
                  onClick={() => scroll("right")}
                  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#0C1220]/90 border border-white/[0.08] hover:border-yellow-500/30 text-white hover:bg-[#0C1220] hover:scale-105 hover:shadow-[0_0_15px_rgba(255, 212, 0, 0.15)] transition-all duration-300 shadow-xl cursor-pointer"
                  title="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </>
          )}

          <AnimatePresence mode="wait">
            {loading ? (
              // Loading skeletons in a row
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-row gap-8 px-6 md:px-12 py-6 w-full overflow-x-hidden"
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-white/[0.05] bg-white/[0.01] flex flex-col justify-between overflow-hidden shadow-2xl animate-pulse w-[85vw] sm:w-[380px] md:w-[420px] h-[430px] md:h-[480px] shrink-0 p-5 md:p-6"
                  >
                    <div className="h-12 w-full bg-white/[0.02] rounded-xl mb-3" />
                    <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] bg-white/[0.02] rounded-xl mb-3" />
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-3.5 w-full bg-white/[0.03] rounded" />
                      <div className="h-3.5 w-5/6 bg-white/[0.03] rounded" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-3 mt-auto">
                      <div className="h-4 w-10 bg-white/[0.03] rounded" />
                      <div className="h-4 w-14 bg-white/[0.03] rounded" />
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              // Dynamic projects horizontal row
              <motion.div
                key="scrollable-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={scrollRef}
                id="projects-scroll-container"
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setIsDragging(false);
                }}
                onMouseMove={handleMouseMove}
                className={`flex flex-row overflow-x-auto scroll-smooth snap-x snap-mandatory gap-8 px-6 md:px-12 py-6 select-none w-full ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              >
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="project-card-wrapper snap-start snap-always shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] h-[430px] md:h-[480px] pointer-events-auto"
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      isDragging={isDragging}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Dots below the cards */}
        {!loading && projects.length > 0 && (
          <div className="flex items-center justify-center gap-2.5 mt-8 select-none z-10">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!scrollRef.current) return;
                  const container = scrollRef.current;
                  const cardElement = container.querySelector(".project-card-wrapper");
                  if (cardElement) {
                    const cardWidth = cardElement.clientWidth;
                    const gap = 32;
                    container.scrollTo({
                      left: i * (cardWidth + gap),
                      behavior: "smooth"
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "bg-yellow-400 w-5 shadow-[0_0_8px_#FFD400]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                title={`Go to Project ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isDragging
}: {
  project: Project;
  index: number;
  isDragging: boolean;
}) {
  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const headerColors = [
    "text-blue-400",
    "text-yellow-500",
    "text-purple-400",
    "text-yellow-400"
  ];
  
  const dotColors = [
    "bg-blue-400 shadow-[0_0_8px_#3b82f6]",
    "bg-yellow-500 shadow-[0_0_8px_#eab308]",
    "bg-purple-400 shadow-[0_0_8px_#c084fc]",
    "bg-yellow-400 shadow-[0_0_8px_#FFD400]"
  ];

  const colorClass = headerColors[index % headerColors.length];
  const dotColorClass = dotColors[index % dotColors.length];

  return (
    <div className="group relative rounded-[24px] border border-white/[0.06] bg-[#111827]/85 hover:bg-[#111827] hover:border-[#FACC15]/40 hover:shadow-[0_15px_40px_-10px_rgba(250,204,21,0.15),0_10px_20px_-15px_rgba(250,204,21,0.05)] hover:-translate-y-1.5 backdrop-blur-xl transition-all duration-500 ease-out flex flex-col justify-between p-5 md:p-6 w-full h-full overflow-hidden">
      {/* Hover border glow overlay */}
      <div className="absolute -inset-px rounded-[24px] bg-gradient-to-tr from-yellow-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Header section matching user screenshot */}
      <div className="flex items-start gap-4 mb-4 shrink-0 relative z-20">
        <span className="text-4xl md:text-5xl font-black text-white/95 font-mono select-none leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase mb-1 select-none ${colorClass}`}>
            <span>ACADEMIC</span>
            <span className="text-slate-600 font-normal">•</span>
            <span>PROJECT</span>
          </div>
          <h3 className="text-xs md:text-sm font-extrabold uppercase text-white tracking-tight leading-snug line-clamp-2 min-h-[36px] flex items-center">
            {project.title}
          </h3>
        </div>
        
        {/* Top-Right GitHub / Demo pill buttons */}
        <div className="flex flex-col gap-1.5 shrink-0 select-none">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseDown={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-1 px-3 py-1 rounded-full border border-white/[0.08] hover:border-yellow-500/30 bg-[#0a1128] hover:bg-white/[0.06] text-[8px] font-bold text-slate-300 hover:text-white transition-all duration-300 uppercase tracking-widest cursor-pointer"
          >
            <span>GITHUB</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
          </a>
          
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              className="flex items-center justify-between gap-1 px-3 py-1 rounded-full border border-yellow-500/20 hover:border-yellow-500/40 bg-yellow-500/5 hover:bg-yellow-500/15 text-[8px] font-bold text-yellow-400 hover:text-yellow-300 transition-all duration-300 uppercase tracking-widest cursor-pointer"
            >
              <span>DEMO</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>

      {/* Screenshot Carousel in the center */}
      <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] rounded-xl overflow-hidden bg-[#070a12] border border-white/[0.06] select-none shrink-0 z-20">
        <motion.img
          key={currentIdx}
          src={images[currentIdx]}
          alt={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="object-contain w-full h-full bg-[#0a1128]/75 group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/30 via-transparent to-transparent pointer-events-none" />

        {/* Carousel arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/[0.05] hover:border-yellow-400 text-white hover:text-yellow-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(250,204,21,0.45)] transition-all duration-300 z-30 cursor-pointer"
              title="Previous Screenshot"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/[0.05] hover:border-yellow-400 text-white hover:text-yellow-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(250,204,21,0.45)] transition-all duration-300 z-30 cursor-pointer"
              title="Next Screenshot"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            
            {/* Translucent pill dots container */}
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center z-30">
              <div className="bg-black/55 px-3 py-1.5 rounded-full flex gap-1.5 backdrop-blur-sm border border-white/[0.04]">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentIdx(i);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentIdx ? `w-3.5 ${dotColorClass}` : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Description area */}
      <p className="text-xs md:text-[13px] text-slate-400 leading-relaxed font-normal my-3 line-clamp-3 flex-1 overflow-hidden relative z-20">
        {project.description}
      </p>

      {/* Monospaced Technology badges at the bottom */}
      <div className="flex flex-wrap gap-1.5 select-none pt-3 border-t border-white/[0.06] mt-auto relative z-20">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[9px] font-mono text-slate-400 bg-white/[0.01] border border-white/[0.05] px-2.5 py-1 rounded-md hover:border-yellow-500/35 hover:text-white hover:bg-yellow-500/[0.01] hover:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all duration-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
