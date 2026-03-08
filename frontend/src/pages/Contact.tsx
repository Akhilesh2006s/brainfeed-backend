import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import heroEducation from "@/assets/hero-education.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: in production you'd send to an API or mailto
    console.log("Contact form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="container relative z-10 w-full pb-12 pt-24 md:pb-16 md:pt-28">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground"
            >
              Contact Us
            </motion.h1>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <ScrollReveal direction="up" once>
                  <h2 className="section-title">Contact Info</h2>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1} once>
                  <div className="flex gap-4">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                        Kakani Edu Media Pvt Ltd
                        <br />
                        Plot No: 47, Rd Number 4A, adjacent to Bose Edifice,
                        Golden Tulip Estate, Raghavendra Colony, Hyderabad,
                        Telangana 500084
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15} once>
                  <div className="flex gap-4">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">
                        WhatsApp
                      </p>
                      <p className="text-muted-foreground font-sans text-sm">
                        <a
                          href="https://wa.me/918448737157"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          +91 8448737157
                        </a>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2} once>
                  <div className="flex gap-4">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-muted-foreground font-sans text-sm">
                        <a
                          href="mailto:info@brainfeedmagazine.com"
                          className="hover:text-accent transition-colors break-all"
                        >
                          info@brainfeedmagazine.com
                        </a>
                      </p>
                      <p className="text-muted-foreground font-sans text-sm mt-0.5">
                        <a
                          href="mailto:kakani2406@gmail.com"
                          className="hover:text-accent transition-colors break-all"
                        >
                          kakani2406@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.25} once>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-semibold text-foreground text-sm uppercase tracking-wider mb-2">
                      Punjab Region
                    </p>
                    <p className="text-muted-foreground font-sans text-sm">
                      Katyayani Singh
                    </p>
                    <p className="text-muted-foreground font-sans text-sm mt-0.5">
                      <a
                        href="https://wa.me/918448737157"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        +91 8448737157
                      </a>
                    </p>
                    <p className="text-muted-foreground font-sans text-sm mt-0.5">
                      <a
                        href="mailto:katyayanis2019@gmail.com"
                        className="hover:text-accent transition-colors break-all"
                      >
                        katyayanis2019@gmail.com
                      </a>
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Get In Touch form */}
              <div className="lg:col-span-3">
                <ScrollReveal direction="up" once>
                  <h2 className="section-title">Get In Touch</h2>
                  <p className="text-muted-foreground font-sans text-sm mb-8">
                    Send us a message and we&apos;ll get back to you as soon as we can.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1} once>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-foreground font-medium">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="rounded-lg border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Your Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="rounded-lg border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground font-medium">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Subject of your message"
                        value={formData.subject}
                        onChange={handleChange}
                        className="rounded-lg border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-medium">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="rounded-lg border-border min-h-[120px]"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-8 py-3 text-sm font-semibold uppercase tracking-widest"
                      >
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="border-t border-border/50">
          <ScrollReveal direction="up" once>
            <div className="container flex flex-wrap items-baseline justify-between gap-2 py-3">
              <h2 className="section-title mb-0">Find Us</h2>
              <a
                href="https://www.google.com/maps?ll=17.473071,78.357614&z=22&t=m&hl=en&gl=IN&mapclient=embed&cid=16509507856910290038"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline font-medium"
              >
                View in Google Maps →
              </a>
            </div>
          </ScrollReveal>
          <div className="w-full aspect-[16/10] sm:aspect-[2/1] md:aspect-[21/9] min-h-[240px] max-h-[50vh]">
            <iframe
              title="Brainfeed Magazine location - Hyderabad"
              src="https://www.google.com/maps?q=17.473071,78.357614&z=22&output=embed"
              width="100%"
              height="100%"
              className="block w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
