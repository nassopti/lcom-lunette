"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, ShieldCheck, Sparkles } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Ajustement Sur-Mesure",
    description: "Un réglage millimétré de vos montures pour un confort absolu et un port parfait.",
  },
  {
    icon: Sparkles,
    title: "Conseil Verres Correcteurs",
    description: "Nos experts vous guident dans le choix des verres les mieux adaptés à votre correction et votre style de vie.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie Premium",
    description: "Toutes nos montures et verres bénéficient d'une garantie exceptionnelle.",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="pt-32 pb-20 relative bg-black/20 backdrop-blur-md text-white border-t-2 border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white/10 pb-12"
        >
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter uppercase leading-[0.9]">
              L'EXIGENCE
              <br />
              <span className="text-white/40">À CHAQUE ÉTAPE</span>
            </h2>
          </div>
          <p className="max-w-md text-xl font-light mt-8 md:mt-0 text-white/70">
            Une expertise de pointe dédiée à la perfection de votre regard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 150, rotateY: 45, scale: 0.5, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.2 }}
              className="p-8 md:p-6 lg:p-12 border-b-2 border-r-2 border-white/10 flex flex-col group hover:bg-white/5 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <service.icon className="w-12 h-12 md:w-10 md:h-10 lg:w-16 lg:h-16 mb-12 md:mb-8 lg:mb-16 text-white/50 group-hover:text-gold transition-colors duration-500 relative z-10" strokeWidth={1} />
              <div className="mt-auto relative z-10">
                <span className="text-sm font-mono tracking-widest text-white/30 group-hover:text-gold/70 mb-4 block transition-colors duration-500">0{index + 1}</span>
                <h3 className="text-2xl md:text-xl lg:text-3xl font-sans font-bold mb-4 uppercase tracking-tight break-words hyphens-auto">
                  {service.title}
                </h3>
                <p className="text-lg md:text-base lg:text-lg font-light text-white/60 group-hover:text-white transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
