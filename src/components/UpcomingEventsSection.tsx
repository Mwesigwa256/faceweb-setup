import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const events = [
  { day: "12", month: "MAY", title: "Press Play Live Concert", venue: "Lugogo Cricket Oval, Kampala", tag: "Music" },
  { day: "24", month: "MAY", title: "Club Bangerz Festival", venue: "Speke Resort, Munyonyo", tag: "Festival" },
  { day: "08", month: "JUN", title: "Backyard Sessions w/ Bebe Cool", venue: "Face TV Studios, Naguru", tag: "Live Show" },
];

const UpcomingEventsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Save the Date</span>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mt-2">
            Upcoming <span className="text-primary">Events</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <div
              key={e.title}
              className={`glass-card rounded-xl p-6 hover:border-primary/60 transition-all duration-500 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <span className="font-heading text-2xl leading-none">{e.day}</span>
                  <span className="text-[10px] font-semibold tracking-widest mt-0.5">{e.month}</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{e.tag}</span>
                  <h3 className="font-heading text-xl text-foreground mt-1 group-hover:text-primary transition-colors">{e.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                    <MapPin size={11} /> {e.venue}
                  </p>
                </div>
              </div>
              <button className="mt-5 w-full py-2 rounded-md text-sm font-semibold border border-border hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
                <Calendar size={14} /> RSVP <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
