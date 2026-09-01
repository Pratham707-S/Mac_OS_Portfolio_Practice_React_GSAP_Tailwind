import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Music,
  Smartphone,
  Code2,
  Cpu,
} from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";
import { resumeData } from "../data/resumeData.js";

export const IPhoneSettingsApp = ({
  currentTime,
  isOpen,
  onClose,
  isDarkMode,
  toggleTheme,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
}) => {
  if (!isOpen) return null;

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
          Settings
        </span>

        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-16 space-y-5">
        <div
          className={`rounded-2xl p-4 border shadow-sm flex items-center gap-3.5 ${
            isDarkMode
              ? "bg-[#1c1c1e] border-zinc-800 shadow-none"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <img
            src="/images/pratham.jpg"
            alt={resumeData.personalInfo.name}
            className={`w-14 h-14 rounded-full object-cover border ${
              isDarkMode ? "border-zinc-700" : "border-zinc-200"
            }`}
          />
          <div className="min-w-0 flex-1">
            <h3
              className={`font-bold text-[16px] truncate ${
                isDarkMode ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              {resumeData.personalInfo.name}
            </h3>
            <p
              className={`text-[12px] truncate ${
                isDarkMode ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Apple ID, iCloud+, Media &amp; App Store
            </p>
          </div>
          <ChevronRight size={18} className="text-zinc-400 shrink-0" />
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-3">
            Display &amp; Audio
          </div>
          <div
            className={`rounded-2xl border overflow-hidden divide-y ${
              isDarkMode
                ? "bg-[#1c1c1e] border-zinc-800 divide-zinc-800/80 shadow-none"
                : "bg-white border-zinc-200 divide-zinc-100 shadow-sm"
            }`}
          >
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                  {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                </div>
                <div>
                  <p
                    className={`text-[14px] font-semibold ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    Appearance
                  </p>
                  <p
                    className={`text-[12px] ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className={`w-12 h-7 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                  isDarkMode ? "bg-[#34c759]" : "bg-zinc-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    isDarkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ff2d55] flex items-center justify-center text-white">
                  <Music size={16} />
                </div>
                <div>
                  <p
                    className={`text-[14px] font-semibold ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    Ambient Theme Audio
                  </p>
                  <p
                    className={`text-[12px] ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {isPlaying ? "Currently Playing" : "Paused"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPlaying?.(!isPlaying)}
                className={`w-12 h-7 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                  isPlaying ? "bg-[#34c759]" : "bg-zinc-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    isPlaying ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-3">
            System &amp; Architecture
          </div>
          <div
            className={`rounded-2xl border overflow-hidden divide-y text-[13.5px] ${
              isDarkMode
                ? "bg-[#1c1c1e] border-zinc-800 divide-zinc-800/80 shadow-none"
                : "bg-white border-zinc-200 divide-zinc-100 shadow-sm"
            }`}
          >
            <div className="p-3.5 flex items-center justify-between">
              <div
                className={`flex items-center gap-3 font-medium ${
                  isDarkMode ? "text-zinc-200" : "text-zinc-900"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDarkMode
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  <Smartphone size={15} className="stroke-[2]" />
                </div>
                <span>iOS Version</span>
              </div>
              <span className="text-zinc-400 text-xs">18.2 (22C152)</span>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div
                className={`flex items-center gap-3 font-medium ${
                  isDarkMode ? "text-zinc-200" : "text-zinc-900"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDarkMode
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  <Code2 size={15} className="stroke-[2]" />
                </div>
                <span>Framework</span>
              </div>
              <span className="text-zinc-400 text-xs">React 19 + GSAP 3</span>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div
                className={`flex items-center gap-3 font-medium ${
                  isDarkMode ? "text-zinc-200" : "text-zinc-900"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDarkMode
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  <Cpu size={15} className="stroke-[2]" />
                </div>
                <span>State Engine</span>
              </div>
              <span className="text-zinc-400 text-xs">Zustand 5.0</span>
            </div>
          </div>
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

export default IPhoneSettingsApp;
