
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Share2,
  Mic2,
  Airplay,
  Music2,
  Disc,
} from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";

// Precise timed lyrics for Doja Cat - Say So (Official Video Audio)
const SAY_SO_LYRICS = [
  { time: 0, text: "♪ (Intro - Retro Disco Groove) ♪" },
  { time: 8.5, text: "Day to night to morning, keep with me in the moment" },
  { time: 13.0, text: "I'd let you had I known it, why don't you say so?" },
  { time: 17.0, text: "Didn't even notice, no punches left to roll with" },
  { time: 21.2, text: "You got to keep me focused, you want it? Say so" },
  { time: 25.5, text: "Day to night to morning, keep with me in the moment" },
  { time: 29.8, text: "I'd let you had I known it, why don't you say so?" },
  { time: 34.0, text: "Didn't even notice, no punches left to roll with" },
  { time: 38.2, text: "You got to keep me focused, you want it? Say so" },
  { time: 42.5, text: "It's been a long time since you fell in love" },
  { time: 47.0, text: "You ain't coming out your shell, you really ain't saying enough" },
  { time: 51.2, text: "You're walking with that strut, talking with that slang" },
  { time: 55.5, text: "Body language crazy, ain't nobody had to frame it" },
  { time: 59.8, text: "I can tell you want it, but you're acting like you don't" },
  { time: 104.2, text: "Ain't nobody gonna love you like I'm gonna love you, won't" },
  { time: 108.5, text: "Let you walk away, baby, tell me what you need" },
  { time: 112.8, text: "I got everything you want, yeah, guaranteed" },
  { time: 117.0, text: "Day to night to morning, keep with me in the moment" },
  { time: 121.2, text: "I'd let you had I known it, why don't you say so?" },
  { time: 125.5, text: "Didn't even notice, no punches left to roll with" },
  { time: 129.8, text: "You got to keep me focused, you want it? Say so" },
  { time: 134.0, text: "Day to night to morning, keep with me in the moment" },
  { time: 138.2, text: "I'd let you had I known it, why don't you say so?" },
  { time: 142.5, text: "Didn't even notice, no punches left to roll with" },
  { time: 146.8, text: "You got to keep me focused, you want it? Say so" },
  { time: 151.0, text: "Let me check your chest, my breath-taking" },
  { time: 155.2, text: "Look into your eyes, you're high-rating" },
  { time: 159.5, text: "Got me feeling like I'm gliding on a wave" },
  { time: 164.0, text: "Everything you do just make me want to stay" },
  { time: 168.2, text: "Say it with your chest, don't be shy now" },
  { time: 172.5, text: "Show me what you got, let's touch the sky now" },
  { time: 176.8, text: "Every little move you make is so smooth" },
  { time: 181.0, text: "Got me hooked on your groove" },
  { time: 185.5, text: "Day to night to morning, keep with me in the moment" },
  { time: 189.8, text: "I'd let you had I known it, why don't you say so?" },
  { time: 194.0, text: "Didn't even notice, no punches left to roll with" },
  { time: 198.2, text: "You got to keep me focused, you want it? Say so" },
  { time: 202.5, text: "Day to night to morning, keep with me in the moment" },
  { time: 206.8, text: "I'd let you had I known it, why don't you say so?" },
  { time: 211.0, text: "Didn't even notice, no punches left to roll with" },
  { time: 215.2, text: "You got to keep me focused, you want it? Say so" },
  { time: 220.0, text: "(Why don't you say so?)" },
  { time: 224.2, text: "(You want it? Say so)" },
  { time: 228.5, text: "(Why don't you say so?)" },
  { time: 232.8, text: "(You want it? Say so ♪)" },
  { time: 235.0, text: "♪ (Outro Beats) ♪" }
];

// Helper to format time into mm:ss
const formatTime = (secs) => {
  if (isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

export const IPhoneMusicApp = ({
  currentTime,
  isOpen,
  onClose,
  isDarkMode,
  onPauseAmbientMusic,
}) => {
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const activeLyricRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songDuration, setSongDuration] = useState(235.6);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("all");
  const [showLyrics, setShowLyrics] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Play audio safely
  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          onPauseAmbientMusic?.();
        })
        .catch((err) => {
          console.warn("Audio play issue:", err);
        });
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePauseAudio();
    } else {
      handlePlayAudio();
    }
  };

  // Sync audio progress updates
  const handleTimeUpdate = () => {
    if (!isDragging && audioRef.current) {
      setSongProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setSongDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setSongProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.volume = volume || 0.8;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Immediate jump to lyric timestamp
  const handleJumpToLyric = (lyricTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = lyricTime;
      setSongProgress(lyricTime);
      if (!isPlaying) {
        handlePlayAudio();
      }
    }
  };

  // Handle Track Finished
  const handleSongEnded = () => {
    if (repeatMode === "one" || repeatMode === "all") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handleToggleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("all");
    else if (repeatMode === "all") setRepeatMode("one");
    else setRepeatMode("off");
  };

  // Determine current active lyric line
  const activeLyricIndex = SAY_SO_LYRICS.reduce((acc, lyric, index) => {
    if (songProgress >= lyric.time) return index;
    return acc;
  }, 0);

  // Auto-scroll active lyric smoothly to center
  useEffect(() => {
    if (showLyrics && activeLyricRef.current && lyricsContainerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLyricIndex, showLyrics]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 select-none overflow-hidden ${
        isDarkMode
          ? "bg-[#0b0f19] text-zinc-100"
          : "bg-[#f8fafc] text-zinc-900"
      }`}
    >
      {/* Native HTML5 Audio */}
      <audio
        ref={audioRef}
        src="/mobileformusci/Doja Cat - Say So (Official Video) - dojacatVEVO.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnded}
        preload="auto"
      />

      {/* Atmospheric Music-Vibe Blue & Indigo Ambient Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-20 -left-16 w-[340px] h-[340px] rounded-full blur-[100px] opacity-35 transition-all duration-1000 ${
            isPlaying
              ? "bg-blue-600 scale-110 animate-pulse"
              : "bg-blue-700/30 scale-100"
          }`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-[360px] h-[360px] rounded-full blur-[110px] opacity-30 transition-all duration-1000 ${
            isPlaying
              ? "bg-indigo-600 scale-120"
              : "bg-indigo-700/25 scale-100"
          }`}
        />
        <div className="absolute -bottom-16 left-1/3 w-[300px] h-[300px] rounded-full blur-[90px] bg-cyan-600/20 opacity-25" />
      </div>

      {/* Top iOS Status Bar */}
      <IPhoneStatusBar
        currentTime={currentTime}
        theme={isDarkMode ? "dark" : "light"}
      />

      {/* Header Bar */}
      <header className="relative z-10 px-5 pt-2 pb-2 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-200/80 dark:bg-zinc-800/80 active:scale-90 transition-transform backdrop-blur-md"
          aria-label="Close player"
        >
          <ChevronDown className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
        </button>

        <div className="text-center">
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1">
            <Music2 className="w-3 h-3 text-zinc-600 dark:text-zinc-400" />
            Apple Music
          </p>
          <h2 className="text-[13px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">
            Hot Pink — Doja Cat
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-200/80 dark:bg-zinc-800/80 active:scale-90 transition-transform backdrop-blur-md"
          aria-label="Favorite"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
          />
        </button>
      </header>

      {/* Middle Content: Clean Black & Greyness Live Lyrics OR Album Card */}
      <main className="relative z-10 flex-1 px-6 flex flex-col justify-center items-center overflow-hidden min-h-0">
        {showLyrics ? (
          /* Live Synced Lyrics View with Black and Greyscale Typography */
          <div
            ref={lyricsContainerRef}
            className="w-full h-full overflow-y-auto no-scrollbar py-6 flex flex-col gap-4 text-left"
          >
            {SAY_SO_LYRICS.map((line, idx) => {
              const isActive = idx === activeLyricIndex;
              const isPast = idx < activeLyricIndex;

              return (
                <div
                  key={idx}
                  ref={isActive ? activeLyricRef : null}
                  onClick={() => handleJumpToLyric(line.time)}
                  className={`cursor-pointer transition-all duration-300 transform leading-snug select-none rounded-2xl px-4 py-3 ${
                    isActive
                      ? "text-[23px] font-extrabold text-black dark:text-white scale-[1.02] bg-black/5 dark:bg-white/10 backdrop-blur-md shadow-sm border border-black/10 dark:border-white/15 opacity-100"
                      : isPast
                      ? "text-[18px] font-semibold text-zinc-400 dark:text-zinc-500 opacity-60 hover:opacity-90 hover:text-zinc-600 dark:hover:text-zinc-300"
                      : "text-[18px] font-semibold text-zinc-400 dark:text-zinc-600 opacity-40 hover:opacity-80 hover:text-zinc-600 dark:hover:text-zinc-300"
                  }`}
                >
                  <p className="w-full">
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* Album Artwork View */
          <div className="w-full flex-1 flex flex-col justify-center items-center py-2 max-h-[320px]">
            <div
              className={`relative w-[240px] h-[240px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 border border-black/10 dark:border-white/15 ${
                isPlaying ? "scale-100 shadow-xl" : "scale-95 opacity-85"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex flex-col justify-between p-5 text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-zinc-200">
                    Hot Pink
                  </span>
                  <Disc
                    className={`w-5 h-5 text-zinc-300 ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "6s" }}
                  />
                </div>

                <div className="flex flex-col items-center justify-center my-auto">
                  <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-inner">
                    <div
                      className={`w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center ${
                        isPlaying ? "animate-spin" : ""
                      }`}
                      style={{ animationDuration: "8s" }}
                    >
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black tracking-tight drop-shadow-md text-white">
                    Say So
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400">
                    Doja Cat • 2019
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Controls Area in Clean Monochrome / Greyscale */}
      <footer className="relative z-10 px-6 pt-3 pb-8 flex flex-col gap-3 shrink-0 backdrop-blur-2xl bg-white/70 dark:bg-black/60 border-t border-zinc-200/80 dark:border-zinc-800/80">
        {/* Track Title and Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-[19px] font-extrabold tracking-tight truncate flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Say So
              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-700/60 uppercase tracking-wider">
                Lossless
              </span>
            </h1>
            <p className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 truncate">
              Doja Cat — Hot Pink
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2 rounded-xl transition-all active:scale-95 ${
                showLyrics
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                  : "bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300"
              }`}
              title="Toggle Lyrics"
            >
              <Mic2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Doja Cat - Say So",
                    text: "Listening to Say So on Pratham's iPhone!",
                    url: window.location.href,
                  });
                }
              }}
              className="p-2 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="flex flex-col gap-1">
          <div className="relative w-full flex items-center">
            <input
              type="range"
              min="0"
              max={songDuration || 235.6}
              step="0.1"
              value={songProgress}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchEnd={() => setIsDragging(false)}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white bg-zinc-300/80 dark:bg-zinc-700/80"
            />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tabular-nums">
            <span>{formatTime(songProgress)}</span>
            <span>-{formatTime(Math.max(0, songDuration - songProgress))}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between px-2">
          <button
            type="button"
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-2 transition-colors active:scale-90 ${
              isShuffle
                ? "text-black dark:text-white font-bold"
                : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
            aria-label="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setSongProgress(0);
              }
            }}
            className="p-2 active:scale-85 transition-transform text-zinc-800 dark:text-zinc-200 hover:opacity-100"
            aria-label="Previous Track"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>

          {/* Large Center Play/Pause Button in Black/White */}
          <button
            type="button"
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-lg shadow-black/20 dark:shadow-white/10 active:scale-90 hover:scale-105 transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setSongProgress(0);
              }
            }}
            className="p-2 active:scale-85 transition-transform text-zinc-800 dark:text-zinc-200 hover:opacity-100"
            aria-label="Next Track"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>

          <button
            type="button"
            onClick={handleToggleRepeat}
            className={`p-2 transition-colors active:scale-90 ${
              repeatMode !== "off"
                ? "text-black dark:text-white font-bold"
                : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
            aria-label="Repeat"
          >
            {repeatMode === "one" ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Volume Scrubber */}
        <div className="flex items-center gap-3 pt-1 px-1">
          <button
            type="button"
            onClick={toggleMute}
            className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white active:scale-95"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white bg-zinc-300/80 dark:bg-zinc-700/80"
          />

          <button
            type="button"
            onClick={() => {}}
            className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white active:scale-95"
          >
            <Airplay className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default IPhoneMusicApp;
