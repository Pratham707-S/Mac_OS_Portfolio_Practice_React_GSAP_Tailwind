import React, { useState } from "react";

export const NavbarBluetoothPanel = ({
  isOpen,
  bluetoothEnabled,
  onToggleBluetooth,
  onOpenSettings,
}) => {
  const [devices, setDevices] = useState({
    airpods: { name: "AirPods Pro", icon: "🎧", connected: true },
    keyboard: { name: "Magic Keyboard", icon: "⌨️", connected: false },
    mouse: { name: "Magic Mouse", icon: "🖱️", connected: true },
    sony: { name: "Sony WH-1000XM5", icon: "🎧", connected: false },
  });
  const [connectingKey, setConnectingKey] = useState(null);

  if (!isOpen) return null;

  const handleDeviceToggle = (key) => {
    if (connectingKey) return;
    setConnectingKey(key);
    setTimeout(() => {
      setDevices((prev) => ({
        ...prev,
        [key]: { ...prev[key], connected: !prev[key].connected },
      }));
      setConnectingKey(null);
    }, 900);
  };

  return (
    <div
      className="mac-dropdown w-[270px] p-2 flex flex-col gap-1 select-none text-left"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-white/10 pb-2">
        <span className="text-[12.5px] font-semibold">Bluetooth</span>
        <input
          type="checkbox"
          checked={bluetoothEnabled}
          onChange={onToggleBluetooth}
          className="accent-[#007aff] cursor-pointer w-4 h-4"
        />
      </div>

      {/* Devices List */}
      {bluetoothEnabled ? (
        <div className="flex flex-col gap-0.5 py-1">
          <span className="text-[10px] font-bold text-white/40 px-2 uppercase tracking-wider">
            Devices
          </span>
          {Object.entries(devices).map(([key, device]) => {
            const isConnecting = connectingKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleDeviceToggle(key)}
                className="apple-menu-item"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{device.icon}</span>
                  <span className={`text-[12px] ${device.connected ? "font-semibold text-white" : "text-white/80"}`}>
                    {device.name}
                  </span>
                </div>
                <div className="text-[11px] text-white/50">
                  {isConnecting ? (
                    <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : device.connected ? (
                    <span className="text-white/90 font-medium">Connected</span>
                  ) : (
                    <span>Not Connected</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="py-4 text-center text-[11px] text-white/40">
          Bluetooth is Disabled
        </div>
      )}

      {/* Footer / Settings Link */}
      <div className="border-t border-white/10 pt-1">
        <button
          type="button"
          onClick={onOpenSettings}
          className="apple-menu-item text-white/80"
        >
          Bluetooth Settings...
        </button>
      </div>
    </div>
  );
};

export default NavbarBluetoothPanel;
