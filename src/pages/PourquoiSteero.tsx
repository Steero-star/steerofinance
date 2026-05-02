import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Info, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWaitlist } from "@/contexts/WaitlistContext";
import { Button } from "@/components/ui/button";
import { TempoLetter } from "@/components/TempoLetter";
import steeroBanner from "@/assets/steero-banner-3.png";

const PourquoiSteero = () => {
  const { openWaitlist } = useWaitlist();

  const retroItems = [
    "Montre où est allé l'argent",
    "Automatique, passif",
    "Observe le passé",
    "Ne prépare pas les décisions",
  ];
  const pareItems = [
    "Aide à piloter vers où tu veux aller",
    "Manuel, conscient, intentionnel",
    "Décide l'avenir",
    "Développe une compétence durable",
  ];

  const principles = [
    {
      num: "01",
      title: "La compréhension naît de l'effort cognitif, pas de l'exposition à l'information.",
      desc: "Enregistrer une dépense, c'est l'identifier, la catégoriser, la comparer à une intention. Ce mécanisme de traitement actif est ce qui produit la maîtrise réelle — pas la consultation d'un dashboard.",
      ref: "Chi & Wylie — The ICAP Framework, 2014",
    },
    {
      num: "02",
      title: "L'automatisation crée une illusion de contrôle, pas une maîtrise.",
      desc: "Les systèmes automatiques génèrent un biais de surconfiance passive : « mes comptes sont connectés » ne signifie pas « je sais où va mon argent ». L'outil porte la responsabilité — pas l'utilisateur.",
      ref: "Parasuraman & Riley — Humans and Automation, 1997",
    },
    {
      num: "03",
      title: "Le rituel transforme la finance en comportement, pas en obligation.",
      desc: "5 minutes par jour créent une boucle de feedback courte. C'est le principe de toute discipline installée durablement : la régularité faible et consistante bat l'effort intense et irrégulier.",
      ref: "Clear — Atomic Habits, 2018",
    },
  ];

  const tempo = [
    { letter: "T", name: "Tracer", desc: "Saisie intentionnelle. Maintient le lien.", freq: "Quotidien", time: "5 min" },
    { letter: "E", name: "Examiner", desc: "Prévoir vs réel. Corriger avant qu'il soit trop tard.", freq: "Hebdomadaire", time: "10 min" },
    { letter: "M", name: "Maîtriser", desc: "Décider où va l'argent le mois suivant.", freq: "Mensuel", time: "15 min" },
    { letter: "P", name: "Positionner", desc: "Aligner finances et objectifs de vie.", freq: "Trimestriel", time: "30 min" },
    { letter: "O", name: "Orienter", desc: "Grandes orientations. Arbitrages stratégiques.", freq: "Annuel", time: "60 min" },
  ];



  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Pourquoi Steero — Tu as besoin d'un pare-brise"
        description="Steero n'est pas un agrégateur de plus. C'est un système de pilotage actif qui t'aide à décider où va ton argent."
        keywords="pourquoi steero, pilotage financier, alternative agrégateur bancaire, rituel TEMPO, contrôle budget"
        canonical="/pourquoi-steero"
      />
      <Header />

      {/* HERO */}
      <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-sparkle mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Pourquoi Steero</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6"
            >
              Tu n'as pas besoin d'un rétroviseur de plus.<br />
              <span className="text-primary italic">Tu as besoin d'un pare-brise.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Les apps qui agrègent tes données te montrent où est allé ton argent. Steero t'aide à décider où il va aller.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block"
            >
              <Button
                size="lg"
                onClick={openWaitlist}
                className="rounded-full px-8 group"
              >
                Commencer 14 jours gratuits
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-4">
              Sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* LE VRAI PROBLÈME */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            Le vrai problème
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-6"
          >
            Tu sais déjà où ton argent est allé. Ce que tu ignores, c'est où il va aller.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl"
          >
            Les apps automatiques te donnent une réponse au mauvais problème. Tu n'as pas un problème d'information — tu as un problème de décision. Finary, Linxo, Bankin te montrent le passé avec une précision parfaite. Ça ne change pas les comportements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border/60"
          >
            {/* Rétroviseur */}
            <div className="bg-muted/40 p-6 md:border-r border-border/60">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                Rétroviseur
              </p>
              <p className="font-semibold text-foreground mb-5">Finary, Bankin, Linxo</p>
              <ul className="space-y-0">
                {retroItems.map((item, i) => (
                  <li
                    key={i}
                    className={`py-3 text-sm text-foreground flex gap-2 ${i !== 0 ? "border-t border-border/60" : ""}`}
                  >
                    <span className="text-muted-foreground">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Pare-brise */}
            <div className="bg-card p-6 border-t md:border-t-0 border-border/60">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
                Pare-brise
              </p>
              <p className="font-semibold text-foreground mb-5">Steero</p>
              <ul className="space-y-0">
                {pareItems.map((item, i) => (
                  <li
                    key={i}
                    className={`py-3 text-sm text-foreground flex gap-2 ${i !== 0 ? "border-t border-border/60" : ""}`}
                  >
                    <span className="text-primary font-semibold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* APPROCHE COMPORTEMENTALE */}
      <section className="py-24 bg-secondary/30" id="fondements-comportementaux">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            Approche comportementale
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-6"
          >
            Pourquoi le manuel change tout.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12"
          >
            La saisie manuelle n'est pas un manque de technologie. C'est la mécanique qui produit le changement de comportement. Trois principes, documentés.
          </motion.p>

          <div className="space-y-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-5">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {p.num}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground leading-snug mb-2">
                      {p.title}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {p.desc}
                    </p>
                    <hr className="border-border/60 my-3" />
                    <p className="text-xs text-muted-foreground italic">
                      {p.ref}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            Le système
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-6"
          >
            TEMPO : Cinq rituels, une discipline.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12"
          >
            Du quotidien au stratégique. Chaque niveau a une fréquence, un objectif, une durée. L'ensemble forme un système de pilotage complet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="overflow-x-auto rounded-2xl border border-border/60 bg-card"
          >
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 w-20 border-b border-border/60" />
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 border-b border-border/60">
                    Rituel
                  </th>
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 border-b border-border/60">
                    Fréquence
                  </th>
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 border-b border-border/60">
                    Durée
                  </th>
                </tr>
              </thead>
              <tbody>
                {tempo.map((row, i) => (
                  <tr key={row.letter} className={i !== 0 ? "border-t border-border/60" : ""}>
                    <td className="p-4 align-top">
                      <TempoLetter letter={row.letter} size="lg" />
                    </td>
                    <td className="p-4 align-top">
                      <p className="font-semibold text-foreground text-sm mb-1">{row.name}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{row.desc}</p>
                    </td>
                    <td className="p-4 align-top text-sm text-muted-foreground">{row.freq}</td>
                    <td className="p-4 align-top text-sm font-semibold text-foreground">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3"
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Intégration bancaire à venir.</span>{" "}
              Steero se connectera à tes comptes, pas pour automatiser mais pour te présenter tes transactions à valider. Tu catégorises, tu confirmes, tu décides. La friction administrative disparaît. La friction utile, elle, reste entière.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Background banner image */}
        <div className="absolute inset-0">
          <img src={steeroBanner} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        {/* Decorative elements */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Installe un système.<br />Pas une app de plus.
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              14 jours pour tester le pilotage actif de tes finances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={openWaitlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/fonctionnalites"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Découvrir les fonctionnalités
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

export default PourquoiSteero;
