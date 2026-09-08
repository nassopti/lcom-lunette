import { client } from "@/lib/sanity/client";
import { FRAME_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import FrameGalleryClient from "@/components/catalogue/FrameGalleryClient";

// Forcing dynamic since we are not using getStaticPaths yet
export const dynamic = "force-dynamic";

export default async function FrameDetailsPage({ params }: { params: { slug: string } }) {
  // Await params in Next.js 15
  const slug = (await params).slug;
  const frame = await client.fetch(FRAME_BY_SLUG_QUERY, { slug });

  if (!frame) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#06120b] to-[#0a1a12] text-white relative z-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#06120b] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Link href="/catalogue" className="inline-flex items-center text-white/50 hover:text-gold transition-colors mb-12 uppercase tracking-widest text-sm font-bold group">
          <ArrowLeft size={18} className="mr-3 group-hover:-translate-x-2 transition-transform" />
          Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Images Section */}
          <FrameGalleryClient 
            initialMainImage={frame.mainImage} 
            galleryImages={frame.gallery || []} 
            frameName={frame.name} 
          />

          {/* Details Section */}
          <div className="flex flex-col justify-center lg:sticky top-32 bg-black/40 p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="mb-8 md:mb-10 pb-8 md:pb-10 relative">
              <div className="absolute bottom-0 left-0 w-12 md:w-16 h-1 bg-gold/50" />
              <h3 className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-bold mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                <span className="w-6 md:w-8 h-px bg-gold/50 block"></span>
                {frame.brand}
              </h3>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold mb-6 md:mb-8 uppercase tracking-tighter leading-[1] md:leading-[0.9] text-white drop-shadow-lg break-words hyphens-auto">{frame.name}</h1>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white/80 mb-6 md:mb-8">
                <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest border border-white/20 bg-white/5 px-3 md:px-5 py-1.5 md:py-2 rounded-full">{frame.type}</span>
                <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest border border-white/20 bg-white/5 px-3 md:px-5 py-1.5 md:py-2 rounded-full">{frame.target}</span>
                {frame.isAvailable && (
                  <span className="flex items-center text-green-400 text-xs md:text-sm font-bold tracking-wider ml-auto bg-green-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-green-400/20">
                    <CheckCircle2 size={16} className="mr-1 md:mr-2" /> <span className="hidden sm:inline">En stock</span>
                  </span>
                )}
              </div>
              
              {frame.description && (
                <p className="text-white/60 font-light leading-relaxed md:leading-loose text-base md:text-lg mt-6 md:mt-8">
                  {frame.description}
                </p>
              )}
            </div>

            <div className="space-y-6 md:space-y-8">
              <Link 
                href="/contact?reason=essayage"
                className="group relative flex items-center justify-center w-full bg-gold text-black py-4 md:py-5 px-4 font-bold uppercase tracking-wider md:tracking-widest hover:bg-white transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)] md:shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] rounded-xl"
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3 text-sm md:text-base text-center">
                  Prendre RDV <span className="hidden sm:inline">pour essayer</span>
                  <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-2 transition-transform hidden sm:block" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
              </Link>
              
              {frame.videoFileUrl && (
                <div className="mt-12">
                  <h4 className="text-sm font-sans font-bold uppercase tracking-widest mb-6 text-white/50 flex items-center gap-4">
                    Vidéo de présentation
                    <span className="flex-grow h-px bg-white/10 block"></span>
                  </h4>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                    <video 
                      src={frame.videoFileUrl} 
                      controls 
                      className="w-full bg-black object-cover"
                      controlsList="nodownload"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
