import React, { useState, useEffect } from "react";
import { User, Cloud, ShieldCheck, Settings, MapPin, CheckCircle2 } from "lucide-react";

export const NavbarUserProfilePanel = ({
  isOpen,
  username = "Pratham707-S",
  onLockScreen,
  onOpenSettings,
}) => {
  const [activeTab, setActiveTab] = useState("apple_id");
  const [profile, setProfile] = useState({
    name: "Pratham",
    login: username,
    avatar_url: "https://avatars.githubusercontent.com/u/184863460?v=4",
    bio: "Full-Stack Developer & Creative Technologist",
    location: "India",
    public_repos: 38,
    followers: 42,
  });

  useEffect(() => {
    if (username) {
      fetch(`https://api.github.com/users/${username}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && data.login) {
            setProfile({
              name: data.name || data.login,
              login: data.login,
              avatar_url: data.avatar_url || "https://avatars.githubusercontent.com/u/184863460?v=4",
              bio: data.bio || "Full-Stack Developer & Creative Technologist",
              location: data.location || "India",
              public_repos: data.public_repos || 38,
              followers: data.followers || 42,
            });
          }
        })
        .catch(() => {});
    }
  }, [username]);

  if (!isOpen) return null;

  const sidebarTabs = [
    { id: "apple_id", label: "Overview", icon: User },
    { id: "icloud", label: "iCloud+", icon: Cloud },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "session", label: "Session", icon: Settings },
  ];

  return (
    <div
      className="mac-dropdown w-[520px] min-h-[300px] flex flex-row p-0 select-none text-left font-sans"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Sidebar */}
      <div className="w-[160px] bg-white/[0.04] border-r border-white/10 p-3 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1 mb-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              Apple Account
            </span>
          </div>
          {sidebarTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[12px] font-medium flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#007aff] text-white font-semibold shadow-sm"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon size={14} className={activeTab === tab.id ? "text-white" : "text-zinc-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Badge */}
        <div className="p-2 bg-white/[0.06] rounded-xl text-left border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-white/90">Portfolio Admin</span>
          </div>
          <span className="text-[9px] text-white/40 block mt-0.5 font-mono">macOS Sonoma</span>
        </div>
      </div>

      {/* Right Content View */}
      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        {activeTab === "apple_id" && (
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex flex-col gap-3.5">
              {/* User Avatar + Header */}
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={profile.avatar_url || "/images/pratham.jpg"}
                    alt="GitHub Avatar"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/images/pratham.jpg";
                    }}
                    className="w-14 h-14 rounded-full border-2 border-zinc-200 dark:border-white/40 shadow-lg object-cover !filter-none !opacity-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#007aff] text-white rounded-full p-0.5 border border-black/50 shadow-sm" title="Verified Developer">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[15.5px] text-white leading-tight">
                    {profile.name}
                  </h4>
                  <p className="text-[11.5px] text-white/60 leading-tight mt-0.5 font-mono">
                    @{profile.login}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium bg-white/15 text-white/90 px-2 py-0.5 rounded-full border border-white/10">
                    <MapPin size={10} className="text-zinc-300" />
                    <span>{profile.location || "India"}</span>
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[12px] text-white/80 leading-relaxed font-normal bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                "{profile.bio}"
              </p>

              {/* Stat Badges */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/[0.06] border border-white/10 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[11px] text-white/60">Public Repos</span>
                  <span className="text-[12px] font-bold text-white font-mono">{profile.public_repos}</span>
                </div>
                <div className="bg-white/[0.06] border border-white/10 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-[11px] text-white/60">Followers</span>
                  <span className="text-[12px] font-bold text-white font-mono">{profile.followers}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-white/10">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#007aff] hover:bg-[#0069d9] text-white text-[11.5px] font-medium py-2 rounded-xl transition-all text-center shadow-sm"
              >
                View GitHub Profile ↗
              </a>
              <button
                type="button"
                onClick={onOpenSettings}
                className="px-3 bg-white/15 hover:bg-white/20 text-white text-[11.5px] font-medium py-2 rounded-xl transition-colors text-center border border-white/10"
              >
                Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "icloud" && (
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">iCloud+</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-1.5 py-0.5 rounded-md border border-blue-400/30">
                    200 GB Plan
                  </span>
                </div>
                <span className="text-white/60 text-[11px] font-mono">48.2 GB of 200 GB</span>
              </div>

              {/* Segmented Storage Bar */}
              <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden flex border border-white/10 shadow-inner">
                <div className="bg-[#007aff] h-full w-[28%]" title="Photos: 56 GB" />
                <div className="bg-amber-400 h-full w-[14%]" title="Documents: 28 GB" />
                <div className="bg-emerald-400 h-full w-[8%]" title="Backups: 16 GB" />
                <div className="bg-purple-400 h-full w-[4%]" title="Mail: 8 GB" />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="flex items-center gap-1.5 text-[10.5px] text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#007aff]" />
                  <span>Photos (28 GB)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Docs & Code (14 GB)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Backups (8 GB)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span>Mail & Messages</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenSettings}
              className="w-full bg-white/15 hover:bg-white/20 text-white text-[11.5px] font-medium py-2 rounded-xl transition-colors text-center border border-white/10"
            >
              Manage Storage...
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[12.5px] font-bold text-white">Sign-In & Security</span>
              <div className="bg-white/[0.06] p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-medium text-white">Two-Factor Auth</div>
                  <div className="text-[10px] text-white/50">On • Trusted Phone Number</div>
                </div>
                <span className="text-emerald-400 text-xs">✓ Enabled</span>
              </div>
              <div className="bg-white/[0.06] p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[12px] font-medium text-white">Touch ID & Passkey</div>
                  <div className="text-[10px] text-white/50">Hardware Key Active</div>
                </div>
                <span className="text-emerald-400 text-xs">✓ Active</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenSettings}
              className="w-full bg-white/15 hover:bg-white/20 text-white text-[11.5px] font-medium py-2 rounded-xl text-center border border-white/10"
            >
              Security Settings...
            </button>
          </div>
        )}

        {activeTab === "session" && (
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12.5px] font-bold text-white px-1">Session Controls</span>
              <button
                type="button"
                onClick={onLockScreen}
                className="apple-menu-item bg-white/[0.05] p-2.5 rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Lock Screen</span>
                </div>
                <span className="text-[10.5px] text-white/40 font-mono">⌃⌘Q</span>
              </button>
              <button
                type="button"
                onClick={onOpenSettings}
                className="apple-menu-item bg-white/[0.05] p-2.5 rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span>⚙️</span>
                  <span>System Settings...</span>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={onLockScreen}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11.5px] font-medium py-2 rounded-xl transition-colors text-center border border-red-500/30"
            >
              Sign Out @{profile.login}...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarUserProfilePanel;

