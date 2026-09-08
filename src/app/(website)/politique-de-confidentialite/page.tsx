import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | LCOM'LUNETTE",
  description: "Découvrez notre politique de confidentialité et la gestion de vos données personnelles.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-40 pb-24 bg-black/10 backdrop-blur-md text-white relative z-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-gold tracking-[0.2em] uppercase text-xs font-bold mb-4 block">
            Informations Légales
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">Politique de Confidentialité</h1>
          <div className="w-24 h-1 bg-gold/50 mx-auto"></div>
        </div>

        <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
          prose-p:font-light prose-p:leading-[2.2] prose-p:text-white/80 prose-p:mb-8 prose-p:text-justify
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-gold prose-headings:mt-16
          prose-li:text-white/80 prose-li:font-light
          bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl">
          
          <p>
            Chez <strong>LCOM'LUNETTE</strong>, la confidentialité et la sécurité de vos données personnelles sont une priorité absolue. 
            Cette politique de confidentialité vise à vous expliquer de manière transparente comment nous collectons, utilisons et protégeons vos informations.
          </p>

          <h2>1. Données collectées</h2>
          <p>
            Nous collectons les données personnelles que vous nous fournissez volontairement lors de l'utilisation de notre site web, notamment lorsque vous :
          </p>
          <ul>
            <li>Prenez un rendez-vous (Nom, Prénom, Téléphone WhatsApp, Email, Motif de visite).</li>
            <li>Soumettez un avis (Nom, Commentaire, Note).</li>
          </ul>
          <p>
            Nous recueillons également automatiquement certaines données techniques de navigation via des cookies (voir section 4) pour améliorer votre expérience.
          </p>

          <h2>2. Utilisation de vos données</h2>
          <p>
            Les informations que nous recueillons sont utilisées exclusivement pour :
          </p>
          <ul>
            <li>Vous contacter et organiser vos rendez-vous en cabinet.</li>
            <li>Répondre à vos questions ou demandes de conseils.</li>
            <li>Afficher publiquement vos avis sur notre site (après modération).</li>
            <li>Améliorer le fonctionnement technique de notre site web.</li>
          </ul>

          <h2>3. Protection et Partage des données</h2>
          <p>
            Vos données personnelles sont stockées de manière sécurisée. <strong>Nous ne vendons, n'échangeons, ni ne louons jamais</strong> vos informations personnelles à des tiers. 
            Elles sont strictement réservées à l'usage interne de LCOM'LUNETTE pour vous garantir le meilleur service possible.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Notre site utilise des cookies (petits fichiers texte stockés sur votre appareil) pour :
          </p>
          <ul>
            <li>Assurer le bon fonctionnement technique du site.</li>
            <li>Enregistrer vos préférences (par exemple, si vous avez déjà accepté le bandeau de cookies).</li>
          </ul>
          <p>
            Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies, bien que cela puisse affecter certaines fonctionnalités de notre site.
          </p>

          <h2>5. Vos droits</h2>
          <p>
            Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles. 
            Pour exercer ce droit, il vous suffit de nous contacter via notre <Link href="/contact" className="text-gold hover:text-white">page de contact</Link> ou directement par téléphone.
          </p>

          <p className="mt-12 text-sm text-white/50 text-center italic">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </main>
  );
}
