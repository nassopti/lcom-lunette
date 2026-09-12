"use client";

import { motion } from "framer-motion";
import { Wrench, Sparkles, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: <Sparkles className="w-8 h-8 text-gold" />,
    title: "Entretien à Vie",
    description: "Nettoyage aux ultrasons, ajustement des branches et remplacement des plaquettes offerts pour préserver l'éclat de vos montures."
  },
  {
    icon: <Wrench className="w-8 h-8 text-gold" />,
    title: "Atelier Sur-Mesure",
    description: "Réparation minutieuse, polissage de l'acétate et remise en état dans le respect des traditions de la lunetterie d'art."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-gold" />,
    title: "Garantie Excellence",
    description: "Nos collections exclusives bénéficient d'une garantie casse et adaptation pour vous assurer une tranquillité absolue."
  }
];

export default function AfterSalesSection() {
  return (
    <section className="relative py-32 bg-[#030805] text-white overflow-hidden">
      {/* Decorative premium divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent blur-sm" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-gold tracking-[0.4em] uppercase text-sm font-medium mb-4 block">
            L'Excellence Continue
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Service Après-Vente
          </h2>
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Notre engagement envers vous ne s'arrête pas à la remise de votre équipement. 
            Nous vous accompagnons dans le temps pour garantir un confort visuel et esthétique inaltérable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative p-8 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden hover:border-gold/30 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-black/40 rounded-full inline-block border border-white/5">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
