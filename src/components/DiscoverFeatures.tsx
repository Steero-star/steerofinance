import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DiscoverFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            to="/fonctionnalites"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span>{t('common.discoverFeatures')}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverFeatures;
