"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À Propos", path: "/a-propos" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Conseils", path: "/conseils" },
    { name: "Vidéos", path: "/videos" },
    { name: "Avis", path: "/avis" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          menuOpen ? "bg-black/95 backdrop-blur-md py-4 text-white" : scrolled ? "glass-light py-4 text-black" : "bg-transparent py-4 xl:py-6 text-white"
        }`}
      >
        <div className="w-full px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="relative z-50 flex items-center gap-2 shrink-0">
            <Image
              src="/logo.jpg"
              alt="LCOM'LUNETTE Logo"
              width={160}
              height={85}
              className="rounded-xl border border-gold shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-500 w-[70px] h-[40px] xl:w-[120px] xl:h-[65px] object-cover"
            />
            <span className={`font-serif font-bold text-lg xl:text-xl tracking-widest hidden md:block transition-colors ${menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'}`}>
              LCOM'LUNETTE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 xl:gap-8 2xl:gap-12 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm xl:text-sm 2xl:text-base uppercase tracking-wider transition-colors font-bold whitespace-nowrap ${scrolled ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-gold text-black px-6 py-2.5 2xl:px-8 2xl:py-3 rounded-full font-bold hover:bg-white hover:text-black hover:scale-105 transition-all whitespace-nowrap text-sm 2xl:text-base"
            >
              Prendre RDV
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`xl:hidden relative z-50 transition-colors p-2 ${menuOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-start items-center pt-32 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 text-center w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block text-2xl md:text-3xl font-serif text-white/70 hover:text-gold transition-colors py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block bg-gold text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-colors w-full uppercase tracking-wider"
                >
                  Prendre Rendez-vous
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
