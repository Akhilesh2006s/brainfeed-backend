import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
}

const getVariants = (direction: Direction): Variants => {
  const base = { opacity: 0, scale: 0.98 };

  switch (direction) {
    case "down":
      return {
        hidden: { ...base, y: -24 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
    case "left":
      return {
        hidden: { ...base, x: 32 },
        visible: { opacity: 1, x: 0, scale: 1 },
      };
    case "right":
      return {
        hidden: { ...base, x: -32 },
        visible: { opacity: 1, x: 0, scale: 1 },
      };
    case "fade":
      return {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 },
      };
    case "up":
    default:
      return {
        hidden: { ...base, y: 24 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
  }
};

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = false,
}: ScrollRevealProps) => {
  const variants = getVariants(direction);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

