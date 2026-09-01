import React from "react";

export const IPhoneStatusBar = ({ currentTime, theme = "home" }) => {
  const isLight = theme === "light";
  const isDarkApp = theme === "dark";
  const isHome = theme === "home";

  return (
    <header
      className={`relative z-20 w-full pt-3 px-6 pb-1 flex items-center justify-between text-[15px] font-semibold tracking-tight shrink-0 select-none ${
        isLight
          ? "bg-white text-zinc-900 border-b border-zinc-200/60"
          : isDarkApp
          ? "bg-[#121214] text-zinc-100 border-b border-zinc-800/80"
          : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
      }`}
    >
      <div className="font-semibold text-[15px] tracking-tight font-sans">
        {currentTime.format("h:mm")}
      </div>

      <div className="flex items-center gap-2">
        <svg className="w-[17px] h-[11px]" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0.5" y="7.5" width="2.8" height="3.5" rx="0.8" />
          <rect x="4.8" y="5.2" width="2.8" height="5.8" rx="0.8" />
          <rect x="9.1" y="2.8" width="2.8" height="8.2" rx="0.8" />
          <rect x="13.4" y="0.5" width="2.8" height="10.5" rx="0.8" />
        </svg>

        <svg
          style={{ width: "17.14px", height: "12.33px" }}
          viewBox="0 0 17.14 12.33"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M0.46 3.63C2.86 1.25 5.68 0 8.57 0C11.46 0 14.28 1.25 16.68 3.63C17.06 4.01 17.06 4.63 16.68 5.01C16.3 5.39 15.68 5.39 15.3 5.01C13.25 2.97 10.87 1.9 8.57 1.9C6.27 1.9 3.89 2.97 1.84 5.01C1.46 5.39 0.84 5.39 0.46 5.01C0.08 4.63 0.08 4.01 0.46 3.63Z" />
          <path d="M3.52 6.67C4.98 5.22 6.74 4.45 8.57 4.45C10.4 4.45 12.16 5.22 13.62 6.67C14 7.05 14 7.67 13.62 8.05C13.24 8.43 12.62 8.43 12.24 8.05C11.15 6.96 9.84 6.35 8.57 6.35C7.3 6.35 5.99 6.96 4.9 8.05C4.52 8.43 3.9 8.43 3.52 8.05C3.14 7.67 3.14 7.05 3.52 6.67Z" />
          <path d="M6.92 9.94C7.41 9.45 7.97 9.2 8.57 9.2C9.17 9.2 9.73 9.45 10.22 9.94C10.6 10.32 10.6 10.94 10.22 11.32C9.77 11.77 9.21 12.33 8.57 12.33C7.93 12.33 7.37 11.77 6.92 11.32C6.54 10.94 6.54 10.32 6.92 9.94Z" />
        </svg>

        <div
          style={{ width: "27.33px", height: "13px" }}
          className="flex items-center gap-[1.3px] shrink-0"
        >
          <div
            className={`w-[24.5px] h-[13px] rounded-[4.2px] border p-[1.8px] flex items-center ${
              isLight ? "border-zinc-800" : "border-white"
            }`}
          >
            <div
              className={`h-full w-full rounded-[2.2px] ${
                isLight ? "bg-zinc-800" : "bg-white"
              }`}
            />
          </div>
          <div
            className={`w-[1.5px] h-[4.5px] rounded-r-[1.2px] ${
              isLight ? "bg-zinc-800" : "bg-white"
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default IPhoneStatusBar;
