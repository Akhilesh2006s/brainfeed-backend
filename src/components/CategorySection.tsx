import ScrollReveal from "./ScrollReveal";

interface CategoryArticle {
  image: string;
  title: string;
  date: string;
  tag?: string;
  author?: string;
  readTime?: string;
}

interface CategorySectionProps {
  title: string;
  articles: CategoryArticle[];
}

const CategorySection = ({ title, articles }: CategorySectionProps) => {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="container">
        <ScrollReveal direction="up">
          <h2 className="section-title">{title}</h2>
        </ScrollReveal>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6 sm:gap-8 md:gap-10">
          {/* Featured story with image */}
          <ScrollReveal direction="up">
            <article className="glass-card overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-52 sm:h-56 md:h-64 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {featured.tag ?? title}
                </span>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-snug">
                  {featured.title}
                </h3>
                <div className="mt-1 flex items-center gap-4 text-[11px] text-muted-foreground/80 font-sans flex-wrap">
                  {featured.author && <span>{featured.author}</span>}
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{featured.date}</span>
                  {featured.readTime && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span>{featured.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* Side list of other stories */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {rest.map((article, index) => (
              <ScrollReveal key={article.title} delay={0.05 * index} direction="up">
                <article className="glass-card flex gap-3 md:gap-4 p-3 sm:p-3.5 md:p-4 min-h-[72px] sm:min-h-0">
                  <div className="hidden sm:block w-24 md:w-28 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-semibold uppercase tracking-[0.16em]">
                      {article.tag ?? title}
                    </span>
                    <h4 className="font-serif text-[15px] md:text-[16px] text-foreground leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground/80 font-sans flex-wrap">
                      {article.author && <span>{article.author}</span>}
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span>{article.date}</span>
                      {article.readTime && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                          <span>{article.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
