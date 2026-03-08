import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { BookOpen, Users, School, Award, Sparkles, Heart, Target, Quote } from "lucide-react";
import primary2Cover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.30 AM (1).jpeg";
import primary1Cover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.30 AM (2).jpeg";
import juniorCover from "@/assets/WhatsApp Image 2026-02-10 at 10.48.31 AM.jpeg";

const stats = [
  { value: "60,000+", label: "Schools Reached", icon: School },
  { value: "3 Lakh+", label: "School Leaders & Educators", icon: Users },
  { value: "1,75,000", label: "Subscribers", icon: BookOpen },
  { value: "45+", label: "Educational Conferences", icon: Award },
  { value: "12,000+", label: "Leaders Recognised", icon: Sparkles },
];

const editions = [
  {
    title: "Brainfeed Magazine",
    subtitle: "The voice of educators",
    description:
      "Connects thousands of school leaders and educators with objective insights to see what's now and what's next. A platform for stakeholders to discuss issues and remedial measures from industry and policy perspectives, share inspirational stories, innovative ideas and best practices.",
    icon: Quote,
    accent: "from industry and policy perspectives",
  },
  {
    title: "Brainfeed High",
    subtitle: "Igniting young minds",
    description:
      "Ignites young minds and nurtures curiosity with content that raises questions and stimulates interest. Helps children improve intellectual and personal development, accelerate academic success, increase critical thinking skills and prepare for modern-day challenges through science, culture, environment, career and current affairs.",
    icon: Sparkles,
    accent: "regular reading",
  },
  {
    title: "Brainfeed Primary 2",
    subtitle: "Inspiring love for reading",
    description:
      "An eclectic mix for children aged 8–10, aligned with their growing independence and curiosity. Every month it brings wonders of the world, beauty of nature, truths of science and the magic of stories to educate and entertain in a fun and engaging way.",
    icon: BookOpen,
    accent: "fun and engaging",
  },
  {
    title: "Brainfeed Primary 1",
    subtitle: "Unlocking creativity",
    description:
      "Designed for children below 8 with multidisciplinary content: logical thinking, stories, art, craft, colours, shapes and play. Develops cognitive, social and emotional stimulation with values, facts, activities and brain teasers to build intellectual, social, ethical and emotional capacities.",
    icon: Heart,
    accent: "discovery space",
  },
  {
    title: "Brainfeed Junior",
    subtitle: "Where the conversation begins",
    description:
      "Stimulates early childhood learning during the foundational stage. Develops cognitive, fine motor, literacy and numeracy skills through everyday experiences. Colourful pages invite exploration of play, art, rhythm, rhyme and movement for early attempts at reading.",
    icon: Target,
    accent: "foundational stage",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b border-border/60 bg-secondary/20">
          <div className="container py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Knowing Brainfeed
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
                Empowering children in their journey of literacy, numeracy and
                beyond.
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground font-sans leading-relaxed">
                Since 2013 we have been working with schools, educators and
                childhood advocacy organisations to keep the reading habit alive
                among the growing minds that are the destiny of our nation
                tomorrow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro block */}
        <section className="py-14 md:py-20 border-b border-border/50">
          <div className="container">
            <ScrollReveal direction="up" once>
              <div className="max-w-3xl mx-auto text-center">
                <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">
                  Brainfeed is an educational media house empowering children in
                  their journey of childhood, literacy and numeracy development —
                  and helping educators teach out-of-curriculum skills and
                  concepts.
                </p>
                <p className="mt-6 text-muted-foreground font-sans leading-relaxed">
                  Our children's editions ignite young minds and nurture
                  curiosity with content that raises questions and stimulates
                  interest. The educator edition connects thousands of school
                  leaders with objective insights to see what's now and next.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="font-serif text-2xl md:text-3xl text-center mb-10 md:mb-14">
                Our reach
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {stats.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.08} direction="up" once>
                  <div className="text-center group">
                    <item.icon className="h-8 w-8 mx-auto mb-3 text-accent opacity-90 group-hover:scale-110 transition-transform" />
                    <div className="font-serif text-2xl md:text-3xl font-semibold text-white">
                      {item.value}
                    </div>
                    <div className="text-sm text-primary-foreground/80 mt-1 font-sans">
                      {item.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Magazine editions */}
        <section className="py-14 md:py-20">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Our publications</h2>
              <p className="text-muted-foreground font-sans max-w-2xl mb-12">
                One educators' magazine and four children's magazines — each
                crafted for its audience.
              </p>
            </ScrollReveal>

            <div className="space-y-8 md:space-y-12">
              {editions.map((edition, i) => (
                <ScrollReveal
                  key={edition.title}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={0.05 * i}
                  once
                >
                  <article className="glass-card overflow-hidden flex flex-col md:flex-row gap-0">
                    <div className="md:w-1/3 min-h-[220px] md:min-h-[280px] flex items-center justify-center bg-secondary/50 overflow-hidden shrink-0">
                      {edition.title === "Brainfeed Primary 2" ? (
                        <img
                          src={primary2Cover}
                          alt="Brainfeed Primary 2 magazine cover"
                          className="w-full h-full min-h-[220px] md:min-h-[280px] object-cover object-top"
                          loading="lazy"
                        />
                      ) : edition.title === "Brainfeed Primary 1" ? (
                        <img
                          src={primary1Cover}
                          alt="Brainfeed Primary 1 magazine cover"
                          className="w-full h-full min-h-[220px] md:min-h-[280px] object-cover object-top"
                          loading="lazy"
                        />
                      ) : edition.title === "Brainfeed Junior" ? (
                        <img
                          src={juniorCover}
                          alt="Brainfeed Junior magazine cover"
                          className="w-full h-full min-h-[220px] md:min-h-[280px] object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <div className="p-8 md:p-10">
                          <edition.icon className="h-14 w-14 md:h-16 md:w-16 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                        {edition.subtitle}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mt-2">
                        {edition.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground font-sans leading-relaxed">
                        {edition.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Conferences & awards */}
        <section className="py-14 md:py-20 bg-secondary/30 border-t border-border/50">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Conferences & recognition</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8">
              <ScrollReveal direction="up" delay={0.1} once>
                <div className="glass-card p-6 sm:p-8">
                  <Award className="h-10 w-10 text-accent mb-4" />
                  <h3 className="font-serif text-xl text-foreground">
                    Conferences & expos
                  </h3>
                  <p className="mt-3 text-muted-foreground font-sans leading-relaxed">
                    Our educational conferences and expos have seen active
                    participation from 8,000+ educational leaders and 250+
                    leading brands. Since 2013 we have organised 45+ conferences
                    — a space for school leaders and educators to share ideas,
                    identify trends and network with peers.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.15} once>
                <div className="glass-card p-6 sm:p-8">
                  <Sparkles className="h-10 w-10 text-accent mb-4" />
                  <h3 className="font-serif text-xl text-foreground">
                    Awards
                  </h3>
                  <p className="mt-3 text-muted-foreground font-sans leading-relaxed">
                    Brainfeed has recognised the contribution of over 12,000
                    leaders, educators, and companies in the educational
                    products and services segment, conferring them with
                    respective awards for excellence and innovation.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 border-t border-border/50">
          <div className="container">
            <ScrollReveal direction="up" once>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  Ten years and still counting — trusted by readers who swear by
                  our objectivity and quality.
                </h2>
                <motion.a
                  href="/#news"
                  className="inline-flex items-center gap-2 mt-8 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-accent/90 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Brainfeed
                  <span className="text-base">→</span>
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
