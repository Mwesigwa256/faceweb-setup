import { useScrollReveal } from "@/hooks/useScrollReveal";

const ArtistsShowcase = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Background collage image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/artists-collage.jpg)" }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div
        className={`relative z-10 section-container text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-6xl font-heading text-foreground mb-4">
          Celebrating <span className="gradient-text">Uganda's Finest</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          From rising stars to legendary icons — Face TV is the home of every Ugandan artist.
          We support, promote and celebrate the talent and creativity of Ugandan artists, 
          video directors, record labels and producers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="glass-card px-6 py-3 pulse-glow">
            <p className="text-2xl font-heading text-primary">24hrs</p>
            <p className="text-xs text-muted-foreground">Local Content</p>
          </div>
          <div className="glass-card px-6 py-3">
            <p className="text-2xl font-heading text-primary">100%</p>
            <p className="text-xs text-muted-foreground">Ugandan Music</p>
          </div>
          <div className="glass-card px-6 py-3">
            <p className="text-2xl font-heading text-primary">32+</p>
            <p className="text-xs text-muted-foreground">Countries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsShowcase;
