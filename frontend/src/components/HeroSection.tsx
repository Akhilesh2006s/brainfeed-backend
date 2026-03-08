import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/55qKRMnw401SpsX2.webp.jpg.jpeg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-border/60 min-h-[100dvh] min-h-[85vh] md:min-h-[82vh] lg:min-h-[75vh] flex items-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImg})`,
          y: backgroundY,
          scale: backgroundScale,
        }}
        aria-hidden
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/55" />
      {/* Content */}
      <div className="container relative z-10 w-full pt-6 pb-8 md:pt-10 md:pb-10 lg:pt-14 lg:pb-12 flex items-center min-h-[inherit]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-3 sm:space-y-4 md:space-y-5 max-w-xl w-full text-left"
        >
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white">
            Since 2009 — Trusted by 40,000+ schools
          </p>

          <h1 className="font-serif text-[1.75rem] leading-tight sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] text-white font-bold">
            Today&apos;s Readers are{" "}
            <span className="text-[#ff5c35] italic font-serif">
              Tomorrow&apos;s Leaders
            </span>
            .
          </h1>

          <p className="text-[13px] sm:text-sm md:text-base text-white/95 font-sans leading-relaxed max-w-lg">
            India&apos;s premier educational monthly — nurturing 200,000+ young
            minds with five specialized publications.
          </p>

          <p className="text-[13px] sm:text-sm md:text-base text-white/90 font-sans leading-relaxed max-w-lg">
            Brainfeed brings educators, parents and students one step
            closer—covering board exams, NEP 2020, classroom practices and
            wellbeing in a single, beautifully curated reading experience.
          </p>

          <div className="flex flex-col gap-3 pt-1 w-full max-w-[280px] sm:max-w-[320px]">
            <motion.a
              href="#news"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ff5c35] px-6 py-3.5 min-h-[48px] text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-md"
            >
              Subscribe Now
              <span className="text-base translate-y-[1px]">→</span>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-md bg-slate-900/90 text-white px-6 py-3.5 min-h-[48px] text-sm font-semibold uppercase tracking-[0.18em] border border-white hover:bg-slate-800/90 transition-colors"
            >
              Explore Magazines
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
