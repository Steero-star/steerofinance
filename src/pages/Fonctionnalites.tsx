import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, FolderKanban, Users, Building2, Crosshair, LayoutGrid, RefreshCcw, ClipboardList, Gauge, CalendarCheck, BarChart3, Landmark, Wallet, Receipt, RotateCcw, ClipboardCheck, Flame, Plane, type LucideIcon } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useTranslation } from "react-i18next";
import { useWaitlist } from "@/contexts/WaitlistContext";

// Progress sidebar component
const ProgressSidebar = ({
  groups,
  activeIndex
}: {
  groups: FeatureGroup[];
  activeIndex: number;
}) => {
  const scrollToGroup = (index: number) => {
    const element = document.getElementById(`group-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.5,
    delay: 0.3
  }} className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
      {/* Vertical line background */}
      <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-muted rounded-full" />
      
      {/* Progress line */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary rounded-full origin-top" initial={{
      height: 0
    }} animate={{
      height: `${(activeIndex + 1) / groups.length * 100}%`
    }} transition={{
      duration: 0.4,
      ease: "easeOut"
    }} />
      
      {/* Step indicators */}
      {groups.map((group, index) => <button key={index} onClick={() => scrollToGroup(index)} className="relative z-10 group flex items-center gap-3">
          {/* Step circle */}
          <motion.div animate={{
        scale: activeIndex === index ? 1.2 : 1,
        backgroundColor: index <= activeIndex ? "hsl(var(--primary))" : "hsl(var(--muted))"
      }} transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 25
      }} className="w-4 h-4 rounded-full border-2 border-background shadow-md flex items-center justify-center">
            {index < activeIndex && <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.2,
          delay: 0.1
        }}>
                <Check className="w-2.5 h-2.5 text-primary-foreground" />
              </motion.div>}
            {activeIndex === index && <motion.div animate={{
          scale: [1, 1.5, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
          </motion.div>
          
          {/* Label tooltip */}
          <motion.div initial={{
        opacity: 0,
        x: -10
      }} whileHover={{
        opacity: 1,
        x: 0
      }} className="absolute left-8 whitespace-nowrap bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border pointer-events-none">
            <span className="text-xs font-medium text-muted-foreground">{group.label}</span>
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            <span className="text-sm font-semibold text-foreground">{group.title}</span>
          </motion.div>
        </button>)}
    </motion.div>;
};
type AnimationType = "onboarding" | "budget" | "fixed" | "daily" | "gauge" | "rituals" | "indicators";
type AnimationDirection = "horizontal" | "vertical" | "pulse";
interface Feature {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  microPromise: string;
  details: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  animation: AnimationType;
  animationDirection: AnimationDirection;
}
interface FeatureGroup {
  label: string;
  title: string;
  features: Feature[];
  isLarge?: boolean;
}
// featureGroups is now defined inside the component to use translations

// Onboarding steps animation - Parcours d'initialisation progressif
const OnboardingAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: t('fonctionnalites.animations.banks'), Icon: Landmark },
    { label: t('fonctionnalites.animations.income'), Icon: Wallet },
    { label: t('fonctionnalites.animations.fixedExpenses'), Icon: Receipt },
    { label: t('fonctionnalites.animations.rituals'), Icon: RotateCcw }
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation progressive : chaque étape apparaît l'une après l'autre
    // Durée totale : ~5 secondes (4 étapes × 1s + état final 1s)
    const timers = steps.map((_, i) => 
      setTimeout(() => setStep(i + 1), 800 + i * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [isOpen, steps.length]);

  const allCompleted = step === steps.length;
  
  return (
    <div className="mt-4 mb-2">
      {/* Liste des étapes avec apparition progressive */}
      <div className="space-y-2">
        {steps.map((stepItem, i) => {
          const StepIcon = stepItem.Icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{
                opacity: step > i ? 1 : 0.25,
                x: step > i ? 0 : -12
              }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                step > i ? 'bg-primary/10' : 'bg-muted/50'
              }`}
            >
              <StepIcon className={`w-5 h-5 ${step > i ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`flex-1 text-sm font-medium ${
              step > i ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {stepItem.label}
            </span>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: step > i ? 1 : 0,
                scale: step > i ? 1 : 0.5
              }}
              transition={{
                duration: 0.25,
                delay: step > i ? 0.15 : 0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Check className="w-4 h-4 text-primary" />
            </motion.div>
          </motion.div>
          );
        })}
      </div>

      {/* État final : Profil complété */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: allCompleted ? 1 : 0,
          y: allCompleted ? 0 : 8
        }}
        transition={{
          duration: 0.35,
          delay: allCompleted ? 0.3 : 0,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="mt-4 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{t('fonctionnalites.animations.profileComplete')}</span>
        </div>
      </motion.div>

      {/* Texte de clôture */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: allCompleted ? 1 : 0 }}
        transition={{
          duration: 0.3,
          delay: allCompleted ? 0.5 : 0,
          ease: "easeOut"
        }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.onboardingClosing')}
      </motion.p>
    </div>
  );
};

// Budget hierarchy animation - Structure de budget mensuel (4 colonnes : Catégories | Avril | Mai | Juin)
const BudgetAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation progressive : en-têtes → revenu → catégories → total → reste → clôture
    const timers = [
      setTimeout(() => setStep(1), 400),   // En-têtes mois
      setTimeout(() => setStep(2), 800),   // Revenu
      setTimeout(() => setStep(3), 1400),  // Logement
      setTimeout(() => setStep(4), 2000),  // Alimentation
      setTimeout(() => setStep(5), 2600),  // Loisirs
      setTimeout(() => setStep(6), 3200),  // Ligne Total
      setTimeout(() => setStep(7), 3800),  // Ligne Reste disponible
      setTimeout(() => setStep(8), 4400)   // Texte de clôture
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Revenu constant
  const income = {
    april: "2 100 €",
    may: "2 100 €",
    june: "2 100 €"
  };

  // Structure des données avec Avril, Mai et Juin
  const budgetData = [
    {
      category: t('fonctionnalites.animations.housing'),
      april: "800 €",
      may: "800 €",
      june: "800 €",
      subs: [
        { label: t('fonctionnalites.animations.rent'), april: "750 €", may: "750 €", june: "750 €" },
        { label: t('fonctionnalites.animations.insurance'), april: "50 €", may: "50 €", june: "50 €" }
      ]
    },
    {
      category: t('fonctionnalites.animations.food'),
      april: "400 €",
      may: "600 €",
      june: "600 €",
      changed: true,
      subs: [
        { label: t('fonctionnalites.animations.groceries'), april: "300 €", may: "300 €", june: "300 €" },
        { label: t('fonctionnalites.animations.restaurant'), april: "100 €", may: "300 €", june: "300 €", changed: true }
      ]
    },
    {
      category: t('fonctionnalites.animations.leisure'),
      april: "300 €",
      may: "470 €",
      june: "470 €",
      changed: true,
      subs: [
        { label: t('fonctionnalites.animations.sports'), april: "50 €", may: "170 €", june: "170 €", changed: true },
        { label: t('fonctionnalites.animations.outings'), april: "250 €", may: "300 €", june: "300 €", changed: true }
      ]
    }
  ];

  // Totaux dépenses
  const totals = {
    april: "1 500 €",
    may: "1 870 €",
    june: "1 870 €"
  };

  // Reste disponible (revenu - total)
  const remaining = {
    april: "600 €",
    may: "230 €",
    june: "230 €"
  };

  return (
    <div className="mt-4 mb-2">
      {/* En-têtes des colonnes */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: step >= 1 ? 1 : 0,
          y: step >= 1 ? 0 : -8
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-2 mb-3 pb-2 border-b border-border/30"
      >
        <span className="text-xs font-semibold text-muted-foreground">
          {t('fonctionnalites.animations.categories')}
        </span>
        <span className="text-xs font-semibold text-primary text-center">
          {t('fonctionnalites.animations.april')}
        </span>
        <span className="text-xs font-semibold text-primary text-center">
          {t('fonctionnalites.animations.may')}
        </span>
        <span className="text-xs font-semibold text-primary text-center">
          {t('fonctionnalites.animations.june')}
        </span>
      </motion.div>

      {/* Ligne Revenu */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: step >= 2 ? 1 : 0,
          y: step >= 2 ? 0 : 8
        }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-2 items-center bg-emerald-500/10 rounded-lg px-3 py-1.5 mb-3"
      >
        <span className="font-medium text-emerald-600 dark:text-emerald-400 text-xs">{t('fonctionnalites.animations.income')}</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center">{income.april}</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center">{income.may}</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center">{income.june}</span>
      </motion.div>

      {/* Catégories et montants (dépenses en rouge doux) */}
      <div className="space-y-2">
        {budgetData.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: step >= i + 3 ? 1 : 0,
              y: step >= i + 3 ? 0 : 8
            }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Catégorie principale */}
            <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-2 items-center bg-secondary rounded-lg px-3 py-1.5">
              <span className="font-medium text-foreground text-xs truncate">{cat.category}</span>
              <span className="text-muted-foreground font-bold text-xs text-center">{cat.april}</span>
              <span className={`font-bold text-xs text-center ${cat.changed ? 'text-foreground' : 'text-muted-foreground'}`}>
                {cat.may}
              </span>
              <span className={`font-bold text-xs text-center ${cat.changed ? 'text-foreground' : 'text-muted-foreground'}`}>
                {cat.june}
              </span>
            </div>

            {/* Sous-catégories */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= i + 3 ? 1 : 0 }}
              transition={{
                duration: 0.25,
                delay: 0.15,
                ease: "easeOut"
              }}
              className="mt-1 space-y-0.5"
            >
              {cat.subs.map((sub, j) => (
                <div
                  key={j}
                  className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-2 items-center text-[11px] px-3 py-0.5"
                >
                  <span className="text-muted-foreground pl-1 truncate">{sub.label}</span>
                  <span className="text-muted-foreground/70 text-center">{sub.april}</span>
                  <span className={`text-center ${sub.changed ? 'text-foreground font-medium' : 'text-muted-foreground/70'}`}>
                    {sub.may}
                  </span>
                  <span className={`text-center ${sub.changed ? 'text-foreground font-medium' : 'text-muted-foreground/70'}`}>
                    {sub.june}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Ligne Total */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: step >= 6 ? 1 : 0,
          y: step >= 6 ? 0 : 8
        }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-2 items-center mt-3 pt-2 border-t border-border/30 px-3"
      >
        <span className="font-semibold text-foreground text-xs">{t('fonctionnalites.animations.total')}</span>
        <span className="text-muted-foreground font-bold text-xs text-center">{totals.april}</span>
        <span className="text-muted-foreground font-bold text-xs text-center">{totals.may}</span>
        <span className="text-muted-foreground font-bold text-xs text-center">{totals.june}</span>
      </motion.div>

      {/* Ligne Reste disponible */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: step >= 7 ? 1 : 0,
          y: step >= 7 ? 0 : 8
        }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-2 items-center mt-2 bg-primary/10 rounded-lg px-3 py-1.5"
      >
        <span className="font-semibold text-primary text-xs">{t('fonctionnalites.animations.remaining')}</span>
        <span className="text-primary font-bold text-xs text-center">{remaining.april}</span>
        <span className="text-primary font-bold text-xs text-center">{remaining.may}</span>
        <span className="text-primary font-bold text-xs text-center">{remaining.june}</span>
      </motion.div>

      {/* Texte de clôture */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 8 ? 1 : 0 }}
        transition={{
          duration: 0.3,
          delay: step >= 8 ? 0.2 : 0,
          ease: "easeOut"
        }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.budgetClosing')}
      </motion.p>
    </div>
  );
};

// Fixed transactions animation - Monthly recurring charges with horizontal scroll between months
const FixedTransactionsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  
  const income = 2100;
  
  const months = [
    { name: t('fonctionnalites.animations.april'), hasStreaming: true },
    { name: t('fonctionnalites.animations.may'), hasStreaming: true },
    { name: t('fonctionnalites.animations.june'), hasStreaming: false }
  ];
  
  const baseTransactions = [
    { day: "01", label: t('fonctionnalites.animations.rent'), amount: 750 },
    { day: "05", label: t('fonctionnalites.animations.insurance'), amount: 50 },
    { day: "15", label: t('fonctionnalites.animations.electricity'), amount: 80 }
  ];
  
  const streamingTransaction = { day: "20", label: "Streaming", amount: 20 };
  
  // Calculate totals per month
  const getMonthData = (monthIndex: number) => {
    const hasStreaming = months[monthIndex].hasStreaming;
    const transactions = hasStreaming 
      ? [...baseTransactions, streamingTransaction]
      : baseTransactions;
    const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const percentage = Math.round((total / income) * 100);
    return { transactions, total, percentage };
  };
  
  const monthData = [getMonthData(0), getMonthData(1), getMonthData(2)];
  const currentData = monthData[currentMonth];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setCurrentMonth(0);
      return;
    }
    
    // Animation: show transactions, then cycle through months
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1600), // Show streaming if applicable
      setTimeout(() => setStep(5), 2200), // Show summary
      setTimeout(() => setCurrentMonth(1), 3000), // Switch to May
      setTimeout(() => setCurrentMonth(2), 4200), // Switch to June
      setTimeout(() => setStep(6), 5000) // Show closing text
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  return (
    <div className="mt-4 mb-2">
      {/* Month header with horizontal indicator */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center justify-center gap-4 mb-4"
      >
        {months.map((month, i) => (
          <motion.span
            key={i}
            animate={{
              opacity: currentMonth === i ? 1 : 0.4,
              scale: currentMonth === i ? 1.05 : 1
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              currentMonth === i ? 'bg-primary/15 text-primary' : 'text-muted-foreground'
            }`}
          >
            {month.name}
          </motion.span>
        ))}
      </motion.div>

      {/* Fixed transactions list */}
      <div className="space-y-2">
        {baseTransactions.map((tx, i) => (
          <motion.div
            key={`${currentMonth}-${i}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: step > i ? 1 : 0,
              x: step > i ? 0 : 20
            }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2"
          >
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {tx.day}
            </span>
            <span className="flex-1 text-sm text-foreground">{tx.label}</span>
            <span className="font-bold text-sm text-muted-foreground">
              -{tx.amount} €
            </span>
          </motion.div>
        ))}
        
        {/* Streaming - appears in April/May, disappears in June */}
        <AnimatePresence mode="wait">
          {months[currentMonth].hasStreaming && step >= 4 && (
            <motion.div
              key={`streaming-${currentMonth}`}
              initial={{ opacity: 0, x: 20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2"
            >
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {streamingTransaction.day}
              </span>
              <span className="flex-1 text-sm text-foreground">{streamingTransaction.label}</span>
              <span className="font-bold text-sm text-muted-foreground">
                -{streamingTransaction.amount} €
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary: Total fixed expenses + % of income */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 10 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-4 pt-3 border-t border-border/30"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.fixedExpensesTotal')}</span>
          <motion.span 
            key={`total-${currentMonth}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-bold text-muted-foreground"
          >
            {currentData.total} € / {income} €
          </motion.span>
        </div>
        
        {/* Progress bar showing % of income */}
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${currentData.percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        <motion.div 
          key={`percentage-${currentMonth}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-right text-[10px] text-muted-foreground"
        >
          <span className="font-semibold text-primary">{currentData.percentage}%</span> {t('fonctionnalites.animations.ofIncome')}
        </motion.div>
      </motion.div>

      {/* Evolution timeline - like patrimoine */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 10 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="mt-4"
      >
        <div className="flex items-center gap-1">
          {monthData.map((data, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: currentMonth >= i ? 1 : 0.3, 
                  scale: currentMonth === i ? 1.1 : 1 
                }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center"
              >
                <span className={`text-[7px] ${currentMonth === i ? 'text-primary font-medium' : 'text-muted-foreground/60'}`}>
                  {months[i].name}
                </span>
                <motion.div 
                  className={`w-2 h-2 rounded-full ${currentMonth === i ? 'bg-primary' : 'bg-primary/30'}`}
                  animate={currentMonth === i ? { 
                    boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.4)", "0 0 0 4px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.4)"] 
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className={`text-[7px] ${currentMonth === i ? 'text-primary font-semibold' : 'text-muted-foreground/80'}`}>
                  {data.percentage}%
                </span>
              </motion.div>
              {i < monthData.length - 1 && (
                <motion.div 
                  className={`flex-1 h-0.5 ${currentMonth > i ? 'bg-primary/50' : 'bg-primary/20'}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentMonth > i ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Variation indicator */}
        <AnimatePresence>
          {currentMonth === 2 && step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 flex items-center justify-center gap-2"
            >
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                -20 € ({t('fonctionnalites.animations.streamingCanceled')})
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Closing text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 6 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.fixedClosing')}
      </motion.p>
    </div>
  );
};

// Daily transactions templates animation - Form with dropdown and auto-fill
const DailyTransactionsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  
  const favoriteOperations = [
    { label: t('fonctionnalites.animations.shopping'), category: t('fonctionnalites.animations.food'), bank: "Compte courant" },
    { label: t('fonctionnalites.animations.cornerCoffee'), category: t('fonctionnalites.animations.leisure'), bank: "Compte courant" },
    { label: t('fonctionnalites.animations.gas'), category: t('fonctionnalites.animations.transport'), bank: "Compte courant" }
  ];

  const selectedOperation = favoriteOperations[0]; // "Course" selected
  const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    
    // Animation steps:
    // 1: Show empty form
    // 2: Open dropdown
    // 3: Select "Course"
    // 4: Auto-fill fields, highlight amount
    // 5: Enter amount
    // 6: Transaction complete
    // 7: Closing text
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2400),
      setTimeout(() => setStep(5), 3200),
      setTimeout(() => setStep(6), 4000),
      setTimeout(() => setStep(7), 4600)
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  return (
    <div className="mt-4 mb-2">
      {/* Form container */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-secondary/50 rounded-xl p-4 space-y-3"
      >
        {/* Dropdown field */}
        <div className="space-y-1">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wide">
            {t('fonctionnalites.animations.favoriteOperations')}
          </label>
          <motion.div
            animate={{
              borderColor: step === 2 ? "hsl(var(--primary))" : "hsl(var(--border))"
            }}
            className="bg-background border rounded-lg px-3 py-2 text-sm relative"
          >
            <div className="flex items-center justify-between">
              <span className={step >= 3 ? "text-foreground" : "text-muted-foreground/50"}>
                {step >= 3 ? selectedOperation.label : t('fonctionnalites.animations.selectOperation')}
              </span>
              <motion.svg
                animate={{ rotate: step === 2 ? 180 : 0 }}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                className="text-muted-foreground"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </div>

            {/* Dropdown options */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  {favoriteOperations.map((op, i) => (
                    <motion.div
                      key={i}
                      initial={{ backgroundColor: "transparent" }}
                      animate={{ backgroundColor: i === 0 ? "hsl(var(--primary) / 0.1)" : "transparent" }}
                      className="px-3 py-2 text-sm text-foreground hover:bg-muted/50 cursor-pointer"
                    >
                      {op.label}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Other fields in 2-column grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Name field */}
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {t('fonctionnalites.animations.name')}
            </label>
            <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <span className={step >= 4 ? "text-foreground" : "text-muted-foreground/30"}>
                {step >= 4 ? selectedOperation.label : "—"}
              </span>
            </div>
          </div>

          {/* Date field */}
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {t('fonctionnalites.animations.date')}
            </label>
            <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <span className={step >= 4 ? "text-foreground" : "text-muted-foreground/30"}>
                {step >= 4 ? today : "—"}
              </span>
            </div>
          </div>

          {/* Category field */}
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {t('fonctionnalites.animations.category')}
            </label>
            <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <span className={step >= 4 ? "text-foreground" : "text-muted-foreground/30"}>
                {step >= 4 ? selectedOperation.category : "—"}
              </span>
            </div>
          </div>

          {/* Bank field */}
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {t('fonctionnalites.animations.bank')}
            </label>
            <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <span className={step >= 4 ? "text-foreground" : "text-muted-foreground/30"}>
                {step >= 4 ? selectedOperation.bank : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Amount field - highlighted when waiting for input */}
        <div className="space-y-1">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wide">
            {t('fonctionnalites.animations.amount')}
          </label>
          <motion.div
            animate={{
              borderColor: step === 4 ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow: step === 4 ? "0 0 0 2px hsl(var(--primary) / 0.2)" : "none"
            }}
            transition={{ duration: 0.3 }}
            className="bg-background border rounded-lg px-3 py-2 text-sm"
          >
            <span className={step >= 5 ? "text-foreground font-medium" : "text-muted-foreground/30"}>
              {step >= 5 ? "20 €" : "—"}
            </span>
          </motion.div>
        </div>

        {/* Validation indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: step >= 6 ? 1 : 0, scale: step >= 6 ? 1 : 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xs text-primary font-medium">{t('fonctionnalites.animations.transactionComplete')}</span>
        </motion.div>
      </motion.div>

      {/* Closing text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 7 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.dailyClosing')}
      </motion.p>
    </div>
  );
};

// Gauge animation - Budget "Resto" with transaction form and mini gauge
const GaugeAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  
  // Budget Resto: 300€ total
  // Dépensé: 165€ (55%), En-Cours: 35€ (11.6%), Reste: 100€ (33.3%)
  const budgetTotal = 300;
  const spent = 165;
  const inProgress = 35;
  const remaining = 100;
  
  const spentPercent = (spent / budgetTotal) * 100; // 55%
  const inProgressPercent = (inProgress / budgetTotal) * 100; // 11.6%
  const remainingPercent = (remaining / budgetTotal) * 100; // 33.3%

  const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation steps:
    // 1: Show main gauge with "spent"
    // 2: Show "in progress" segment
    // 3: Show "remaining" segment + legend
    // 4: Show transaction form
    // 5: Show mini gauge under amount field
    // 6: Closing text
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1600),
      setTimeout(() => setStep(4), 2400),
      setTimeout(() => setStep(5), 3200),
      setTimeout(() => setStep(6), 4000)
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  return (
    <div className="mt-4 mb-2">
      {/* Budget label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center mb-3"
      >
        <span className="text-sm font-medium text-foreground">{t('fonctionnalites.animations.budgetResto')}</span>
        <span className="text-xs text-muted-foreground ml-2">({budgetTotal} €)</span>
      </motion.div>

      {/* Main Gauge bar */}
      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: step >= 1 ? `${spentPercent}%` : 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80" 
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: step >= 2 ? `${inProgressPercent}%` : 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          style={{ left: `${spentPercent}%` }}
          className="absolute top-0 h-full bg-gradient-to-r from-primary/60 to-primary/40"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            left: `${spentPercent + inProgressPercent}%`,
            width: `${remainingPercent}%`
          }}
          className="absolute top-0 h-full bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/10" 
        />
      </div>

      {/* Legend with specific values */}
      <div className="flex justify-between mt-3 text-xs">
        <motion.div 
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-primary font-medium">{t('fonctionnalites.animations.spent')}</span>
          </div>
          <span className="text-primary font-bold">{spent} € <span className="font-normal text-primary/70">(55%)</span></span>
        </motion.div>
        <motion.div 
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-primary/80 font-medium">{t('fonctionnalites.animations.inProgress')}</span>
          </div>
          <span className="text-primary/80 font-bold">{inProgress} € <span className="font-normal text-primary/60">(11,6%)</span></span>
        </motion.div>
        <motion.div 
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            <span className="text-muted-foreground font-medium">{t('fonctionnalites.animations.remaining')}</span>
          </div>
          <span className="text-muted-foreground font-bold">{remaining} € <span className="font-normal text-muted-foreground/70">(33,3%)</span></span>
        </motion.div>
      </div>

      {/* Transaction Form with mini gauge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-5 bg-secondary/50 rounded-xl p-3 space-y-2"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
            <span className="text-xs">🍽️</span>
          </div>
          <span className="text-xs font-medium text-foreground">{t('fonctionnalites.animations.newExpense')}</span>
        </div>

        {/* Compact form fields */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-0.5">
            <label className="text-[9px] text-muted-foreground uppercase">{t('fonctionnalites.animations.name')}</label>
            <div className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground">
              {t('fonctionnalites.animations.restaurant')}
            </div>
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] text-muted-foreground uppercase">{t('fonctionnalites.animations.date')}</label>
            <div className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground">
              {today}
            </div>
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] text-muted-foreground uppercase">{t('fonctionnalites.animations.category')}</label>
            <div className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground">
              {t('fonctionnalites.animations.food')}
            </div>
          </div>
        </div>

        {/* Amount field with highlight */}
        <div className="space-y-0.5">
          <label className="text-[9px] text-muted-foreground uppercase">{t('fonctionnalites.animations.amount')}</label>
          <div className="bg-background border border-primary/50 rounded px-2 py-1.5 text-sm font-medium text-foreground">
            35 €
          </div>
        </div>

        {/* Mini gauge under amount field */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: step >= 5 ? 1 : 0, height: step >= 5 ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="bg-background/80 rounded-lg p-2 mt-1 border border-border/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-medium text-foreground">{t('fonctionnalites.animations.budgetResto')}</span>
              <span className="text-[10px] text-muted-foreground">{budgetTotal} €</span>
            </div>
            
            {/* Mini gauge bar */}
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80"
                style={{ width: `${spentPercent}%` }}
              />
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-primary/60 to-primary/40"
                style={{ left: `${spentPercent}%`, width: `${inProgressPercent}%` }}
              />
              <div 
                className="absolute top-0 h-full bg-muted-foreground/15"
                style={{ left: `${spentPercent + inProgressPercent}%`, width: `${remainingPercent}%` }}
              />
            </div>

            {/* Mini legend */}
            <div className="flex justify-between mt-1.5 text-[9px]">
              <span className="text-primary">{t('fonctionnalites.animations.spent')}: {spent}€</span>
              <span className="text-primary/70">{t('fonctionnalites.animations.inProgress')}: {inProgress}€</span>
              <span className="text-muted-foreground">{t('fonctionnalites.animations.remaining')}: {remaining}€</span>
            </div>
          </div>
          
          {/* Indicator message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center gap-1.5 mt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-[10px] text-muted-foreground italic">{t('fonctionnalites.animations.gaugeEachEntry')}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Closing text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 6 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.gaugeClosing')}
      </motion.p>
    </div>
  );
};

// Rituals/habits animation - calm progression with upcoming rituals
const RitualsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState([false, false, false, false, false, false, false]);
  
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setChecks([false, false, false, false, false, false, false]);
      return;
    }
    
    // Progressive animation: daily ritual → checks → streak → upcoming rituals → closing
    const timers = [
      setTimeout(() => setStep(1), 400), // Show daily ritual section
      ...checks.map((_, i) => setTimeout(() => {
        setChecks(c => {
          const n = [...c];
          n[i] = true;
          return n;
        });
      }, 600 + i * 250)),
      setTimeout(() => setStep(2), 600 + 7 * 250 + 300), // Show streak
      setTimeout(() => setStep(3), 600 + 7 * 250 + 800), // Show upcoming rituals
      setTimeout(() => setStep(4), 600 + 7 * 250 + 1600) // Show closing text
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const completedCount = checks.filter(Boolean).length;
  
  return (
    <div className="mt-4 mb-2">
      {/* Daily ritual section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-4"
      >
        <div className="text-xs text-foreground font-medium mb-2 text-center flex items-center justify-center gap-1.5">
          <ClipboardCheck className="w-3.5 h-3.5 text-primary" />
          {t('fonctionnalites.animations.dailyRitual')}
        </div>
        <div className="flex justify-center gap-2">
          {days.map((d, i) => (
            <motion.div 
              key={i} 
              animate={{
                backgroundColor: checks[i] ? "hsl(var(--primary))" : "hsl(var(--muted))"
              }} 
              transition={{
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1]
              }} 
              className="w-8 h-8 rounded-full flex items-center justify-center"
            >
              {checks[i] ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              ) : (
                <span className="text-xs font-medium text-muted-foreground">{d}</span>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* 7 consecutive days message */}
        <motion.div 
          animate={{ opacity: step >= 2 && completedCount >= 7 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-3 text-center text-xs text-primary font-medium flex items-center justify-center gap-1.5"
        >
          <Flame className="w-3.5 h-3.5" />
          {t('fonctionnalites.animations.consecutiveDays')}
        </motion.div>
      </motion.div>

      {/* Upcoming rituals section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-secondary/50 rounded-xl p-4 mt-2"
      >
        <div className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-primary" />
          {t('fonctionnalites.animations.upcomingRituals')}
        </div>
        
        <div className="space-y-2">
          {/* Weekly ritual */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -8 }}
            transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
            className="flex items-center justify-between bg-background/60 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/60" />
              <span className="text-xs text-foreground">{t('fonctionnalites.animations.weeklyRitual')}</span>
            </div>
            <span className="text-xs text-muted-foreground">{t('fonctionnalites.animations.weeklyDate')}</span>
          </motion.div>
          
          {/* Monthly ritual */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -8 }}
            transition={{ duration: 0.25, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-between bg-background/60 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-foreground">{t('fonctionnalites.animations.monthlyRitual')}</span>
            </div>
            <span className="text-xs text-muted-foreground">{t('fonctionnalites.animations.monthlyDate')}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Closing text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.ritualsClosing')}
      </motion.p>
    </div>
  );
};

// Decision support animation - Budget view focused on May with decision indicators
const IndicatorsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation: header → rows progressively → highlight exceeded → closing
    const timers = [
      setTimeout(() => setStep(1), 400),   // Header
      setTimeout(() => setStep(2), 800),   // Housing row
      setTimeout(() => setStep(3), 1200),  // Food row
      setTimeout(() => setStep(4), 1600),  // Leisure row
      setTimeout(() => setStep(5), 2000),  // Outings row (exceeded)
      setTimeout(() => setStep(6), 2600),  // Closing text
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Budget data for May - single month decision view
  const budgetRows = [
    { 
      category: t('fonctionnalites.animations.housing'), 
      spent: "800 €", 
      budget: "800 €", 
      percent: 100, 
      available: "–",
      isExceeded: false,
      isNeutral: true
    },
    { 
      category: t('fonctionnalites.animations.food'), 
      spent: "350 €", 
      budget: "500 €", 
      percent: 70, 
      available: "150 €",
      isExceeded: false,
      isNeutral: false
    },
    { 
      category: t('fonctionnalites.animations.leisure'), 
      spent: "210 €", 
      budget: "300 €", 
      percent: 70, 
      available: "90 €",
      isExceeded: false,
      isNeutral: false
    },
    { 
      category: t('fonctionnalites.animations.outings'), 
      spent: "345 €", 
      budget: "300 €", 
      percent: 115, 
      available: "–45 €",
      isExceeded: true,
      isNeutral: false
    }
  ];

  return (
    <div className="mt-4 mb-2">
      {/* Month header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-3"
      >
        <span className="text-sm font-semibold text-primary">{t('fonctionnalites.animations.may')}</span>
      </motion.div>

      {/* Table header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="grid grid-cols-[1fr_60px_60px_55px_55px] gap-1 mb-2 pb-2 border-b border-border/30 text-[10px] font-semibold text-muted-foreground"
      >
        <span>{t('fonctionnalites.animations.categories')}</span>
        <span className="text-center">{t('fonctionnalites.animations.spent')}</span>
        <span className="text-center">{t('fonctionnalites.animations.budgetLabel')}</span>
        <span className="text-center">{t('fonctionnalites.animations.percentConsumed')}</span>
        <span className="text-center">{t('fonctionnalites.animations.available')}</span>
      </motion.div>

      {/* Budget rows */}
      <div className="space-y-1.5">
        {budgetRows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ 
              opacity: step >= i + 2 ? 1 : 0, 
              y: step >= i + 2 ? 0 : 8 
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`grid grid-cols-[1fr_60px_60px_55px_55px] gap-1 items-center rounded-lg px-2 py-1.5 ${
              row.isExceeded ? 'bg-rose-500/10' : row.isNeutral ? 'bg-secondary' : 'bg-background'
            }`}
          >
            <span className={`text-xs font-medium truncate ${
              row.isExceeded ? 'text-rose-600 dark:text-rose-400' : 'text-foreground'
            }`}>
              {row.category}
            </span>
            <span className={`text-xs text-center ${
              row.isExceeded ? 'text-rose-600 dark:text-rose-400 font-medium' : 'text-muted-foreground'
            }`}>
              {row.spent}
            </span>
            <span className="text-xs text-center text-muted-foreground">
              {row.budget}
            </span>
            <span className={`text-[11px] text-center font-medium px-1.5 py-0.5 rounded ${
              row.isExceeded 
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                : row.percent === 100 
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary/10 text-primary'
            }`}>
              {row.percent}%
            </span>
            <span className={`text-xs text-center font-medium ${
              row.isExceeded 
                ? 'text-rose-600 dark:text-rose-400' 
                : row.available === "–" 
                  ? 'text-muted-foreground' 
                  : 'text-foreground'
            }`}>
              {row.available}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Closing text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 6 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.indicatorsClosing')}
      </motion.p>
    </div>
  );
};

// Future Feature Card component with expandable animation
const FutureFeatureCard = ({
  icon,
  title,
  promise,
  delay,
  sounds,
  animation,
  t
}: {
  icon: "folder-kanban" | "users" | "building-2";
  title: string;
  promise: string;
  delay: number;
  sounds: ReturnType<typeof useSoundEffects>;
  animation: React.ReactNode;
  t: (key: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const IconComponent = icon === "folder-kanban" ? FolderKanban : icon === "users" ? Users : Building2;

  return (
    <div
      onClick={handleToggle}
      className={`group bg-card/60 border border-border/50 rounded-xl p-6 relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isOpen ? 'shadow-lg shadow-primary/10 border-primary/30 h-auto' : 'hover:shadow-lg hover:shadow-primary/5 h-[160px]'
      }`}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* À venir badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="absolute top-4 right-4 text-[10px] font-medium text-muted-foreground/60 bg-muted/50 px-2 py-1 rounded-full"
      >
        {t('fonctionnalites.comingSoon')}
      </motion.span>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            animate={{ rotate: isOpen ? [0, 5, -5, 0] : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
          >
            <motion.div
              animate={{ 
                opacity: isOpen ? 1 : 0.6,
                scale: isOpen ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>

          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-foreground/80">
              {title}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground/50"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          {promise}
        </p>
      </div>

      {/* Expandable animation area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pt-4 mt-4 border-t border-border/30"
            >
              {animation}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 0.5 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/50"
      >
        {t('fonctionnalites.clickForPreview')}
      </motion.div>
    </div>
  );
};

// Animation renderer
const FeatureAnimation = ({
  type,
  isOpen,
  t
}: {
  type: AnimationType;
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  switch (type) {
    case "onboarding":
      return <OnboardingAnimation isOpen={isOpen} t={t} />;
    case "budget":
      return <BudgetAnimation isOpen={isOpen} t={t} />;
    case "fixed":
      return <FixedTransactionsAnimation isOpen={isOpen} t={t} />;
    case "daily":
      return <DailyTransactionsAnimation isOpen={isOpen} t={t} />;
    case "gauge":
      return <GaugeAnimation isOpen={isOpen} t={t} />;
    case "rituals":
      return <RitualsAnimation isOpen={isOpen} t={t} />;
    case "indicators":
      return <IndicatorsAnimation isOpen={isOpen} t={t} />;
    default:
      return null;
  }
};

// Get animation variants based on direction - calm, professional easing
const getCardAnimationVariants = (direction: AnimationDirection, isFuture: boolean = false) => {
  // Future features: slower, more subtle animations
  const baseDuration = isFuture ? 0.4 : 0.3;
  const baseOpacity = isFuture ? 0.95 : 1;
  
  switch (direction) {
    case "horizontal":
      return {
        hidden: {
          opacity: 0,
          x: -15
        },
        visible: {
          opacity: baseOpacity,
          x: 0
        },
        exit: {
          opacity: 0,
          x: 15
        }
      };
    case "vertical":
      return {
        hidden: {
          opacity: 0,
          y: -10
        },
        visible: {
          opacity: baseOpacity,
          y: 0
        },
        exit: {
          opacity: 0,
          y: 10
        }
      };
    case "pulse":
      return {
        hidden: {
          opacity: 0
        },
        visible: {
          opacity: baseOpacity
        },
        exit: {
          opacity: 0
        }
      };
  }
};
const FeatureCard = ({
  feature,
  isOpen,
  onToggle,
  sounds,
  isLarge = false,
  isExplored = false,
  t
}: {
  feature: Feature;
  isOpen: boolean;
  onToggle: () => void;
  sounds: ReturnType<typeof useSoundEffects>;
  isLarge?: boolean;
  isExplored?: boolean;
  t: (key: string) => string;
}) => {
  const handleClick = () => {
    onToggle();
  };
  const variants = getCardAnimationVariants(feature.animationDirection);
  
  // Hauteur uniforme pour toutes les cartes fermées
  const closedHeight = 'h-[120px]';
  
  // Icône Lucide ou emoji de fallback
  const IconComponent = feature.icon;
  
  return (
    <motion.div 
      onClick={handleClick} 
      layout
      transition={{
        layout: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }}
      className={`cursor-pointer rounded-2xl border ${isOpen ? 'border-primary/30 shadow-md' : 'border-border/40 hover:border-border/60'} bg-card ${isLarge ? 'p-6' : 'p-5'} transition-colors duration-250 hover:shadow-sm relative ${isExplored && !isOpen ? 'opacity-90' : ''} ${isOpen ? '' : closedHeight}`}
    >
      {/* Badge "Découvert" - plus subtil */}
      <AnimatePresence>
        {isExplored && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-full"
          >
            <Check className="w-2.5 h-2.5" />
            <span>{t('fonctionnalites.discovered')}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-start gap-4">
        {/* Icône Lucide professionnelle ou emoji de fallback */}
        <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          {IconComponent ? (
            <IconComponent className="w-5 h-5 text-primary" strokeWidth={1.5} />
          ) : (
            <span className="text-2xl">{feature.emoji}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header : titre + chevron */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground leading-tight">
              {feature.title}
            </h3>
            
            {/* Chevron avec rotation calme */}
            <motion.div 
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-shrink-0 text-muted-foreground/60"
            >
              <svg width="18" height="18" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
          
          {/* Micro-promesse - visible uniquement en état fermé */}
          <motion.p 
            animate={{
              opacity: isOpen ? 0 : 1,
              height: isOpen ? 0 : 'auto'
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-sm text-muted-foreground mt-1.5 leading-relaxed overflow-hidden"
          >
            {feature.microPromise}
          </motion.p>
          
          {/* Indice d'interaction - uniquement en état fermé */}
          <motion.span
            animate={{ opacity: isOpen ? 0 : 0.4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="text-[10px] text-muted-foreground/50 mt-2 block"
          >
            {t('fonctionnalites.clickForPreview')}
          </motion.span>
        </div>
      </div>
      
      {/* Contenu déplié - animations calmes et progressives */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.1, 0.25, 1], // ease-out doux
              opacity: { duration: 0.25, delay: 0.05 }
            }} 
            className="overflow-hidden"
          >
            {/* Animation du contenu avec apparition progressive */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ 
                duration: 0.25, 
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <FeatureAnimation type={feature.animation} isOpen={isOpen} t={t} />
            </motion.div>
            
            {/* Texte détaillé avec délai supplémentaire */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2, 
                delay: 0.2,
                ease: "easeOut"
              }}
              className="mt-4 text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/30"
            >
              {feature.details}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const Fonctionnalites = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const sounds = useSoundEffects();
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [exploredCards, setExploredCards] = useState<Set<string>>(new Set());
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featureGroups: FeatureGroup[] = [{
    label: t('fonctionnalites.step1'),
    title: t('fonctionnalites.start'),
    isLarge: true,
    features: [{
      icon: Crosshair,
      title: t('fonctionnalites.features.onboarding.title'),
      microPromise: t('fonctionnalites.features.onboarding.microPromise'),
      details: t('fonctionnalites.features.onboarding.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "onboarding",
      animationDirection: "horizontal"
    }, {
      icon: LayoutGrid,
      title: t('fonctionnalites.features.budget.title'),
      microPromise: t('fonctionnalites.features.budget.microPromise'),
      details: t('fonctionnalites.features.budget.details'),
      bgColor: "bg-secondary",
      borderColor: "border-primary/15",
      textColor: "text-primary",
      animation: "budget",
      animationDirection: "horizontal"
    }]
  }, {
    label: t('fonctionnalites.step2'),
    title: t('fonctionnalites.follow'),
    features: [{
      icon: RefreshCcw,
      title: t('fonctionnalites.features.fixed.title'),
      microPromise: t('fonctionnalites.features.fixed.microPromise'),
      details: t('fonctionnalites.features.fixed.details'),
      bgColor: "bg-card",
      borderColor: "border-border",
      textColor: "text-foreground",
      animation: "fixed",
      animationDirection: "vertical"
    }, {
      icon: ClipboardList,
      title: t('fonctionnalites.features.daily.title'),
      microPromise: t('fonctionnalites.features.daily.microPromise'),
      details: t('fonctionnalites.features.daily.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "daily",
      animationDirection: "vertical"
    }, {
      icon: Gauge,
      title: t('fonctionnalites.features.level.title'),
      microPromise: t('fonctionnalites.features.level.microPromise'),
      details: t('fonctionnalites.features.level.details'),
      bgColor: "bg-secondary",
      borderColor: "border-primary/15",
      textColor: "text-foreground",
      animation: "gauge",
      animationDirection: "pulse"
    }]
  }, {
    label: t('fonctionnalites.step3'),
    title: t('fonctionnalites.adjustLast'),
    features: [{
      icon: CalendarCheck,
      title: t('fonctionnalites.features.rituals.title'),
      microPromise: t('fonctionnalites.features.rituals.microPromise'),
      details: t('fonctionnalites.features.rituals.details'),
      bgColor: "bg-card",
      borderColor: "border-border",
      textColor: "text-foreground",
      animation: "rituals",
      animationDirection: "pulse"
    }, {
      icon: BarChart3,
      title: t('fonctionnalites.features.indicators.title'),
      microPromise: t('fonctionnalites.features.indicators.microPromise'),
      details: t('fonctionnalites.features.indicators.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "indicators",
      animationDirection: "pulse"
    }]
  }];
  const handleToggleCard = (groupIndex: number, featureIndex: number) => {
    const cardId = `${groupIndex}-${featureIndex}`;
    // Mark as explored when opening
    if (openCardId !== cardId) {
      setExploredCards(prev => new Set(prev).add(cardId));
    }
    setOpenCardId(prev => prev === cardId ? null : cardId);
  };

  // Track which group is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = groupRefs.current.length - 1; i >= 0; i--) {
        const element = groupRefs.current[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveGroupIndex(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="min-h-screen bg-background">
      <SEO
        title="Fonctionnalités - Comment bien gérer son budget"
        description="Découvrez les fonctionnalités Steero pour mieux gérer votre argent : budget personnalisé, saisie intuitive des dépenses, rituels financiers. Plus simple qu'un tableau Excel, plus efficace que les apps bancaires."
        keywords="fonctionnalités gestion budget, application budget, gérer son argent facilement, alternative excel budget, suivi dépenses, rituel financier"
        canonical="/fonctionnalites"
      />
      <Header />
      
      {/* Progress Sidebar */}
      <ProgressSidebar groups={featureGroups} activeIndex={activeGroupIndex} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-gradient overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              ease: "easeOut"
            }} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('fonctionnalites.heroTitle')} <span className="text-gradient">{t('fonctionnalites.heroTitleHighlight')}</span>
            </motion.h1>
            <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut"
            }} className="text-lg text-muted-foreground mb-8">
              {t('fonctionnalites.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Feature Groups */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-28 space-y-24">
          {featureGroups.map((group, groupIndex) => <motion.div key={groupIndex} id={`group-${groupIndex}`} ref={el => groupRefs.current[groupIndex] = el} initial={{
          opacity: 0,
          y: 60,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }} className="relative scroll-mt-32">
              {/* Decorative connector line between groups */}
              {groupIndex < featureGroups.length - 1 && <motion.div initial={{
            scaleY: 0,
            opacity: 0
          }} whileInView={{
            scaleY: 1,
            opacity: 1
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut"
          }} className="absolute left-1/2 -bottom-16 w-px h-12 bg-gradient-to-b from-primary/30 to-transparent origin-top" />}
              
              {/* Group Header */}
              <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="flex items-center gap-4 mb-8">
                <motion.span initial={{
              scale: 0,
              rotate: -180
            }} whileInView={{
              scale: 1,
              rotate: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }} className="text-xs font-semibold text-primary/60 uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                  {group.label}
                </motion.span>
                <motion.h2 initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.4
            }} className="text-2xl md:text-3xl font-bold text-foreground">
                  {group.title}
                </motion.h2>
              </motion.div>
              
              {/* Feature Cards Grid with staggered animation */}
              <div className={`grid gap-6 items-start ${group.isLarge ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {group.features.map((feature, featureIndex) => <motion.div key={featureIndex} layout initial={{
              opacity: 0,
              y: 40,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.5,
              delay: 0.2 + featureIndex * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}>
                    <FeatureCard feature={feature} isOpen={openCardId === `${groupIndex}-${featureIndex}`} onToggle={() => handleToggleCard(groupIndex, featureIndex)} sounds={sounds} isLarge={group.isLarge} isExplored={exploredCards.has(`${groupIndex}-${featureIndex}`)} t={t} />
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>
      </section>

      {/* Future Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-28">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-4">
              {t('fonctionnalites.futureTitle')}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t('fonctionnalites.futureSubtitle')}
            </p>
          </motion.div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 items-start">
            {/* Projets financiers */}
            <FutureFeatureCard
              icon="folder-kanban"
              title={t('fonctionnalites.futureFeatures.projects.title')}
              promise={t('fonctionnalites.futureFeatures.projects.promise')}
              delay={0.1}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative w-full flex flex-col items-center gap-3">
                  {/* Projet Vacances */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-4"
                  >
                    {/* Header avec titre et montant */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Plane className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{t('fonctionnalites.animations.projectVacances')}</span>
                      </div>
                      <motion.span 
                        className="text-base font-bold text-primary"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        2 300 €
                      </motion.span>
                    </div>

                    {/* Progress bar */}
                    <motion.div 
                      className="h-2 bg-muted rounded-full overflow-hidden mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                    <motion.div 
                      className="flex justify-between text-[10px] text-muted-foreground mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span>{t('fonctionnalites.animations.projectConsumed')}: <span className="text-primary font-medium">1 495 €</span></span>
                      <span>{t('fonctionnalites.animations.projectRemaining')}: <span className="font-medium">805 €</span></span>
                    </motion.div>

                    {/* Liste des budgets avec montants */}
                    <div className="space-y-1.5">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{t('fonctionnalites.animations.projectLodging')}</span>
                          <span className="text-muted-foreground/50">({t('fonctionnalites.animations.budgetLeisure')})</span>
                        </div>
                        <span className="text-foreground/80 font-medium">1 100 €</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{t('fonctionnalites.animations.projectTransport')}</span>
                          <span className="text-muted-foreground/50">({t('fonctionnalites.animations.budgetTransport')})</span>
                        </div>
                        <span className="text-foreground/80 font-medium">650 €</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{t('fonctionnalites.animations.projectOnSite')}</span>
                          <span className="text-muted-foreground/50">({t('fonctionnalites.animations.budgetDaily')})</span>
                        </div>
                        <span className="text-foreground/80 font-medium">550 €</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Texte de clôture */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-[11px] text-center text-muted-foreground/80 italic px-2"
                  >
                    {t('fonctionnalites.animations.projectClosing')}
                  </motion.p>
                </div>
              }
            />

            {/* Tiers & avances */}
            <FutureFeatureCard
              icon="users"
              title={t('fonctionnalites.futureFeatures.tiers.title')}
              promise={t('fonctionnalites.futureFeatures.tiers.promise')}
              delay={0.2}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative w-full flex flex-col gap-3">
                  {/* Section: Mes avoirs - Ce qu'on me doit */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-1.5"
                  >
                    <p className="text-[10px] font-medium text-foreground/70 mb-1">{t('fonctionnalites.animations.tiersOwedToMe')}</p>
                    
                    {/* Marie - Vacances */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">Marie</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersVacationShare')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+45 €</span>
                    </motion.div>

                    {/* Lucas - Restaurant */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">Lucas</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersRestaurant')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+32 €</span>
                    </motion.div>

                    {/* Employeur - Notes de frais */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🏢</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.tiersEmployer')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersExpenseReports')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+250 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Section: Mes dettes - Ce que je dois */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="space-y-1.5"
                  >
                    <p className="text-[10px] font-medium text-foreground/70 mb-1">{t('fonctionnalites.animations.tiersIOwe')}</p>
                    
                    {/* Paul - Cadeau groupe */}
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between bg-destructive/5 rounded-lg px-3 py-1.5 border border-destructive/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">Paul</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersGroupGift')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-destructive">-20 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Solde trésorerie */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-between items-center pt-2 border-t border-border/30"
                  >
                    <span className="text-[10px] text-muted-foreground">{t('fonctionnalites.animations.tiersTreasuryBalance')}</span>
                    <span className="text-xs font-bold text-primary">+307 €</span>
                  </motion.div>

                  {/* Texte de clôture */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-[11px] text-center text-muted-foreground/80 italic px-2"
                  >
                    {t('fonctionnalites.animations.tiersClosing')}
                  </motion.p>
                </div>
              }
            />

            {/* Patrimoine */}
            <FutureFeatureCard
              icon="building-2"
              title={t('fonctionnalites.futureFeatures.patrimoine.title')}
              promise={t('fonctionnalites.futureFeatures.patrimoine.promise')}
              delay={0.3}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative w-full flex flex-col gap-3">
                  {/* Section: Actifs */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-medium text-foreground/70">{t('fonctionnalites.animations.patrimoineAssets')}</p>
                      <span className="text-[10px] font-semibold text-primary">+192 630 €</span>
                    </div>
                    
                    {/* Appartement */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🏠</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineApartment')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineRealEstate')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+180 000 €</span>
                    </motion.div>

                    {/* Comptes courants et épargnes */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💰</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineAccounts')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineLiquidity')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+7 630 €</span>
                    </motion.div>

                    {/* Actions & ETF */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📈</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineStocksETF')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineInvestments')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+5 000 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Section: Passifs */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-medium text-foreground/70">{t('fonctionnalites.animations.patrimoineLiabilities')}</p>
                      <span className="text-[10px] font-semibold text-destructive">-156 000 €</span>
                    </div>
                    
                    {/* Crédit immobilier */}
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between bg-destructive/5 rounded-lg px-3 py-1.5 border border-destructive/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🏦</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineMortgage')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineApartmentDebt')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-destructive">-156 000 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Patrimoine net avec évolution */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-2 border-t border-border/30"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineNetWorth')}</span>
                      <motion.span 
                        className="text-sm font-bold text-primary"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        +36 630 €
                      </motion.span>
                    </div>
                    
                    {/* Timeline d'évolution */}
                    <div className="flex items-center gap-1 mt-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[7px] text-muted-foreground/60">2024</span>
                        <div className="w-2 h-2 rounded-full bg-primary/30" />
                        <span className="text-[7px] text-muted-foreground/80">+12k</span>
                      </motion.div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-primary/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                        style={{ originX: 0 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[7px] text-muted-foreground/60">2025</span>
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                        <span className="text-[7px] text-muted-foreground/80">+24k</span>
                      </motion.div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.3, duration: 0.4 }}
                        style={{ originX: 0 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[7px] text-primary font-medium">2026</span>
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-primary"
                          animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.4)", "0 0 0 4px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.4)"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[7px] text-primary font-semibold">+37k</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Texte de clôture */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-[11px] text-center text-muted-foreground/80 italic px-2"
                  >
                    {t('fonctionnalites.animations.patrimoineClosing')}
                  </motion.p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
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
              {t('fonctionnalites.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              {t('fonctionnalites.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={openWaitlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t('common.joinWaitlist')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/pourquoi-steero"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t('common.discoverApproach')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Fonctionnalites;