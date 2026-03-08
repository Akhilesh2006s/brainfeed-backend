import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const ShippingPolicy = () => {
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
                Shipping Policy
              </h1>
              <p className="mt-3 text-sm text-muted-foreground font-sans">
                Effective Date: 24 July 2025
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <ScrollReveal direction="up" once>
              <div className="max-w-3xl space-y-8 font-sans text-muted-foreground leading-relaxed">
                <p>
                  At <strong className="text-foreground">Brainfeed Magazine</strong>, we are committed to delivering our products promptly and reliably. This Shipping Policy outlines our delivery terms for both physical magazines, promotional materials, and any other shippable items purchased through our platform.
                </p>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">1. Shipping Coverage</h2>
                  <p>We currently ship within <strong className="text-foreground">India</strong>.</p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">2. Shipping Methods & Delivery Time</h2>
                  <p className="mb-3">
                    <strong className="text-foreground">Magazine Subscriptions</strong>: First issue will be shipped within <strong className="text-foreground">5 – 30 working days</strong> from order confirmation. Subsequent issues are dispatched monthly.
                  </p>
                  <p className="text-sm italic">
                    Note: Delivery times may vary based on location, courier availability, and external factors like holidays or natural disruptions.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">3. Incorrect Address or Failed Delivery</h2>
                  <p className="mb-3">Please ensure your shipping address is correct at the time of order. We are not responsible for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delays caused by incorrect or incomplete address</li>
                    <li>Unavailability of recipient at the time of delivery</li>
                    <li>Reshipping costs due to failed delivery attempts</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">4. Contact for Shipping Issues</h2>
                  <p className="mb-3">If you have any questions or need assistance with shipping:</p>
                  <ul className="list-none space-y-1">
                    <li><strong className="text-foreground">Email</strong>: info@brainfeedmagazine.com</li>
                    <li><strong className="text-foreground">Phone</strong>: +91 7207015151</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
