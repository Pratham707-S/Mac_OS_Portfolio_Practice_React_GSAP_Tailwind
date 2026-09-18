import React, { useState } from "react";
import { ChevronLeft, Search as SearchIcon, ExternalLink } from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";

const photosList = [
  {
    id: 1,
    title: "Pratham Tiwari — Profile Highlight",
    img: "/images/pratham.jpg",
    link: "https://www.linkedin.com/in/pratham-tiwari-a5518b264/",
    buttonText: "Connect on LinkedIn",
    buttonBg: "bg-[#0077b5]",
  },
  {
    id: 2,
    title: "KP Store — Apple E-Commerce",
    img: "/images/1786199425015.jpeg",
    link: "https://react-shopping-cart-by-hand-no-ai.vercel.app/",
    buttonText: "View Live Project",
    buttonBg: "bg-[#007aff]",
  },
  {
    id: 3,
    title: "Redefine Gaming — Award Winning 3D Site",
    img: "/images/redefine-gaming.png",
    link: "https://award-winning-website-main-beryl.vercel.app/",
    buttonText: "View Live Project",
    buttonBg: "bg-[#007aff]",
  },
  {
    id: 4,
    title: "Understanding Access and Refresh Tokens (JWT)",
    img: "/images/jwt-token.jpg",
    link: "https://medium.com/@pratham.1226667/understanding-how-access-and-refresh-tokens-work-9bf0fb9a898f",
    buttonText: "Read on Medium",
    buttonBg: "bg-[#1a8917]",
  },
];

export const IPhonePhotosApp = ({ currentTime, isOpen, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!isOpen) return null;

  const filteredPhotos = photosList.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`fixed inset-0 z-[10000] w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom duration-200 select-text overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
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
          {activeTab === "all"
            ? "All Photos"
            : activeTab === "albums"
            ? "Albums"
            : "Search"}
        </span>

        <div className="w-16" />
      </div>

      {activeTab === "search" && (
        <div
          className={`px-4 pt-3 pb-2 shrink-0 border-b ${
            isDarkMode
              ? "bg-black border-zinc-800"
              : "bg-[#f2f2f7] border-zinc-200"
          }`}
        >
          <div
            className={`flex items-center gap-2 rounded-[10px] px-3 py-2 ${
              isDarkMode
                ? "bg-[#1c1c1e] border border-zinc-800 text-zinc-400"
                : "bg-[#e3e3e8] text-[#8e8e93]"
            }`}
          >
            <SearchIcon size={17} className="text-[#8e8e93] shrink-0" />
            <input
              type="text"
              placeholder="Search Photos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent border-none outline-none text-[15px] placeholder:text-[#8e8e93] w-full font-normal ${
                isDarkMode ? "text-zinc-100" : "text-zinc-900"
              }`}
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3.5 pb-6">
        {activeTab === "albums" ? (
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setActiveTab("all")}
              className="cursor-pointer group flex flex-col gap-1.5"
            >
              <div
                className={`aspect-square rounded-[18px] overflow-hidden relative border ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-800"
                    : "bg-zinc-100 border-zinc-200/80 shadow-sm"
                }`}
              >
                <img
                  src={photosList[0].img}
                  alt="Recent"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p
                  className={`text-xs font-semibold ${
                    isDarkMode ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  Recents
                </p>
                <p className="text-[11px] text-zinc-500">{photosList.length}</p>
              </div>
            </div>

            <div
              onClick={() => setActiveTab("all")}
              className="cursor-pointer group flex flex-col gap-1.5"
            >
              <div
                className={`aspect-square rounded-[18px] overflow-hidden relative border ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-800"
                    : "bg-zinc-100 border-zinc-200/80 shadow-sm"
                }`}
              >
                <img
                  src={photosList[1].img}
                  alt="Projects"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p
                  className={`text-xs font-semibold ${
                    isDarkMode ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  Projects
                </p>
                <p className="text-[11px] text-zinc-500">4</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`aspect-square rounded-[18px] overflow-hidden border cursor-pointer group active:scale-95 transition-all ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-800"
                    : "bg-zinc-100 border-zinc-200/80 shadow-sm"
                }`}
              >
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pt-8 px-2">
            <span className="text-white text-xs font-medium truncate max-w-[200px]">
              {selectedPhoto.title}
            </span>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="px-3.5 py-1.5 bg-white/20 text-white rounded-full text-xs font-semibold backdrop-blur cursor-pointer active:scale-95"
            >
              Done
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-2">
            <img
              src={selectedPhoto.img}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {selectedPhoto.link && (
            <div className="pb-8 flex justify-center">
              <a
                href={selectedPhoto.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(selectedPhoto.link, "_blank", "noopener,noreferrer");
                }}
                className={`px-5 py-2.5 ${
                  selectedPhoto.buttonBg || "bg-[#007aff]"
                } text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform select-none cursor-pointer`}
              >
                <span>{selectedPhoto.buttonText || "View Live Project"}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>
      )}

      <div
        className={`shrink-0 relative z-20 backdrop-blur-xl border-t pt-2 pb-4 px-12 flex flex-col items-center ${
          isDarkMode
            ? "bg-[#121214]/95 border-zinc-800 text-zinc-100"
            : "bg-white/95 border-zinc-200 text-zinc-900"
        }`}
      >
        <div className="w-full flex items-center justify-around">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeTab === "all" ? "text-[#007aff]" : "text-[#8e8e93]"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="15" height="15" rx="3.5" opacity="0.4" />
              <path
                d="M7 6h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"
                fill="currentColor"
              />
              <circle cx="10" cy="11.5" r="1.5" fill="white" />
              <path
                d="M6 18l3.5-4.5 2.5 3 3.5-4.5 4.5 6H6z"
                fill="white"
              />
            </svg>
            <span className="text-[10px] font-semibold tracking-tight">
              All Photos
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("albums")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeTab === "albums" ? "text-[#007aff]" : "text-[#8e8e93]"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="2" width="12" height="2" rx="1" opacity="0.6" />
              <rect x="4" y="5.5" width="16" height="2" rx="1" opacity="0.8" />
              <rect x="2" y="9" width="20" height="13" rx="3" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight">
              Albums
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("search")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeTab === "search" ? "text-[#007aff]" : "text-[#8e8e93]"
            }`}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight">
              Search
            </span>
          </button>
        </div>

        <div
          className={`w-32 h-1 rounded-full mt-2 pointer-events-none ${
            isDarkMode ? "bg-white/30" : "bg-black/30"
          }`}
        />
      </div>
    </div>
  );
};

export default IPhonePhotosApp;
