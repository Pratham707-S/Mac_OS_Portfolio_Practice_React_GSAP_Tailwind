import React from "react";
import { Search } from "lucide-react";

export const IPhoneDock = ({ onAppClick, onOpenSearch }) => {
  return (
    <footer className="relative z-10 w-full flex flex-col items-center gap-4 pb-3">
      <button
        type="button"
        onClick={onOpenSearch}
        className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium active:scale-95 transition-all cursor-pointer"
      >
        <Search size={11} className="text-white/80" />
        <span>Search</span>
      </button>

      <div className="w-[calc(100%-32px)] max-w-sm bg-white/15 backdrop-blur-xl border border-white/10 rounded-[30px] p-2.5 flex items-center justify-around">
        <button
          type="button"
          onClick={() => onAppClick("finder")}
          className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/images/finder.png"
            alt="Finder"
            className="w-[56px] h-[56px] object-contain"
          />
        </button>

        <button
          type="button"
          onClick={() => onAppClick("safari")}
          className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/images/safari.png"
            alt="Safari"
            className="w-[56px] h-[56px] object-contain"
          />
        </button>

        <button
          type="button"
          onClick={() => onAppClick("photos")}
          className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/images/photos.png"
            alt="Photos"
            className="w-[56px] h-[56px] object-contain"
          />
        </button>

        <button
          type="button"
          onClick={() => onAppClick("contact")}
          className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
        >
          <img
            src="/images/contact.png"
            alt="Contacts"
            className="w-[56px] h-[56px] object-contain"
          />
        </button>
      </div>

      <div className="w-32 h-1 bg-white/50 rounded-full mt-1 pointer-events-none" />
    </footer>
  );
};

export default IPhoneDock;
