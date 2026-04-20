import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { trackNotFound } from "@/lib/analytics";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
    trackNotFound(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Page introuvable | Steero</title>
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Page introuvable</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;