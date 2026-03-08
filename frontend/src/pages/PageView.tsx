import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type PageData = {
  _id: string;
  title: string;
  slug: string;
  content: string;
};

const PageView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE}/api/pages/slug/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setPage(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <main className="container py-16">
          <p className="text-muted-foreground">Loading…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <main className="container py-16">
          <h1 className="font-serif text-2xl text-foreground">Page not found</h1>
          <p className="mt-2 text-muted-foreground">The page you are looking for does not exist.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        <section className="border-b border-border/60 bg-secondary/20">
          <div className="container py-12 md:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
              Page
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
              {page.title}
            </h1>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <div
              className="max-w-3xl font-sans text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-accent [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: page.content || "<p>No content yet.</p>" }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PageView;
