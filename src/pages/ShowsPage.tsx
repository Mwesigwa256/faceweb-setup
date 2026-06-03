import { useState, useRef } from "react";
import { assets } from "@/lib/assets";
import { Play, Filter } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

type Category = "All" | "Music" | "Entertainment" | "Lifestyle" | "Party";

interface Show {
  title: string;
  description: string;
  video: string;
  category: Category;
  time: string;
  thumbnail?: string;
}

const shows: Show[] = [
  {
    title: "Press Play",
    description: "The best new Ugandan music videos, curated and played daily. Catch the latest hits from top and emerging artists across all genres.",
    video: assets.pressPlay,
    category: "Music",
    time: "Mon–Sun, 4–6PM & 8PM–10AM",
  },
  {
    title: "The Spotlight",
    description: "Daily entertainment news covering trends, gossip, celebrity interviews and exclusives from Uganda's vibrant entertainment scene.",
    video: assets.faceHits,
    category: "Entertainment",
    time: "Mon–Fri, 6–7PM",
  },
  {
    title: "Backyard",
    description: "Intimate celebrity conversations and lifestyle stories. Get up close and personal with Uganda's biggest stars in relaxed settings.",
    video: assets.riseUp,
    category: "Lifestyle",
    time: "Fri & Sun, Select Times",
  },
  {
    title: "Club Bangerz",
    description: "Weekend party anthems and DJ sets all Saturday long. The ultimate soundtrack for your weekend vibes.",
    video: assets.collabs,
    category: "Party",
    time: "Saturday, 2–7PM",
  },
  {
    title: "DJ Mix",
    description: "Non-stop DJ mixes featuring the best of Ugandan and East African music. Perfect for starting your day with energy.",
    video: assets.faceHome,
    category: "Music",
    time: "Daily, 10–11AM & 7–8PM",
  },
  {
    title: "Kikadde",
    description: "Throwback Thursday classics — relive the golden era of Ugandan music with timeless hits from legendary artists.",
    video: assets.nani,
    category: "Music",
    time: "Thursday, 12–6PM & 8PM–10AM",
  },
  {
    title: "Freshers",
    description: "Discover new and upcoming Ugandan artists. First look at fresh talent breaking into the music scene.",
    video: assets.show,
    category: "Entertainment",
    time: "Mon–Fri, 3–4PM",
  },
  {
    title: "Request Time",
    description: "You choose the music! Call in or text your requests and watch your favourite videos play live on air.",
    video: assets.home,
    category: "Music",
    time: "Mon–Sat, 12–2PM",
  },
];

const categories: Category[] = ["All", "Music", "Entertainment", "Lifestyle", "Party"];

const ShowsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filtered = activeCategory === "All" ? shows : shows.filter((s) => s.category === activeCategory);

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (activeIndex === index) {
      video.pause();
      setActiveIndex(null);
    } else {
      if (activeIndex !== null && videoRefs.current[activeIndex]) {
        const prev = videoRefs.current[activeIndex]!;
        prev.pause();
        prev.muted = true;
      }
      video.muted = false;
      video.volume = 1;
      video.currentTime = 0;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => setActiveIndex(index)).catch(() => {
          video.muted = true;
          video.play().then(() => setActiveIndex(index)).catch(() => {});
        });
      } else {
        setActiveIndex(index);
      }
    }
  };

  return (
    <div>
      <SEO
        title="Our Shows — 24/7 Ugandan Music & Entertainment | Face TV"
        description="Explore Face TV's 8 original programs: Press Play, The Spotlight, Backyard, Club Bangerz, Kikadde and more — 24 hours of Ugandan music & entertainment."
        image={assets.faceHome}
      />
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={assets.faceHome} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            Our <span className="text-primary">Shows</span>
          </h1>
          <p className="text-muted-foreground mt-2">8 original programs — 24 hours of Ugandan music & entertainment</p>
        </div>
      </section>

      {/* Category Filter */}
      <AnimatedSection className="py-8 bg-background border-b border-border/50">
        <div className="section-container">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Filter size={18} className="text-primary" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveIndex(null); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                  activeCategory === cat
                    ? "text-primary-foreground shadow-[0_0_15px_rgba(255,0,0,0.5)] scale-105"
                    : "glass-card text-foreground hover:border-primary"
                }`}
                style={activeCategory === cat ? { background: "var(--gradient-primary)" } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Shows Grid */}
      <AnimatedSection className="py-16 bg-background">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((show, index) => (
              <div
                key={show.title}
                className="glass-card overflow-hidden group transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_rgba(255,0,0,0.2)]"
              >
                {/* Video thumbnail */}
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => toggleVideo(index)}
                >
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    className="w-full h-full object-cover transition-transform duration-500"
                    playsInline
                    loop
                    muted
                    preload="metadata"
                    controls={activeIndex === index}
                  >
                    <source src={`${show.video}#t=0.5`} type="video/mp4" />
                  </video>

                  {/* Overlay — visible on mobile, hover on desktop */}
                  {activeIndex !== index && (
                    <div className="absolute inset-0 bg-background/30 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl active:scale-95 transition-transform">
                        <Play className="text-primary-foreground ml-1" size={32} />
                      </div>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {show.category}
                    </span>
                  </div>

                  {/* Live indicator if playing */}
                  {activeIndex === index && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/90 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-primary-foreground uppercase">Playing</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-2xl text-foreground">{show.title}</h3>
                  </div>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">{show.time}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{show.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* EPG Banner */}
      <AnimatedSection className="py-16 flex justify-center" style={{ background: "var(--gradient-dark)" }}>
        <img src={assets.epg} alt="EPG" className="h-32 md:h-44 object-contain" />
      </AnimatedSection>
    </div>
  );
};

export default ShowsPage;
