"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleHoverStart = () => setHovered(true);
    const handleHoverEnd = () => setHovered(false);

    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .interactive-hover"
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Ring - Shrunk size, transitioning from yellow to cyan glow on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/35 bg-yellow-400/5 mix-blend-screen hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 1.4 : 1,
          borderColor: hovered ? "rgba(34, 211, 238, 0.65)" : "rgba(250, 204, 21, 0.35)",
          backgroundColor: hovered ? "rgba(34, 211, 238, 0.08)" : "rgba(250, 204, 21, 0.04)",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      />
      {/* Inner Dot - Shrunk size, transitioning from yellow to cyan on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 0.75 : 1,
          backgroundColor: hovered ? "#22d3ee" : "#facc15",
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
    </>
  );
}
