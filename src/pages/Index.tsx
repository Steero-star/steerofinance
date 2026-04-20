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