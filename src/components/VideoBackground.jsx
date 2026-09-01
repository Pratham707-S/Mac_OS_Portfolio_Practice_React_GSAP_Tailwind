import React, { useRef, useEffect } from "react";

const VideoBackground = ({ volume = 20, setVolume, isPlaying = true }) => {
    const videoRef = useRef(null);
    const hasAutoMutedAfterFirstPlay = useRef(false);

    // Initial audio setup and unlock on first user interaction
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const initialVol = Math.max(0, Math.min(100, volume)) / 100;
        video.volume = initialVol;

        // Attempt direct play with audio
        video.play().catch(() => {
            // If browser blocks unmuted autoplay, mute initially so video keeps playing
            video.muted = true;
            video.play().catch(() => {});

            // Auto-unmute on first user touch/click anywhere on page
            const handleFirstInteraction = () => {
                if (videoRef.current && volume > 0 && !hasAutoMutedAfterFirstPlay.current) {
                    videoRef.current.muted = false;
                    videoRef.current.volume = volume / 100;
                    videoRef.current.play().catch(() => {});
                }
                window.removeEventListener("click", handleFirstInteraction);
                window.removeEventListener("keydown", handleFirstInteraction);
                window.removeEventListener("touchstart", handleFirstInteraction);
            };

            window.addEventListener("click", handleFirstInteraction, { once: true });
            window.addEventListener("keydown", handleFirstInteraction, { once: true });
            window.addEventListener("touchstart", handleFirstInteraction, { once: true });
        });
    }, []);

    // Monitor playback: after 1 full video cycle (~15s), automatically mute audio while video keeps looping
    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || hasAutoMutedAfterFirstPlay.current) return;

        if (video.duration && video.currentTime >= video.duration - 0.4) {
            hasAutoMutedAfterFirstPlay.current = true;
            video.muted = true;
            setVolume?.(0);
        }
    };

    // Handle isPlaying changes
    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle Volume changes
    useEffect(() => {
        if (videoRef.current) {
            const val = Math.max(0, Math.min(100, volume));
            videoRef.current.volume = val / 100;
            if (val === 0) {
                videoRef.current.muted = true;
            } else {
                // If user actively changed volume above 0, reset flag to allow audio
                hasAutoMutedAfterFirstPlay.current = false;
                videoRef.current.muted = false;
                if (isPlaying) {
                    videoRef.current.play().catch(() => {});
                }
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
            onTimeUpdate={handleTimeUpdate}
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
            <source src="/video-background/PinGrab_1789291718783.mp4" type="video/mp4" />
        </video>
    );
};

export default VideoBackground;
