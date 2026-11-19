
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Maximize, Minimize, Radio, Tv } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import HLS from "hls.js";

const STREAM_URL = "https://media.hydeinnovations.com/FACE-TV-HEVC/index.m3u8";

const LiveTVSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<HLS | null>(null);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      const el = document.fullscreenElement ?? doc.webkitFullscreenElement;
      setIsFullscreen(!!el && el === playerRef.current);
    };

    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const container = playerRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => void })
      | null;
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => void;
    };

    try {
      if (document.fullscreenElement || doc.webkitFullscreenElement) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else doc.webkitExitFullscreen?.();
        return;
      }

      if (container?.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container?.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (video?.webkitEnterFullscreen) {
        // iPhone Safari only supports fullscreen on the video element itself
        video.webkitEnterFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current || !isVisible) return;

    const video = videoRef.current;
    let isMounted = true;

    const initStream = async () => {
      try {
        video.muted = false;
        video.volume = 1;

        // Native HLS support (Safari/iOS)
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = STREAM_URL;
          video.load();

          try {
            await video.play();

            if (isMounted) {
              setError(null);
            }
          } catch (err) {
            console.error("Playback error:", err);

            if (isMounted) {
              setError("Unable to start the live stream. Press play to try again.");
            }
          }

        } else if (HLS.isSupported()) {
          // HLS.js support (Chrome, Firefox and other browsers)
          const hls = new HLS({
            autoStartLoad: true,
            startPosition: -1,
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
          });

          hlsRef.current = hls;

          hls.loadSource(STREAM_URL);
          hls.attachMedia(video);

          hls.on(HLS.Events.MANIFEST_PARSED, async () => {
            try {
              video.muted = false;
              video.volume = 1;

              await video.play();

              if (isMounted) {
                setError(null);
              }
            } catch (err) {
              console.error("Playback error:", err);

              if (isMounted) {
                setError("Press play to start the live stream.");
              }
            }
          });

          hls.on(HLS.Events.ERROR, (_event, data) => {
            console.error("HLS error:", data);

            if (!data.fatal || !isMounted) return;

            switch (data.type) {
              case HLS.ErrorTypes.NETWORK_ERROR:
                setError("Network error. Please check your internet connection.");
                hls.startLoad();
                break;

              case HLS.ErrorTypes.MEDIA_ERROR:
                setError("Recovering stream...");
                hls.recoverMediaError();
                break;

              default:
                setError("Unable to load the live stream. Please try again later.");
                hls.destroy();
                break;
            }
          });

        } else {
          setError("HLS streaming is not supported by this browser.");
        }

      } catch (err) {
        console.error("Stream initialization error:", err);

        if (isMounted) {
          setError("Failed to load the live stream.");
        }
      }
    };

    initStream();

    return () => {
      isMounted = false;

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [isVisible]);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="section-container">

        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Radio className="text-primary animate-pulse" size={24} />

          <h2 className="text-3xl md:text-4xl font-heading text-foreground">
            Watch <span className="text-primary">Live</span>
          </h2>
        </div>

        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Tune in to Face TV — StarTimes CH 223 DTT/Satellite Dish CH 528-
          24 hours of non-stop Ugandan music.
        </p>

        {/* Video Player */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="relative rounded-xl overflow-hidden glass-card">

            <div
              ref={playerRef}
              className={`relative bg-black ${
                isFullscreen ? "w-full h-full" : "aspect-video"
              }`}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                controls
                onDoubleClick={toggleFullscreen}
                className="w-full h-full object-contain bg-black"
              />

              {/* Error Message */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-none">
                  <p className="text-red-500 text-center px-4">
                    {error}
                  </p>
                </div>
              )}

              {/* Live Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-3 bg-primary/90 px-4 py-1.5 rounded-full shadow-lg pointer-events-none">
                <span className="text-sm font-bold text-primary-foreground uppercase tracking-widest drop-shadow-md">
                  live
                </span>
              </div>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-primary transition-colors"
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>

            {/* Video Information */}
            <div className="flex items-center gap-3 p-4">
              <Tv className="text-primary" size={20} />

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Face TV — StarTimes CH 223
                </p>

                <p className="text-xs text-muted-foreground">
                  The Home of Ugandan Music
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTVSection;
