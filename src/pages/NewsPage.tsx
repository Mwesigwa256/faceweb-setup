import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { assets } from "@/lib/assets";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { newsArticles } from "@/lib/news";

const NewsPage = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();
  const featured = newsArticles.find((a) => a.featured);
  const rest = newsArticles.filter((a) => !a.featured);

  return (
    <div>
      <SEO
        title="Latest News & Trending Stories | Face TV Uganda"
        description="Trending news from Uganda's entertainment, music and media industry. Stay up to date with Face TV's latest stories, interviews and exclusives."
        image={assets.we}
      />
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
            <Link
              to={`/news/${featured.slug}`}
              className="block glass-card p-8 md:p-12 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
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
            </Link>
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
              <Link
                to={`/news/${article.slug}`}
                key={article.slug}
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
