import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, Share2 } from "lucide-react";
import steeroBanner from "@/assets/steero-banner-3.png";
import steeroBannerWebP from "@/assets/steero-banner-3.webp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";
import { articleById, articleBySlug, readingTime, type Article } from "@/data/articles";

const sectionAnchor = (articleId: number, index: number) => `section-${articleId}-${index}`;

const formatDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00`)
  );

/* ------------------------------------------------------------------ */
/* Rendu du contenu                                                    */
/* ------------------------------------------------------------------ */

/** Une adresse qui porte un schéma : `https:`, `mailto:`, `tel:`. */
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
/** Un chemin du site qui désigne un FICHIER et non une route : `/modele.xlsx`. */
const FILE_PATH = /^\/[^?#]*\.[a-z0-9]{2,5}(?:[?#]|$)/i;

/**
 * Un lien vers un fichier servi par le site n'est pas une route.
 *
 * React Router ne traite en lien ordinaire que ce qu'il reconnaît comme externe,
 * c'est-à-dire une URL absolue dont l'origine diffère. Un chemin de même origine
 * est intercepté : un clic sur `/modele.xlsx` déclencherait une navigation interne
 * vers une route qui n'existe pas et afficherait la page 404, sans jamais
 * télécharger le fichier. Écrire l'URL en absolu n'y change rien, l'origine reste
 * la même.
 */
const isPlainAnchor = (href: string) => SCHEME.test(href) || FILE_PATH.test(href);

const parseInlineLinks = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    const [, label, href] = match;
    const className = "text-primary hover:underline";
    parts.push(
      isPlainAnchor(href) ? (
        <a
          key={`link-${match.index}`}
          href={href}
          className={className}
          {...(FILE_PATH.test(href)
            ? { download: true }
            : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {label}
        </a>
      ) : (
        <Link key={`link-${match.index}`} to={href} className={className}>
          {label}
        </Link>
      )
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
};

const ArticleBody = ({ article }: { article: Article }) => {
  const lines = article.content.split("\n");
  const elements: React.ReactNode[] = [];
  let sectionIndex = 0;

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      elements.push(<div key={i} className="h-2" />);
      return;
    }

    if (sectionIndex < article.sections.length && trimmed === article.sections[sectionIndex]) {
      const anchor = sectionAnchor(article.id, sectionIndex);
      sectionIndex++;
      elements.push(
        <h2
          key={i}
          id={anchor}
          className="font-serif text-2xl md:text-[1.75rem] font-normal leading-snug tracking-tight text-foreground mt-12 mb-4 scroll-mt-32"
        >
          {trimmed}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("•")) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-1.5 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[0.65em] flex-shrink-0" />
          <span>{parseInlineLinks(trimmed.substring(1).trim())}</span>
        </div>
      );
      return;
    }

    if (trimmed.startsWith("→")) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-1.5 pl-1 text-primary/90">
          <span className="flex-shrink-0">→</span>
          <span>{parseInlineLinks(trimmed.substring(1).trim())}</span>
        </div>
      );
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-2 pl-1">
          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0">
            {trimmed.match(/^\d+/)?.[0]}
          </span>
          <span className="pt-0.5">{parseInlineLinks(trimmed.replace(/^\d+\.\s*/, ""))}</span>
        </div>
      );
      return;
    }

    elements.push(
      <p key={i} className="py-1.5">
        {parseInlineLinks(trimmed)}
      </p>
    );
  });

  return (
    <div className="text-[1.0625rem] leading-[1.75] text-foreground/90">{elements}</div>
  );
};

/* ------------------------------------------------------------------ */
/* Sommaire                                                            */
/* ------------------------------------------------------------------ */

const TableOfContents = ({ article }: { article: Article }) => {
  const { t } = useTranslation();
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    article.sections.forEach((_, index) => {
      const el = document.getElementById(sectionAnchor(article.id, index));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  const scrollTo = (index: number) => {
    document
      .getElementById(sectionAnchor(article.id, index))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (article.sections.length < 2) return null;

  return (
    <nav aria-label={t("blog.tableOfContents")}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
        {t("blog.tableOfContents")}
      </p>
      <ul className="space-y-1 border-l border-border">
        {article.sections.map((title, index) => {
          const isActive = activeAnchor === sectionAnchor(article.id, index);
          return (
            <li key={index}>
              <button
                onClick={() => scrollTo(index)}
                className={`w-full text-left text-sm py-1.5 pl-4 -ml-px border-l-2 transition-colors leading-snug ${
                  isActive
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/* ------------------------------------------------------------------ */
/* Barre de progression de lecture (haut du viewport)                  */
/* ------------------------------------------------------------------ */

const ReadingProgress = ({ target }: { target: React.RefObject<HTMLElement> }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = target.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      setProgress(scrolled * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [target]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const BlogArticle = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articleBySlug(slug) : undefined;
  const bodyRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to="/blog" replace />;

  const title = t(`blog.articles.${article.id}.title`);
  const hook = t(`blog.articles.${article.id}.hook`);
  const rawTags = t(`blog.articles.${article.id}.tags`, { returnObjects: true });
  const tags = Array.isArray(rawTags) ? (rawTags as string[]) : [];
  const minutes = readingTime(article);
  const related = article.related.map(articleById).filter(Boolean) as Article[];

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/blog/${article.slug}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${title} | Steero Blog`}
        description={hook.split("\n")[0].slice(0, 158)}
        canonical={`/blog/${article.slug}`}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: hook.split("\n")[0],
          datePublished: article.date,
          inLanguage: "fr",
          author: { "@type": "Organization", name: "Steero", url: "https://www.steero.fr" },
          mainEntityOfPage: `https://www.steero.fr/blog/${article.slug}`,
        }}
      />
      <Header />
      <ReadingProgress target={bodyRef} />

      <main className="bg-hero-gradient pt-36 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
              {/* Colonne article */}
              <div className="max-w-[46rem]">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("blog.back")}
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground mb-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    <span>{formatDate(article.date, i18n.language)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {minutes} {t("blog.min")}
                    </span>
                  </div>

                  <h1 className="font-serif text-4xl md:text-[2.75rem] font-normal leading-[1.12] tracking-tight text-foreground mb-6">
                    {title}
                  </h1>

                  <p className="text-lg leading-relaxed text-foreground/75 whitespace-pre-line border-b border-border/60 pb-8">
                    {hook}
                  </p>
                </motion.div>

                {/* Sommaire mobile */}
                <div className="lg:hidden mt-8">
                  <div className="rounded-xl bg-muted/40 border border-border/60 p-5">
                    <TableOfContents article={article} />
                  </div>
                </div>

                <article ref={bodyRef} className="mt-2">
                  <ArticleBody article={article} />
                </article>

                {/* Pour aller plus loin */}
                {article.reference && (
                  <div className="mt-12 pt-6 border-t border-border/60">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      {t("blog.goFurtherLabel")}
                    </p>
                    <a
                      href={article.reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 text-[15px] text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-4 h-4 mt-0.5 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>{article.reference.label}</span>
                    </a>
                  </div>
                )}

                {/* Partage + CTA sobre */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleShare}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition-all ${
                      copied
                        ? "bg-green-500/10 border-green-500/30 text-green-600"
                        : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {copied ? t("blog.linkCopied") : t("blog.share")}
                  </button>
                  <button
                    onClick={() => window.open("https://app.steero.fr/", "_blank")}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors group"
                  >
                    {t("blog.startFree")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* À lire ensuite */}
                {related.length > 0 && (
                  <div className="mt-16">
                    <h2 className="font-serif text-2xl font-normal tracking-tight text-foreground mb-6">
                      {t("blog.readNext")}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                      {related.map((rel) => {
                        const relTags = t(`blog.articles.${rel.id}.tags`, { returnObjects: true });
                        const kicker = Array.isArray(relTags) ? (relTags as string[])[0] : "";
                        return (
                          <Link key={rel.id} to={`/blog/${rel.slug}`} className="group block border-t border-foreground/15 pt-4">
                            <p className="text-xs text-muted-foreground mb-2">
                              <span className="text-primary font-medium">{kicker}</span>
                              {" · "}
                              {readingTime(rel)} {t("blog.min")}
                            </p>
                            <p className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                              {t(`blog.articles.${rel.id}.title`)}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Rail sommaire desktop */}
              <aside className="hidden lg:block">
                <div className="sticky top-32">
                  <TableOfContents article={article} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

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

export default BlogArticle;
