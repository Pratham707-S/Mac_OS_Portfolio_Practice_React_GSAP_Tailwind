import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import IPhoneStatusBar from "./ui/IPhoneStatusBar.jsx";
import IPhoneAppGrid from "./ui/IPhoneAppGrid.jsx";
import IPhoneDock from "./ui/IPhoneDock.jsx";
import IPhoneFilesApp from "./apps/IPhoneFilesApp.jsx";
import IPhonePhotosApp from "./apps/IPhonePhotosApp.jsx";
import IPhoneContactApp from "./apps/IPhoneContactApp.jsx";
import IPhoneSafariApp from "./apps/IPhoneSafariApp.jsx";
import IPhoneSearchApp from "./apps/IPhoneSearchApp.jsx";
import IPhoneNotesApp from "./apps/IPhoneNotesApp.jsx";
import IPhoneCalendarApp from "./apps/IPhoneCalendarApp.jsx";
import IPhoneSettingsApp from "./apps/IPhoneSettingsApp.jsx";
import IPhoneMusicApp from "./apps/IPhoneMusicApp.jsx";

export const IPhoneHomeScreen = ({
  volume,
  setVolume,
  isPlaying,
  setIsPlaying,
  isDarkMode,
  toggleTheme,
  onNotify,
}) => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [activeMobileApp, setActiveMobileApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filesFolder, setFilesFolder] = useState(null);
  const [filesTab, setFilesTab] = useState("work");
  const [filesSearch, setFilesSearch] = useState("");
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (appKey) => {
    if (appKey === "music") {
      setActiveMobileApp("music");
      return;
    }
    if (appKey === "mail") {
      window.open(
        "mailto:pratham.tiwari.dev@gmail.com",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (appKey === "facetime") {
      window.open(
        "https://cal.com/pratham-tiwari",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (appKey === "messages") {
      setActiveMobileApp("contact");
      return;
    }
    setActiveMobileApp(appKey);
  };

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden flex flex-col justify-between font-sans select-none bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mobile-wallpaper.jpg"
          alt="Mobile Wallpaper"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      <IPhoneStatusBar currentTime={currentTime} theme="home" />

      <IPhoneAppGrid
        currentTime={currentTime}
        isPlaying={isPlaying}
        onAppClick={handleAppClick}
        onNotify={onNotify}
      />

      <IPhoneDock
        onAppClick={handleAppClick}
        onOpenSearch={() => setActiveMobileApp("search")}
      />

      <IPhoneFilesApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "finder"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
        filesFolder={filesFolder}
        setFilesFolder={setFilesFolder}
        filesTab={filesTab}
        setFilesTab={setFilesTab}
        filesSearch={filesSearch}
        setFilesSearch={setFilesSearch}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
      />

      <IPhonePhotosApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "photos"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
      />

      <IPhoneContactApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "contact"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
      />

      <IPhoneSafariApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "safari"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
      />

      <IPhoneSearchApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "search"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectApp={(appKey) => setActiveMobileApp(appKey)}
      />

      <IPhoneNotesApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "notes" || activeMobileApp === "resume"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
      />

      <IPhoneCalendarApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "calendar"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
      />

      <IPhoneSettingsApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "settings"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
      />

      <IPhoneMusicApp
        currentTime={currentTime}
        isOpen={activeMobileApp === "music"}
        onClose={() => setActiveMobileApp(null)}
        isDarkMode={isDarkMode}
        onPauseAmbientMusic={() => setIsPlaying?.(false)}
      />
    </div>
  );
};

export default IPhoneHomeScreen;
