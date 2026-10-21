import { useScrollReveal } from "@/hooks/useScrollReveal";


const events = [

  {  title: "Face TV Awards"},
  { title:"imba Session"},
  { title:"Spotlight"},

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
                  
                  
                </div>
                <div className="flex-1">
                  
                  <h3 className="font-heading text-xl text-foreground mt-1 group-hover:text-primary transition-colors">{e.title}</h3>
                
                </div>
              </div>
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
