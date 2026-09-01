import React from "react";

export const LiveAppleClockIcon = ({ currentTime, onClick }) => {
  const currentHours = currentTime.hour();
  const currentMinutes = currentTime.minute();
  const currentSeconds = currentTime.second();

  const hourDeg = (currentHours % 12) * 30 + currentMinutes * 0.5;
  const minDeg = currentMinutes * 6;
  const secDeg = currentSeconds * 6;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-1.5 active:scale-90 transition-transform cursor-pointer"
    >
      <div className="w-[60px] h-[60px] rounded-[14px] bg-black shadow-lg border border-white/20 relative flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 60 60">
          {/* White Dial */}
          <circle cx="30" cy="30" r="24.5" fill="#ffffff" />

          {/* Clock Hour Numbers (Apple SF style) */}
          <g
            fill="#1c1c1e"
            fontSize="5.2"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
          >
            <text x="30" y="11.5">12</text>
            <text x="39.5" y="14">1</text>
            <text x="46" y="20.5">2</text>
            <text x="48.5" y="30">3</text>
            <text x="46" y="39.5">4</text>
            <text x="39.5" y="46">5</text>
            <text x="30" y="48.5">6</text>
            <text x="20.5" y="46">7</text>
            <text x="14" y="39.5">8</text>
            <text x="11.5" y="30">9</text>
            <text x="14" y="20.5">10</text>
            <text x="20.5" y="14">11</text>
          </g>

          {/* Hour Hand */}
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="18.5"
            stroke="#1c1c1e"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 30 30)`}
          />

          {/* Minute Hand */}
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="13"
            stroke="#1c1c1e"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${minDeg} 30 30)`}
          />

          {/* Orange Ticking Second Hand */}
          <line
            x1="30"
            y1="34"
            x2="30"
            y2="10.5"
            stroke="#ff9500"
            strokeWidth="0.9"
            strokeLinecap="round"
            transform={`rotate(${secDeg} 30 30)`}
          />

          {/* Center Pivot Pin */}
          <circle cx="30" cy="30" r="1.5" fill="#ff9500" />
          <circle cx="30" cy="30" r="0.6" fill="#1c1c1e" />
        </svg>
      </div>
      <span className="text-[11.5px] font-medium text-white drop-shadow-md">Clock</span>
    </button>
  );
};

export default LiveAppleClockIcon;
