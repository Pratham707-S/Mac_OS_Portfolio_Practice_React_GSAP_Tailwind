import React, { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VideoBackground = ({ volume = 35, setVolume, isPlaying = true }) => {
    const videoRef = useRef(null);
    const volumeRef = useRef(volume);
    const isPlayingRef = useRef(isPlaying);
    const [isAudible, setIsAudible] = useState(false);
    const [showUnmuteHint, setShowUnmuteHint] = useState(true);
    const audiblePlayStartTime = useRef(null);
    const hasFinishedAudibleCycle = useRef(false);

    // Keep refs in sync with props
    useEffect(() => {
        volumeRef.current = volume;
        if (volume === 0) {
            setIsAudible(false);
        }
    }, [volume]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
        const video = videoRef.current;
        if (!video) return;

        if (!isPlaying) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    }, [isPlaying]);

    // Initial audio setup and unlock on first interaction
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const initialVol = Math.max(0, Math.min(100, volumeRef.current || 35)) / 100;
        video.volume = initialVol;

        // Try direct playback if isPlaying is true
        if (isPlayingRef.current) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Browser allowed unmuted autoplay
                        if (!video.muted && video.volume > 0) {
                            setIsAudible(true);
                            setShowUnmuteHint(false);
                            audiblePlayStartTime.current = Date.now();
                        }
                    })
                    .catch(() => {
                        // Browser blocked unmuted autoplay -> mute to start video
                        video.muted = true;
                        if (isPlayingRef.current) {
                            video.play().catch(() => {});
                        }
                        setIsAudible(false);
                        setShowUnmuteHint(true);
                    });
            }
        }

        // Global unlock listener: unmute and play with sound only if NOT paused
        const unlockAudio = () => {
            const vid = videoRef.current;
            if (vid && !hasFinishedAudibleCycle.current) {
                try {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (AudioCtx) {
                        const ctx = new AudioCtx();
                        if (ctx.state === "suspended") ctx.resume();
                    }
                } catch (e) {}

                vid.muted = false;
                const targetVol = Math.max(0, Math.min(100, volumeRef.current || 35));
                vid.volume = targetVol / 100;
                setVolume?.(targetVol);

                // Only call play() if the user has NOT explicitly paused the video
                if (isPlayingRef.current) {
                    vid.play().then(() => {
                        setIsAudible(true);
                        setShowUnmuteHint(false);
                        audiblePlayStartTime.current = Date.now();
                    }).catch(() => {});
                } else {
                    vid.pause();
                }
            }

            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };

        window.addEventListener("click", unlockAudio, { passive: true });
        window.addEventListener("touchstart", unlockAudio, { passive: true });
        window.addEventListener("pointerdown", unlockAudio, { passive: true });
        window.addEventListener("keydown", unlockAudio, { passive: true });

        return () => {
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };
    }, [setVolume]);

    // Track 1 full audible cycle: only countdown while audio is actively playing
    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !isAudible || hasFinishedAudibleCycle.current || !isPlayingRef.current) return;

        // Ensure audio has played for 14 seconds before auto-muting
        if (audiblePlayStartTime.current && (Date.now() - audiblePlayStartTime.current >= 14000)) {
            hasFinishedAudibleCycle.current = true;
            video.muted = true;
            setIsAudible(false);
            setVolume?.(0);
        }
    };

    // Handle Volume prop changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const val = Math.max(0, Math.min(100, volume));
        video.volume = val / 100;
        if (val === 0) {
            video.muted = true;
            setIsAudible(false);
        } else {
            hasFinishedAudibleCycle.current = false;
            video.muted = false;
            setIsAudible(true);
            setShowUnmuteHint(false);
            audiblePlayStartTime.current = Date.now();
            // Strictly check isPlaying before playing
            if (isPlayingRef.current) {
                video.play().catch(() => {});
            }
        }
    }, [volume]);

    // Manual click on sound pill badge
    const handleManualUnmute = (e) => {
        e.stopPropagation();
        const vid = videoRef.current;
        if (vid) {
            vid.muted = false;
            const targetVol = Math.max(0, Math.min(100, volumeRef.current || 35));
            vid.volume = targetVol / 100;
            setVolume?.(targetVol);
            if (isPlayingRef.current) {
                vid.play().then(() => {
                    setIsAudible(true);
                    setShowUnmuteHint(false);
                    audiblePlayStartTime.current = Date.now();
                }).catch(() => {});
            }
        }
    };

    return (
        <>
            <video
                ref={videoRef}
                autoPlay={isPlaying}
                loop
                muted={volume === 0 || !isAudible}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="fixed top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src="/video-background/PinGrab_1789291718783.mp4" type="video/mp4" />
            </video>

            {/* Subtle macOS Glass Audio Pill Badge */}
            {showUnmuteHint && !isAudible && isPlaying && (
                <button
                    type="button"
                    onClick={handleManualUnmute}
                    className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse cursor-pointer max-sm:hidden select-none"
                    aria-label="Click anywhere to enable audio"
                >
                    <VolumeX className="w-3.5 h-3.5 text-white/80" />
                    <span>Click anywhere for sound</span>
                </button>
            )}
        </>
    );
};

export default VideoBackground;
