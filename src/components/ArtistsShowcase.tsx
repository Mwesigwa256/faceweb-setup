import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";

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
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="glass-card px-8 py-4 pulse-glow hover:scale-110 transition-transform cursor-pointer"
          >
            <p className="text-3xl font-heading text-primary drop-shadow-md">24hrs</p>
            <p className="text-xs text-white font-bold uppercase tracking-wider mt-1">Local Content</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="glass-card px-8 py-4 hover:scale-110 transition-transform cursor-pointer border-primary/30 hover:border-primary"
          >
            <p className="text-3xl font-heading text-primary drop-shadow-md">100%</p>
            <p className="text-xs text-white font-bold uppercase tracking-wider mt-1">Ugandan Music</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="glass-card px-8 py-4 hover:scale-110 transition-transform cursor-pointer border-primary/30 hover:border-primary"
          >
            <p className="text-3xl font-heading text-primary drop-shadow-md">32+</p>
            <p className="text-xs text-white font-bold uppercase tracking-wider mt-1">Countries</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsShowcase;
