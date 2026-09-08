"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroVideoStyle() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress over this section (which is 300vh tall)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale the central image massively so the user goes "through" the lens
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 25, 40]);
  
  // Text opacities and positions
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Overall background opacity to reveal the next section
  const overlayOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-[#06120b]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Overlay (Dark Green fading out to reveal white section below conceptually) */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#06120b] z-0"
        />

        {/* Massive Typography */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute z-30 flex flex-col items-center text-center pointer-events-none px-4"
        >
          <span className="text-gold tracking-[0.5em] uppercase text-sm font-semibold mb-6 block">
            Cabinet d'Exception
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-bold text-white leading-[0.9] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            LA VISION
            <br />
            <span className="text-gold">SUR-MESURE</span>
          </h1>
        </motion.div>

        {/* Central Scaling Object (Glasses/Lens) */}
        <motion.div 
          style={{ scale }}
          className="relative z-20 w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] max-w-[400px] max-h-[400px] flex items-center justify-center"
        >
          {/* We use an image with a clear center (like a lens) to zoom through. 
              Here we use a high-end luxury glasses image with transparent bg if possible, 
              or just a stunning circular/floating object. */}
          <div className="w-full h-full relative rounded-full overflow-hidden border-[10px] border-gold/20 shadow-[0_0_100px_rgba(255,215,0,0.1)]">
            <Image
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800"
              alt="Luxury Lens"
              fill
              className="object-cover"
              priority
            />
            {/* The "hole" we zoom through - just a stylized overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06120b] via-transparent to-transparent opacity-90" />
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">Découvrir l'Expérience</span>
          <motion.div 
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[2px] h-16 bg-white/10 relative overflow-hidden"
          >
            <motion.div className="w-full bg-gold absolute top-0 left-0" style={{ height: "50%" }}></motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
