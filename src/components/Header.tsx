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
          <Link to="/fonctionnalites" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t('header.features')}
          </Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t('header.pricing')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button className="btn-primary text-xs sm:text-sm hidden sm:inline-flex" onClick={openWaitlist}>{t('common.joinWaitlist')}</Button>
          
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
                to="/fonctionnalites" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.features')}
              </Link>
              <Link 
                to="/pricing" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.pricing')}
              </Link>
              <Button 
                className="btn-primary text-xs w-full mt-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  openWaitlist();
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
