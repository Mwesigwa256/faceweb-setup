import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Users, Monitor, Eye, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
              }}
              className="glass-card p-6 text-center hover:scale-110 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              <stat.icon className="mx-auto mb-3 text-primary" size={32} />
              <p className="text-3xl md:text-5xl font-heading text-primary drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2 font-bold tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
