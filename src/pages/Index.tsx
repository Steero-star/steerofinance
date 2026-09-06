import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projection from "@/components/Projection";
import RapportEtonnement from "@/components/RapportEtonnement";
import MethodResults from "@/components/MethodResults";
import Footer from "@/components/Footer";
import Preuve from "@/components/Preuve";
import SEO from "@/components/SEO";

const Index = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Steero",
    url: "https://www.steero.fr",
    logo: "https://www.steero.fr/steero-logo.png",
    description:
      "Steero est un système de pilotage actif des finances personnelles. Un cadre de rituels TEMPO simples et durables pour décider où va ton argent.",
    sameAs: [],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Steero",
    url: "https://www.steero.fr",
    inLanguage: "fr-FR",
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Steero",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Application de pilotage des finances personnelles : rituels TEMPO, budget, projets et suivi des dépenses, sans connexion bancaire obligatoire.",
    url: "https://www.steero.fr",
    offers: {
      "@type": "Offer",
      price: "8.00",
      priceCurrency: "EUR",
      url: "https://www.steero.fr/abonnement",
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Application de budget : pilote le tien en 5 min/jour | Steero"
        description="Une application de budget qui te fait décider : tes catégories, tes enveloppes, ta consommation au fil de l'eau. 5 minutes par jour, sans connexion bancaire."
        keywords="gérer son budget, application de budget, application gestion budget, logiciel de budget, budget familial, finances personnelles"
        canonical="/"
        ogType="website"
        jsonLd={[organizationLd, websiteLd, softwareLd]}
      />
      <Header />
      <Hero />
      {/*
        Ordre revu le 06/09 : la projection passe devant.

        Elle était en avant-dernier, après le rapport d'étonnement et TEMPO,
        c'est-à-dire après trois études et un acronyme. Cet ordre était juste
        pour un visiteur qui ignore qu'il a un problème ; il ne l'est pas pour
        quelqu'un qui arrive de « gérer son budget », qui a franchi cette étape
        et cherche un outil. On montre donc d'abord ce que ça donne chez lui,
        on nomme la méthode ensuite, et on argumente le pourquoi en dernier.
      */}
      <Projection />
      <MethodResults />
      <RapportEtonnement />
      <Preuve />
      <Footer />
    </div>
  );
};

export default Index;