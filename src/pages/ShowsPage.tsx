import { useState, useRef } from "react";
import { assets } from "@/lib/assets";
import { Play, Pause } from "lucide-react";

const shows = [
  { title: "Face Hits", video: assets.faceHits },
  { title: "Press Play", video: assets.pressPlay },
  { title: "Rise Up", video: assets.riseUp },
  { title: "102 Collabs", video: assets.collabs },
];

const ShowsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (activeIndex === index) {
      video.pause();
      video.currentTime = 0;
      setActiveIndex(null);
    } else {
      // Pause any currently playing video
      if (activeIndex !== null && videoRefs.current[activeIndex]) {
        videoRefs.current[activeIndex]!.pause();
        videoRefs.current[activeIndex]!.currentTime = 0;
      }
      setActiveIndex(index);
      video.play();
    }
  };

  return (
    <div>
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
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-16" style={{ background: "var(--gradient-dark)" }}>
        <div className="section-container text-center">
          <h2 className="text-4xl font-heading text-foreground mb-4">Featured Blog</h2>
          <p className="text-muted-foreground text-lg">
            Check out the latest updates on Face TV!
          </p>
        </div>
      </section>

      {/* Shows Grid */}
      <section className="py-20 bg-background">
        <div className="section-container">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground text-center mb-16">
            Our Shows
          </h2>

          <div className="space-y-20">
            {shows.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  {/* Title */}
                  <div className="md:w-1/3 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-heading text-primary">
                      {item.title}
                    </h3>
                  </div>

                  {/* Video */}
                  <div
                    className="md:w-2/3 relative group cursor-pointer rounded-lg overflow-hidden glass-card"
                    onClick={() => toggleVideo(index)}
                  >
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      className="w-full aspect-video object-cover"
                      muted
                      playsInline
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>

                    {/* Play/Pause overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        {activeIndex === index ? (
                          <Pause className="text-primary-foreground" size={28} />
                        ) : (
                          <Play className="text-primary-foreground ml-1" size={28} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EPG Banner */}
      <section className="py-16 flex justify-center" style={{ background: "var(--gradient-dark)" }}>
        <img src={assets.epg} alt="EPG" className="h-32 md:h-44 object-contain" />
      </section>
    </div>
  );
};

export default ShowsPage;
