import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "Subscribed!", description: `We'll send updates to ${email}` });
    setEmail("");
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Mail className="text-primary-foreground" size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading text-primary-foreground">
            Never Miss a Beat
          </h2>
          <p className="text-primary-foreground/90 mt-3 text-base md:text-lg">
            Subscribe to our weekly newsletter — top stories, exclusive interviews, and event invites delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full bg-white/95 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
            >
              Subscribe <Send size={16} />
            </button>
          </form>
          <p className="text-primary-foreground/70 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
