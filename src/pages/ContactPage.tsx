import { useState } from "react";
import { Mail, Phone, Send, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-muted-foreground mt-3">We'd love to hear from you</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-card p-6 flex items-start gap-4">
                <MapPin className="text-primary mt-1 shrink-0" size={22} />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-foreground">Plot 914 Kaduyu Road, Kiwatule</p>
                  <p className="text-foreground text-sm">Kampala, Uganda</p>
                  <p className="text-foreground text-xs text-muted-foreground mt-1">0.35970° N, 32.62719° E</p>
                </div>
              </div>
              <a
                href="https://wa.me/256748624400"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-start gap-4 hover:border-primary/40 transition-colors group cursor-pointer"
              >
                <Phone className="text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" size={22} />
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp Hotline</p>
                  <p className="text-foreground group-hover:text-primary transition-colors">+256 748 624 400</p>
                </div>
              </a>
              <div className="glass-card p-6 flex items-start gap-4">
                <Mail className="text-primary mt-1 shrink-0" size={22} />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">mwesigwasophie12@gmail.com</p>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4">
                <Clock className="text-primary mt-1 shrink-0" size={22} />
                <div>
                  <p className="text-sm text-muted-foreground">On Air</p>
                  <p className="text-foreground">24 Hours, 7 Days a Week</p>
                  <p className="text-foreground text-sm">StarTimes CH 223 / ST 199</p>
                </div>
              </div>

              {/* Map embed */}
              <div className="glass-card overflow-hidden rounded-lg">
                <iframe
                  title="Face TV Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.74!2d32.62719!3d0.35970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d8e5c1234567!2sPlot%20914%20Kaduyu%20Road%20Kiwatule%20Kampala!5e0!3m2!1sen!2sug!4v1687000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
