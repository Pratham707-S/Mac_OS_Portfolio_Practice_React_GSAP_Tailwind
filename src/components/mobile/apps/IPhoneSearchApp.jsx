import React from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";

const searchShortcuts = [
  {
    title: "KP Store",
    sub: "Apple E-Commerce React 19 App",
    icon: "/images/finder.png",
    app: "finder",
    keywords: ["store", "ecommerce", "kp", "shop"],
  },
  {
    title: "Redefine Gaming",
    sub: "Award Winning 3D Experience",
    icon: "/images/finder.png",
    app: "finder",
    keywords: ["gaming", "3d", "gsap", "redefine"],
  },
  {
    title: "Resume & Credentials",
    sub: "Download or view developer CV",
    icon: "/apple-icon-folder/Notes-60x60@3x 1.png",
    app: "notes",
    keywords: ["resume", "cv", "experience", "education"],
  },
  {
    title: "Tech Stack & Skills",
    sub: "React, Node.js, TypeScript, Docker, FastAPI",
    icon: "/apple-icon-folder/Notes-60x60@3x 1.png",
    app: "notes",
    keywords: ["skills", "technologies", "languages", "techstack"],
  },
  {
    title: "Developer Blog",
    sub: "Understanding Access and Refresh Tokens (JWT)",
    icon: "/images/safari.png",
    app: "safari",
    keywords: ["jwt", "blog", "tokens", "medium"],
  },
  {
    title: "Contact Pratham",
    sub: "Schedule call, Email, Twitter/X, LinkedIn",
    icon: "/images/contact.png",
    app: "contact",
    keywords: ["call", "email", "linkedin", "message", "contact"],
  },
  {
    title: "Doja Cat — Say So",
    sub: "Apple Music • Hot Pink with Live Lyrics",
    icon: "/apple-icon-folder/_Icons (1).png",
    app: "music",
    keywords: ["music", "song", "say so", "doja", "doja cat", "hot pink", "lyrics", "audio"],
  },
  {
    title: "All Photos & Projects",
    sub: "Featured project gallery & profile",
    icon: "/images/photos.png",
    app: "photos",
    keywords: ["photos", "gallery", "images", "pictures"],
  },
];

export const IPhoneSearchApp = ({
  currentTime,
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSelectApp,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filtered = searchShortcuts.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.sub.toLowerCase().includes(query) ||
      item.keywords.some((k) => k.includes(query))
  );

  return (
    <div
      className={`fixed inset-0 z-[10000] w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom duration-200 select-text overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-[#f2f2f7] text-black"
      }`}
    >
      <IPhoneStatusBar currentTime={currentTime} theme={isDarkMode ? "dark" : "light"} />

      <div
        className={`px-4 py-2.5 backdrop-blur-xl border-b flex items-center justify-between shrink-0 ${
          isDarkMode
            ? "bg-[#121214]/95 border-zinc-800"
            : "bg-white/95 border-zinc-200"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-0.5 text-[#007aff] font-normal text-[16px] active:opacity-70 cursor-pointer"
        >
          <ChevronLeft size={22} className="stroke-[2.2] -ml-1 text-[#007aff]" />
          <span>Go back</span>
        </button>

        <span
          className={`font-semibold text-[17px] tracking-tight ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Spotlight Search
        </span>

        <div className="w-16" />
      </div>

      <div
        className={`px-4 pt-3.5 pb-2.5 shrink-0 ${
          isDarkMode ? "bg-black" : "bg-[#f2f2f7]"
        }`}
      >
        <div
          className={`flex items-center gap-2.5 rounded-[12px] px-3.5 py-2.5 shadow-sm ${
            isDarkMode
              ? "bg-[#1c1c1e] border border-zinc-800 text-zinc-100"
              : "bg-[#e3e3e8] text-zinc-900"
          }`}
        >
          <Search size={17} className="text-[#8e8e93] shrink-0 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, apps, and bio..."
            className={`w-full bg-transparent outline-none text-[15px] font-normal ${
              isDarkMode
                ? "text-zinc-100 placeholder:text-zinc-500"
                : "text-zinc-900 placeholder:text-[#8e8e93]"
            }`}
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-16">
        <div className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1 mb-2">
          Top Results
        </div>

        <div
          className={`rounded-2xl border overflow-hidden divide-y ${
            isDarkMode
              ? "bg-[#1c1c1e] border-zinc-800 divide-zinc-800/80 shadow-none"
              : "bg-white border-zinc-200/90 divide-zinc-100 shadow-sm"
          }`}
        >
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  onSelectApp(item.app);
                }}
                className={`w-full flex items-center justify-between p-3.5 text-left cursor-pointer transition-colors ${
                  isDarkMode
                    ? "hover:bg-zinc-800/50 active:bg-zinc-800"
                    : "hover:bg-zinc-50 active:bg-zinc-100"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-[10px] overflow-hidden shrink-0 p-1 flex items-center justify-center border ${
                      isDarkMode
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-zinc-100 border-zinc-200"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-[14px] font-semibold truncate ${
                        isDarkMode ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`text-[12px] truncate ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} className="text-zinc-400 shrink-0" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-zinc-400 text-sm">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full pb-3 flex justify-center ${
          isDarkMode ? "bg-black" : "bg-[#f2f2f7]"
        }`}
      >
        <div
          className={`w-32 h-1 rounded-full pointer-events-none ${
            isDarkMode ? "bg-white/30" : "bg-black/30"
          }`}
        />
      </div>
    </div>
  );
};

export default IPhoneSearchApp;
