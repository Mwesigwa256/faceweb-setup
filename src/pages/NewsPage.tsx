import { useScrollReveal } from "@/hooks/useScrollReveal";
import { assets } from "@/lib/assets";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";

const newsArticles = [
  {
    title: "Uganda's Music Industry Revenue Hits Record High in 2026",
    excerpt: "The Ugandan music industry has seen unprecedented growth, with streaming revenues and live performances driving a 45% increase year-over-year.",
    category: "Industry",
    date: "Apr 4, 2026",
    featured: true,
  },
  {
    title: "StarTimes Expands Digital Coverage Across East Africa",
    excerpt: "StarTimes has announced expanded digital TV coverage reaching 5 million more households across Uganda, Kenya, and Tanzania.",
    category: "Broadcasting",
    date: "Apr 3, 2026",
    featured: false,
  },
  {
    title: "Face TV Awards 2026 Nominations Announced",
    excerpt: "The annual Face TV Awards celebrating Uganda's best musical talent has released its nomination list featuring 50 artists across 12 categories.",
    category: "Entertainment",
    date: "Apr 2, 2026",
    featured: false,
  },
  {
    title: "Uganda Tourism Board Partners With Music Industry",
    excerpt: "A new partnership aims to use Ugandan music videos to promote tourism destinations, featuring iconic locations in music videos aired on Face TV.",
    category: "Partnership",
    date: "Apr 1, 2026",
    featured: false,
  },
  {
    title: "New Ugandan Artists Breaking International Markets",
    excerpt: "Several Ugandan artists featured on Face TV have secured international distribution deals, marking a new era for Ugandan music on the global stage.",
    category: "Music",
    date: "Mar 30, 2026",
    featured: false,
  },
  {
    title: "Digital Advertising on TV Platforms Grows 60% in Uganda",
    excerpt: "Television advertising in Uganda has seen massive growth as brands recognize the power of channels like Face TV to reach young demographics.",
    category: "Advertising",
    date: "Mar 28, 2026",
    featured: false,
  },
  {
    title: "Kampala Music Festival Returns With Face TV as Media Partner",
    excerpt: "The biggest music festival in East Africa is back, with Face TV providing live coverage and exclusive behind-the-scenes content.",
    category: "Events",
    date: "Mar 26, 2026",
    featured: false,
  },
  {
    title: "Government Launches Creative Economy Initiative",
    excerpt: "Uganda's Ministry of ICT has launched a new initiative to support the creative economy, with Face TV among the key industry partners.",
    category: "Policy",
    date: "Mar 24, 2026",
    featured: false,
  },
];

const NewsPage = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();
  const featured = newsArticles.find((a) => a.featured);
  const rest = newsArticles.filter((a) => !a.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={assets.show} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            Latest <span className="text-primary">News</span>
          </h1>
          <p className="text-muted-foreground mt-2">Trending stories from Uganda's entertainment & media landscape</p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16" style={{ background: "var(--gradient-dark)" }}>
          <div className="section-container">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-primary" size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Trending Now</span>
            </div>
            <div className="glass-card p-8 md:p-12 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground mb-4"
                style={{ background: "var(--gradient-primary)" }}
              >
                {featured.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-4 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={14} /> {featured.date}</span>
                <span className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section ref={gridRef} className="py-16 bg-background">
        <div className="section-container">
          <h2 className="text-3xl font-heading text-foreground mb-8">
            More <span className="text-primary">Stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <article
                key={i}
                className={`glass-card p-6 group cursor-pointer hover:border-primary/50 transition-all duration-700 ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground mb-3"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {article.category}
                </span>
                <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                  <span className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
