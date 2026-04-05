import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Users, Monitor, Eye, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: "14.5M+", label: "Subscribers Across Africa" },
  { icon: Monitor, value: "470,000", label: "Decoders Tuned In Daily" },
  { icon: Eye, value: "35%", label: "StarTimes Viewership" },
  { icon: MapPin, value: "32+", label: "African Countries" },
];

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20" style={{ background: "var(--gradient-dark)" }}>
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-4">
          Face TV <span className="text-primary">By The Numbers</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Uganda's most-watched music channel on StarTimes — reaching millions daily.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card p-6 text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <stat.icon className="mx-auto mb-3 text-primary" size={32} />
              <p className="text-3xl md:text-4xl font-heading text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
