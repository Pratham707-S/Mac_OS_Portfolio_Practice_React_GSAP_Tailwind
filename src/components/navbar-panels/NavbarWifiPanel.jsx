import React, { useState } from "react";

export const NavbarWifiPanel = ({ isOpen, onOpenSettings, onNotify }) => {
  const [enabled, setEnabled] = useState(true);
  const [activeNet, setActiveNet] = useState("Home 5G");

  if (!isOpen) return null;

  const knownNetworks = [
    { name: "Home 5G", security: "WPA3", speed: "5 GHz" },
    { name: "iPhone 15 Pro Hotspot", security: "Personal", speed: "Personal Hotspot" },
  ];

  const otherNetworks = [
    { name: "Starbucks_Guest", security: "Open", locked: false },
    { name: "Office_Mesh_Ext", security: "WPA2", locked: true },
    { name: "AirPort_Extreme", security: "WPA3", locked: true },
  ];

  const handleNetworkSelect = (netName, isOther = false) => {
    setActiveNet(netName);
    if (isOther) {
      onNotify?.("Wi-Fi Security", `Connected to ${netName} (Simulated).`);
    } else {
      onNotify?.("Wi-Fi Connected", `Switched to ${netName}.`);
    }
  };

  const handleWifiToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    onNotify?.("Wi-Fi", nextState ? "Wi-Fi enabled and searching..." : "Wi-Fi turned Off.");
  };

  return (
    <div
      className="mac-dropdown w-[270px] p-2.5 flex flex-col gap-1.5 select-none text-left font-sans"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header Toggle */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-white/[0.08] rounded-xl border border-white/10 mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${enabled ? "bg-[#007aff] text-white" : "bg-white/15 text-white/40"}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A17.65 17.65 0 0 0 12 4zm0 3.3c3.78 0 7.22 1.5 9.76 3.96L12 18.78 2.24 11.26A14.28 14.28 0 0 1 12 7.3z" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-white">Wi-Fi</span>
        </div>
        <label className="mac-switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleWifiToggle}
          />
          <span className="mac-switch-slider" />
        </label>
      </div>

      {/* Network List */}
      {enabled ? (
        <div className="flex flex-col gap-1">
          {/* Known Networks */}
          <div className="px-2 pt-1 pb-0.5">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              Known Networks
            </span>
          </div>

          {knownNetworks.map((net) => {
            const isConnected = activeNet === net.name;
            return (
              <button
                key={net.name}
                type="button"
                onClick={() => handleNetworkSelect(net.name, false)}
                className={`apple-menu-item group ${isConnected ? "bg-white/15" : ""}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[12px] font-medium text-white truncate">
                    {net.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isConnected && (
                    <svg className="w-3.5 h-3.5 text-[#007aff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {/* Signal Icon */}
                  <svg className="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A17.65 17.65 0 0 0 12 4zm0 3.3c3.78 0 7.22 1.5 9.76 3.96L12 18.78 2.24 11.26A14.28 14.28 0 0 1 12 7.3z" />
                  </svg>
                </div>
              </button>
            );
          })}

          {/* Other Networks Section */}
          <div className="px-2 pt-2 pb-0.5 border-t border-white/10 mt-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              Other Networks
            </span>
          </div>

          {otherNetworks.map((net) => (
            <button
              key={net.name}
              type="button"
              onClick={() => handleNetworkSelect(net.name, true)}
              className="apple-menu-item text-white/85"
            >
              <span className="text-[12px] truncate">{net.name}</span>
              <div className="flex items-center gap-1.5 shrink-0 text-white/50">
                {net.locked && (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A17.65 17.65 0 0 0 12 4zm0 3.3c3.78 0 7.22 1.5 9.76 3.96L12 18.78 2.24 11.26A14.28 14.28 0 0 1 12 7.3z" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-[11.5px] text-white/40">
          Wi-Fi is turned off
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-white/10 pt-1.5 mt-0.5">
        <button
          type="button"
          onClick={onOpenSettings}
          className="apple-menu-item text-white/80 font-medium text-[12px]"
        >
          <span>Wi-Fi Settings...</span>
          <span className="text-white/40 text-xs">⚙️</span>
        </button>
      </div>
    </div>
  );
};

export default NavbarWifiPanel;

