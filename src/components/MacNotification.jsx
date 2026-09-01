import React, { useState, useEffect } from "react";

export const MacNotification = ({ notification, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!notification) return;
    setIsExiting(false);

    // Trigger slide-out animation quickly after 1.3 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1300);

    // Finish unmount after slide-out animation completes
    const closeTimer = setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 1550);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [notification, onClose]);

  if (!notification) return null;

  return (
    <div
      className={`fixed top-11 right-4 z-[999999] pointer-events-none transition-all ${
        isExiting ? "animate-notification-out" : "animate-notification-in"
      }`}
    >
      <div className="w-[320px] bg-black/65 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 shadow-2xl text-white select-none flex items-start gap-3">
        {/* App Icon */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
          <img
            src="/images/logo.svg"
            alt="mac-logo"
            className="w-4 h-4 !filter-none brightness-0 invert"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-bold text-white leading-tight">
              {notification.title || "Portfolio Demo"}
            </span>
            <span className="text-[10px] text-white/50">now</span>
          </div>
          <p className="text-[11.5px] text-white/80 leading-snug mt-0.5">
            {notification.message || "This is a simulated demo feature. Explore projects in the Dock below!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MacNotification;

