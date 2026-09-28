"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay so it animates nicely after initial load
      setTimeout(() => setShowBanner(true), 1500);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="container mx-auto max-w-4xl pointer-events-auto">
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
              
              <div className="flex-1">
                <h3 className="text-xl font-serif font-bold text-white mb-2">Respect de votre vie privée</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site et analyser notre trafic. 
                  En cliquant sur "Accepter", vous consentez à notre utilisation des cookies. 
                  Pour en savoir plus, consultez notre <Link href="/politique-de-confidentialite" className="text-gold hover:underline">Politique de confidentialité</Link>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button 
                  onClick={declineCookies}
                  className="px-6 py-3 border border-white/20 text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  Refuser
                </button>
                <button 
                  onClick={acceptCookies}
                  className="px-6 py-3 bg-gold text-black rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-gold/20"
                >
                  Accepter
                </button>
              </div>
              
              <button 
                onClick={declineCookies}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
