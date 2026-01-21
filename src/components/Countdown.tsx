import { useState, useEffect } from "react";
const targetDate = new Date("2026-03-20T12:00:00+01:00");
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(difference / (1000 * 60 * 60) % 24),
      minutes: Math.floor(difference / 1000 / 60 % 60),
      seconds: Math.floor(difference / 1000 % 60)
    };
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const timeUnits = [{
    value: timeLeft.days,
    label: "Jours"
  }, {
    value: timeLeft.hours,
    label: "Heures"
  }, {
    value: timeLeft.minutes,
    label: "Minutes"
  }, {
    value: timeLeft.seconds,
    label: "Secondes"
  }];
  return <div className="py-12 rounded-3xl bg-orange-100">
      <p className="text-center text-muted-foreground mb-6">
        Lancement prévu le <span className="font-semibold text-foreground">20 mars 2026</span>
      </p>
      <div className="flex justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => <div key={index} className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm animate-countdown-glow">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground">{unit.label}</p>
          </div>)}
      </div>
    </div>;
};
export default Countdown;