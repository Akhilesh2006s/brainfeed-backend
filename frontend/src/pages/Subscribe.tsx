import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import heroEducation from "@/assets/hero-education.jpg";

const shippingNotes = [
  "The subscription would begin from the next month cycle from the date of order.",
  "The order is accepted for an annual subscription only (12 months).",
  "The magazines will be delivered on or before 20th of that month.",
];

const prePrimaryPacks = [
  {
    name: "Tiny Pack",
    oldPrice: "₹12,100.00",
    price: "₹9,999.00",
    badge: "-17%",
    tag: "Pre Primary Packs",
  },
  {
    name: "Best Pack",
    oldPrice: "₹15,600.00",
    price: "₹11,999.00",
    badge: "-23%",
    tag: "Pre Primary Packs",
  },
  {
    name: "Big Pack",
    oldPrice: "₹24,200.00",
    price: "₹18,999.00",
    badge: "-21%",
    tag: "Pre Primary Packs",
  },
];

const libraryPacks = [
  {
    name: "Mini Library Pack",
    oldPrice: "₹18,000.00",
    price: "₹14,999.00",
    badge: "-17%",
  },
  {
    name: "Favourite Library Pack",
    oldPrice: "₹30,000.00",
    price: "₹23,999.00",
    badge: "-20%",
  },
  {
    name: "Jumbo Library Pack",
    oldPrice: "₹48,000.00",
    price: "₹35,999.00",
    badge: "-25%",
  },
];

const classroomPacks = [
  {
    name: "Classroom Pack 25",
    oldPrice: "₹150,000.00",
    price: "₹120,000.00",
    badge: "-20%",
  },
  {
    name: "Classroom Pack of 40",
    oldPrice: "₹213,000.00",
    price: "₹170,000.00",
    badge: "-20%",
  },
  {
    name: "Classroom Pack of 60",
    oldPrice: "₹297,000.00",
    price: "₹225,000.00",
    badge: "-24%",
  },
];

const magazines = [
  { name: "Brainfeed Magazine", price: "₹2,500.00" },
  { name: "Brainfeed High", price: "₹1,250.00" },
  { name: "Brainfeed Primary II", price: "₹1,050.00" },
  { name: "Brainfeed Junior", price: "₹850.00" },
  { name: "Brainfeed Primary I", price: "₹1,050.00" },
];

const parsePriceToNumber = (price: string) => {
  const numeric = price.replace(/[^0-9]/g, "");
  if (!numeric) return 0;
  return Number(numeric) / 100;
};

const Subscribe = () => {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[40vh] md:min-h-[45vh] flex items-end overflow-hidden border-b border-border/60">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroEducation})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          <div className="container relative z-10 w-full pb-12 pt-24 md:pb-16 md:pt-28">
            <ScrollReveal direction="up" once>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                Subscribe
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground font-sans">
                Choose from curated packs for classrooms, libraries and pre-primary learners, or subscribe to individual Brainfeed magazines.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Shipping policy */}
        <section className="py-10 md:py-12 border-b border-border/50">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Shipping Policy</h2>
              <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground font-sans">
                {shippingNotes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* Packs */}
        <section className="py-12 md:py-16 border-b border-border/50">
          <div className="container space-y-12 md:space-y-14">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Pre Primary Packs</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {prePrimaryPacks.map((pack) => (
                <ScrollReveal key={pack.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-semibold px-3 py-1">
                          {pack.badge}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          {pack.tag}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif">{pack.name}</CardTitle>
                      <CardDescription>Ideal bundle for early-years classrooms and centres.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-muted-foreground line-through">{pack.oldPrice}</p>
                        <p className="text-xl font-semibold text-foreground">{pack.price}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `pre-primary-${pack.name}`,
                            name: `${pack.name} (Pre Primary Pack)`,
                            price: parsePriceToNumber(pack.price),
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" once>
              <h2 className="section-title mt-8">Library Packs</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {libraryPacks.map((pack) => (
                <ScrollReveal key={pack.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-semibold px-3 py-1">
                          {pack.badge}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Library Packs
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif">{pack.name}</CardTitle>
                      <CardDescription>Thoughtfully curated for school and institutional libraries.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-muted-foreground line-through">{pack.oldPrice}</p>
                        <p className="text-xl font-semibold text-foreground">{pack.price}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `library-${pack.name}`,
                            name: `${pack.name} (Library Pack)`,
                            price: parsePriceToNumber(pack.price),
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" once>
              <h2 className="section-title mt-8">Classroom Packs</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {classroomPacks.map((pack) => (
                <ScrollReveal key={pack.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-semibold px-3 py-1">
                          {pack.badge}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          Classroom Packs
                        </span>
                      </div>
                      <CardTitle className="text-xl font-serif">{pack.name}</CardTitle>
                      <CardDescription>Bulk magazine packs for whole-class engagement.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-muted-foreground line-through">{pack.oldPrice}</p>
                        <p className="text-xl font-semibold text-foreground">{pack.price}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `classroom-${pack.name}`,
                            name: `${pack.name} (Classroom Pack)`,
                            price: parsePriceToNumber(pack.price),
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Individual magazines */}
        <section className="py-12 md:py-16">
          <div className="container">
            <ScrollReveal direction="up" once>
              <h2 className="section-title">Brainfeed Magazines</h2>
              <p className="text-muted-foreground font-sans mt-3 mb-8 max-w-2xl">
                Subscribe to individual titles across age groups — from Brainfeed Junior to Brainfeed High — and build a rich reading culture in your school.
              </p>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {magazines.map((mag) => (
                <ScrollReveal key={mag.name} direction="up" once>
                  <Card className="glass-card h-full flex flex-col items-stretch">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-serif">{mag.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <p className="text-lg font-semibold text-foreground mb-4">{mag.price}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-xs font-semibold uppercase tracking-[0.18em]"
                        onClick={() =>
                          addItem({
                            id: `magazine-${mag.name}`,
                            name: mag.name,
                            price: parsePriceToNumber(mag.price),
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Subscribe;

