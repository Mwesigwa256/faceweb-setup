
import { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

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

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Play or pause a selected video
  const togglePlay = async (index: number) => {
    const video = videoRefs.current[index];

    if (!video) return;

    if (activeIndex === index && !video.paused) {
      video.pause();
      video.muted = true;
      setActiveIndex(null);
      return;
    }

    // Pause all other videos
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

      // Fallback for browsers restricting sound playback
      try {
        video.muted = true;
        await video.play();
        setActiveIndex(index);
      } catch (fallbackError) {
        console.error(
          "Muted video playback also failed:",
          fallbackError
        );
        setActiveIndex(null);
      }
    }
  };

  // Synchronize state when a video starts playing
  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, otherIndex) => {
      if (video && otherIndex !== index && !video.paused) {
        video.pause();
        video.muted = true;
      }
    });

    setActiveIndex(index);
  };

  // Synchronize state when a video is paused
  const handleVideoPause = (index: number) => {
    setActiveIndex((current) =>
      current === index ? null : current
    );
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
              className={`glass-card overflow-hidden group transition-all duration-700 hover:border-primary/50 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Video thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  controls={activeIndex === i}
                  className="w-full h-full object-cover"
                  onPlay={() => handleVideoPlay(i)}
                  onPause={() => handleVideoPause(i)}
                  onError={() => {
                    console.error(
                      `Unable to load video: ${show.video}`
                    );
                  }}
                >
                  <source src={show.video} type="video/mp4" />
                </video>

                {/* Play overlay */}
                {activeIndex !== i && (
                  <button
                    type="button"
                    aria-label={`Play ${show.title}`}
                    onClick={() => togglePlay(i)}
                    className="absolute inset-0 bg-background/40 flex items-center justify-center transition-all duration-300 group-hover:bg-background/30"
                  >
                    <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform active:scale-95">
                      <Play
                        className="text-primary-foreground ml-1"
                        size={32}
                      />
                    </div>
                  </button>
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
