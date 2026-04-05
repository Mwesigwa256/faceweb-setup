import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-24 pb-20">
      <div className="section-container max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-heading text-foreground text-center mb-12">
          Contact <span className="text-primary">Us</span>
        </h1>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Message</label>
            <textarea
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition-all duration-300 text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Send size={18} />
            Send Message
          </button>
        </form>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex items-center gap-4">
            <Mail className="text-primary" size={24} />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground">info@facetv.ug</p>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4">
            <Phone className="text-primary" size={24} />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-foreground">+256 700000000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
