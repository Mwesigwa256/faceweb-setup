import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Megaphone, Mail, Phone, MapPin } from "lucide-react";

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

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container text-center">
          <Megaphone className="mx-auto mb-3 text-primary" size={36} />
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            Advertise <span className="text-primary">With Us</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Reach over 470,000 daily viewers across 32+ African countries on StarTimes CH 223.
          </p>
        </div>
      </section>

      {/* Why Advertise */}
      <section ref={whyRef} className="py-20 bg-background">
        <div className="section-container max-w-4xl">
          <h2 className="text-3xl font-heading text-foreground mb-8">
            Why <span className="text-primary">Face TV</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Massive Reach", desc: "14.5M+ subscribers on StarTimes across Africa. 35% viewership share." },
              { title: "Young Audience", desc: "15–45 age demographic — urban youth, trendsetters, and young professionals." },
              { title: "24/7 Visibility", desc: "Your brand plays alongside Uganda's biggest music content, all day every day." },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`glass-card p-6 transition-all duration-500 ${
                  whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <h3 className="font-heading text-xl text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Card */}
      <section ref={rateRef} className="py-20" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-heading text-foreground text-center mb-2">
            Spot Ad <span className="text-primary">Rate Card</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10">Prices in UGX per spot</p>

          <div
            className={`glass-card overflow-x-auto transition-all duration-700 ${
              rateVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Segment</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Time</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">15 Sec</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">30 Sec</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">45 Sec</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">60 Sec</th>
                </tr>
              </thead>
              <tbody>
                {spotAds.map((row) => (
                  <tr key={row.segment} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-heading text-foreground">{row.segment}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.time}</td>
                    <td className="px-4 py-3 text-sm text-foreground text-right">{row.s15}</td>
                    <td className="px-4 py-3 text-sm text-foreground text-right">{row.s30}</td>
                    <td className="px-4 py-3 text-sm text-foreground text-right">{row.s45}</td>
                    <td className="px-4 py-3 text-sm text-foreground text-right">{row.s60}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-background">
        <div className="section-container max-w-2xl text-center">
          <h2 className="text-3xl font-heading text-foreground mb-6">
            Ready to <span className="text-primary">Partner</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact our advertising team for custom packages, program sponsorships, and brand ambassador opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="text-primary" size={16} />
              facetvonlineug@gmail.com
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="text-primary" size={16} />
              +256 701 608 228
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="text-primary" size={16} />
              Plot 301, Kira Rd, Bukoto
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvertisePage;
