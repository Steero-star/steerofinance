import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Differentiation from "@/components/Differentiation";
import DiscoverFeatures from "@/components/DiscoverFeatures";
import NextSteps from "@/components/NextSteps";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import RealProblem from "@/components/RealProblem";
import WhySteero from "@/components/WhySteero";
import SEO from "@/components/SEO";

const Index = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Steero",
    url: "https://steero.fr",
    logo: " ",
    description:
      "Steero est un système de pilotage actif des finances personnelles. Il t'aide à reprendre le contrôle de ton argent grâce à des rituels TEMPO simples et durables.",
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
        title="Steero - Gérer son argent simplement | Alternative à Excel pour votre budget"
        description="Comment bien gérer son argent ? Steero vous aide à mieux gérer votre budget au quotidien. Plus simple qu'Excel, plus efficace que les apps bancaires."
        keywords="gérer son argent, comment gérer son argent, gestion budget, alternative excel budget, finances personnelles"
        canonical="/"
        ogType="website"
      />
      <Header />
      <Hero />
      <RealProblem />
      <HowItWorks />
      <WhySteero />
      <Differentiation />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;