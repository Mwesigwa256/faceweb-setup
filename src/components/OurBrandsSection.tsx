import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Tv, Radio, Newspaper, Mic, Music, Globe } from "lucide-react";

const brands = [
  { name: "Face TV", tag: "The Home of Ugandan Music", icon: Tv, color: "from-red-600 to-orange-500" },
  { name: "Face Radio", tag: "Pulse of the Streets", icon: Radio, color: "from-pink-600 to-red-500" },
  { name: "Face News", tag: "Trends, Gossip & Exclusives", icon: Newspaper, color: "from-orange-500 to-yellow-500" },
  { name: "Face Studios", tag: "Where Stories Are Made", icon: Mic, color: "from-purple-600 to-pink-500" },
  { name: "Face Hits", tag: "Top Charts Daily", icon: Music, color: "from-blue-600 to-indigo-500" },
  { name: "Face Digital", tag: "Always On, Everywhere", icon: Globe, color: "from-emerald-500 to-teal-500" },
];

const OurBrandsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Our Family</span>
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mt-2">
            One Group. <span className="text-primary">Many Voices.</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A multi-platform media network connecting Ugandan stories to the world.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {brands.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.name}
                className={`group relative overflow-hidden rounded-xl glass-card p-6 hover:border-primary/60 transition-all duration-500 cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="font-heading text-2xl text-foreground tracking-wide">{b.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{b.tag}</p>
                <div className="mt-4 text-xs text-primary font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurBrandsSection;
