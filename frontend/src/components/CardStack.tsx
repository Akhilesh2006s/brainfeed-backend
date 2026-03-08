import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CardItem = {
  tag: string;
  title: string;
};

interface CardStackProps {
  items: CardItem[];
  autoRotateMs?: number;
}

// A lightweight custom card stack similar to @aceternity/card-stack.
// Shows up to 3 cards at a time and rotates them automatically.
const CardStack = ({ items, autoRotateMs = 4500 }: CardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % items.length),
      autoRotateMs,
    );
    return () => clearInterval(id);
  }, [items.length, autoRotateMs]);

  const getRelativeIndex = (index: number) => {
    const len = items.length;
    const diff = (index - activeIndex + len) % len;
    // Map to -1, 0, 1 where 0 is active
    if (diff === 0) return 0;
    if (diff === 1 || (diff === len - 1 && len > 2)) return 1;
    return -1;
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 h-52 sm:h-56 md:h-60">
      {items.map((item, index) => {
        const rel = getRelativeIndex(index);

        // Off-screen for cards not in the immediate stack
        if (items.length > 3 && rel === -1 && index !== activeIndex && index !== (activeIndex + items.length - 1) % items.length) {
          return null;
        }

        const isActive = rel === 0;
        const x = rel === 1 ? 36 : rel === -1 ? -36 : 0;
        const y = rel === 1 || rel === -1 ? 12 : 0;
        const scale = isActive ? 1 : 0.95;
        const opacity = isActive ? 1 : 0.9;
        const zIndex = isActive ? 30 : 20;

        return (
          <motion.article
            key={item.title}
            className="absolute inset-0 bg-white border border-slate-200 rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.12)] flex flex-col justify-between p-4 cursor-pointer"
            style={{ zIndex }}
            initial={false}
            animate={{ x, y, scale, opacity }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="space-y-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ff5c35]/10 text-[#ff5c35] text-[10px] font-semibold uppercase tracking-[0.16em]">
                {item.tag}
              </span>
              <h3 className="font-serif text-[14px] md:text-[15px] text-slate-900 leading-snug line-clamp-3">
                {item.title}
              </h3>
            </div>
            <button className="mt-3 text-[11px] font-semibold text-[#ff5c35] hover:text-[#e14c28] text-left">
              Read story →
            </button>
          </motion.article>
        );
      })}
    </div>
  );
};

export default CardStack;

