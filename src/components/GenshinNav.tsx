import { motion } from "framer-motion";

const navItems = ["Timers", "Playlists", "About"];

const GenshinNav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <h1 className="font-display text-xl gold-text tracking-widest">
        ✦ Teyvat Hub
      </h1>
      <div className="flex gap-6">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="font-display text-sm tracking-wider text-foreground/70 hover:text-primary transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default GenshinNav;
