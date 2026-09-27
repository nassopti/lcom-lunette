"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share } from "lucide-react";

export default function InstallPromptBanner() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const checkAndShow = () => {
      const consent = localStorage.getItem("cookie_consent");
      if (consent) {
        // If cookie consent is given, wait 2 seconds before showing the install prompt to avoid overwhelming the user
        setTimeout(() => setShowPrompt(true), 2000);
      }
    };

    // Check on mount (if they already accepted cookies on a previous visit)
    checkAndShow();

    // Listen for the custom event from CookieBanner
    window.addEventListener("cookie_consent_updated", checkAndShow);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("cookie_consent_updated", checkAndShow);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback si l'événement natif n'est pas disponible (ex: sur PC, ou si le navigateur bloque)
      alert("Pour installer l'application sur PC, cliquez sur l'icône d'installation située complètement à droite dans la barre d'adresse (à côté de l'étoile des favoris).");
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="fixed top-0 left-0 right-0 z-[90] p-4 pointer-events-none"
        >
          <div className="container mx-auto max-w-2xl pointer-events-auto mt-16 md:mt-4">
            <div className="bg-black/90 backdrop-blur-xl border border-gold/30 p-4 md:p-6 rounded-2xl shadow-[0_10px_40px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
              <div className="flex-1">
                <h3 className="text-lg font-serif font-bold text-gold mb-1 flex items-center gap-2">
                  <Download size={18} /> Installez notre Application
                </h3>
                {isIOS ? (
                  <p className="text-white/80 text-sm leading-relaxed">
                    Pour une expérience optimale, ajoutez LCOM'LUNETTE à votre écran d'accueil : appuyez sur <Share size={14} className="inline mx-1" /> puis sur <strong>« Sur l'écran d'accueil »</strong>.
                  </p>
                ) : (
                  <p className="text-white/80 text-sm leading-relaxed">
                    Installez l'application LCOM'LUNETTE pour une expérience plus rapide et fluide.
                  </p>
                )}
              </div>

              <div className="flex shrink-0">
                {!isIOS && (
                  <button 
                    onClick={handleInstallClick}
                    className="px-5 py-2.5 bg-gold text-black rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-gold/20 cursor-pointer"
                  >
                    Installer
                  </button>
                )}
              </div>
              
              <button 
                onClick={dismissPrompt}
                className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors p-1"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
