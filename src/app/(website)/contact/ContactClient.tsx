"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, XCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  phone: z.string().min(8, "Numéro WhatsApp valide requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  reason: z.string().min(1, "Motif requis"),
  comments: z.string().optional(),
});

export default function ContactClient({ validInsurances }: { validInsurances: string[] }) {
  const [insurance, setInsurance] = useState("");
  const [insuranceStatus, setInsuranceStatus] = useState<"idle" | "accepted" | "rejected">("idle");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Votre demande de rendez-vous a été envoyée avec succès !", {
          style: { background: "#FFD700", color: "#000" },
          iconTheme: { primary: "#000", secondary: "#FFD700" },
        });
        reset();
      } else {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer plus tard.");
      }
    } catch (error) {
      toast.error("Erreur de connexion.");
    }
  };

  const checkInsurance = () => {
    if (!insurance.trim()) return;
    const isAccepted = validInsurances.some(ins => insurance.toLowerCase().includes(ins.toLowerCase()));
    setInsuranceStatus(isAccepted ? "accepted" : "rejected");
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="text-center mb-20"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Prendre Rendez-vous</h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            Réservez votre créneau pour une consultation personnalisée ou un essayage privé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulaire & Vérification */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section Assurance */}
            <motion.div 
              initial={{ opacity: 0, x: -100, rotateY: 45, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-serif font-semibold mb-6 flex items-center gap-3">
                <ShieldCheckIcon className="text-gold" /> Vérification d'Assurance
              </h2>
              <p className="text-white/60 font-light mb-6">
                Vérifiez instantanément si votre assurance maladie est partenaire de notre cabinet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={insurance}
                  onChange={(e) => {
                    setInsurance(e.target.value);
                    setInsuranceStatus("idle");
                  }}
                  placeholder="Ex: ASCOMA, MCI, Allianz..."
                  className="flex-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                <button 
                  onClick={checkInsurance}
                  className="bg-gold text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                >
                  Vérifier
                </button>
              </div>
              
              {insuranceStatus !== "idle" && (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 flex items-center gap-4 ${
                    insuranceStatus === "accepted" 
                      ? "bg-green-900/30 border border-green-500/50 text-green-400" 
                      : "bg-red-900/30 border border-red-500/50 text-red-400"
                  }`}
                >
                  {insuranceStatus === "accepted" ? (
                    <><CheckCircle2 size={24} /> <span>Excellente nouvelle ! Votre assurance est acceptée.</span></>
                  ) : (
                    <><XCircle size={24} /> <span>Cette assurance n'est pas partenaire, mais des facilités de paiement sont possibles.</span></>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Formulaire RDV */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: 45, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.3 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-serif font-semibold mb-8">Informations de Rendez-vous</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Prénom *</label>
                    <input {...register("firstName")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" />
                    {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Nom *</label>
                    <input {...register("lastName")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" />
                    {errors.lastName && <span className="text-red-500 text-xs mt-1 block">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Numéro WhatsApp *</label>
                    <input {...register("phone")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" />
                    {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" {...register("email")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Date souhaitée *</label>
                    <input type="date" {...register("date")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors color-scheme-dark" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Heure *</label>
                    <input type="time" {...register("time")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors color-scheme-dark" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Motif *</label>
                    <select {...register("reason")} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors">
                      <option value="">Sélectionner</option>
                      <option value="entretien">Entretien / Ajustement</option>
                      <option value="achat">Achat lunettes/lentilles</option>
                      <option value="conseil">Conseil Visagisme</option>
                      <option value="essayage">Essayage de monture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Commentaires</label>
                  <textarea {...register("comments")} rows={4} className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gold text-black py-4 font-semibold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi en cours..." : "Confirmer le rendez-vous"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar Infos */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -45, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="font-serif font-semibold text-xl mb-6 text-gold">Nos Coordonnées</h3>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-4">
                  <MapPin className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Adresse</strong>
                    <span className="text-white/60 text-sm">LCOM'LUNETTE<br />Abidjan, Côte d'Ivoire</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Téléphone</strong>
                    <span className="text-white/60 text-sm">+225 01 42 65 92 10</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Email</strong>
                    <span className="text-white/60 text-sm">lcomlunette@gmail.com</span>
                  </div>
                </li>
              </ul>
              
              <div className="w-full h-48 rounded-lg overflow-hidden border border-black mb-8">
                <iframe
                  src="https://maps.google.com/maps?q=L%20Com%20'%20Lunette,%20Rue%20Washington,%20Abidjan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-gold hover:text-black hover:border-gold transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -45, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.5 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl mt-8"
            >
              <h3 className="font-serif font-semibold text-xl mb-6 text-gold">Horaires d'Ouverture</h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Lundi - Vendredi</span>
                  <span>08:30 - 19:00</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Samedi</span>
                  <span>09:00 - 16:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/60">Dimanche</span>
                  <span className="text-gold">Fermé</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
