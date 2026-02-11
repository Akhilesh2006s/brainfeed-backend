import ScrollReveal from "./ScrollReveal";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const articles = [
  {
    image: news1,
    tag: "Education Trends",
    title: "Colonel Seema Mishra Becomes First Woman Principal at Uttar Pradesh Sainik School",
    date: "February 10, 2026",
    author: "Dr. Rajesh Kumar",
    readTime: "7 min read",
    excerpt: "A historic appointment that marks a new chapter in Indian military education and leadership.",
  },
  {
    image: news2,
    tag: "Board Exams",
    title: "CBSE Directs Schools To Update Class 11, 12 Teachers' Data For On-Screen Marking 2026",
    date: "February 10, 2026",
    author: "CBSE Desk",
    readTime: "5 min read",
    excerpt: "Schools must update their teacher databases ahead of the new on-screen marking system for senior classes.",
  },
  {
    image: news3,
    tag: "School Admissions",
    title: "Rashtriya Military Schools Admission 2026: Class 6, 9 Result Released",
    date: "February 10, 2026",
    author: "Admissions Bureau",
    readTime: "4 min read",
    excerpt: "Entrance examination results and interview call letters for Classes 6 and 9 have been announced online.",
  },
  {
    image: news1,
    tag: "STEM Learning",
    title: "Making Science Fun: Interactive Experiments for Primary Students",
    date: "February 9, 2026",
    author: "Science Lab Team",
    readTime: "6 min read",
    excerpt: "Hands-on activities and low-cost experiments that turn science periods into moments of discovery.",
  },
  {
    image: news2,
    tag: "School Management",
    title: "Leadership in Education: What Makes a Great School Principal?",
    date: "February 8, 2026",
    author: "Anjali Sharma",
    readTime: "8 min read",
    excerpt: "Insights into the qualities and strategies that define successful educational leadership in the 21st century.",
  },
];

const LatestNews = () => {
  const [featured, ...rest] = articles;

  return (
    <section id="news" className="py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="container">
        <ScrollReveal direction="up">
          <h2 className="section-title">Latest News</h2>
        </ScrollReveal>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6 sm:gap-8 lg:gap-10">
          {/* Featured story with image */}
          <ScrollReveal direction="up">
            <article className="glass-card overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {featured.tag}
                </span>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-snug">
                  {featured.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-1 flex items-center gap-4 text-[11px] text-muted-foreground/80 font-sans">
                  <span>{featured.author}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{featured.date}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span>{featured.readTime}</span>
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold uppercase tracking-[0.16em]">
                      {article.tag}
                    </span>
                    <h4 className="font-serif text-[15px] md:text-[16px] text-foreground leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="hidden md:block text-xs text-muted-foreground/90 font-sans line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground/80 font-sans">
                      <span>{article.author}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span>{article.readTime}</span>
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

export default LatestNews;
