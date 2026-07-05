"use client";
 
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
 
export default function CursorSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
 
  // Smooth springs for high-end lag / drift effect
  const springConfig = { damping: 60, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the spotlight size (600px / 2 = 300px)
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
 
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);
 
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
      style={{
        left: smoothX,
        top: smoothY,
        width: 600,
        height: 600,
      }}
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.012)_0%,rgba(56,189,248,0.012)_50%,transparent_100%)] blur-[80px]" />
    </motion.div>
  );
}
