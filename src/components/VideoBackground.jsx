import React, { useRef, useEffect } from "react";

const VideoBackground = ({ volume = 25, isPlaying = true }) => {
    const videoRef = useRef(null);

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
                if (videoRef.current && volume > 0) {
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
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
            <source src="/video-background/PinGrab_1789291718783.mp4" type="video/mp4" />
        </video>
    );
};

export default VideoBackground;
