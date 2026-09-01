import React, { useState, useRef, useEffect } from "react";
import { navIcons } from "#constants/index.js";
import useWindowStore from "#store/window.js";
import dayjs from "dayjs";
import {
  Folder,
  ExternalLink,
  Download,
  Copy,
  Mail,
  Phone,
  Terminal as TerminalIcon,
  FileText,
  User,
  Globe,
  Image as ImageIcon,
  Check,
  Calendar,
} from "lucide-react";
import { NavbarWifiPanel } from "./navbar-panels/NavbarWifiPanel";
import { NavbarUserProfilePanel } from "./navbar-panels/NavbarUserProfilePanel";
import { NavbarControlCenterPanel } from "./navbar-panels/NavbarControlCenterPanel";
import { NavbarWidgetsSidebar } from "./navbar-panels/NavbarWidgetsSidebar";

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
  </svg>
);

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
  isDarkMode = true,
  toggleTheme,
}) => {
  const [activeMenu, setActiveMenu] = useState(null); // 'apple' | 'portfolio' | 'projects' | 'resume' | 'contact' | 'wifi' | 'user' | 'control' | 'widgets' | null
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd MMM D h:mm A"));
  const [copiedResume, setCopiedResume] = useState(false);
  const { openWindow, focusWindow } = useWindowStore();
  const navRef = useRef(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("ddd MMM D h:mm A"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dismiss dropdowns on outside click
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

  const handleOpenApp = (appKey, data = null) => {
    setActiveMenu(null);
    openWindow(appKey, data);
    focusWindow(appKey);
  };

  const handleCopyResumeLink = () => {
    const resumeUrl = `${window.location.origin}/files/resume.pdf`;
    navigator.clipboard.writeText(resumeUrl);
    setCopiedResume(true);
    onNotify?.("Link Copied", "Resume PDF link copied to clipboard!");
    setTimeout(() => {
      setCopiedResume(false);
      setActiveMenu(null);
    }, 1200);
  };

  const handleDownloadResume = () => {
    setActiveMenu(null);
    const link = document.createElement("a");
    link.href = "/files/resume.pdf";
    link.download = "Pratham_Tiwari_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify?.("Download Started", "Pratham_Tiwari_Resume.pdf is downloading.");
  };

  const handleIconClick = (id) => {
    switch (id) {
      case 1:
        toggleMenu("wifi");
        break;
      case 2:
        setActiveMenu(null);
        onNotify?.(
          "Spotlight Search",
          "Search & open apps directly from the Dock or top menus!"
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
    <header className="mac-navbar max-sm:hidden" ref={navRef}>
      {/* LEFT: Apple Icon + App Menus */}
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
                onClick={() => handleOpenApp("finder", { location: "about" })}
                className="apple-menu-item"
              >
                <span>About This Mac (Pratham)</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => handleOpenApp("finder", { location: "work" })}
                className="apple-menu-item"
              >
                <span>Browse Projects...</span>
                <span className="text-[10px] text-white/40 font-mono">⌘P</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenApp("terminal")}
                className="apple-menu-item"
              >
                <span>Developer Terminal</span>
                <span className="text-[10px] text-white/40 font-mono">⌘T</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => handleOpenApp("photos")}
                className="apple-menu-item"
              >
                <span>Recent Works & Demos</span>
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

        {/* Portfolio App Menu */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("portfolio")}
            className={`font-bold text-[13px] px-2.5 py-1 text-white/95 tracking-tight rounded-md hover:bg-white/15 transition-colors cursor-pointer ${
              activeMenu === "portfolio" ? "bg-white/20 shadow-sm" : ""
            }`}
          >
            Pratham Portfolio
          </button>

          {activeMenu === "portfolio" && (
            <div className="mac-dropdown left-0 right-auto w-64 p-1.5 text-[12.5px] font-sans">
              <button
                type="button"
                onClick={() => handleOpenApp("finder", { location: "about" })}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <User size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>About Pratham Tiwari</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Bio</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenApp("terminal")}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <TerminalIcon size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Tech Stack (Terminal)</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">CLI</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenApp("safari")}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Globe size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Developer Blog (Medium)</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Safari</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenApp("photos")}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Visual Showcase & Videos</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Photos</span>
              </button>

              <div className="h-[1px] bg-zinc-700/40 my-1" />

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.location.reload();
                }}
                className="apple-menu-item text-zinc-400 hover:text-white"
              >
                <span>Reload Portfolio</span>
                <span className="text-[10px] text-zinc-400 font-mono">⌘R</span>
              </button>
            </div>
          )}
        </div>

        {/* PROJECTS DROPDOWN */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("projects")}
            className={`px-2.5 py-1 text-[12.5px] font-medium text-white/90 hover:bg-white/15 rounded-md transition-colors cursor-pointer ${
              activeMenu === "projects" ? "bg-white/20 shadow-sm" : ""
            }`}
          >
            Projects
          </button>

          {activeMenu === "projects" && (
            <div className="mac-dropdown left-0 right-auto w-72 p-1.5 text-[12.5px] font-sans">
              <div className="px-2.5 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Featured Projects
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://react-shopping-cart-by-hand-no-ai.vercel.app/", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Folder size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <div>
                    <p className="font-medium leading-tight">KP Store</p>
                    <p className="text-[10px] text-zinc-400">Apple E-Commerce Platform</p>
                  </div>
                </div>
                <ExternalLink size={12} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://award-winning-website-main-beryl.vercel.app/", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Globe size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <div>
                    <p className="font-medium leading-tight">Redefine Gaming</p>
                    <p className="text-[10px] text-zinc-400">Awwwards Winning Web Experience</p>
                  </div>
                </div>
                <ExternalLink size={12} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://gsap-awwwards-website-main-peach.vercel.app/", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <div>
                    <p className="font-medium leading-tight">GSAP Awwwards</p>
                    <p className="text-[10px] text-zinc-400">Interactive 3D Motion Site</p>
                  </div>
                </div>
                <ExternalLink size={12} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              <div className="h-[1px] bg-zinc-700/40 my-1" />

              <button
                type="button"
                onClick={() => handleOpenApp("finder", { location: "work" })}
                className="apple-menu-item group flex items-center justify-between font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <Folder size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Open All in Finder</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">⌘O</span>
              </button>
            </div>
          )}
        </div>

        {/* RESUME DROPDOWN */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("resume")}
            className={`px-2.5 py-1 text-[12.5px] font-medium text-white/90 hover:bg-white/15 rounded-md transition-colors cursor-pointer ${
              activeMenu === "resume" ? "bg-white/20 shadow-sm" : ""
            }`}
          >
            Resume
          </button>

          {activeMenu === "resume" && (
            <div className="mac-dropdown left-0 right-auto w-64 p-1.5 text-[12.5px] font-sans">
              <button
                type="button"
                onClick={() => handleOpenApp("resume")}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>View Interactive Resume</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Preview</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Download size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Download PDF Resume</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">PDF</span>
              </button>

              <button
                type="button"
                onClick={handleCopyResumeLink}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {copiedResume ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  )}
                  <span>{copiedResume ? "Copied Link!" : "Copy Resume Link"}</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">⌘C</span>
              </button>

              <div className="h-[1px] bg-zinc-700/40 my-1" />

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://www.linkedin.com/in/pratham-tiwari-962a00342/", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>View on LinkedIn</span>
                </div>
                <ExternalLink size={11} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          )}
        </div>

        {/* CONTACT DROPDOWN */}
        <div className="relative h-full flex items-center">
          <button
            type="button"
            onClick={() => toggleMenu("contact")}
            className={`px-2.5 py-1 text-[12.5px] font-medium text-white/90 hover:bg-white/15 rounded-md transition-colors cursor-pointer ${
              activeMenu === "contact" ? "bg-white/20 shadow-sm" : ""
            }`}
          >
            Contact
          </button>

          {activeMenu === "contact" && (
            <div className="mac-dropdown left-0 right-auto w-64 p-1.5 text-[12.5px] font-sans">
              <button
                type="button"
                onClick={() => handleOpenApp("contact")}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <User size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Open Contact Window</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Card</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("mailto:pratham.tiwari.dev@gmail.com", "_blank", "noopener,noreferrer");
                  onNotify?.("Opening Mail", "Opening email client for Pratham Tiwari.");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Mail size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Send Email</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Mail</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://www.linkedin.com/in/pratham-tiwari-962a00342/", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink size={11} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://github.com/Pratham707-S", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink size={11} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  window.open("https://cal.com/pratham-tiwari", "_blank", "noopener,noreferrer");
                }}
                className="apple-menu-item group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Schedule a Call</span>
                </div>
                <ExternalLink size={11} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          )}
        </div>
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
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
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