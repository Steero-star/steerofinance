import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import steeroLogo from "@/assets/steero-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useWaitlist } from "@/contexts/WaitlistContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={steeroLogo} alt="Steero" className="h-16 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t('header.home')}
          </Link>
          <Link to="/pourquoi-steero" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t('header.whySteero')}
          </Link>
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="outline" className="text-xs sm:text-sm hidden sm:inline-flex rounded-full border-primary text-primary hover:bg-primary/10 px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft" onClick={() => window.open("https://app.steero.fr/auth/login", "_blank")}>Connexion</Button>
          <Button className="btn-primary text-xs sm:text-sm hidden sm:inline-flex rounded-full px-6" onClick={() => window.open("https://app.steero.fr/auth/sign-up", "_blank")}>{t('common.joinWaitlist')}</Button>
          
          {/* Hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 overflow-hidden"
          >
            <motion.nav
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="container mx-auto px-6 py-4 flex flex-col gap-4"
            >
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/pourquoi-steero" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.whySteero')}
              </Link>
              <Link 
                to="/blog" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Button 
                variant="outline"
                className="text-xs w-full mt-2"
                onClick={() => { 
                  setIsMenuOpen(false);
                  window.open("https://app.steero.fr/auth/login", "_blank");
                }}
              >
                Connexion
              </Button>
              <Button 
                className="btn-primary text-xs w-full mt-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open("https://app.steero.fr/onboarding/welcome", "_blank");
                }}
              >
                {t('common.joinWaitlist')}
              </Button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
