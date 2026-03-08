import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, Newspaper } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const howDidYouHearOptions = [
  { value: "none", label: "Select an option" },
  { value: "search", label: "Search engine (Google, etc.)" },
  { value: "social", label: "Social media" },
  { value: "referral", label: "Friend or colleague" },
  { value: "magazine", label: "Brainfeed magazine" },
  { value: "event", label: "Conference or event" },
  { value: "other", label: "Other" },
];

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("none");
  const [wantsUpdates, setWantsUpdates] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in name, email and password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await signup({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      howDidYouHear: howDidYouHear && howDidYouHear !== "none" ? howDidYouHear : undefined,
      wantsUpdates,
    });
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Account created. Welcome to Brainfeed!");
    navigate("/news");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main>
        <section className="py-12 md:py-20 border-b border-border/60">
          <div className="container max-w-md mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 text-accent mb-4">
                <Newspaper className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Brainfeed</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">Create an account</h1>
              <p className="mt-3 text-muted-foreground font-sans text-sm">
                Sign up to read articles, follow the blog, and stay updated on education news.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border/60 bg-card/60 p-6 md:p-8 shadow-sm space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-foreground font-medium">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 rounded-lg"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-lg"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 rounded-lg"
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-foreground font-medium">
                  Confirm password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-11 rounded-lg"
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">How did you hear about us?</Label>
                <Select value={howDidYouHear} onValueChange={setHowDidYouHear}>
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {howDidYouHearOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="signup-updates"
                  checked={wantsUpdates}
                  onCheckedChange={(checked) => setWantsUpdates(checked === true)}
                />
                <Label
                  htmlFor="signup-updates"
                  className="text-sm font-normal text-muted-foreground cursor-pointer"
                >
                  I’d like to receive updates on articles, blogs, and education news.
                </Label>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-accent text-accent-foreground font-semibold uppercase tracking-wider"
              >
                {loading ? "Creating account…" : "Sign up"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-accent font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </motion.form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
