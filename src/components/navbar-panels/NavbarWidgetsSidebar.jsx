import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import dayjs from "dayjs";

export const NavbarWidgetsSidebar = ({ isOpen, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const sidebarRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        // Check if the click was on the clock button
        const isClockClick = e.target.closest("button[title*='Widgets']");
        if (!isClockClick) {
          onClose();
        }
      }
    };
    // Use timeout so the trigger click doesn't instantly close it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Clock hand calculations
  const getClockRotation = (offsetHours = 0) => {
    const d = new Date(currentTime.getTime() + offsetHours * 3600000);
    const hours = d.getUTCHours();
    const minutes = d.getUTCMinutes();
    const seconds = d.getUTCSeconds();

    return {
      hourDeg: (hours % 12) * 30 + minutes * 0.5,
      minuteDeg: minutes * 6 + seconds * 0.1,
      secondDeg: seconds * 6,
    };
  };

  const cities = [
    { name: "Cupertino", offset: -7, label: "Today, -12:30" },
    { name: "Tokyo", offset: 9, label: "Today, +3:30" },
    { name: "Sydney", offset: 10, label: "Today, +4:30" },
    { name: "Paris", offset: 2, label: "Today, -3:30" },
  ];

  return createPortal(
    <div
      ref={sidebarRef}
      className="fixed top-10 right-3.5 z-[999999] w-[350px] max-h-[calc(100vh-60px)] h-fit bg-[#181a20]/80 backdrop-blur-3xl border border-white/20 rounded-3xl p-3.5 shadow-2xl text-white select-none overflow-y-auto flex flex-col gap-3 font-sans animate-sidebar-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* --- TOP NOTIFICATION BANNER --- */}
      <div className="bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 transition-colors shadow-sm cursor-pointer">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-white leading-tight">Weekly Report Available</span>
              <span className="text-[10px] text-white/50">Yesterday, 9:24 AM</span>
            </div>
            <p className="text-[11.5px] text-white/80 leading-snug mt-1">
              Last week your coding screen time was 38h, with React & GSAP averaging 5.5 hours a day.
            </p>
          </div>
        </div>
      </div>

      {/* --- 2-COLUMN WIDGETS: Calendar & Weather --- */}
      <div className="grid grid-cols-2 gap-3">
        {/* Calendar Widget */}
        <div className="bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex flex-col justify-between transition-colors shadow-sm h-[145px]">
          <div>
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
              {dayjs().format("dddd")}
            </span>
            <span className="text-[34px] font-semibold text-white leading-none block mt-0.5 font-sans">
              {dayjs().format("D")}
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-300">Portfolio Live</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-[10px] font-medium text-purple-300">React & GSAP</span>
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="bg-gradient-to-br from-[#1e3c72]/60 to-[#2a5298]/60 border border-white/10 rounded-2xl p-3 flex flex-col justify-between shadow-sm h-[145px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-white">Cupertino</span>
              <span className="text-sm">🌙</span>
            </div>
            <span className="text-[34px] font-light text-white leading-none block mt-1 font-sans">
              18°
            </span>
          </div>
          <div>
            <span className="text-[11.5px] font-medium text-white/90 block">Clear</span>
            <span className="text-[10px] text-white/60 block mt-0.5">H:26° L:12°</span>
          </div>
        </div>
      </div>

      {/* --- WORLD CLOCKS WIDGET --- */}
      <div className="bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 transition-colors shadow-sm">
        <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2 px-0.5">
          World Clock
        </span>
        <div className="grid grid-cols-4 gap-2">
          {cities.map((city) => {
            const rot = getClockRotation(city.offset);
            return (
              <div key={city.name} className="flex flex-col items-center text-center">
                {/* Clock Face */}
                <div className="w-12 h-12 rounded-full bg-white/90 border border-black/20 relative flex items-center justify-center shadow-inner">
                  {/* Hour Hand */}
                  <div
                    className="absolute w-[2px] h-[13px] bg-black origin-bottom rounded-full"
                    style={{
                      transform: `rotate(${rot.hourDeg}deg)`,
                      bottom: "50%",
                    }}
                  />
                  {/* Minute Hand */}
                  <div
                    className="absolute w-[1.5px] h-[18px] bg-black/80 origin-bottom rounded-full"
                    style={{
                      transform: `rotate(${rot.minuteDeg}deg)`,
                      bottom: "50%",
                    }}
                  />
                  {/* Second Hand */}
                  <div
                    className="absolute w-[1px] h-[20px] bg-orange-500 origin-bottom rounded-full"
                    style={{
                      transform: `rotate(${rot.secondDeg}deg)`,
                      bottom: "50%",
                    }}
                  />
                  {/* Center Dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 z-10" />
                </div>
                <span className="text-[11px] font-semibold text-white mt-1.5 truncate max-w-[70px]">
                  {city.name}
                </span>
                <span className="text-[9px] text-white/50">{city.label.split(",")[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- STOCKS / TECH TICKER WIDGET --- */}
      <div className="bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 transition-colors shadow-sm">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
            Tech Market & Stocks
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">Market Open</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { symbol: "AAPL", price: "232.40", change: "+1.85%", up: true },
            { symbol: "REACT", price: "192.80", change: "+4.20%", up: true },
            { symbol: "GSAP", price: "135.50", change: "+8.92%", up: true },
          ].map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between py-1 border-b border-white/5 last:border-none">
              <span className="text-[12px] font-bold text-white font-mono">{stock.symbol}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-white/90 font-mono">${stock.price}</span>
                <span className="text-[10.5px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md border border-emerald-400/30 font-mono">
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-white/10 text-[10.5px] text-white/60 leading-tight">
          <strong>Tech News</strong>: Developer portfolios built with React & GSAP see 98% higher engagement.
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NavbarWidgetsSidebar;
