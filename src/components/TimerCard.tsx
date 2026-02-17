import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimerCardProps {
  title: string;
  icon: string;
  targetTime: Date;
  description: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

const TimerCard = ({ title, icon, targetTime, description }: TimerCardProps) => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, Math.floor((targetTime.getTime() - now.getTime()) / 1000));
      setTimeLeft({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="genshin-border bg-card rounded-sm p-6 flex flex-col items-center gap-4 hover:glow-gold transition-shadow duration-500"
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="font-display text-lg gold-text tracking-wide">{title}</h3>
      <p className="text-muted-foreground text-sm text-center">{description}</p>
      <div className="flex gap-3 font-display text-2xl tracking-widest text-foreground">
        <span className="bg-secondary px-3 py-2 rounded-sm">{pad(timeLeft.h)}</span>
        <span className="text-primary">:</span>
        <span className="bg-secondary px-3 py-2 rounded-sm">{pad(timeLeft.m)}</span>
        <span className="text-primary">:</span>
        <span className="bg-secondary px-3 py-2 rounded-sm">{pad(timeLeft.s)}</span>
      </div>
    </motion.div>
  );
};

export default TimerCard;
