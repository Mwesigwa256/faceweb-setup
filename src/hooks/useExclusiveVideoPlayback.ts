import { useCallback, useRef, useState } from "react";

/**
 * Manages a list of <video> elements where only one may play at a time.
 * Clicking a show starts it with sound (falling back to muted if the browser
 * blocks audio); clicking it again pauses it.
 */
export const useExclusiveVideoPlayback = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const setVideoRef = useCallback(
    (index: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current[index] = el;
    },
    []
  );

  const pauseOthers = (index: number) => {
    videoRefs.current.forEach((video, otherIndex) => {
      if (video && otherIndex !== index && !video.paused) {
        video.pause();
      }
    });
  };

  const stopAll = useCallback(() => {
    videoRefs.current.forEach((video) => video?.pause());
    setActiveIndex(null);
  }, []);

  const toggle = async (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (!video.paused) {
      video.pause();
      return;
    }

    pauseOthers(index);
    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
    } catch (error) {
      // Some browsers block playback with sound; retry muted.
      try {
        video.muted = true;
        await video.play();
      } catch (fallbackError) {
        console.error("Video playback failed:", fallbackError);
        setActiveIndex(null);
      }
    }
  };

  // Keep state in sync with native controls (play/pause buttons, keyboard, etc.)
  const handlePlay = (index: number) => {
    pauseOthers(index);
    setActiveIndex(index);
  };

  const handlePause = (index: number) => {
    setActiveIndex((current) => (current === index ? null : current));
  };

  return { activeIndex, setVideoRef, toggle, stopAll, handlePlay, handlePause };
};
