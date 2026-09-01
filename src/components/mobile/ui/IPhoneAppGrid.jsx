import React from "react";
import LiveAppleClockIcon from "./LiveAppleClockIcon.jsx";

export const IPhoneAppGrid = ({
  currentTime,
  isPlaying,
  onAppClick,
  onNotify,
}) => {
  return (
    <main className="relative z-10 flex-1 px-6 pt-7 pb-2 flex flex-col justify-start">
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        <button
          type="button"
          onClick={() => onAppClick("notes")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/apple-icon-folder/Notes-60x60@3x 1.png"
            alt="Notes"
            className="w-[60px] h-[60px] rounded-[14px] object-cover"
          />
          <span className="text-[11.5px] font-medium text-white/95">Notes</span>
        </button>

        <button
          type="button"
          onClick={() => onAppClick("calendar")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <div className="w-[60px] h-[60px] rounded-[14px] bg-white text-black overflow-hidden flex flex-col">
            <div className="h-4 bg-white text-[#ff3b30] text-[9.5px] font-bold tracking-wider flex items-center justify-center uppercase pt-0.5">
              {currentTime.format("ddd")}
            </div>
            <div className="flex-1 flex items-center justify-center text-[26px] font-semibold text-black leading-none pb-1">
              {currentTime.format("D")}
            </div>
          </div>
          <span className="text-[11.5px] font-medium text-white/95">Calendar</span>
        </button>

        <button
          type="button"
          onClick={() => onAppClick("mail")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/apple-icon-folder/Mail-Light-60x60@3x.png"
            alt="Mail"
            className="w-[60px] h-[60px] rounded-[14px] object-cover"
          />
          <span className="text-[11.5px] font-medium text-white/95">Mail</span>
        </button>

        <LiveAppleClockIcon
          currentTime={currentTime}
          onClick={() =>
            onNotify?.(
              "Clock",
              currentTime.format("dddd, MMMM D, YYYY — h:mm:ss A")
            )
          }
        />

        <button
          type="button"
          onClick={() => onAppClick("messages")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/apple-icon-folder/_Icons.png"
            alt="Messages"
            className="w-[60px] h-[60px] rounded-[14px] object-cover"
          />
          <span className="text-[11.5px] font-medium text-white/95">Messages</span>
        </button>

        <button
          type="button"
          onClick={() => onAppClick("music")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/apple-icon-folder/_Icons (1).png"
            alt="Music"
            className="w-[60px] h-[60px] rounded-[14px] object-cover"
          />
          <span className="text-[11.5px] font-medium text-white/95">Music</span>
        </button>

        <button
          type="button"
          onClick={() => onAppClick("settings")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/apple-icon-folder/Option (2).png"
            alt="Settings"
            className="w-[60px] h-[60px] rounded-[14px] object-cover"
          />
          <span className="text-[11.5px] font-medium text-white/95">Settings</span>
        </button>

        <button
          type="button"
          onClick={() => onAppClick("facetime")}
          className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/apple-icon-folder/apple-facetime.png"
            alt="FaceTime"
            className="w-[60px] h-[60px] rounded-[14px] object-cover"
          />
          <span className="text-[11.5px] font-medium text-white/95">FaceTime</span>
        </button>
      </div>
    </main>
  );
};

export default IPhoneAppGrid;
