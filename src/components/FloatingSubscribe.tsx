import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const FloatingSubscribe = () => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2.5 sm:px-5 sm:py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span>Subscribe</span>
    </motion.button>
  );
};

export default FloatingSubscribe;

