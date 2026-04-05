import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Face TV has been an incredible platform for our brand awareness campaigns. The reach across 32 African countries is unmatched for targeting the youth market.",
    name: "Marketing Director",
    company: "Coca-Cola Uganda",
  },
  {
    quote: "Working with Face TV transformed our visibility. Their 470,000 daily viewers mean our ads get seen by the people who matter most to our business.",
    name: "Brand Manager",
    company: "MTN Uganda",
  },
  {
    quote: "Face TV is the heartbeat of Ugandan music. As an artist, getting my videos played here means reaching every corner of Uganda and beyond.",
    name: "Recording Artist",
    company: "Independent Musician",
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20" style={{ background: "var(--gradient-dark)" }}>
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-2">
          What People <span className="text-primary">Say</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Hear from the brands and artists who trust Face TV
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`glass-card p-8 relative transition-all duration-700 hover:border-primary/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Quote className="text-primary/30 absolute top-4 right-4" size={40} />
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{t.quote}"
              </p>
              <div className="border-t border-border/50 pt-4">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-primary">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
