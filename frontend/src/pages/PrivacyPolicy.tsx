import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm text-muted-foreground font-sans">
                Effective Date: 24-07-2025
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            <ScrollReveal direction="up" once>
              <div className="max-w-3xl space-y-8 font-sans text-muted-foreground leading-relaxed">
                <p>
                  At <strong className="text-foreground">Brainfeed Magazine</strong> (“we”, “our”, “us”), accessible from https://brainfeedmagazine.com, we are committed to protecting your personal data and your right to privacy. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to ensure it remains secure.
                </p>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">1. Information We Collect</h2>
                  <p className="mb-3">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground">Personal Information</strong>: Name, email address, phone number, school/institution name, job title, etc. — typically provided via forms such as newsletter sign-up, event registration, or contact forms.</li>
                    <li><strong className="text-foreground">Usage Data</strong>: Information on how the website is accessed and used (e.g., browser type, IP address, device type, pages visited, time spent).</li>
                    <li><strong className="text-foreground">Cookies & Tracking Technologies</strong>: We use cookies and similar tracking technologies to analyze trends, administer the website, and gather demographic information.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">2. How We Use Your Information</h2>
                  <p className="mb-3">We use the information we collect for purposes such as:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To improve and personalize your experience</li>
                    <li>To respond to inquiries or requests</li>
                    <li>To send newsletters, updates, or promotional materials (only if you have opted-in)</li>
                    <li>To analyze website traffic and performance</li>
                    <li>To manage and improve our events (like ET TECH X)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">3. Sharing Your Information</h2>
                  <p className="mb-3">We do <strong className="text-foreground">not sell or rent</strong> your personal information to third parties. We may share your data with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground">Trusted third-party service providers</strong> (e.g., email marketing platforms, analytics tools) who help us operate our website</li>
                    <li><strong className="text-foreground">Legal authorities</strong>, if required to comply with the law</li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">4. Your Rights</h2>
                  <p className="mb-3">Depending on your location, you may have rights under applicable data protection laws (like the GDPR or CCPA), including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access to the personal data we hold about you</li>
                    <li>Request correction or deletion of your data</li>
                    <li>Withdraw consent at any time</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                  <p className="mt-3">To exercise these rights, email us at <strong className="text-foreground">info@brainfeedmagazine.com</strong>.</p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">5. Security of Your Data</h2>
                  <p>We implement reasonable security measures to protect your data from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.</p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">6. Third-Party Links</h2>
                  <p>Our website may contain links to external websites. We are not responsible for the privacy practices of those sites. We recommend reviewing their privacy policies individually.</p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">7. Children’s Privacy</h2>
                  <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal data from children. If you believe we have collected such information, please contact us immediately.</p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">8. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy from time to time. All changes will be posted on this page with a revised effective date.</p>
                </div>

                <div>
                  <h2 className="font-serif text-xl text-foreground mb-3">9. Contact Us</h2>
                  <p className="mb-3">If you have any questions or concerns about this policy or your personal data, please contact us:</p>
                  <ul className="list-none space-y-1">
                    <li><strong className="text-foreground">Email</strong>: info@brainfeedmagazine.com</li>
                    <li><strong className="text-foreground">Address</strong>: Plot No: 47, Rd Number 4A, adjacent to Bose Edifice, Golden Tulip Estate, Raghavendra Colony, Kondapur, Hyderabad, Telangana 500084</li>
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

export default PrivacyPolicy;
