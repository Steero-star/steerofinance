import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowRight, Check, Star, ChevronDown, Brain, Compass, RotateCcw, Heart, GraduationCap, BookOpen, PenLine, Zap, Calendar, Eye, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWaitlist } from "@/contexts/WaitlistContext";
// Progress sidebar component for behavioral principles
const BehavioralProgressSidebar = ({
  elements,
  activeIndex,
  exploredCards,
  isVisible,
  t
}: {
  elements: BehavioralElement[];
  activeIndex: number | null;
  exploredCards: Set<number>;
  isVisible: boolean;
  t: (key: string) => string;
}) => {
  const scrollToCard = (index: number) => {
    const element = document.getElementById(`behavioral-card-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };
  if (!isVisible) return null;
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.4
  }} className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      {/* Vertical line background */}
      <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-muted rounded-full" />
      
      {/* Progress line */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary rounded-full origin-top" initial={{
      height: 0
    }} animate={{
      height: `${exploredCards.size / elements.length * 100}%`
    }} transition={{
      duration: 0.4,
      ease: "easeOut"
    }} />
      
      {/* Step indicators */}
      {elements.map((element, index) => <button key={index} onClick={() => scrollToCard(index)} className="relative z-10 group flex items-center gap-3">
          {/* Step circle */}
          <motion.div animate={{
        scale: activeIndex === index ? 1.3 : 1,
        backgroundColor: exploredCards.has(index) ? "hsl(var(--primary))" : "hsl(var(--muted))"
      }} transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }} className="w-4 h-4 rounded-full border-2 border-background shadow-md flex items-center justify-center">
            {exploredCards.has(index) && activeIndex !== index && <motion.div initial={{
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
      }} className="absolute left-8 whitespace-nowrap bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border pointer-events-none max-w-[200px]">
            <span className="text-xs font-medium text-foreground truncate">{t(element.titleKey)}</span>
          </motion.div>
        </button>)}
    </motion.div>;
};
interface Alternative {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  highlight?: boolean;
}

const alternativesData: Alternative[] = [
  { icon: "❌", titleKey: "whySteero.alternatives.excel.title", descriptionKey: "whySteero.alternatives.excel.description" },
  { icon: "❌", titleKey: "whySteero.alternatives.bankApps.title", descriptionKey: "whySteero.alternatives.bankApps.description" },
  { icon: "❌", titleKey: "whySteero.alternatives.notion.title", descriptionKey: "whySteero.alternatives.notion.description" },
  { icon: "✅", titleKey: "whySteero.alternatives.steero.title", descriptionKey: "whySteero.alternatives.steero.description", highlight: true }
];

interface BehavioralElement {
  icon: typeof Brain;
  principleNumber: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  referenceKey: string;
}

const behavioralElementsData: BehavioralElement[] = [
  {
    icon: Brain,
    principleNumber: "01",
    titleKey: "whySteero.behavioral.cognitive.title",
    subtitleKey: "whySteero.behavioral.cognitive.subtitle",
    descriptionKey: "whySteero.behavioral.cognitive.description",
    referenceKey: "whySteero.behavioral.cognitive.reference",
  },
  {
    icon: Compass,
    principleNumber: "02",
    titleKey: "whySteero.behavioral.illusion.title",
    subtitleKey: "whySteero.behavioral.illusion.subtitle",
    descriptionKey: "whySteero.behavioral.illusion.description",
    referenceKey: "whySteero.behavioral.illusion.reference",
  },
  {
    icon: RotateCcw,
    principleNumber: "03",
    titleKey: "whySteero.behavioral.ritual.title",
    subtitleKey: "whySteero.behavioral.ritual.subtitle",
    descriptionKey: "whySteero.behavioral.ritual.description",
    referenceKey: "whySteero.behavioral.ritual.reference",
  },
  {
    icon: Heart,
    principleNumber: "04",
    titleKey: "whySteero.behavioral.emotional.title",
    subtitleKey: "whySteero.behavioral.emotional.subtitle",
    descriptionKey: "whySteero.behavioral.emotional.description",
    referenceKey: "whySteero.behavioral.emotional.reference",
  },
  {
    icon: GraduationCap,
    principleNumber: "05",
    titleKey: "whySteero.behavioral.learning.title",
    subtitleKey: "whySteero.behavioral.learning.subtitle",
    descriptionKey: "whySteero.behavioral.learning.description",
    referenceKey: "whySteero.behavioral.learning.reference",
  }
];
// Animation 1: Cognitive Effort - Two data flows comparison (plays once)
const CognitiveEffortAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  
  useEffect(() => {
    if (isOpen && !hasPlayed) {
      setHasPlayed(true);
    }
    if (!isOpen) {
      setHasPlayed(false);
    }
  }, [isOpen, hasPlayed]);

  const shouldAnimate = isOpen && hasPlayed;

  // Auto flow packet - starts slightly larger, fades before halfway
  const AutoPacket = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ left: '0%', opacity: 0, scale: 1.3 }}
      animate={shouldAnimate ? {
        left: '45%',
        opacity: [0, 0.7, 0],
        scale: [1.3, 1, 0.4]
      } : {}}
      transition={{
        duration: 2,
        delay,
        times: [0, 0.5, 1],
        ease: "easeOut"
      }}
      className="absolute w-2 h-2 rounded-full bg-muted-foreground/60 -translate-x-1/2"
    />
  );

  // Processed flow packet - goes all the way, amplifies at the end
  const ProcessedPacket = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ left: '0%', opacity: 0, scale: 0.8 }}
      animate={shouldAnimate ? {
        left: '100%',
        opacity: 1,
        scale: 1.8
      } : {}}
      transition={{
        duration: 3,
        delay,
        ease: "easeInOut"
      }}
      className="absolute w-2 h-2 rounded-full bg-primary/70 -translate-x-1/2"
    />
  );

  return (
    <div className="flex flex-col gap-3 py-3">
      {/* Flow A: Automatic - data fades before halfway */}
      <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3.5 h-3.5 text-muted-foreground/70" />
          <span className="text-[11px] text-muted-foreground/80 font-medium">{t('animations.flowAuto')}</span>
        </div>
        <div className="relative h-8 flex items-center">
          {/* Track */}
          <div className="absolute inset-x-0 h-1 bg-muted/50 rounded" />
          {/* Fade zone indicator - before middle */}
          <div className="absolute left-[40%] w-px h-4 bg-muted-foreground/40" />
          {/* End zone - never reached */}
          <div className="absolute right-0 w-8 h-5 bg-muted/30 rounded-r flex items-center justify-end pr-1.5">
            <span className="text-[10px] text-muted-foreground/50">?</span>
          </div>
          {/* Data packets */}
          <AutoPacket delay={0} />
          <AutoPacket delay={0.5} />
          <AutoPacket delay={1} />
        </div>
        <p className="text-[10px] text-muted-foreground/70 mt-2 text-right font-medium">{t('animations.dataForgotten')}</p>
      </div>

      {/* Flow B: Processed - goes to the end with amplification */}
      <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-3 h-3 text-primary/60" />
          <span className="text-[10px] text-primary/70 font-medium">{t('animations.flowProcessed')}</span>
        </div>
        <div className="relative h-6 flex items-center">
          {/* Track */}
          <div className="absolute inset-x-0 h-0.5 bg-primary/20 rounded" />
          {/* Filter/pause zone - middle */}
          <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          </div>
          {/* End zone - amplified knowledge */}
          <div className="absolute right-0 w-8 h-5 bg-primary/15 rounded-r flex items-center justify-end pr-1">
            <Check className="w-3 h-3 text-primary/70" />
          </div>
          {/* Data packets */}
          <ProcessedPacket delay={0.2} />
          <ProcessedPacket delay={0.8} />
        </div>
        <p className="text-[9px] text-primary/60 mt-1.5 text-right">{t('animations.dataAnchored')}</p>
      </div>

      {/* Key insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldAnimate ? 0.8 : 0 }}
        transition={{ delay: 3.5, duration: 0.4 }}
        className="text-center text-xs text-muted-foreground/70"
      >
        {t('animations.effortCreatesStep')}
      </motion.p>
    </div>
  );
};

// Animation 2: Control Illusion - Dense vs Simple view (plays once)
const ControlIllusionAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [phase, setPhase] = useState<'dense' | 'static' | 'simple' | 'done'>('dense');
  const [simpleValue, setSimpleValue] = useState(0);
  
  useEffect(() => {
    if (!isOpen) {
      setPhase('dense');
      setSimpleValue(0);
      return;
    }
    
    const timers = [
      setTimeout(() => setPhase('static'), 2000),
      setTimeout(() => setPhase('simple'), 3500)
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Animate the simple indicator when in simple phase
  useEffect(() => {
    if (phase !== 'simple') return;
    
    const interval = setInterval(() => {
      setSimpleValue(v => {
        if (v >= 100) {
          setPhase('done');
          return 100;
        }
        return v + 5;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Dense dashboard - lots of data, nothing changes */}
        <motion.div
          animate={{
            opacity: phase === 'simple' || phase === 'done' ? 0.3 : 1,
            scale: phase === 'simple' || phase === 'done' ? 0.95 : 1
          }}
          transition={{ duration: 0.4 }}
          className="bg-muted/20 rounded-lg p-2 border border-border/30"
        >
          <div className="flex items-center gap-1 mb-1.5">
            <Zap className="w-2.5 h-2.5 text-muted-foreground/40" />
            <span className="text-[8px] text-muted-foreground/50">{t('animations.denseView')}</span>
          </div>
          {/* Mini cards grid - static */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-muted/40 rounded" />
            ))}
          </div>
          {/* Mini chart - static bars */}
          <div className="flex items-end gap-0.5 h-6 mt-1.5">
            {[35, 55, 40, 65, 45, 50, 38].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-muted-foreground/20 rounded-t"
              />
            ))}
          </div>
          {/* Static indicator */}
          <motion.p
            animate={{ opacity: phase === 'static' ? 1 : 0 }}
            className="text-[8px] text-muted-foreground/50 text-center mt-1.5"
          >
            {t('animations.nothingChanges')}
          </motion.p>
        </motion.div>

        {/* Simple view - one indicator that evolves */}
        <motion.div
          animate={{
            opacity: phase === 'simple' || phase === 'done' ? 1 : 0.3,
            scale: phase === 'simple' || phase === 'done' ? 1 : 0.95
          }}
          transition={{ duration: 0.4 }}
          className="bg-primary/5 rounded-lg p-2 border border-primary/20"
        >
          <div className="flex items-center gap-1 mb-1.5">
            <Compass className="w-2.5 h-2.5 text-primary/50" />
            <span className="text-[8px] text-primary/60">{t('animations.simpleView')}</span>
          </div>
          {/* Single evolving indicator */}
          <div className="flex flex-col items-center justify-center h-16">
            <div className="relative w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center">
              {/* Progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.2)"
                  strokeWidth="3"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={126}
                  strokeDashoffset={126 - (simpleValue / 100) * 126}
                  style={{ transition: 'stroke-dashoffset 0.1s' }}
                />
              </svg>
              <span className="text-xs font-medium text-primary/80">
                {phase === 'simple' || phase === 'done' ? `${simpleValue}%` : '—'}
              </span>
            </div>
          </div>
          {/* Evolving indicator */}
          <motion.p
            animate={{ opacity: phase === 'simple' || phase === 'done' ? 1 : 0 }}
            className="text-[8px] text-primary/60 text-center"
          >
            {t('animations.indicatorEvolves')}
          </motion.p>
        </motion.div>
      </div>

      {/* Key insight */}
      <motion.p
        animate={{ opacity: phase === 'done' ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-xs text-muted-foreground/70"
      >
        {t('animations.seeingNotUnderstanding')}
      </motion.p>
    </div>
  );
};

// Animation 3: Ritual - Simple timeline with growing points (plays once)
const RitualCycleAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [activePoint, setActivePoint] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!isOpen) {
      setActivePoint(-1);
      setIsComplete(false);
      return;
    }
    
    const points = 7;
    let currentPoint = -1;
    
    const interval = setInterval(() => {
      currentPoint++;
      if (currentPoint >= points) {
        clearInterval(interval);
        setIsComplete(true);
        return;
      }
      setActivePoint(currentPoint);
    }, 500);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  const points = 7;
  // Each point grows progressively larger (base size + increment per point)
  const getPointSize = (index: number, isActive: boolean) => {
    if (!isActive) return 6; // 6px base for inactive
    return 8 + index * 2; // 8px base + 2px per index for active (8, 10, 12, 14, 16, 18, 20)
  };

  // Inverse size for effort: starts large, ends small
  const getEffortSize = (index: number, isActive: boolean) => {
    if (!isActive) return 6;
    return 20 - index * 2; // 20, 18, 16, 14, 12, 10, 8 - inverse of mastery
  };

  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
        {/* Legend - inline */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">{t('animations.mastery')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{t('animations.effort')}</span>
          </div>
        </div>

        {/* Combined timelines - vertically aligned */}
        <div className="relative">
          {/* Mastery timeline */}
          <div className="relative h-6">
            {/* Continuous line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted/40 -translate-y-1/2" />
            
            {/* Progress line */}
            <motion.div
              animate={{ width: `${((activePoint + 1) / points) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="absolute top-1/2 left-0 h-0.5 bg-primary/50 -translate-y-1/2"
            />
            
            {/* Mastery points - growing progressively */}
            <div className="relative flex justify-between items-center h-full">
              {[...Array(points)].map((_, i) => {
                const isActive = i <= activePoint;
                const isCurrent = i === activePoint;
                const size = getPointSize(i, isActive);
                
                return (
                  <div key={i} className="flex justify-center" style={{ width: 24 }}>
                    <motion.div
                      animate={{
                        width: size,
                        height: size,
                        scale: isCurrent ? 1.2 : 1,
                        backgroundColor: isActive 
                          ? 'hsl(var(--primary))' 
                          : 'hsl(var(--muted))'
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-full border-2 border-background"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Effort timeline - inverse sizes, no gap */}
          <div className="relative h-6">
            {/* Continuous line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted/30 -translate-y-1/2" />
            
            {/* Progress line */}
            <motion.div
              animate={{ width: `${((activePoint + 1) / points) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="absolute top-1/2 left-0 h-0.5 bg-muted-foreground/50 -translate-y-1/2"
            />
            
            {/* Effort points - shrinking progressively */}
            <div className="relative flex justify-between items-center h-full">
              {[...Array(points)].map((_, i) => {
                const isActive = i <= activePoint;
                const isCurrent = i === activePoint;
                const size = getEffortSize(i, isActive);
                
                return (
                  <div key={i} className="flex justify-center" style={{ width: 24 }}>
                    <motion.div
                      animate={{
                        width: size,
                        height: size,
                        scale: isCurrent ? 1.2 : 1,
                        backgroundColor: isActive 
                          ? 'hsl(var(--muted-foreground))' 
                          : 'hsl(var(--muted))'
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-full border-2 border-background"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ritual labels under each point group */}
          <div className="relative flex justify-between items-center mt-1">
            {[...Array(points)].map((_, i) => {
              const isActive = i <= activePoint;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                  style={{ width: 24 }}
                >
                  <span className="text-[8px] text-muted-foreground whitespace-nowrap">
                    {t('animations.ritual')} +{i + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Rhythm indicator */}
        <motion.div
          animate={{ opacity: activePoint >= 3 ? 0.8 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-2 mt-2"
        >
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: activePoint >= i * 2 ? 0.8 : 0.2
                }}
                className="w-1 h-1 rounded-full bg-primary/60"
              />
            ))}
          </div>
          <span className="text-[9px] text-muted-foreground/60">{t('animations.regularRhythm')}</span>
        </motion.div>
      </div>

      {/* Key insight */}
      <motion.p
        animate={{ opacity: isComplete ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-xs text-muted-foreground/70"
      >
        {t('animations.repetitionTransforms')}
      </motion.p>
    </div>
  );
};

// Animation 4: Emotional Connection - Manual entry creates awareness (plays once)
const EmotionalConnectionAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [phase, setPhase] = useState<'input' | 'feel' | 'decide' | 'done'>('input');
  
  useEffect(() => {
    if (!isOpen) {
      setPhase('input');
      return;
    }
    const timers = [
      setTimeout(() => setPhase('feel'), 1500),
      setTimeout(() => setPhase('decide'), 3000),
      setTimeout(() => setPhase('done'), 4500)
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="bg-muted/20 rounded-lg p-3 border border-border/30">
        {/* Budget Resto header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/30">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-foreground">{t('animations.budgetResto')}</span>
            <span className="text-[9px] text-muted-foreground">300 €</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-muted-foreground">{t('animations.spent')}:</span>
            <motion.span
              animate={{ 
                opacity: phase !== 'input' ? 1 : 0.5
              }}
              className="text-[10px] font-medium text-foreground"
            >
              {phase === 'input' ? '165 €' : '199,90 €'}
            </motion.span>
          </div>
        </div>

        {/* Budget gauge */}
        <div className="mb-3">
          <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
            <motion.div
              animate={{ 
                width: phase === 'input' ? '55%' : '66.6%'
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary/70 rounded-full relative"
            >
              {/* In-progress portion */}
              <motion.div
                animate={{ 
                  opacity: phase === 'input' ? 0 : 1,
                  width: phase !== 'input' ? '17.5%' : '0%'
                }}
                transition={{ duration: 0.4 }}
                className="absolute right-0 top-0 h-full bg-primary rounded-r-full"
              />
            </motion.div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-muted-foreground">{t('animations.spent')}</span>
            <motion.span
              animate={{ opacity: phase !== 'input' ? 1 : 0 }}
              className="text-[8px] text-primary font-medium"
            >
              +34,90 €
            </motion.span>
            <span className="text-[8px] text-muted-foreground">{t('animations.remaining')}: {phase === 'input' ? '135 €' : '100,10 €'}</span>
          </div>
        </div>

        {/* Transaction input simulation */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{
              opacity: phase !== 'input' ? 1 : 0.5,
              scale: phase === 'input' ? 1.05 : 1
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 bg-background rounded border border-border/50 p-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground/70">{t('animations.restaurant')}</span>
              <motion.span
                animate={{ opacity: phase !== 'input' ? 1 : 0 }}
                className="text-xs font-medium text-foreground"
              >
                -34,90 €
              </motion.span>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: phase === 'input' ? 0.8 : 0.3 }}
            className="flex-shrink-0"
          >
            <PenLine className="w-4 h-4 text-muted-foreground/50" />
          </motion.div>
        </div>

        {/* Emotional reaction */}
        <motion.div
          animate={{
            opacity: phase === 'feel' || phase === 'decide' || phase === 'done' ? 1 : 0,
            height: phase === 'feel' || phase === 'decide' || phase === 'done' ? 'auto' : 0,
            marginBottom: phase === 'feel' || phase === 'decide' || phase === 'done' ? 8 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 bg-amber-500/10 rounded px-2 py-1.5">
            <Heart className="w-3 h-3 text-amber-600/70" />
            <span className="text-[10px] text-amber-700/80">{t('animations.emotionalReaction')}</span>
          </div>
        </motion.div>

        {/* Conscious decision */}
        <motion.div
          animate={{
            opacity: phase === 'decide' || phase === 'done' ? 1 : 0,
            height: phase === 'decide' || phase === 'done' ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 bg-primary/10 rounded px-2 py-1.5">
            <Check className="w-3 h-3 text-primary/70" />
            <span className="text-[10px] text-primary/80 font-medium">{t('animations.consciousDecision')}</span>
          </div>
        </motion.div>
      </div>

      {/* Label */}
      <motion.p
        animate={{ opacity: phase === 'done' ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-xs text-muted-foreground/70"
      >
        {t('animations.realAwareness')}
      </motion.p>
    </div>
  );
};

// Animation 5: Learning First - Understanding before automation (plays once)
const LearningFirstAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [phase, setPhase] = useState<'learn' | 'understand' | 'master' | 'auto' | 'done'>('learn');
  
  useEffect(() => {
    if (!isOpen) {
      setPhase('learn');
      return;
    }
    const timers = [
      setTimeout(() => setPhase('understand'), 1200),
      setTimeout(() => setPhase('master'), 2400),
      setTimeout(() => setPhase('auto'), 3600),
      setTimeout(() => setPhase('done'), 4800)
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  const phases = [
    { key: 'learn', label: t('animations.learn'), icon: BookOpen },
    { key: 'understand', label: t('animations.understand'), icon: Brain },
    { key: 'master', label: t('animations.master'), icon: GraduationCap },
    { key: 'auto', label: t('animations.thenAutomate'), icon: Zap }
  ];

  const currentIndex = phase === 'done' ? 3 : phases.findIndex(p => p.key === phase);

  return (
    <div className="flex flex-col gap-3 py-3">
      {/* Progress steps */}
      <div className="bg-muted/20 rounded-lg p-3 border border-border/30">
        <div className="flex items-center justify-between gap-2">
          {phases.map((p, i) => {
            const PhaseIcon = p.icon;
            const isActive = i <= currentIndex;
            const isCurrent = p.key === phase;
            
            return (
              <div key={p.key} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                    opacity: isActive ? 1 : 0.35
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? i === 3
                        ? 'bg-emerald-500/15 border border-emerald-500/30'
                        : 'bg-primary/15 border border-primary/30'
                      : 'bg-muted/40 border border-border/30'
                  }`}
                >
                  <PhaseIcon className={`w-3.5 h-3.5 ${
                    isActive
                      ? i === 3
                        ? 'text-emerald-600/80'
                        : 'text-primary/80'
                      : 'text-muted-foreground/40'
                  }`} />
                </motion.div>
                <motion.span
                  animate={{ opacity: isActive ? 0.8 : 0.35 }}
                  className={`text-[9px] text-center font-medium ${
                    isCurrent || (phase === 'done' && i === 3) ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {p.label}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-muted/40 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((currentIndex + 1) / phases.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              phase === 'auto' || phase === 'done' ? 'bg-emerald-500/60' : 'bg-primary/50'
            }`}
          />
        </div>
      </div>

      {/* Status message */}
      <motion.p
        animate={{ opacity: phase === 'done' ? 0.8 : 0.6 }}
        className={`text-center text-xs ${
          phase === 'auto' || phase === 'done' ? 'text-emerald-600/80' : 'text-muted-foreground/70'
        }`}
      >
        {phase === 'auto' || phase === 'done'
          ? t('animations.autoCanBeConsidered')
          : phase === 'learn'
          ? t('animations.autoTooEarly')
          : t('animations.understandingGrows')
        }
      </motion.p>
    </div>
  );
};

// Main animation router component
const BehavioralAnimation = ({
  element,
  index,
  isOpen,
  t
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  switch (index) {
    case 0:
      return <CognitiveEffortAnimation isOpen={isOpen} t={t} />;
    case 1:
      return <ControlIllusionAnimation isOpen={isOpen} t={t} />;
    case 2:
      return <RitualCycleAnimation isOpen={isOpen} t={t} />;
    case 3:
      return <EmotionalConnectionAnimation isOpen={isOpen} t={t} />;
    case 4:
      return <LearningFirstAnimation isOpen={isOpen} t={t} />;
    default:
      return null;
  }
};

// Behavioral card component
const BehavioralCard = ({
  element,
  index,
  isOpen,
  onToggle,
  isExplored,
  t
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isExplored: boolean;
  t: (key: string) => string;
}) => {
  const Icon = element.icon;
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.4,
    delay: index * 0.1
  }} onClick={onToggle} className={`
        relative rounded-xl border cursor-pointer transition-all duration-300
        bg-card border-border/50
        ${isOpen ? 'shadow-sm ring-1 ring-primary/10' : 'hover:border-border'}
        ${isExplored && !isOpen ? 'opacity-80' : ''}
      `}>
      {/* Explored indicator - subtle */}
      <AnimatePresence>
        {isExplored && !isOpen && <motion.div initial={{
        opacity: 0,
      }} animate={{
        opacity: 1,
      }} exit={{
        opacity: 0,
      }} className="absolute top-3 right-3 z-10">
            <Check className="w-4 h-4 text-primary/50" />
          </motion.div>}
      </AnimatePresence>

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon with principle number */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-lg border border-primary/20 bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            {/* Principle number */}
            <span className="absolute -top-1 -left-1 text-[10px] font-mono text-muted-foreground/60">
              {element.principleNumber}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-1 block">
                  Principe {element.principleNumber}
                </span>
                <h3 className="font-medium text-foreground leading-tight">
                  {t(element.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(element.subtitleKey)}
                </p>
              </div>
              <motion.div animate={{
              rotate: isOpen ? 180 : 0
            }} transition={{
              duration: 0.3
            }} className="flex-shrink-0 mt-1">
                <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: "auto",
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3,
          ease: "easeInOut"
        }} className="overflow-hidden">
              <div className="pt-4 mt-4 border-t border-border/50">
                {/* Animation */}
                <BehavioralAnimation element={element} index={index} isOpen={isOpen} t={t} />

                {/* Description */}
                <div className="text-muted-foreground leading-relaxed mb-4 space-y-3">
                  {t(element.descriptionKey).split('\n\n').map((paragraph, i) => {
                    // Handle horizontal rules
                    if (paragraph.trim() === '---') {
                      return <hr key={i} className="border-border/50 my-4" />;
                    }
                    // Handle bold headers with emoji
                    if (paragraph.startsWith('**')) {
                      const headerMatch = paragraph.match(/^\*\*(.+?)\*\*$/);
                      if (headerMatch) {
                        return (
                          <h4 key={i} className="font-semibold text-foreground text-sm mt-2">
                            {headerMatch[1]}
                          </h4>
                        );
                      }
                    }
                    // Handle italic references
                    if (paragraph.startsWith('📚')) {
                      return (
                        <p key={i} className="text-xs text-muted-foreground/70 italic bg-muted/30 rounded-lg px-3 py-2">
                          {paragraph.replace(/\*/g, '')}
                        </p>
                      );
                    }
                    // Handle bullet point lists
                    if (paragraph.includes('• ')) {
                      const lines = paragraph.split('\n');
                      const bulletLines = lines.filter(line => line.trim().startsWith('•'));
                      const nonBulletLines = lines.filter(line => !line.trim().startsWith('•') && line.trim());
                      
                      return (
                        <div key={i} className="space-y-2">
                          {nonBulletLines.length > 0 && (
                            <p className="text-muted-foreground">{nonBulletLines.join(' ')}</p>
                          )}
                          <ul className="space-y-2 pl-1">
                            {bulletLines.map((line, j) => {
                              const text = line.replace('•', '').trim();
                              
                              return (
                                <li key={j} className="flex items-start gap-3 group">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold mt-0.5 transition-transform group-hover:scale-110">
                                    {j + 1}
                                  </span>
                                  <span className="text-foreground/80 leading-relaxed">{text}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    }
                    // Handle arrow callouts
                    if (paragraph.startsWith('➡️')) {
                      return (
                        <div key={i} className="bg-primary/5 border-l-4 border-primary rounded-r-lg px-4 py-3 mt-3">
                          <p className="text-foreground font-medium text-sm">{paragraph}</p>
                        </div>
                      );
                    }
                    // Regular paragraph
                    return <p key={i}>{paragraph}</p>;
                  })}
                </div>

                {/* Reference */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70 bg-muted/50 rounded-lg px-3 py-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="italic">{t('whySteero.reference')} : {t(element.referenceKey)}</span>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>;
};
const PourquoiSteero = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [exploredCards, setExploredCards] = useState<Set<number>>(new Set());
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = (t('whySteero.testimonials', { returnObjects: true }) as { quote: string; author: string; role: string }[]);

  const handleToggleCard = (index: number) => {
    const isOpening = openCardIndex !== index;
    if (isOpening) {
      setExploredCards(prev => new Set(prev).add(index));
    }
    setOpenCardIndex(prev => prev === index ? null : index);
  };

  // Track when behavioral section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;
        setIsSidebarVisible(isInView);
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="min-h-screen">
      <SEO
        title="Pourquoi Steero - L'approche comportementale pour gérer son argent"
        description="Pourquoi choisir Steero plutôt qu'Excel ou une app bancaire pour gérer son argent ? Découvrez notre approche unique basée sur les sciences comportementales pour mieux gérer votre budget durablement."
        keywords="pourquoi steero, alternative excel budget, mieux gérer son argent, application finances personnelles, approche comportementale argent, gestion budget durable"
        canonical="/pourquoi-steero"
      />
      <Header />
      
      {/* Progress Sidebar for Behavioral Section */}
      <AnimatePresence>
        {isSidebarVisible && <BehavioralProgressSidebar elements={behavioralElementsData} activeIndex={openCardIndex} exploredCards={exploredCards} isVisible={isSidebarVisible} t={t} />}
      </AnimatePresence>

      {/* Hero */}
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
              {t('whySteero.heroTitle')} <span className="text-gradient">Steero</span> ?
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
              {t('whySteero.heroDescription')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('whySteero.missionTitle')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('whySteero.missionP1')}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t('whySteero.missionP2')}
                </p>
                <ul className="space-y-3">
                  {(t('whySteero.missionItems', { returnObjects: true }) as string[]).map((item, i) => <motion.li key={i} initial={{
                  opacity: 0,
                  x: -20
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.1
                }} className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-primary" />
                        {item}
                      </motion.li>)}
                </ul>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="bg-primary/5 rounded-3xl p-8">
                <blockquote className="text-xl italic text-foreground">"{t('whySteero.quote')}"</blockquote>
                <p className="mt-4 text-muted-foreground">{t('whySteero.quoteAuthor')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparaison alternatives */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('whySteero.alternativesTitle')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('whySteero.alternativesDescription')}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {alternativesData.map((alt, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: "easeOut"
          }} className={`text-center p-6 rounded-2xl transition-all ${alt.highlight ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-card border border-border/50"}`}>
                <span className="text-3xl mb-3 block">{alt.icon}</span>
                <h3 className={`font-semibold mb-2 ${alt.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                  {t(alt.titleKey)}
                </h3>
                <p className={`text-sm ${alt.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {t(alt.descriptionKey)}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Éléments comportementaux */}
      <section ref={sectionRef} id="fondements-comportementaux" className="py-20 scroll-mt-40 bg-primary-foreground">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-28">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border/50 mb-4">
                {t('whySteero.behavioralBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {t('whySteero.behavioralTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                {t('whySteero.behavioralDescription')}
              </p>
              
              {/* Progress indicator - subtle */}
              <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3
            }} className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 font-mono">
                <span>{exploredCards.size}</span>
                <span>/</span>
                <span>{behavioralElementsData.length}</span>
                {exploredCards.size === behavioralElementsData.length && <span className="ml-2 text-primary/70">
                    {t('whySteero.bravo')}
                  </span>}
              </motion.div>
            </motion.div>
            
            <div className="space-y-4">
              {behavioralElementsData.map((element, index) => <div key={index} id={`behavioral-card-${index}`}>
                  <BehavioralCard element={element} index={index} isOpen={openCardIndex === index} onToggle={() => handleToggleCard(index)} isExplored={exploredCards.has(index)} t={t} />
                </div>)}
            </div>
            
            {/* Hint text with link */}
            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.5
          }} className="text-center text-sm text-muted-foreground mt-8">
              <p>{t('whySteero.clickToDiscover')}</p>
              <Link 
                to="/fonctionnalites" 
                className="inline-flex items-center gap-1 mt-2 text-primary font-medium hover:underline group"
              >
                {t('common.discoverFeatures')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-3xl font-bold text-center mb-12 text-primary">
            {t('whySteero.testimonialsTitle')}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.15
          }} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              {t('whySteero.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              {t('whySteero.ctaDescription')}
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
                  to="/fonctionnalites"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t('common.discoverFeatures')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PourquoiSteero;