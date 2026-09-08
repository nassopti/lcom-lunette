"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis"),
  rating: z.string().min(1, "La note est requise"),
  comment: z.string().min(10, "Le commentaire doit faire au moins 10 caractères"),
});

export default function AvisPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: "5",
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Merci infiniment ! Votre avis a bien été enregistré.", {
          style: { background: "#FFD700", color: "#000" },
          iconTheme: { primary: "#000", secondary: "#FFD700" },
        });
        reset();
      } else {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Erreur de connexion.");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
            Votre Opinion
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Laissez-nous un avis</h1>
          <p className="text-white/60 font-light">
            Votre satisfaction est notre priorité. Partagez votre expérience chez LCOM'LUNETTE.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Votre Nom *</label>
              <input 
                {...register("clientName")} 
                placeholder="Ex: KOUADIO FLORA"
                className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" 
              />
              {errors.clientName && <span className="text-red-500 text-xs mt-1 block">{errors.clientName.message}</span>}
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Note sur 5 *</label>
              <select 
                {...register("rating")} 
                className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors"
              >
                <option value="5">⭐⭐⭐⭐⭐ Parfait (5/5)</option>
                <option value="4">⭐⭐⭐⭐ Très bien (4/5)</option>
                <option value="3">⭐⭐⭐ Bien (3/5)</option>
                <option value="2">⭐⭐ Passable (2/5)</option>
                <option value="1">⭐ Décevant (1/5)</option>
              </select>
              {errors.rating && <span className="text-red-500 text-xs mt-1 block">{errors.rating.message}</span>}
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Votre expérience *</label>
              <textarea 
                {...register("comment")} 
                rows={5} 
                placeholder="Racontez-nous comment s'est passée votre visite..."
                className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors"
              ></textarea>
              {errors.comment && <span className="text-red-500 text-xs mt-1 block">{errors.comment.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre mon avis"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
