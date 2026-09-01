import React, { useState } from "react";

export const NavbarControlCenterPanel = ({
  isOpen,
  onOpenSettings,
  brightness = 100,
  setBrightness,
  volume = 25,
  setVolume,
  isPlaying = true,
  setIsPlaying,
  onNotify,
  isDarkMode = true,
  toggleTheme,
}) => {
  const [localBrightness, setLocalBrightness] = useState(100);
  const currentBrightness = setBrightness ? brightness : localBrightness;
  const [localVolume, setLocalVolume] = useState(25);
  const currentVolume = setVolume ? volume : localVolume;
  const [lastNonZeroVolume, setLastNonZeroVolume] = useState(25);

  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [stageManager, setStageManager] = useState(false);
  const [screenMirror, setScreenMirror] = useState(false);

  // Apply brightness globally
  const handleBrightnessChange = (val) => {
    const num = Number(val);
    if (setBrightness) {
      setBrightness(num);
    } else {
      setLocalBrightness(num);
    }
    document.documentElement.style.setProperty("--system-brightness", num);
  };

  // Handle Volume change
  const handleVolumeChange = (val) => {
    const num = Number(val);
    if (num > 0) setLastNonZeroVolume(num);
    if (setVolume) {
      setVolume(num);
    } else {
      setLocalVolume(num);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (currentVolume > 0) {
      setLastNonZeroVolume(currentVolume);
      if (setVolume) setVolume(0);
      else setLocalVolume(0);
    } else {
      const restored = lastNonZeroVolume || 70;
      if (setVolume) setVolume(restored);
      else setLocalVolume(restored);
    }
  };

  const handleBluetoothToggle = () => {
    const nextState = !bluetooth;
    setBluetooth(nextState);
    onNotify?.("Bluetooth (Demo)", nextState ? "Bluetooth is active in simulated mode." : "Bluetooth turned Off.");
  };

  const handleAirdropToggle = () => {
    const nextState = !airdrop;
    setAirdrop(nextState);
    onNotify?.("AirDrop (Demo)", nextState ? "AirDrop set to Contacts Only." : "AirDrop disabled.");
  };

  const handleDndToggle = () => {
    const nextState = !dnd;
    setDnd(nextState);
    onNotify?.("Focus Mode", nextState ? "Do Not Disturb turned On." : "Do Not Disturb turned Off.");
  };

  const handleStageToggle = () => {
    const nextState = !stageManager;
    setStageManager(nextState);
    onNotify?.("Stage Manager (Demo)", "Stage Manager is a simulated macOS UI demo.");
  };

  const handleMirrorToggle = () => {
    const nextState = !screenMirror;
    setScreenMirror(nextState);
    onNotify?.("Screen Mirroring (Demo)", "Looking for Apple AirPlay displays... (Demo mode)");
  };

  if (!isOpen) return null;

  return (
    <div
      className="mac-dropdown w-[320px] p-3 flex flex-col gap-2.5 select-none text-left font-sans"
      onClick={(e) => e.stopPropagation()}
    >
      {/* --- TOP 2-COLUMN GRID --- */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left Card: Connectivity */}
        <div className="bg-white/[0.08] hover:bg-white/[0.11] border border-white/10 rounded-2xl p-2.5 flex flex-col justify-between gap-2.5 transition-colors shadow-sm">
          {/* Wi-Fi Row */}
          <div
            onClick={() => {
              setWifi(!wifi);
              onNotify?.("Wi-Fi Status", !wifi ? "Connected to Home 5G." : "Wi-Fi is now Off.");
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                wifi ? "bg-[#007aff] text-white shadow-sm" : "bg-white/15 text-white/40"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A17.65 17.65 0 0 0 12 4zm0 3.3c3.78 0 7.22 1.5 9.76 3.96L12 18.78 2.24 11.26A14.28 14.28 0 0 1 12 7.3z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white leading-tight">Wi-Fi</div>
              <div className="text-[10px] text-white/50 truncate leading-tight mt-0.5">
                {wifi ? "Home 5G" : "Off"}
              </div>
            </div>
            <div className="text-white/30 group-hover:text-white/70 text-[10px] pr-0.5 transition-colors">›</div>
          </div>

          {/* Bluetooth Row */}
          <div
            onClick={handleBluetoothToggle}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                bluetooth ? "bg-[#007aff] text-white shadow-sm" : "bg-white/15 text-white/40"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white leading-tight">Bluetooth</div>
              <div className="text-[10px] text-white/50 truncate leading-tight mt-0.5">
                {bluetooth ? "On" : "Off"}
              </div>
            </div>
            <div className="text-white/30 group-hover:text-white/70 text-[10px] pr-0.5 transition-colors">›</div>
          </div>

          {/* AirDrop Row */}
          <div
            onClick={handleAirdropToggle}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                airdrop ? "bg-[#007aff] text-white shadow-sm" : "bg-white/15 text-white/40"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white leading-tight">AirDrop</div>
              <div className="text-[10px] text-white/50 truncate leading-tight mt-0.5">
                {airdrop ? "Contacts Only" : "Off"}
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards: Focus & Shadcn Dark Mode Toggle */}
        <div className="flex flex-col gap-2">
          {/* Focus / DND */}
          <div
            onClick={handleDndToggle}
            className={`border rounded-2xl p-2.5 flex items-center gap-2.5 cursor-pointer transition-all duration-200 ${
              dnd
                ? "bg-indigo-600/70 border-indigo-400/40 shadow-sm"
                : "bg-white/[0.08] hover:bg-white/[0.11] border-white/10"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                dnd ? "bg-white text-indigo-600 shadow-sm" : "bg-white/15 text-white/60"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A9.04 9.04 0 0 0 12 3z" />
              </svg>
            </div>
            <div>
              <div className="text-[12px] font-semibold text-white leading-tight">Focus</div>
              <div className="text-[10px] text-white/50 leading-tight mt-0.5">
                {dnd ? "Do Not Disturb" : "Off"}
              </div>
            </div>
          </div>

          {/* Shadcn UI Dark Mode / Light Mode Switch Card */}
          <div
            onClick={() => {
              toggleTheme?.();
              onNotify?.(
                "Appearance",
                !isDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled"
              );
            }}
            className="bg-white/[0.08] hover:bg-white/[0.11] border border-white/10 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer transition-all duration-200 shadow-sm group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isDarkMode
                    ? "bg-[#007aff] text-white shadow-sm"
                    : "bg-zinc-700/50 text-zinc-300 border border-zinc-600/40"
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A9.04 9.04 0 0 0 12 3z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-white leading-tight">
                  Dark Mode
                </div>
                <div className="text-[10px] text-white/50 truncate leading-tight mt-0.5">
                  {isDarkMode ? "On" : "Off"}
                </div>
              </div>
            </div>

            {/* Shadcn Switch Component */}
            <div
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none ${
                isDarkMode ? "bg-[#007aff]" : "bg-zinc-600/60"
              }`}
            >
              <span
                className={`pointer-events-none flex items-center justify-center h-4 w-4 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                  isDarkMode ? "translate-x-4" : "translate-x-0"
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-2.5 h-2.5 text-[#007aff] fill-current" viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A9.04 9.04 0 0 0 12 3z" />
                  </svg>
                ) : (
                  <svg className="w-2.5 h-2.5 text-zinc-600 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- DISPLAY BRIGHTNESS CARD --- */}
      <div className="bg-white/[0.08] hover:bg-white/[0.11] border border-white/10 rounded-2xl p-2.5 flex flex-col gap-2 transition-colors shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-white/90">Display</span>
          <span className="text-[10.5px] text-white/50 font-mono">{currentBrightness}%</span>
        </div>
        <div className="relative flex items-center">
          <input
            type="range"
            min="15"
            max="100"
            value={currentBrightness}
            onChange={(e) => handleBrightnessChange(e.target.value)}
            style={{
              background: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) ${currentBrightness}%, rgba(255, 255, 255, 0.15) ${currentBrightness}%, rgba(255, 255, 255, 0.15) 100%)`,
            }}
            className="mac-slider w-full"
          />
          {/* Sun icon */}
          <div className="absolute left-2.5 pointer-events-none text-black/60 flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
            </svg>
          </div>
        </div>
      </div>

      {/* --- SOUND VOLUME SLIDER --- */}
      <div className="bg-white/[0.08] hover:bg-white/[0.11] border border-white/10 rounded-2xl p-2.5 flex flex-col gap-1.5 transition-colors shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-white/90">Sound</span>
          <span className="text-[10.5px] text-white/50 font-mono">{currentVolume}%</span>
        </div>
        <div className="relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={currentVolume}
            onChange={(e) => handleVolumeChange(e.target.value)}
            style={{
              background: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) ${currentVolume}%, rgba(255, 255, 255, 0.15) ${currentVolume}%, rgba(255, 255, 255, 0.15) 100%)`,
            }}
            className="mac-slider w-full"
          />
          <div
            onClick={toggleMute}
            title={currentVolume === 0 ? "Click to Unmute" : "Click to Mute"}
            className="absolute left-2.5 cursor-pointer text-black/60 hover:text-black/90 flex items-center justify-center transition-colors"
          >
            {currentVolume === 0 ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                {currentVolume > 50 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* --- NOW PLAYING MEDIA CARD --- */}
      <div className="bg-white/[0.08] hover:bg-white/[0.11] border border-white/10 rounded-2xl p-2.5 flex items-center justify-between gap-2.5 transition-colors shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-600/40 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-semibold text-white truncate leading-tight">
              Portfolio Background
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-white/50 truncate leading-tight">Pratham • Ambient Theme</span>
              {isPlaying && currentVolume > 0 && (
                <div className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-150" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying ? setIsPlaying(!isPlaying) : null}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- FOOTER: Settings Quick Link --- */}
      <div className="flex items-center justify-between pt-0.5 px-0.5">
        <div className="flex items-center gap-1.5 text-white/40 text-[10.5px]">
          <span>⚡ 100% Battery</span>
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-[11px] text-white/60 hover:text-white hover:underline transition-colors cursor-pointer"
        >
          Control Center Settings...
        </button>
      </div>
    </div>
  );
};

export default NavbarControlCenterPanel;

