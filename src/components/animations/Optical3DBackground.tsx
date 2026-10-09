"use client";

import { usePathname } from "next/navigation";

export default function Optical3DBackground() {
  const pathname = usePathname();

  // Déterminer quelle vidéo afficher en fonction de la page
  const useEyeVideo = 
    pathname.startsWith('/catalogue') || 
    pathname.startsWith('/conseils') || 
    pathname.startsWith('/videos');

  const videoSrc = useEyeVideo 
    ? "/videos/background_eye.mp4" 
    : "/videos/background_lenses.mp4";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-black">
      <video
        key={videoSrc} // Force re-render when video changes
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        src={videoSrc}
      />
      {/* Overlay dynamique sans flou pour garantir 60fps : l'oeil est un peu plus sombre, les lentilles sont très claires */}
      <div className={`absolute inset-0 ${useEyeVideo ? 'bg-black/20' : 'bg-black/10'}`} />
    </div>
  );
}
