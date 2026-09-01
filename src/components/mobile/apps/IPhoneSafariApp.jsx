import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Mic,
  Share,
  BookOpen,
  Copy,
} from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";
import { safariBlogData } from "../data/mobileAppsData.js";

export const IPhoneSafariApp = ({ currentTime, isOpen, onClose, isDarkMode }) => {
  const [urlInput, setUrlInput] = useState("");

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    let target = urlInput.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
    }
    window.open(target, "_blank", "noopener,noreferrer");
  };

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
          Safari
        </span>

        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-6">
        <h2 className="text-[15px] font-bold text-[#ea5353] tracking-tight mb-4">
          My Developer Blog
        </h2>

        <div className="space-y-5">
          <a
            href={safariBlogData.article.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3.5 group cursor-pointer active:opacity-75 transition-opacity"
          >
            <div
              className={`w-16 h-16 rounded-[14px] overflow-hidden border shrink-0 ${
                isDarkMode
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-zinc-100 border-zinc-200/80 shadow-sm"
              }`}
            >
              <img
                src="/images/jwt-token.jpg"
                alt={safariBlogData.article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-zinc-400 mb-0.5">
                {safariBlogData.article.date} • {safariBlogData.article.readTime}
              </p>
              <h3
                className={`text-[13px] font-bold leading-snug line-clamp-2 ${
                  isDarkMode ? "text-zinc-100" : "text-zinc-900"
                }`}
              >
                {safariBlogData.article.title}
              </h3>
              <span className="inline-block text-[11.5px] font-medium text-[#007aff] mt-1 hover:underline">
                Check out the full post &gt;
              </span>
            </div>
          </a>
        </div>
      </div>

      <div
        className={`shrink-0 relative z-20 backdrop-blur-xl border-t px-4 pt-2.5 pb-4 flex flex-col items-center gap-2.5 shadow-md ${
          isDarkMode
            ? "bg-[#121214]/95 border-zinc-800"
            : "bg-[#f8f8f9]/95 border-zinc-200/80"
        }`}
      >
        <form
          onSubmit={handleSearchSubmit}
          className={`w-full max-w-sm flex items-center justify-between rounded-[12px] px-3.5 py-2 border shadow-sm ${
            isDarkMode
              ? "bg-[#1c1c1e] border-zinc-800 text-zinc-100"
              : "bg-white border-zinc-200 text-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-[#8e8e93] shrink-0 stroke-[2]" />
            <input
              type="text"
              placeholder="Search or enter website name"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className={`bg-transparent border-none outline-none text-[14px] placeholder:text-[#8e8e93] w-full font-normal ${
                isDarkMode ? "text-zinc-100" : "text-zinc-900"
              }`}
            />
          </div>
          <Mic size={16} className="text-[#8e8e93] shrink-0 stroke-[2] cursor-pointer active:opacity-60" />
        </form>

        <div className="w-full max-w-sm flex items-center justify-between px-3 text-zinc-400">
          <button
            type="button"
            className="p-1 cursor-default text-zinc-500"
            disabled
          >
            <ChevronLeft size={22} className="stroke-[2.2]" />
          </button>

          <button
            type="button"
            className="p-1 cursor-default text-zinc-500"
            disabled
          >
            <ChevronRight size={22} className="stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Pratham Tiwari Portfolio",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="p-1 text-[#007aff] active:opacity-60 cursor-pointer"
          >
            <Share size={19} className="stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={() => {
              window.open("https://github.com/Pratham707-S", "_blank", "noopener,noreferrer");
            }}
            className="p-1 text-[#007aff] active:opacity-60 cursor-pointer"
          >
            <BookOpen size={19} className="stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#007aff] active:opacity-60 cursor-pointer"
          >
            <Copy size={19} className="stroke-[2.2]" />
          </button>
        </div>

        <div
          className={`w-32 h-1 rounded-full mt-1 pointer-events-none ${
            isDarkMode ? "bg-white/30" : "bg-black/30"
          }`}
        />
      </div>
    </div>
  );
};

export default IPhoneSafariApp;
