import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="container relative pt-8 md:pt-10 lg:pt-10 pb-8 md:pb-12 w-full">
        <motion.div
          className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Editorial copy overlay */}
          <div className="md:col-span-7 space-y-5 md:space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 rounded-full px-3 py-1.5 bg-primary-foreground/10 ring-1 ring-primary-foreground/25 backdrop-blur"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Educator Edition
              </span>
              <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
              <span className="text-[11px] text-primary-foreground/60">
                Insights · Policy · School Stories
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-[1.9rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] leading-tight"
            >
              Today&apos;s most important{" "}
              <span className="text-accent">education stories</span>, in one place.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-sm md:text-base text-primary-foreground/70 font-sans leading-relaxed"
            >
              Start with our most-read stories of the day—carefully reported articles for
              school leaders, teachers and parents who want clear, trustworthy education
              journalism.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-3 grid gap-2.5 text-xs md:text-sm text-primary-foreground/80 font-sans"
            >
              <div className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <p>Colonel Seema Mishra becomes the first woman Principal at Uttar Pradesh Sainik School.</p>
              </div>
              <div className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <p>CBSE on-screen marking &amp; new evaluation shifts for senior secondary classes.</p>
              </div>
              <div className="inline-flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <p>Inside India&apos;s changing classrooms: technology, mental health and inclusive schooling.</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-start gap-4 md:gap-5 text-xs md:text-sm font-sans text-primary-foreground/70"
            >
              <div>
                <div className="font-semibold text-primary-foreground">12+ years</div>
                <div className="mt-0.5">of trusted education coverage</div>
              </div>
              <div className="h-8 w-px bg-primary-foreground/15" />
              <div>
                <div className="font-semibold text-primary-foreground">10,000+</div>
                <div className="mt-0.5">schools &amp; educators reached</div>
              </div>
              <div className="h-8 w-px bg-primary-foreground/15 hidden sm:block" />
              <div className="hidden sm:flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.24em] text-accent">
                  Fresh today
                </span>
                <span>Updated with every new issue</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <motion.a
                href="#news"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent-foreground shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
              >
                Browse latest articles
                <span className="text-base translate-y-[1px]">→</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/80"
              >
                Explore all sections
              </motion.button>
            </motion.div>

          </div>

          {/* Right – latest article summary cards */}
          <motion.div
            className="mt-8 md:mt-0 md:col-span-5"
            variants={itemVariants}
          >
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.24em] text-accent mb-3">
              Latest articles
            </p>

            {/* Desktop / tablet list */}
            <div className="hidden md:flex flex-col gap-3">
              {[
                {
                  tag: "Education Trends",
                  title: "The Future of Education: AI-Powered Learning in Indian Classrooms",
                  readTime: "7 min read",
                },
                {
                  tag: "Student Development",
                  title: "Building Critical Thinking Skills: A Complete Guide for Parents",
                  readTime: "5 min read",
                },
                {
                  tag: "School Management",
                  title: "Leadership in Education: What Makes a Great School Principal?",
                  readTime: "8 min read",
                },
                {
                  tag: "STEM Learning",
                  title: "Making Science Fun: Interactive Experiments for Primary Students",
                  readTime: "6 min read",
                },
              ].map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -2 }}
                  className="glass-card px-3 py-3 md:px-4 md:py-3.5 flex flex-col gap-1.5 text-left"
                >
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold uppercase tracking-[0.16em]">
                    {item.tag}
                  </span>
                  <h4 className="font-serif text-[14px] md:text-[15px] text-foreground leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-muted-foreground/80 font-sans">{item.readTime}</span>
                </motion.article>
              ))}
            </div>

            {/* Mobile: horizontal scroll of article chips */}
            <div className="md:hidden -mx-1 mt-1 flex gap-3 overflow-x-auto pb-1">
              {[
                {
                  tag: "Education Trends",
                  title: "AI-powered learning in Indian classrooms",
                  readTime: "7 min",
                },
                {
                  tag: "Student Development",
                  title: "Critical thinking skills for parents",
                  readTime: "5 min",
                },
                {
                  tag: "School Management",
                  title: "What makes a great principal",
                  readTime: "8 min",
                },
                {
                  tag: "STEM Learning",
                  title: "Interactive science experiments",
                  readTime: "6 min",
                },
              ].map((item) => (
                <motion.article
                  key={item.title}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card flex-shrink-0 w-56 flex flex-col overflow-hidden text-left mx-1 px-3 py-2.5 gap-1.5"
                >
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold uppercase tracking-[0.16em]">
                    {item.tag}
                  </span>
                  <h4 className="font-serif text-[13px] text-foreground leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-muted-foreground/80 font-sans">{item.readTime}</span>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
