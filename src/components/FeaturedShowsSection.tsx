
import type { MouseEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useExclusiveVideoPlayback } from "@/hooks/useExclusiveVideoPlayback";

// Video assets from the public folder
const PressPlay = "/assets/PressPlay.mp4";
const FaceHits = "/assets/FaceHits.mp4";
const RiseUp = "/assets/RiseUp.mp4";
const Collabs = "/assets/Collabs.mp4";

const shows = [
  {
    title: "Press Play",
    desc: "The best new Ugandan music videos, curated daily.",
    video: PressPlay,
  },
  {
    title: "Face Hits",
    desc: "Daily entertainment news — trends, gossip, and exclusives.",
    video: FaceHits,
  },
  {
    title: "Rise Up",
    desc: "Intimate celebrity conversations and lifestyle stories.",
    video: RiseUp,
  },
  {
    title: "102 Collaborations",
    desc: "Weekend party anthems and DJ sets all Saturday long.",
    video: Collabs,
  },
];

const FeaturedShowsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const { activeIndex, setVideoRef, toggle, handlePlay, handlePause } =
    useExclusiveVideoPlayback();

  // Clicking anywhere on a card plays/pauses it. While a video is playing,
  // clicks on the video itself go to its native controls instead.
  const handleCardClick = (e: MouseEvent, index: number) => {
    if (activeIndex === index && (e.target as HTMLElement).tagName === "VIDEO") {
      return;
    }
    toggle(index);
  };

  return (
    <section
      ref={ref}
      className="py-20"
      style={{ background: "var(--gradient-dark)" }}
    >
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-2">
          Featured <span className="text-primary">Shows</span>
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          From daily entertainment news to weekend party mixes —
          there's always something on Face TV.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shows.map((show, i) => (
            <div
              key={show.title}
              role="button"
              tabIndex={0}
              aria-label={`${activeIndex === i ? "Pause" : "Play"} ${show.title}`}
              onClick={(e) => handleCardClick(e, i)}
              onKeyDown={(e) => {
                if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  toggle(i);
                }
              }}
              className={`glass-card overflow-hidden group cursor-pointer transition-all duration-700 hover:border-primary/50 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Video thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <video
                  ref={setVideoRef(i)}
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  controls={activeIndex === i}
                  className="w-full h-full object-cover"
                  onPlay={() => handlePlay(i)}
                  onPause={() => handlePause(i)}
                  onError={() => {
                    console.error(
                      `Unable to load video: ${show.video}`
                    );
                  }}
                >
                  {/* #t=0.5 shows a real frame as the thumbnail instead of black */}
                  <source src={`${show.video}#t=0.5`} type="video/mp4" />
                </video>

                {/* Play overlay */}
                {activeIndex !== i && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-background/40 flex items-center justify-center transition-all duration-300 group-hover:bg-background/30"
                  >
                    <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform active:scale-95">
                      <Play
                        className="text-primary-foreground ml-1"
                        size={32}
                      />
                    </div>
                  </div>
                )}

                {/* Playing indicator */}
                {activeIndex === i && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/90 px-3 py-1 rounded-full pointer-events-none">
                    <Volume2
                      size={12}
                      className="text-primary-foreground"
                    />

                    <span className="text-xs font-bold text-primary-foreground uppercase">
                      Playing
                    </span>
                  </div>
                )}
              </div>

              {/* Show information */}
              <div className="p-4">
                <h3 className="font-heading text-xl text-foreground">
                  {show.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {show.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View all shows */}
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
