import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import SEO from "@/components/SEO";
import { assets } from "@/lib/assets";
import { getArticleBySlug, newsArticles } from "@/lib/news";

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="section-container py-32 text-center">
        <SEO title="Article Not Found | Face TV" description="The news article you are looking for does not exist." />
        <h1 className="text-4xl font-heading text-foreground mb-4">Article not found</h1>
        <Link to="/news" className="text-primary font-semibold">← Back to News</Link>
      </div>
    );
  }

  const related = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const ogImage = article.image || assets.we;
  const url = typeof window !== "undefined" ? window.location.href : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author || "Face TV" },
    publisher: { "@type": "Organization", name: "Face TV" },
    image: ogImage,
    mainEntityOfPage: url,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: article.title, text: article.excerpt, url }); } catch {}
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div>
      <SEO
        title={`${article.title} | Face TV News`}
        description={article.excerpt}
        image={ogImage}
        type="article"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative h-[45vh] overflow-hidden flex items-end">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={assets.show} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 section-container pb-12">
          <Link to="/news" className="inline-flex items-center gap-2 text-primary font-semibold mb-4 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground mb-4"
            style={{ background: "var(--gradient-primary)" }}
          >
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading text-foreground max-w-4xl">{article.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock size={14} /> {article.date}</span>
            {article.author && <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-background">
        <div className="section-container max-w-3xl">
          <p className="text-xl text-foreground/90 leading-relaxed mb-8 font-medium">{article.excerpt}</p>
          <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-5">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <button
            onClick={handleShare}
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Share2 size={16} /> Share this story
          </button>
        </div>
      </section>

      {/* Related */}
      <section className="py-16" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container">
          <h2 className="text-3xl font-heading text-foreground mb-8">
            Related <span className="text-primary">Stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                to={`/news/${a.slug}`}
                className="glass-card p-6 group hover:border-primary/50 transition-all"
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground mb-3"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {a.category}
                </span>
                <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="text-xs text-muted-foreground">{a.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;
