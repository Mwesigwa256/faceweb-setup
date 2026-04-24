import { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, Pause, Volume2 } from "lucide-react";
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (activeIndex === index) {
      video.pause();
      setActiveIndex(null);
      return;
    }

    // pause any other playing video
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
        // fallback: try muted if browser blocks
        video.muted = true;
        video.play().then(() => setActiveIndex(index)).catch(() => {});
      });
    } else {
      setActiveIndex(index);
    }
  };

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
              <div
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => togglePlay(i)}
              >
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  controls={activeIndex === i}
                  className="w-full h-full object-cover"
                >
                  <source src={`${show.video}#t=0.5`} type="video/mp4" />
                </video>

                {activeIndex !== i && (
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center transition-all duration-300 group-hover:bg-background/30">
                    <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform active:scale-95">
                      <Play className="text-primary-foreground ml-1" size={32} />
                    </div>
                  </div>
                )}

                {activeIndex === i && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/90 px-3 py-1 rounded-full pointer-events-none">
                    <Volume2 size={12} className="text-primary-foreground" />
                    <span className="text-xs font-bold text-primary-foreground uppercase">Playing</span>
                  </div>
                )}
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
