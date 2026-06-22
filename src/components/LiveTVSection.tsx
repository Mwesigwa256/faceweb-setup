import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Radio, Tv } from "lucide-react";
import { assets } from "@/lib/assets";
import Equalizer from "@/components/Equalizer";
import { useEffect, useRef, useState } from "react";
import HLS from "hls.js";

const LiveTVSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<HLS | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current || !isVisible) return;

    const streamUrl = "https://media.hydeinnovations.com/FACE-TV-HEVC/index.m3u8";

    const initStream = async () => {
      try {
        // Ensure video is not muted and volume is full
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.volume = 1;
        }

        // Check if HLS is supported natively (Safari/iOS)
        if (videoRef.current!.canPlayType("application/vnd.apple.mpegurl")) {
          console.log("Using native HLS support");
          videoRef.current!.src = streamUrl;
          videoRef.current!.load();
          await videoRef.current!.play();
          setError(null);
        } else if (HLS.isSupported()) {
          // Use HLS.js for other browsers
          console.log("Using HLS.js for streaming");
          
          if (hlsRef.current) {
            hlsRef.current.destroy();
          }

          hlsRef.current = new HLS({
            autoStartLoad: true,
            startPosition: -1,
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
          });

          hlsRef.current.loadSource(streamUrl);
          hlsRef.current.attachMedia(videoRef.current);

          hlsRef.current.on(HLS.Events.MANIFEST_PARSED, async () => {
            console.log("HLS manifest parsed, starting playback");
            try {
              videoRef.current!.muted = false;
              videoRef.current!.volume = 1;
              await videoRef.current?.play();
              setError(null);
            } catch (err) {
              console.error("Playback error:", err);
            }
          });

          hlsRef.current.on(HLS.Events.ERROR, (event, data) => {
            console.error("HLS error:", data);
            if (data.fatal) {
              setError(`Streaming error: ${data.type}`);
              switch (data.type) {
                case HLS.ErrorTypes.NETWORK_ERROR:
                  console.error("Network error loading HLS:", data);
                  break;
                case HLS.ErrorTypes.MEDIA_ERROR:
                  console.error("Media error:", data);
                  hlsRef.current?.recoverMediaError();
                  break;
              }
            }
          });
        } else {
          setError("HLS streaming not supported on this browser");
          console.warn("HLS streaming not supported on this browser");
        }
      } catch (err) {
        console.error("Stream initialization error:", err);
        setError("Failed to load stream");
      }
    };

    initStream();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isVisible]);

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
            {/* Live Stream Player */}
            <div className="aspect-video relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                controls
                volume={1}
                className="w-full h-full object-cover bg-black"
              />
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <p className="text-red-500 text-center px-4">{error}</p>
                </div>
              )}
              <div className="absolute top-4 left-4 flex items-center gap-3 bg-primary/90 px-4 py-1.5 rounded-full shadow-lg">
                <Equalizer />
                <span className="text-sm font-bold text-primary-foreground uppercase tracking-widest drop-shadow-md">Live</span>
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
