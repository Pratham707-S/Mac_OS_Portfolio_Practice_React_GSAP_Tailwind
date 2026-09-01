import React from "react";
import { ChevronLeft, Calendar as CalendarIcon, ExternalLink, Clock } from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";

export const IPhoneCalendarApp = ({ currentTime, isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const currentMonth = currentTime.format("MMMM YYYY");
  const todayDate = currentTime.date();
  const startDay = currentTime.startOf("month").day();
  const daysInMonth = currentTime.daysInMonth();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

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
          Calendar
        </span>

        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-16 space-y-4">
        <div
          className={`rounded-2xl p-5 border ${
            isDarkMode
              ? "bg-[#1c1c1e] border-zinc-800 shadow-none"
              : "bg-white border-zinc-200/80 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-[17px] font-bold ${
                isDarkMode ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              {currentMonth}
            </h2>
            <span className="text-[12px] font-semibold text-[#ff3b30] uppercase tracking-wider">
              {currentTime.format("dddd")}
            </span>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-zinc-400 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
              <div key={idx} className={idx === 0 || idx === 6 ? "text-zinc-400" : ""}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center text-[14px]">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-8" />;
              }
              const isToday = day === todayDate;
              return (
                <div
                  key={`day-${day}`}
                  className="h-8 flex items-center justify-center"
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-medium ${
                      isToday
                        ? "bg-[#ff3b30] text-white font-bold shadow-sm"
                        : isDarkMode
                        ? "text-zinc-200 hover:bg-zinc-800"
                        : "text-zinc-800 hover:bg-zinc-100"
                    }`}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`rounded-2xl p-5 border space-y-3 ${
            isDarkMode
              ? "bg-[#1c1c1e] border-zinc-800 shadow-none"
              : "bg-white border-zinc-200/80 shadow-sm"
          }`}
        >
          <div
            className={`flex items-center gap-2 font-bold text-[15px] ${
              isDarkMode ? "text-zinc-100" : "text-zinc-900"
            }`}
          >
            <Clock size={16} className="text-[#007aff]" />
            <span>Developer Availability</span>
          </div>

          <p
            className={`text-xs leading-relaxed ${
              isDarkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Open for frontend engineering roles, freelance opportunities, and UI/UX design collaboration.
          </p>

          <a
            href="https://cal.com/pratham-tiwari"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#007aff] hover:bg-[#006ee6] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm"
          >
            <CalendarIcon size={14} />
            <span>Schedule a Call on Cal.com</span>
            <ExternalLink size={13} />
          </a>
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

export default IPhoneCalendarApp;
