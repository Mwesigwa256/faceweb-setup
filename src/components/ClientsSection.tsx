import { useScrollReveal } from "@/hooks/useScrollReveal";

const clients = [
  { name: "Coca-Cola", logo: "/images/client-cocacola.png" },
  { name: "Buzz", logo: "/images/client-buzz.jpg" },
  { name: "JESA", logo: "/images/client-jesa.jpg" },
  { name: "Sprite", logo: "/images/client-sprite.jpg" },
  { name: "StarTimes", logo: "/images/client-startimes.jpg" },
  { name: "Fanta", logo: "/images/client-fanta.jpg" },
];

const ClientsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-background overflow-hidden">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-2">
          Trusted By <span className="text-primary">Leading Brands</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Top companies across Uganda and East Africa choose Face TV to reach millions of viewers.
        </p>
      </div>

      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex animate-marquee w-max">
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 mx-8 glass-card p-6 flex items-center justify-center w-40 h-24 hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-14 max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
