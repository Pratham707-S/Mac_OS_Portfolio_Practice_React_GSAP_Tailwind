import React, { useRef, useEffect } from "react";

const VideoBackground = ({ volume = 25, setVolume, isPlaying = true }) => {
    const videoRef = useRef(null);
    const volumeRef = useRef(volume);

    // Keep volumeRef in sync
    useEffect(() => {
        volumeRef.current = volume;
    }, [volume]);

    // Initial audio setup and unlock on first user interaction anywhere on screen
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const currentVol = Math.max(0, Math.min(100, volumeRef.current || 25));
        video.volume = currentVol / 100;

        // Try direct playback
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Browser blocked unmuted autoplay policy -> temporarily mute to start video
                video.muted = true;
                video.play().catch(() => {});
            });
        }

        // Global unlock listener: unmute and play with sound on first interaction
        const unlockAudio = () => {
            const vid = videoRef.current;
            if (vid) {
                vid.muted = false;
                const activeVol = Math.max(0, Math.min(100, volumeRef.current || 25));
                vid.volume = activeVol / 100;
                if (isPlaying) {
                    vid.play().catch(() => {});
                }
            }
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };

        window.addEventListener("click", unlockAudio, { once: true });
        window.addEventListener("touchstart", unlockAudio, { once: true });
        window.addEventListener("pointerdown", unlockAudio, { once: true });
        window.addEventListener("keydown", unlockAudio, { once: true });

        return () => {
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };
    }, []);

    // Handle isPlaying prop changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isPlaying]);

    // Handle Volume prop changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const val = Math.max(0, Math.min(100, volume));
        video.volume = val / 100;
        if (val === 0) {
            video.muted = true;
        } else {
            video.muted = false;
            if (isPlaying) {
                video.play().catch(() => {});
            }
        }
    }, [volume, isPlaying]);

    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            muted={volume === 0}
            playsInline
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
            <source src="/video-background/PinGrab_1789291718783.mp4" type="video/mp4" />
        </video>
    );
};

export default VideoBackground;
