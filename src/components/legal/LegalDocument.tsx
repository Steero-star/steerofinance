import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { openConsentPreferences } from "@/lib/consent";

/**
 * Un document légal = une liste de sections, chaque section une liste de blocs.
 * Toute la matière vit dans les locales : une seule source par langue, aucune
 * valeur en dur dans le JSX (c'est ce qui avait laissé partir l'email de contact
 * et l'hébergeur en placeholder).
 */
type Block =
  | { type: "p"; text: string }
  | { type: "note"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "kv"; items: { k: string; v: string }[] }
  | { type: "table"; head: string[]; rows: string[][] };

type Section = { title: string; blocks: Block[] };

interface LegalDocumentProps {
  /** Préfixe i18n du document, ex. "legal.mentions" */
  docKey: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
}

/**
 * Rend le balisage inline autorisé dans les textes de locale :
 *   [libellé](mailto:…) [libellé](tel:…) [libellé](/route) [libellé](#cookies)
 * `#cookies` rouvre le panneau de préférences cookies.
 */
const INLINE = /\[([^\]]+)\]\(([^)]+)\)/g;

const renderInline = (text: string): ReactNode => {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  INLINE.lastIndex = 0;

  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const [, label, href] = match;
    const key = `${match.index}-${href}`;
    const className = "text-primary hover:underline";

    if (href === "#cookies") {
      nodes.push(
        <button
          key={key}
          type="button"
          onClick={openConsentPreferences}
          className={`${className} underline-offset-2`}
        >
          {label}
        </button>
      );
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={key} to={href} className={className}>
          {label}
        </Link>
      );
    } else {
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={key}
          href={href}
          className={className}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.map((n, i) => <Fragment key={i}>{n}</Fragment>);
};

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case "p":
      return (
        <p key={i} className="mb-4 text-muted-foreground">
          {renderInline(block.text)}
        </p>
      );
    case "note":
      return (
        <p
          key={i}
          className="mb-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-foreground"
        >
          {renderInline(block.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {block.items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "kv":
      return (
        <dl key={i} className="mb-4 space-y-2">
          {block.items.map((item, j) => (
            <div key={j} className="flex flex-col gap-1 sm:flex-row sm:gap-2">
              <dt className="font-medium text-foreground sm:min-w-[13rem]">{item.k}</dt>
              <dd className="text-muted-foreground">{renderInline(item.v)}</dd>
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div key={i} className="mb-4 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {block.head.map((cell, j) => (
                  <th key={j} className="py-2 pr-4 font-medium text-foreground">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j} className="border-b border-border/60 align-top">
                  {row.map((cell, k) => (
                    <td key={k} className="py-2 pr-4 text-muted-foreground">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

const LegalDocument = ({
  docKey,
  seoTitle,
  seoDescription,
  canonical,
}: LegalDocumentProps) => {
  const { t } = useTranslation();
  const sections = t(`${docKey}.sections`, { returnObjects: true }) as Section[];
  const subtitle = t(`${docKey}.subtitle`, { defaultValue: "" });

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title={seoTitle} description={seoDescription} canonical={canonical} />
      <Header />

      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h1 className="mb-2 text-4xl font-bold text-foreground">{t(`${docKey}.title`)}</h1>
          {subtitle && <p className="mb-4 text-muted-foreground">{subtitle}</p>}
          <p className="mb-12 text-sm text-muted-foreground">{t(`${docKey}.lastUpdate`)}</p>

          <div className="space-y-10">
            {(Array.isArray(sections) ? sections : []).map((section, i) => (
              <section key={i}>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">{section.title}</h2>
                {section.blocks.map(renderBlock)}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalDocument;
