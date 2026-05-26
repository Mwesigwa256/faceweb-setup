import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Megaphone, Mail, Phone, MapPin, ArrowRight, Sun, Sparkles, TrendingUp, Flame, Moon } from "lucide-react";
import { NavLink as Link } from "@/components/NavLink";

const spotAds = [
  { segment: "Early Prime", time: "7:00am – 12:00pm", s15: "70,000", s30: "120,000", s45: "250,000", s60: "250,000" },
  { segment: "Face Prime", time: "12:00pm – 5:00pm", s15: "190,000", s30: "300,000", s45: "400,000", s60: "500,000" },
  { segment: "Peak", time: "5:00pm – 8:00pm", s15: "150,000", s30: "200,000", s45: "300,000", s60: "400,000" },
  { segment: "Peak Plus", time: "8:00pm – 12:00am", s15: "140,000", s30: "180,000", s45: "200,000", s60: "300,000" },
  { segment: "Late Night", time: "12:00am – 7:00am", s15: "65,000", s30: "100,000", s45: "150,000", s60: "200,000" },
];

const AdvertisePage = () => {
  const { ref: rateRef, isVisible: rateVisible } = useScrollReveal();
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case "Early Prime": return <Sun className="text-amber-500" size={18} />;
      case "Face Prime": return <Sparkles className="text-primary" size={18} />;
      case "Peak": return <TrendingUp className="text-emerald-500" size={18} />;
      case "Peak Plus": return <Flame className="text-orange-500" size={18} />;
      case "Late Night": return <Moon className="text-violet-500" size={18} />;
      default: return <Megaphone size={18} />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_65%)]" />
        <div className="section-container text-center relative z-10">
          <Megaphone className="mx-auto mb-4 text-primary animate-pulse" size={42} />
          <h1 className="text-5xl md:text-8xl font-heading text-foreground tracking-wider glow-text">
            Advertise <span className="text-primary">With Us</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Reach over <span className="text-foreground font-semibold">470,000 daily viewers</span> across 32+ African countries on StarTimes CH 223 / ST 199.
          </p>
        </div>
      </section>

      {/* Why Advertise Section */}
      <section ref={whyRef} className="py-24 bg-background border-t border-border/40">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading text-foreground">
              Why <span className="text-primary">Face TV</span>?
            </h2>
            <div className="w-16 h-1 mt-3 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Massive Reach", 
                desc: "14.5M+ subscriber homes on StarTimes across Africa with a dominant 35% viewership share in music content." 
              },
              { 
                title: "Young Demographic", 
                desc: "Targeting the 15–45 age group — urban youth, trendsetters, students, and young professionals." 
              },
              { 
                title: "24/7 Visibility", 
                desc: "Your brand plays alongside Uganda's biggest music videos, celebrity news, and chart-topping shows." 
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`glass-card p-8 border border-border/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
                  whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <h3 className="font-heading text-2xl text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section ref={rateRef} className="py-24 border-t border-border/40" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading text-foreground">
              Spot Ad <span className="text-primary">Rate Card</span>
            </h2>
            <div className="w-16 h-1 mt-3 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4">Prices are in UGX per single spot transmission</p>
          </div>

          <div
            className={`glass-card overflow-hidden shadow-2xl transition-all duration-700 border border-border/40 ${
              rateVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="bg-secondary/40 border-b border-border text-foreground/80">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-semibold">Segment</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider font-semibold">Schedule Time</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider font-semibold">15 Sec</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider font-semibold">30 Sec</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider font-semibold">45 Sec</th>
                    <th className="text-right px-6 py-4 text-xs uppercase tracking-wider font-semibold">60 Sec</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {spotAds.map((row) => (
                    <tr key={row.segment} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 font-heading text-xl text-foreground flex items-center gap-3">
                        {getSegmentIcon(row.segment)}
                        {row.segment}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.time}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground text-right">UGX {row.s15}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground text-right">UGX {row.s30}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground text-right">UGX {row.s45}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground text-right">UGX {row.s60}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Unified Contact/Partnership CTA Section */}
      <section ref={ctaRef} className="py-24 bg-background border-t border-border/40">
        <div className="section-container max-w-4xl">
          <div className={`glass-card p-10 md:p-14 border border-primary/20 shadow-2xl relative overflow-hidden transition-all duration-700 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-widest px-6 py-2 rounded-bl-lg border-l border-b border-primary/20">
              Partner With Us
            </div>
            
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-heading text-foreground">
                Ready to <span className="text-primary">Grow Your Brand</span>?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Collaborate with Face TV to custom-design campaigns, sponsor prime shows, or initiate high-impact brand integrations. Reach out directly to our advertising desk or request a consultation.
              </p>

              {/* Main CTA Button */}
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-primary-foreground font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg pulse-glow text-base group"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Advertise With Us
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Grid of Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border/20 mt-8 text-left">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                  <Mail className="text-primary shrink-0 mt-0.5" size={20} />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Email Us</div>
                    <div className="text-foreground font-medium text-xs break-all">facetvonlineug@gmail.com</div>
                  </div>
                </div>
                
                <a
                  href="https://wa.me/256748624400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors group cursor-pointer"
                >
                  <Phone className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={20} />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">WhatsApp Hotline</div>
                    <div className="text-foreground font-medium text-xs group-hover:text-primary transition-colors">+256 748 624 400</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                  <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Our Offices</div>
                    <div className="text-foreground font-medium text-xs">Plot 301, Kira Rd, Bukoto</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisePage;
