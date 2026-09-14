import React, { useState, useRef, useEffect } from "react";
import { navLinks, navIcons } from "#constants/index.js";
import dayjs from "dayjs";
import { NavbarWifiPanel } from "./navbar-panels/NavbarWifiPanel";
import { NavbarUserProfilePanel } from "./navbar-panels/NavbarUserProfilePanel";
import { NavbarControlCenterPanel } from "./navbar-panels/NavbarControlCenterPanel";
import { NavbarWidgetsSidebar } from "./navbar-panels/NavbarWidgetsSidebar";

const Navbar = ({
  onOpenApp,
  onLockScreen,
  volume,
  setVolume,
  brightness,
  setBrightness,
  isPlaying,
  setIsPlaying,
  onNotify,
}) => {
  const [activeMenu, setActiveMenu] = useState(null); // 'apple' | 'wifi' | 'user' | 'control' | 'widgets' | null
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd MMM D h:mm A"));
  const navRef = useRef(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("ddd MMM D h:mm A"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dismiss on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuKey) => {
    setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleIconClick = (id) => {
    switch (id) {
      case 1:
        toggleMenu("wifi");
        break;
      case 2:
        setActiveMenu(null);
        onNotify?.(
          "Spotlight Search (Demo)",
          "Spotlight Search is a simulated demo feature. Explore projects in the Dock!"
        );
        onOpenApp?.("search");
        break;
      case 3:
        toggleMenu("user");
        break;
      case 4:
        toggleMenu("control");
        break;
      default:
        break;
    }
  };

  return (
    <header className="mac-navbar" ref={navRef}>
      {/* LEFT: Apple Icon + Menu Items */}
      <div className="flex items-center gap-1 h-full">
        {/* Apple Logo Dropdown */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("apple")}
            className={`p-1.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer ${
              activeMenu === "apple" ? "bg-white/20" : ""
            }`}
          >
            <img src="./images/logo.svg" alt="logo" className="w-3.5 h-3.5" />
          </button>

          {activeMenu === "apple" && (
            <div className="mac-dropdown left-0 right-auto w-56 p-1.5 text-[12.5px] font-sans">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  onOpenApp?.("about");
                }}
                className="apple-menu-item"
              >
                <span>About This Mac</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  onOpenApp?.("settings");
                }}
                className="apple-menu-item"
              >
                <span>System Settings...</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  onOpenApp?.("finder");
                }}
                className="apple-menu-item"
              >
                <span>App Store...</span>
                <span className="text-[10px] text-white/40 font-mono">3 updates</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  onOpenApp?.("photos");
                }}
                className="apple-menu-item"
              >
                <span>Recent Items</span>
                <span className="text-[10px] text-white/40">›</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  onLockScreen?.();
                }}
                className="apple-menu-item"
              >
                <span>Lock Screen</span>
                <span className="text-[10px] text-white/40 font-mono">⌃⌘Q</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.location.reload();
                }}
                className="apple-menu-item text-red-300 hover:text-white"
              >
                <span>Restart Session...</span>
              </button>
            </div>
          )}
        </div>

        {/* Portfolio Title & Navigation Links */}
        <span className="font-bold text-[13px] px-2 text-white/95 tracking-tight">Pratham Portfolio</span>

        <ul className="flex items-center gap-1">
          {navLinks.map(({ id, name, type }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onOpenApp?.(type)}
                className="px-2 py-0.5 text-[12.5px] font-medium text-white/90 hover:bg-white/15 rounded-md transition-colors cursor-pointer"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: Original navIcons + Live Clock */}
      <div className="flex items-center gap-2 h-full">
        <ul className="flex items-center gap-1">
          {navIcons.map(({ id, img }) => {
            const isWifiActive = id === 1 && activeMenu === "wifi";
            const isUserActive = id === 3 && activeMenu === "user";
            const isControlActive = id === 4 && activeMenu === "control";
            const isActive = isWifiActive || isUserActive || isControlActive;

            return (
              <li key={id} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => handleIconClick(id)}
                  className={`p-1.5 rounded-md hover:bg-white/15 transition-all cursor-pointer ${
                    isActive ? "bg-white/25 shadow-sm" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`icon-${id}`}
                    className="w-4 h-4 icon-hover opacity-90 hover:opacity-100 transition-opacity"
                  />
                </button>

                {/* Wi-Fi Panel */}
                {id === 1 && (
                  <NavbarWifiPanel
                    isOpen={activeMenu === "wifi"}
                    onNotify={onNotify}
                    onOpenSettings={() => {
                      setActiveMenu(null);
                      onOpenApp?.("settings", { tab: "Wi-Fi" });
                    }}
                  />
                )}

                {/* User Profile Panel */}
                {id === 3 && (
                  <NavbarUserProfilePanel
                    isOpen={activeMenu === "user"}
                    username="Pratham707-S"
                    onLockScreen={onLockScreen}
                    onOpenSettings={() => {
                      setActiveMenu(null);
                      onOpenApp?.("settings");
                    }}
                  />
                )}

                {/* Control Center Panel */}
                {id === 4 && (
                  <NavbarControlCenterPanel
                    isOpen={activeMenu === "control"}
                    volume={volume}
                    setVolume={setVolume}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    onNotify={onNotify}
                    onOpenSettings={() => {
                      setActiveMenu(null);
                      onOpenApp?.("settings");
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Live Clock Button (Opens Widgets & Notification Center) */}
        <button
          type="button"
          onClick={() => toggleMenu("widgets")}
          className={`text-[12.5px] font-medium text-white/95 px-2 py-0.5 rounded-md hover:bg-white/15 transition-all cursor-pointer select-none tracking-tight ${
            activeMenu === "widgets" ? "bg-white/25 shadow-sm" : ""
          }`}
          title="Click to open Widgets & Notification Center"
        >
          {currentTime}
        </button>

        {/* Widgets & Notification Center Sidebar */}
        <NavbarWidgetsSidebar
          isOpen={activeMenu === "widgets"}
          onClose={() => setActiveMenu(null)}
        />
      </div>
    </header>
  );
};

export default Navbar;