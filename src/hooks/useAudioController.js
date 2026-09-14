import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Custom hook to manage background ambient video audio,
 * volume transitions, and browser autoplay policy unlocks.
 */
export const useAudioController = (initialVolume = 25) => {
  const [volume, setVolumeState] = useState(initialVolume);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastNonZeroVolume, setLastNonZeroVolume] = useState(initialVolume || 25);
  const videoRef = useRef(null);

  // Synchronize audio on mount and unlock on first user interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = Math.max(0, Math.min(100, volume)) / 100;

    // Attempt direct play
    video.play().catch(() => {
      // Browser blocked unmuted autoplay -> start muted and unlock on first click
      video.muted = true;
      video.play().catch(() => {});

      const unlockAudio = () => {
        if (videoRef.current && volume > 0) {
          videoRef.current.muted = false;
          videoRef.current.volume = volume / 100;
          videoRef.current.play().catch(() => {});
        }
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };

      window.addEventListener("click", unlockAudio, { once: true });
      window.addEventListener("keydown", unlockAudio, { once: true });
      window.addEventListener("touchstart", unlockAudio, { once: true });
    });
  }, []);

  // Update volume
  const setVolume = useCallback((val) => {
    const num = Number(val);
    if (num > 0) setLastNonZeroVolume(num);
    setVolumeState(num);

    if (videoRef.current) {
      videoRef.current.volume = num / 100;
      videoRef.current.muted = num === 0;
      if (num > 0 && isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPlaying]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setLastNonZeroVolume(volume);
      setVolume(0);
    } else {
      setVolume(lastNonZeroVolume || 25);
    }
  }, [volume, lastNonZeroVolume, setVolume]);

  // Toggle Play / Pause
  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return next;
    });
  }, []);

  return {
    videoRef,
    volume,
    setVolume,
    isPlaying,
    setIsPlaying,
    toggleMute,
    togglePlayback,
  };
};

export default useAudioController;
