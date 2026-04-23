import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { assets } from "@/lib/assets";

const featured = {
  title: "Press Play Crowned Uganda's Most-Watched Music Show",
  excerpt: "Face TV's flagship countdown continues to dominate viewership ratings across East Africa with its bold lineup and electric energy.",
  category: "Entertainment",
  time: "2 hours ago",
  image: assets.concert,
};

const articles = [
  { title: "Bebe Cool Returns to the Stage in Massive Kampala Concert", category: "Music", time: "5h ago", image: assets.concert },
  { title: "Inside the New Face Studios — A Behind-the-Scenes Look", category: "Inside Face TV", time: "1d ago", image: assets.hero },
  { title: "Top 10 Ugandan Anthems Dominating the Charts This Month", category: "Charts", time: "2d ago", image: assets.concert },
  { title: "Club Bangerz Goes Live: DJs Lighting Up Saturday Nights", category: "Events", time: "3d ago", image: assets.hero },
];

const LatestNewsGrid = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20" style={{ background: "var(--gradient-dark)" }}>
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Trending Now</span>
            <h2 className="text-3xl md:text-5xl font-heading text-foreground mt-2">
              Latest <span className="text-primary">Stories</span>
            </h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            View All News <ArrowRight size={16} />
          </Link>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Link to="/news" className="group relative overflow-hidden rounded-xl glass-card aspect-[4/3] lg:aspect-auto block">
            <img src={featured.image} alt={featured.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6 md:p-8">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded">
                {featured.category}
              </span>
              <h3 className="font-heading text-2xl md:text-4xl text-white mt-4 leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-white/80 text-sm mt-2 line-clamp-2 max-w-lg">{featured.excerpt}</p>
              <div className="flex items-center gap-2 text-white/60 text-xs mt-3">
                <Clock size={12} /> {featured.time}
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map((a) => (
              <Link key={a.title} to="/news" className="group glass-card overflow-hidden rounded-xl flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5 rounded">
                    {a.category}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {a.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-auto pt-2">
                    <Clock size={11} /> {a.time}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsGrid;
