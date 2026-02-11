import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import logo from "@/assets/logo-brainfeed.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/70 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="sm:col-span-2 md:col-span-1">
            <img src={logo} alt="Brainfeed Magazine" className="h-9 sm:h-10 brightness-200 w-auto" />
            <p className="mt-4 sm:mt-5 text-[13px] sm:text-sm leading-[1.8] font-sans text-background/50">
              India's premier education magazine empowering educators, parents, and students since 2010.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm font-sans">
              {["Home", "About Us", "News", "Blog", "Subscribe"].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-accent transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Categories</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[13px] sm:text-sm font-sans">
              {["Education", "Technology", "Parenting", "Expert View", "Press Release"].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-accent transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-background text-base sm:text-lg mb-4 sm:mb-5">Connect</h4>
            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-background/50 hover:text-accent transition-colors duration-300 p-2 -m-2 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation md:min-h-0 md:min-w-0 md:p-0"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <p className="mt-4 sm:mt-5 text-[13px] sm:text-sm font-sans text-background/40 break-all">
              admin@brainfeedmagazine.com
            </p>
          </div>
        </motion.div>

        <div className="mt-10 sm:mt-14 pt-4 sm:pt-6 border-t border-background/10 text-center text-[11px] sm:text-xs text-background/30 font-sans tracking-wide px-2">
          © {new Date().getFullYear()} Brainfeed Magazine. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
