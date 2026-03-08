import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        <section className="border-b border-border/60 bg-secondary/20">
          <div className="container py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                Useful Links
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                Cancellation & Refund Policy
              </h1>
              <p className="mt-3 text-sm text-muted-foreground font-sans">
                Last updated on 14-04-2025
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <ScrollReveal direction="up" once>
              <div className="max-w-3xl prose prose-slate dark:prose-invert font-sans">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">KAKANI EDU MEDIA PRIVATE LIMITED</strong> believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
                </p>
                <ul className="mt-6 space-y-4 text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>
                    Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                  </li>
                  <li>
                    KAKANI EDU MEDIA PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                  </li>
                  <li>
                    In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the same day of receipt of the products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
                  </li>
                  <li>
                    In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them accordingly.
                  </li>
                  <li>
                    In case of any refunds approved by KAKANI EDU MEDIA PRIVATE LIMITED, it will take <strong className="text-foreground">16–30 days</strong> for the refund to be processed to the end customer.
                  </li>
                </ul>
                <p className="mt-8 text-sm text-muted-foreground">
                  For any queries related to cancellation or refunds, please contact our Customer Service team.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationRefundPolicy;
