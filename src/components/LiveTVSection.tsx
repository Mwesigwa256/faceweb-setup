import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Radio, Tv } from "lucide-react";
import { assets } from "@/lib/assets";

const LiveTVSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="section-container">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Radio className="text-primary animate-pulse" size={24} />
          <h2 className="text-3xl md:text-4xl font-heading text-foreground">
            Watch <span className="text-primary">Live</span>
          </h2>
        </div>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Tune in to Face TV — StarTimes CH 223 / ST 199. 24 hours of non-stop Ugandan music.
        </p>

        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative rounded-xl overflow-hidden glass-card">
            {/* Simulated Live Player */}
            <div className="aspect-video relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={assets.faceHome} type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary/90 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-primary-foreground uppercase tracking-wider">Live</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <Tv className="text-primary" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Face TV — StarTimes CH 223</p>
                    <p className="text-xs text-muted-foreground">The Home of Ugandan Music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTVSection;
