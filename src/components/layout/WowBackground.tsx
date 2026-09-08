"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WowBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#06080f]" />;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#06080f] overflow-hidden">
      {/* Base noise texture for premium grain effect */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Orb 1: Deep Indigo (Base) */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full bg-[#1e0b50]/60 blur-[60px] md:blur-[140px] mix-blend-screen"
        animate={{
          x: ["-10%", "20%", "-20%", "-10%"],
          y: ["-20%", "10%", "20%", "-20%"],
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ top: "0%", left: "-10%" }}
      />

      {/* Orb 2: Rich Magenta */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full bg-[#700b46]/50 blur-[50px] md:blur-[130px] mix-blend-screen"
        animate={{
          x: ["20%", "-30%", "10%", "20%"],
          y: ["10%", "-20%", "30%", "10%"],
          scale: [0.8, 1.2, 1, 0.8],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ top: "30%", right: "-10%" }}
      />

      {/* Orb 3: Gold/Amber */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full bg-[#8c6210]/40 blur-[50px] md:blur-[120px] mix-blend-screen"
        animate={{
          x: ["-20%", "40%", "-10%", "-20%"],
          y: ["30%", "-10%", "20%", "30%"],
          scale: [1, 1.5, 0.8, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        style={{ bottom: "-10%", left: "10%" }}
      />

      {/* Orb 4: Deep Emerald/Teal */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] rounded-full bg-[#053d3b]/50 blur-[70px] md:blur-[150px] mix-blend-screen"
        animate={{
          x: ["30%", "-20%", "10%", "30%"],
          y: ["-10%", "40%", "-20%", "-10%"],
          scale: [0.9, 1.1, 1.2, 0.9],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* Orb 5: Intense Crimson (Core accent) */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-[#6b0816]/40 blur-[40px] md:blur-[100px] mix-blend-screen"
        animate={{
          x: ["-30%", "30%", "-10%", "-30%"],
          y: ["20%", "-30%", "40%", "20%"],
          scale: [1, 0.7, 1.3, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ top: "40%", left: "30%" }}
      />
      
      {/* Heavy overlay to blend everything smoothly and elegantly */}
      <div className="absolute inset-0 bg-[#06080f]/40 backdrop-blur-md md:backdrop-blur-[20px]" />
    </div>
  );
}
