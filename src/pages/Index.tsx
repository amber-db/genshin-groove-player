import { motion } from "framer-motion";
import GenshinNav from "@/components/GenshinNav";
import TimerCard from "@/components/TimerCard";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import DiamondDivider from "@/components/DiamondDivider";
import heroBg from "@/assets/hero-bg.jpg";

// Helper: next occurrence of a specific hour (UTC+8 server time, adjusted to local)
const getNextReset = (hourUTC: number) => {
  const now = new Date();
  const target = new Date(now);
  target.setUTCHours(hourUTC, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target;
};

const getNextWeeklyReset = () => {
  const now = new Date();
  const target = new Date(now);
  // Weekly reset: Monday 4:00 UTC (Monday 12:00 UTC+8)
  const day = target.getUTCDay();
  const daysUntilMonday = (1 - day + 7) % 7 || 7;
  target.setDate(target.getDate() + daysUntilMonday);
  target.setUTCHours(4, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 7);
  return target;
};

// Resin: full in ~21h from now (placeholder, 160 resin * 8min = 1280min)
const getResinFull = () => {
  const now = new Date();
  return new Date(now.getTime() + 21 * 60 * 60 * 1000);
};

const timers = [
  {
    title: "Daily Reset",
    icon: "🌅",
    targetTime: getNextReset(4), // 4:00 UTC = 12:00 UTC+8
    description: "Daily commissions & domain resets",
  },
  {
    title: "Resin Full",
    icon: "⚡",
    targetTime: getResinFull(),
    description: "Original Resin reaches 160/160",
  },
  {
    title: "Weekly Boss Reset",
    icon: "⚔️",
    targetTime: getNextWeeklyReset(),
    description: "Trounce domain & battle pass reset",
  },
  {
    title: "Parametric Transformer",
    icon: "🔮",
    targetTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: "Parametric Transformer cooldown",
  },
];

const playlists = [
  {
    title: "Genshin Impact OST",
    playlistId: "PL8fZemLM-gGfJ2001AJEY8S-_qlbKnj_s",
    description: "Official soundtrack from all regions of Teyvat",
  },
  {
    title: "Fontaine OST",
    playlistId: "PLbtvX38a8Eu4E6DxEUjYTlnEfegCiQEEt",
    description: "Official Fontaine region soundtrack",
  },
  {
    title: "Natlan OST",
    playlistId: "PLLoakUY_OOuivOaU42Bv19Z2wwWvNHypo",
    description: "Official Natlan region soundtrack",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GenshinNav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Teyvat landscape"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4"
        >
          <div className="flex justify-center mb-6">
            <div className="w-5 h-5 diamond bg-primary animate-pulse-gold" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl gold-text tracking-widest mb-4">
            Teyvat Hub
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl font-body max-w-md mx-auto tracking-wide">
            Track your timers · Explore the music of Teyvat
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <button
              onClick={() => document.getElementById("timers")?.scrollIntoView({ behavior: "smooth" })}
              className="font-display text-sm tracking-widest text-primary/70 hover:text-primary transition-colors"
            >
              ▼ Explore ▼
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Timers Section */}
      <section id="timers" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl gold-text tracking-widest mb-2">
            ⏳ Timers
          </h2>
          <p className="text-muted-foreground">Never miss a reset again</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {timers.map((timer) => (
            <TimerCard key={timer.title} {...timer} />
          ))}
        </div>
      </section>

      <DiamondDivider />

      {/* Playlists Section */}
      <section id="playlists" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl gold-text tracking-widest mb-2">
            🎵 Playlists
          </h2>
          <p className="text-muted-foreground">Immerse yourself in Teyvat's melodies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((pl) => (
            <YoutubePlaylist key={pl.playlistId} {...pl} />
          ))}
        </div>
      </section>

      <DiamondDivider />

      {/* About Section */}
      <section id="about" className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-3xl gold-text tracking-widest mb-4">
          About
        </h2>
        <p className="text-foreground/70 leading-relaxed">
          Teyvat Hub is your companion for tracking Genshin Impact timers and enjoying
          curated playlists from the world of Teyvat. Stay on top of your daily and weekly
          resets, and let the music guide your adventures.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-muted-foreground text-sm font-display tracking-widest">
          ✦ Teyvat Hub ✦
        </p>
        <p className="text-muted-foreground/50 text-xs mt-1">
          Fan-made · Not affiliated with HoYoverse
        </p>
      </footer>
    </div>
  );
};

export default Index;
