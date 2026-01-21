import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import steeroLogo from "@/assets/steero-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  const productLinks = [
    { to: "/pourquoi-steero", labelKey: "header.whySteero" },
    { to: "/fonctionnalites", labelKey: "header.features" },
    { to: "/pricing", labelKey: "header.pricing" },
    { to: "/faq", labelKey: "FAQ" },
  ];

  const resourceLinks = [
    { to: "/blog", labelKey: "Blog" },
    { href: "mailto:contact@steero.fr", labelKey: "footer.contact" },
  ];

  const legalLinks = [
    { to: "/mentions-legales", labelKey: "footer.legalNotice" },
    { to: "/cgs", labelKey: "footer.cgs" },
    { to: "/politique-confidentialite", labelKey: "footer.privacy" },
  ];

  return (
    <footer className="py-16 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main footer grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Column 1 - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block mb-4">
              <img src={steeroLogo} alt="Steero" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{t("footer.tagline")}</p>
          </motion.div>

          {/* Column 2 - Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("footer.product")}</h4>
            <nav className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3 - Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("footer.resources")}</h4>
            <nav className="flex flex-col gap-3">
              {resourceLinks.map((link) =>
                "to" in link ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                ),
              )}
            </nav>
          </motion.div>

          {/* Column 4 - Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("footer.legal")}</h4>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Closing phrase + Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <p className="text-center text-muted-foreground text-sm mb-4">{t("footer.closingPhrase")}</p>
          <p className="text-center text-xs text-muted-foreground/70">{t("footer.copyright")}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
