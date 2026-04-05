import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "@/lib/assets";

const shows = [
  { title: "Press Play", desc: "The best new Ugandan music videos, curated daily.", video: assets.pressPlay },
  { title: "The Spotlight", desc: "Daily entertainment news — trends, gossip, and exclusives.", video: assets.faceHits },
  { title: "Backyard", desc: "Intimate celebrity conversations and lifestyle stories.", video: assets.riseUp },
  { title: "Club Bangerz", desc: "Weekend party anthems and DJ sets all Saturday long.", video: assets.collabs },
];

const FeaturedShowsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20" style={{ background: "var(--gradient-dark)" }}>
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-2">
          Featured <span className="text-primary">Shows</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          From daily entertainment news to weekend party mixes — there's always something on Face TV.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shows.map((show, i) => (
            <div
              key={show.title}
              className={`glass-card overflow-hidden group transition-all duration-700 hover:border-primary/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  muted
                  playsInline
                  loop
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                >
                  <source src={show.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="text-primary-foreground ml-0.5" size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl text-foreground">{show.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{show.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shows"
            className="inline-block px-8 py-3 rounded-md font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            View All Shows
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedShowsSection;
