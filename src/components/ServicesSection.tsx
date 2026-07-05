"use client";

import { motion, Variants } from "framer-motion";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    id: "01",
    title: "AI & Machine Learning",
    description: "Building intelligent AI-powered applications using Machine Learning, Python, predictive models, intelligent automation, and real-world AI solutions.",
  },
  {
    id: "02",
    title: "Full Stack Development",
    description: "Developing scalable MERN Stack web applications with secure authentication, REST APIs, responsive interfaces, and modern software architecture.",
  },
  {
    id: "03",
    title: "Cloud Computing",
    description: "Working with cloud infrastructure, Microsoft Server Management, Private Cloud environments, virtualization, deployment workflows, and cloud hosting solutions.",
  },
  {
    id: "04",
    title: "Responsive UI Development",
    description: "Designing modern, responsive, and user-friendly interfaces using HTML, CSS, Bootstrap, JavaScript, and React.js with a focus on excellent user experience.",
  },
  {
    id: "05",
    title: "Problem Solving & DSA",
    description: "Developing efficient software solutions using Java, Data Structures, Algorithms, debugging techniques, and logical problem-solving.",
  },
  {
    id: "06",
    title: "Technical Project Development",
    description: "Building complete software solutions from planning to deployment, including AI applications, healthcare systems, management platforms, hackathon projects, and real-world web applications.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-[40px] bg-transparent overflow-hidden border-t border-white/[0.02]"
    >
      {/* Subtle Background Glowing Dots */}
      <div className="absolute top-1/4 left-12 w-2 h-2 rounded-full bg-yellow-400/10 blur-[2px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-yellow-400/5 blur-[3px] pointer-events-none" />

      {/* Main Container: Centered, 900px Max Width, 85% width */}
      <div className="w-[85%] max-w-[900px] mx-auto flex flex-col items-start gap-4">
        
        {/* Section Header: Centered, reduced bottom margin, no underline */}
        <div className="flex flex-col items-center select-none mb-0 w-full text-center">
          <h2 className="text-3xl md:text-[48px] font-extrabold tracking-[1px] text-[#F8FAFC] uppercase leading-none">
            SERVICES
          </h2>
        </div>

        {/* Services Timeline List with Framer Motion Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col relative z-10"
        >
          {services.map((service, idx) => (
            <div key={service.id} className="w-full">
              <motion.div
                variants={itemVariants}
                className="w-full"
              >
                <div className="group relative w-full flex flex-col md:flex-row md:items-start lg:items-center gap-[20px] py-[12px] px-4 md:px-6 -mx-4 md:-mx-6 w-[calc(100%+32px)] md:w-[calc(100%+48px)] transition-all duration-[300ms] ease-in-out border border-transparent hover:border-white/[0.06] hover:bg-white/[0.035] hover:shadow-[0_8px_24px_-8px_rgba(250,204,21,0.12),0_8px_30px_rgba(0,0,0,0.35)] rounded-xl min-h-[105px]">
                  
                  {/* Left accent bar (appears on hover) */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[70%] bg-[#FACC15] rounded-r opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100 origin-center transition-all duration-[300ms] ease-in-out pointer-events-none" />
                  
                  {/* LEFT SIDE: Service Number (80px wide on desktop) */}
                  <div 
                    className="text-[40px] font-bold leading-none text-[rgba(250,204,21,0.25)] opacity-[0.22] group-hover:text-[#FACC15] group-hover:opacity-100 transition-all duration-[300ms] ease-in-out select-none md:w-[80px] md:min-w-[80px] shrink-0 relative z-[60]"
                  >
                    {service.id}
                  </div>

                  {/* RIGHT SIDE: Service Title & Description */}
                  <div className="flex-1 flex flex-col gap-1 relative z-[60]">
                    <h3 className="text-[18px] font-bold text-white group-hover:text-[#FACC15] transition-all duration-[300ms] ease-in-out leading-[1.3] tracking-normal mb-[8px]">
                      {service.title}
                    </h3>
                    <p className="text-[14px] leading-[1.5] text-[#CBD5E1] font-normal max-w-[600px]">
                      {service.description}
                    </p>
                  </div>

                </div>
              </motion.div>
              
              {/* Divider between services (8px gap margins) */}
              {idx < services.length - 1 && (
                <div className="w-full h-[1px] bg-white/[0.08] mt-[8px] mb-[8px]" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}





