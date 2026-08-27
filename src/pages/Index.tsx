import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RapportEtonnement from "@/components/RapportEtonnement";
import MethodResults from "@/components/MethodResults";
import Footer from "@/components/Footer";
import RealProblem from "@/components/RealProblem";
import Preuve from "@/components/Preuve";
import SEO from "@/components/SEO";

const Index = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Steero",
    url: "https://steero.fr",
    logo: " ",
    description:
      "Steero est un système de pilotage actif des finances personnelles. Un cadre de rituels TEMPO simples et durables pour décider où va ton argent.",
    sameAs: [],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Steero",
    url: "https://steero.fr",
    inLanguage: "fr-FR",
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Steero",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "8.00",
      priceCurrency: "EUR",
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Steero - Passe du tableur au pilotage | Alternative à Excel pour ton budget"
        description="Ton Excel finit toujours par lâcher. Steero installe un cadre de pilotage simple : 5 minutes par jour pour voir où va ton argent et décider où il va. Plus simple qu'Excel, plus utile que les apps bancaires."
        keywords="gérer son argent, comment gérer son argent, gestion budget, alternative excel budget, finances personnelles"
        canonical="/"
        ogType="website"
      />
      <Header />
      <Hero />
      <RapportEtonnement />
      <MethodResults />
      <RealProblem />
      <Preuve />
      <Footer />
    </div>
  );
};

export default Index;