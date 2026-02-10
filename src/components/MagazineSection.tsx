import { motion } from "framer-motion";
import primaryICover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.30 AM (2).jpeg";
import mainCover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.30 AM.jpeg";
import juniorCover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.30 AM (1).jpeg";
import primaryIICover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.31 AM.jpeg";
import ScrollReveal from "./ScrollReveal";

type Magazine = {
  id: string;
  name: string;
  edition: string;
  ageGroup: string;
  highlight: string;
  cover: string;
};

const magazines: Magazine[] = [
  {
    id: "primary-i",
    name: "Brainfeed Primary I",
    edition: "Volume XI · Issue 8 · February 2026",
    ageGroup: "For classes I & II · 6–8 years",
    highlight: "A Day of Science – curiosity-led learning for young minds.",
    cover: primaryICover,
  },
  {
    id: "main",
    name: "Brainfeed Magazine",
    edition: "Volume XII · Issue 11 · February 2026",
    ageGroup: "Educator Edition",
    highlight: "Steeped in Sanskaar – spotlight on holistic school ecosystems.",
    cover: mainCover,
  },
  {
    id: "junior",
    name: "Brainfeed Junior",
    edition: "Volume X · Issue 8 · February 2026",
    ageGroup: "For 3–6 age group",
    highlight: "Growing Up – social and emotional milestones for early years.",
    cover: juniorCover,
  },
  {
    id: "primary-ii",
    name: "Brainfeed Primary II",
    edition: "Volume X · Issue 8 · February 2026",
    ageGroup: "For classes III–V · 8–10 years",
    highlight: "Indian Coast Guard Day – courage, service and the sea.",
    cover: primaryIICover,
  },
];

const MagazineSection = () => {
  return (
    <section className="py-14 md:py-18 lg:py-24 bg-secondary/60">
      <div className="container">
        <ScrollReveal
          direction="up"
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <h2 className="section-title">Latest Magazines</h2>
            <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
              A curated family of editions for educators, parents and learners – each
              crafted with rich storytelling, research-led features and joyful design.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">
            Today&apos;s readers are tomorrow&apos;s leaders
          </p>
        </ScrollReveal>

        <div className="mt-8 md:mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {magazines.map((magazine, index) => (
            <ScrollReveal
              key={magazine.id}
              delay={0.06 * index}
              direction="up"
              className="group glass-card flex flex-col overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={magazine.cover}
                  alt={magazine.name}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="px-4 pt-4 pb-5 flex-1 flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent mb-1">
                  Latest Issue
                </p>
                <h3 className="font-serif text-[17px] leading-snug text-foreground">
                  {magazine.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground font-sans">
                  {magazine.edition}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground/80 font-sans">
                  {magazine.ageGroup}
                </p>
                <p className="mt-3 text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
                  {magazine.highlight}
                </p>

                <div className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                  <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground group-hover:text-accent transition-colors">
                    View Issue
                    <span className="text-base translate-y-[1px]">↗</span>
                  </button>
                  <span className="text-muted-foreground/70">Print &amp; Digital</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          direction="up"
          delay={0.15}
          className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground font-sans"
        >
          <p>
            Print subscriptions available across India. International and digital access on
            request.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            Explore subscription plans
            <span className="text-sm">→</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MagazineSection;

