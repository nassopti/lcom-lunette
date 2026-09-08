import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 text-white relative z-20">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-t-2 border-white/20 pt-16">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex flex-col items-start gap-4 group">
              <div className="relative overflow-hidden rounded-full border-2 border-white/20 group-hover:border-gold transition-colors w-[75px] h-[75px] shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="LCOM'LUNETTE Logo"
                  width={75}
                  height={75}
                  className="rounded-full transition-all duration-500"
                />
              </div>
              <span className="font-sans font-bold text-2xl tracking-widest uppercase">
                LCOM'LUNETTE
              </span>
            </Link>
            <p className="text-gray-400 font-light text-sm">
              L'excellence visuelle et l'élégance absolue. Découvrez les
              collections les plus prestigieuses et un service sur-mesure au
              cœur du luxe.
            </p>
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans font-bold text-xl mb-8 text-white uppercase tracking-tight">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Accueil", "À Propos", "Catalogue", "Conseils", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={item === "Accueil" ? "/" : `/${item.toLowerCase().replace(/ /g, "-").replace("à-", "a-")}`}
                      className="text-gray-400 font-light hover:text-gold transition-colors text-sm uppercase tracking-widest flex items-center gap-2 group"
                    >
                      <span className="w-0 h-[1px] bg-gold group-hover:w-4 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-bold text-xl mb-8 text-white uppercase tracking-tight">
              Contact
            </h4>
            <ul className="space-y-6 text-sm text-gray-400 mb-8 font-light">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-white shrink-0 mt-1" strokeWidth={1.5} />
                <span>LCOM'LUNETTE<br />Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-white shrink-0" strokeWidth={1.5} />
                <span>+225 01 42 65 92 10</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-white shrink-0" strokeWidth={1.5} />
                <span>lcomlunette@gmail.com</span>
              </li>
            </ul>
            <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-white/20 transition-all duration-500">
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
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-sans font-bold text-xl mb-8 text-white uppercase tracking-tight">
              Horaires
            </h4>
            <ul className="space-y-6 text-sm text-gray-400 font-light">
              <li className="flex items-start gap-4">
                <Clock size={20} className="text-white shrink-0 mt-1" strokeWidth={1.5} />
                <div className="space-y-4">
                  <p><strong className="text-white font-medium block mb-1">Lundi - Vendredi</strong>08h30 - 19h00</p>
                  <p><strong className="text-white font-medium block mb-1">Samedi</strong>09h00 - 16h00</p>
                  <p><strong className="text-white font-medium block mb-1">Dimanche</strong>Fermé</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono uppercase tracking-widest">
          <p>© {new Date().getFullYear()} LCOM'LUNETTE. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-8">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
