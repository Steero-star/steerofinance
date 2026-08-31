import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";
import { useReleaseEntryAnimations } from "@/lib/entry-animations";

const Index = lazy(() => import("./pages/Index"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PourquoiSteero = lazy(() => import("./pages/PourquoiSteero"));
const Fonctionnalites = lazy(() => import("./pages/Fonctionnalites"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const CGS = lazy(() => import("./pages/CGS"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const Bienvenue = lazy(() => import("./pages/Bienvenue"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => <div className="min-h-screen bg-background" />;

/** Rend la main aux animations une fois la premiere page reellement montee. */
const ReleaseEntryAnimations = () => {
  useReleaseEntryAnimations();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
          <CookieConsent />
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/pourquoi-steero" element={<PourquoiSteero />} />
              <Route path="/fonctionnalites" element={<Fonctionnalites />} />
              <Route path="/abonnement" element={<Pricing />} />
              {/* L'ancienne adresse a été indexée : elle ne disparaît pas, elle
                  redirige. Le vrai 308 est posé dans `vercel.json`, côté serveur,
                  seul endroit où un moteur de recherche transmet le référencement
                  acquis. Cette ligne-ci couvre les deux cas que le serveur ne voit
                  pas : le dev local, et un lien interne oublié qui naviguerait
                  sans recharger la page. `replace` évite de piéger le visiteur
                  dans le bouton Retour. */}
              <Route path="/pricing" element={<Navigate to="/abonnement" replace />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/cgs" element={<CGS />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/bienvenue" element={<Bienvenue />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ReleaseEntryAnimations />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;
