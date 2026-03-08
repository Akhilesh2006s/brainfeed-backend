import { useState, useEffect } from "react";
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
import { User, Mail, Newspaper } from "lucide-react";
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

const Profile = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("none");
  const [wantsUpdates, setWantsUpdates] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
      return;
    }
    if (user) {
      setName(user.name || "");
      setHowDidYouHear(user.howDidYouHear && user.howDidYouHear !== "none" ? user.howDidYouHear : "none");
      setWantsUpdates(user.wantsUpdates !== false);
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    setSaving(true);
    const { error } = await updateProfile({
      name: name.trim(),
      howDidYouHear: howDidYouHear && howDidYouHear !== "none" ? howDidYouHear : undefined,
      wantsUpdates,
    });
    setSaving(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Profile updated.");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-sans">Loading…</p>
      </div>
    );
  }

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
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">My profile</h1>
              <p className="mt-3 text-muted-foreground font-sans text-sm">
                Edit your account details and preferences.
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
                <Label htmlFor="profile-name" className="text-foreground font-medium">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-name"
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
                <Label htmlFor="profile-email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="pl-10 h-11 rounded-lg bg-muted/50 cursor-not-allowed text-muted-foreground"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
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
                  id="profile-updates"
                  checked={wantsUpdates}
                  onCheckedChange={(checked) => setWantsUpdates(checked === true)}
                />
                <Label
                  htmlFor="profile-updates"
                  className="text-sm font-normal text-muted-foreground cursor-pointer"
                >
                  I’d like to receive updates on articles, blogs, and education news.
                </Label>
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="w-full h-11 rounded-lg bg-accent text-accent-foreground font-semibold uppercase tracking-wider"
              >
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </motion.form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
