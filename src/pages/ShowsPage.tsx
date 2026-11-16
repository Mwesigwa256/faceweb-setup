
import { useState, useRef } from "react";
import { Play, Filter } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

// Video assets from the public folder
const pressPlay = "/assets/PressPlay.mp4";
const FaceHits = "/assets/FaceHits.mp4";
const RiseUp = "/assets/RiseUp.mp4";
const Collabs = "/assets/Collabs.mp4";
const FaceHome = "/assets/FaceHome.mp4";
const Imba = "/assets/Imba.mp4";
const epg = "/assets/epg.png";

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
    description:
      "The best new Ugandan music videos, curated and played daily. Catch the latest hits from top and emerging artists across all genres.",
    video: pressPlay,
    category: "Music",
    time: "Mon–Fri, 7–9AM",
  },
  {
    title: "The Face Hits",
    description:
      "Daily entertainment news covering trends, gossip, celebrity interviews and exclusives from Uganda's vibrant entertainment scene.",
    video: FaceHits,
    category: "Entertainment",
    time: "Mon–Fri, 9–11AM",
  },
  {
    title: "Rise Up",
    description:
      "Intimate celebrity conversations and lifestyle stories. Get up close and personal with Uganda's biggest stars in relaxed settings.",
    video: RiseUp,
    category: "Lifestyle",
    time: "Mon-Fri, 6-7AM",
  },
  {
    title: "102 Collaborations",
    description:
      "Weekend party anthems and DJ sets all Saturday long. The ultimate soundtrack for your weekend vibes.",
    video: Collabs,
    category: "Party",
    time: "Mon-Fri, 11–12PM",
  },
  {
    title: "SpotLight",
    description:
      "Non-stop DJ mixes featuring the best of Ugandan and East African music. Perfect for starting your day with energy.",
    video: FaceHome,
    category: "Music",
    time: "Mon-Fri, 5–6PM",
  },
  {
    title: "Imba Sessions",
    description:
      "Discover new and upcoming Ugandan artists. First look at fresh talent breaking into the music scene.",
    video: Imba,
    category: "Entertainment",
    time: "Mon–Fri",
  },
];

const categories: Category[] = [
  "All",
  "Music",
  "Entertainment",
  "Lifestyle",
  "Party",
];

const ShowsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filtered =
    activeCategory === "All"
      ? shows
      : shows.filter((s) => s.category === activeCategory);

  // Stop all currently playing videos
  const stopAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.muted = true;
      }
    });

    setActiveIndex(null);
  };

  // Play or pause a selected video
  const toggleVideo = async (index: number) => {
    const video = videoRefs.current[index];

    if (!video) return;

    if (activeIndex === index && !video.paused) {
      video.pause();
      video.muted = true;
      setActiveIndex(null);
      return;
    }

    // Stop other videos before playing the selected one
    videoRefs.current.forEach((otherVideo, otherIndex) => {
      if (otherVideo && otherIndex !== index) {
        otherVideo.pause();
        otherVideo.muted = true;
      }
    });

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      setActiveIndex(index);
    } catch (error) {
      console.error("Video playback failed:", error);

      // Fallback for browsers that restrict sound playback
      try {
        video.muted = true;
        await video.play();
        setActiveIndex(index);
      } catch (fallbackError) {
        console.error("Muted video playback also failed:", fallbackError);
        setActiveIndex(null);
      }
    }
  };

  // Keep the active video state synchronized with native controls
  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, otherIndex) => {
      if (video && otherIndex !== index && !video.paused) {
        video.pause();
        video.muted = true;
      }
    });

    setActiveIndex(index);
  };

  const handleVideoPause = (index: number) => {
    setActiveIndex((current) =>
      current === index ? null : current
    );
  };

  return (
    <div>
      <SEO
        title="Our Shows — 24/7 Ugandan Music & Entertainment | Face TV"
        description="Explore Face TV's original programs: Press Play, The Spotlight, Backyard, Club Bangerz, Kikadde and more — 24 hours of Ugandan music & entertainment."
        image={FaceHome}
      />

      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={FaceHome} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-heading text-foreground">
            Our <span className="text-primary">Shows</span>
          </h1>

          <p className="text-muted-foreground mt-2">
            8 original programs — 24 hours of Ugandan music & entertainment
          </p>
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
                onClick={() => {
                  stopAllVideos();
                  setActiveCategory(cat);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                  activeCategory === cat
                    ? "text-primary-foreground shadow-[0_0_15px_rgba(255,0,0,0.5)] scale-105"
                    : "glass-card text-foreground hover:border-primary"
                }`}
                style={
                  activeCategory === cat
                    ? { background: "var(--gradient-primary)" }
                    : undefined
                }
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
                <div className="relative aspect-video overflow-hidden bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="w-full h-full object-cover"
                    playsInline
                    loop
                    muted
                    preload="metadata"
                    controls={activeIndex === index}
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                    onError={() => {
                      console.error(
                        `Unable to load video: ${show.video}`
                      );
                    }}
                  >
                    <source src={show.video} type="video/mp4" />
                  </video>

                  {/* Play overlay */}
                  {activeIndex !== index && (
                    <button
                      type="button"
                      aria-label={`Play ${show.title}`}
                      onClick={() => toggleVideo(index)}
                      className="absolute inset-0 bg-background/30 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl active:scale-95 transition-transform">
                        <Play
                          className="text-primary-foreground ml-1"
                          size={32}
                        />
                      </div>
                    </button>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {show.category}
                    </span>
                  </div>

                  {/* Playing indicator */}
                  {activeIndex === index && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/90 px-3 py-1 rounded-full pointer-events-none">
                      <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-primary-foreground uppercase">
                        Playing
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-2xl text-foreground">
                      {show.title}
                    </h3>
                  </div>

                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                    {show.time}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {show.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* EPG Banner */}
      <section
        className="py-16 flex justify-center"
        style={{ background: "var(--gradient-dark)" }}
      >
        <AnimatedSection>
          <img
            src={epg}
            alt="EPG"
            className="h-32 md:h-44 object-contain"
          />
        </AnimatedSection>
      </section>
    </div>
  );
};

export default ShowsPage;
