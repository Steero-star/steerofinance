import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { WaitlistProvider } from "@/contexts/WaitlistContext";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import PourquoiSteero from "./pages/PourquoiSteero";
import Fonctionnalites from "./pages/Fonctionnalites";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import MentionsLegales from "./pages/MentionsLegales";
import CGS from "./pages/CGS";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <WaitlistProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/pourquoi-steero" element={<PourquoiSteero />} />
              <Route path="/fonctionnalites" element={<Fonctionnalites />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/cgs" element={<CGS />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </WaitlistProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
