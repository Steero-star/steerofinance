import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, X } from "lucide-react";
import steeroBanner from "@/assets/steero-banner-3.png";
import steeroBannerWebP from "@/assets/steero-banner-3.webp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { articles, readingTime, type Article } from "@/data/articles";

const formatDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00`)
  );

const useArticleMeta = () => {
  const { t, i18n } = useTranslation();
  return (article: Article) => {
    const rawTags = t(`blog.articles.${article.id}.tags`, { returnObjects: true });
    return {
      title: t(`blog.articles.${article.id}.title`) as string,
      hook: (t(`blog.articles.${article.id}.hook`) as string).split("\n")[0],
      tags: Array.isArray(rawTags) ? (rawTags as string[]) : [],
      date: formatDate(article.date, i18n.language),
      minutes: readingTime(article),
    };
  };
};

const Blog = () => {
  const { t } = useTranslation();
  const meta = useArticleMeta();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(articles.flatMap((a) => meta(a).tags)));

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));

  const filtered = articles.filter(
    (a) => selectedTags.length === 0 || selectedTags.some((tag) => meta(a).tags.includes(tag))
  );

  const lead = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Conseils pour bien gérer son argent"
        description="Articles et conseils pour apprendre à gérer son argent. Comment mieux gérer son budget sans Excel ? Découvrez nos guides pratiques sur les finances personnelles et les rituels financiers."
        keywords="blog finances personnelles, comment gérer son argent, conseils budget, mieux gérer son argent, gestion budget personnel, alternative excel finances"
        canonical="/blog"
        ogType="blog"
      />
      <Header />

      {/* En-tête du journal */}
      <main className="bg-hero-gradient pt-36 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-foreground mb-3">
                {t("blog.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{t("blog.subtitle")}</p>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    {t("blog.clear")}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* La une */}
      {lead && (
        <section className="bg-background border-t border-border/40 py-14">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid gap-10 lg:grid-cols-[7fr_5fr] items-start"
              >
                <div>
                  <p className="text-xs text-muted-foreground mb-4">
                    <span className="text-primary font-semibold">{meta(lead).tags[0]}</span>
                    {" · "}
                    {meta(lead).date}
                    {" · "}
                    {meta(lead).minutes} {t("blog.min")}
                  </p>
                  <Link to={`/blog/${lead.slug}`} className="group block">
                    <h2 className="font-serif text-3xl md:text-[2.6rem] font-normal leading-[1.12] tracking-tight text-foreground group-hover:text-primary transition-colors mb-5">
                      {meta(lead).title}
                    </h2>
                  </Link>
                  <p className="text-lg leading-relaxed text-muted-foreground max-w-[60ch] mb-6">
                    {meta(lead).hook}
                  </p>
                  <Link
                    to={`/blog/${lead.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium group"
                  >
                    {t("blog.readArticle")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Au sommaire de la une */}
                <div className="hidden lg:block border-l border-border/60 pl-10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-5">
                    {t("blog.tableOfContents")}
                  </p>
                  <ol className="space-y-4">
                    {lead.sections.map((section, index) => (
                      <li key={index}>
                        <Link
                          to={`/blog/${lead.slug}`}
                          className="group flex items-baseline gap-3 text-[15px] leading-snug text-foreground/80 hover:text-primary transition-colors"
                        >
                          <span className="text-primary/60 font-medium text-sm tabular-nums group-hover:text-primary transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {section}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Le reste du journal */}
      <section className="bg-background border-t border-border/40 py-14">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {rest.map((article, index) => {
                  const m = meta(article);
                  return (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
                    >
                      <Link to={`/blog/${article.slug}`} className="group block border-t border-foreground/15 pt-5 h-full">
                        <p className="text-xs text-muted-foreground mb-3">
                          <span className="text-primary font-semibold">{m.tags[0]}</span>
                          {" · "}
                          {m.date}
                        </p>
                        <h3 className="font-serif text-[1.4rem] font-normal leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors mb-3">
                          {m.title}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-3 mb-4">
                          {m.hook}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {m.minutes} {t("blog.min")}
                        </p>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">{t("blog.noResults")}</p>
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-primary font-medium hover:underline text-sm"
                >
                  {t("blog.clearFilters")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source srcSet={steeroBannerWebP} type="image/webp" />
            <img src={steeroBanner} alt="" loading="lazy" className="w-full h-full object-cover opacity-35" />
          </picture>
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-primary-foreground mb-4">
              {t("blog.ctaTitle")}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">{t("blog.ctaDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open("https://app.steero.fr/", "_blank")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t("common.startFree")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/pourquoi-steero"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t("common.discoverApproach")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
