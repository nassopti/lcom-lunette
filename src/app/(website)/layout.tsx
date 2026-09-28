import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WowBackground from "@/components/layout/WowBackground";
import SmoothScroll from "@/components/animations/SmoothScroll";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieBanner from "@/components/shared/CookieBanner";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LCOM'LUNETTE | Cabinet d'Optique Haut de Gamme",
  description: "Découvrez l'excellence visuelle avec LCOM'LUNETTE, le cabinet d'optique le plus prestigieux d'Afrique.",
  openGraph: {
    title: "LCOM'LUNETTE | Cabinet d'Optique",
    description: "Découvrez l'excellence visuelle avec LCOM'LUNETTE, le cabinet d'optique le plus prestigieux d'Afrique.",
    url: "https://lcomlunette.com",
    siteName: "LCOM'LUNETTE",
    images: [
      {
        url: "https://lcomlunette.com/logo.jpg",
        width: 800,
        height: 600,
        alt: "LCOM'LUNETTE Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LCOM'LUNETTE | Optique Premium",
    description: "L'excellence visuelle au cœur de l'Afrique.",
    images: ["https://lcomlunette.com/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-transparent text-white selection:bg-gold selection:text-black">
        <WowBackground />
        
        <SmoothScroll>
          <Toaster position="top-center" toastOptions={{ className: 'z-[9999]' }} />
          <Navbar />
          <div className="flex-grow relative z-10">
            {children}
          </div>
          <div className="relative z-10">
            <Footer />
          </div>
          <WhatsAppButton />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
