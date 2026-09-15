import React from "react";
import { ChevronLeft, Search, Mic, Mail, ExternalLink } from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";
import { filesProjectsData } from "../data/mobileAppsData.js";
import { resumeData } from "../data/resumeData.js";

export const IPhoneFilesApp = ({
  currentTime,
  isOpen,
  onClose,
  filesFolder,
  setFilesFolder,
  filesTab,
  setFilesTab,
  filesSearch,
  setFilesSearch,
  filePreview,
  setFilePreview,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  const currentProject = filesProjectsData.find((p) => p.folderName === filesFolder);

  const filteredProjects = filesProjectsData.filter((p) =>
    p.name.toLowerCase().includes(filesSearch.toLowerCase()) ||
    p.folderName.toLowerCase().includes(filesSearch.toLowerCase())
  );

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
          onClick={() => {
            if (filesFolder) setFilesFolder(null);
            else onClose();
          }}
          className="flex items-center gap-0.5 text-[#007aff] font-normal text-[16px] active:opacity-70 cursor-pointer"
        >
          <ChevronLeft size={22} className="stroke-[2.2] -ml-1 text-[#007aff]" />
          <span>Go back</span>
        </button>

        <span
          className={`font-semibold text-[17px] tracking-tight max-w-[170px] truncate ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {filesTab === "about" ? "About Me" : filesFolder ? filesFolder : "Work"}
        </span>

        <button
          type="button"
          onClick={() => {
            if (filesFolder) setFilesFolder(null);
            else onClose();
          }}
          className="flex items-center gap-1.5 text-[#007aff] font-normal text-[16px] active:opacity-70 cursor-pointer"
        >
          <svg
            className="w-[18px] h-[18px] stroke-[#007aff]"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="3.5" cy="6" r="1" fill="#007aff" />
            <circle cx="3.5" cy="12" r="1" fill="#007aff" />
            <circle cx="3.5" cy="18" r="1" fill="#007aff" />
          </svg>
          <span>Cancel</span>
        </button>
      </div>

      {filesTab === "work" && (
        <div
          className={`px-4 pt-2.5 pb-2 shrink-0 ${
            isDarkMode ? "bg-black" : "bg-[#f2f2f7]"
          }`}
        >
          <div
            className={`flex items-center justify-between rounded-[10px] px-3 py-2 ${
              isDarkMode
                ? "bg-[#1c1c1e] border border-zinc-800 text-zinc-100"
                : "bg-[#e3e3e8] text-[#8e8e93]"
            }`}
          >
            <div className="flex items-center gap-2 flex-1">
              <Search size={18} className="text-[#8e8e93] stroke-[2] shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={filesSearch}
                onChange={(e) => setFilesSearch(e.target.value)}
                className={`bg-transparent border-none outline-none text-[15.5px] w-full font-normal ${
                  isDarkMode
                    ? "text-zinc-100 placeholder:text-zinc-500"
                    : "text-zinc-900 placeholder:text-[#8e8e93]"
                }`}
              />
            </div>
            <Mic
              size={18}
              className="text-[#8e8e93] stroke-[2] shrink-0 cursor-pointer active:opacity-60"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-6">
        {filesTab === "work" ? (
          !filesFolder ? (
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {filteredProjects.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setFilesFolder(proj.folderName)}
                  className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
                >
                  <img
                    src="/images/folder.png"
                    alt={proj.name}
                    className="w-16 h-16 object-contain drop-shadow-sm"
                  />
                  <span
                    className={`text-[12px] font-medium text-center leading-tight whitespace-pre-line ${
                      isDarkMode ? "text-zinc-200" : "text-zinc-800"
                    }`}
                  >
                    {proj.displayTitle}
                  </span>
                </button>
              ))}

              <a
                href="/Resume.pdf"
                download="Pratham_Tiwari_Resume.pdf"
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
              >
                <img
                  src="/images/pdf.png"
                  alt="Resume.pdf"
                  className="w-16 h-16 object-contain drop-shadow-sm"
                />
                <span
                  className={`text-[12px] font-medium text-center leading-tight ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  Resume.pdf
                </span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              <button
                type="button"
                onClick={() =>
                  setFilePreview({
                    title: "Case Study Breakdown",
                    type: "text",
                    content: currentProject?.caseStudy || "Case study content",
                  })
                }
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
              >
                <img
                  src="/images/folder.png"
                  alt="Full case study"
                  className="w-16 h-16 object-contain drop-shadow-sm"
                />
                <span
                  className={`text-[12px] font-medium text-center leading-tight ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  Full case study
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilePreview({
                    title: `${filesFolder} — Screenshot`,
                    type: "image",
                    img: currentProject?.screenshotImg || "/images/pratham.jpg",
                  })
                }
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
              >
                <div
                  className={`w-16 h-16 rounded-xl border p-1 flex items-center justify-center overflow-hidden ${
                    isDarkMode
                      ? "bg-zinc-900 border-zinc-700 shadow-none"
                      : "bg-white border-zinc-300 shadow-sm"
                  }`}
                >
                  <img
                    src={currentProject?.screenshotImg || "/images/pratham.jpg"}
                    alt="Screenshot preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span
                  className={`text-[12px] font-medium text-center leading-tight ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  Screenshot.fig
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://www.figma.com/@pratham",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
              >
                <img
                  src="/images/figma.png"
                  alt="Design.fig"
                  className="w-16 h-16 object-contain drop-shadow-sm"
                />
                <span
                  className={`text-[12px] font-medium text-center leading-tight ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  Design.fig
                </span>
              </button>

              <a
                href={currentProject?.liveUrl || "https://pratham-tiwari.dev"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
              >
                <img
                  src="/images/safari.png"
                  alt="Live URL"
                  className="w-16 h-16 object-contain drop-shadow-sm"
                />
                <span
                  className={`text-[12px] font-medium text-center leading-tight truncate max-w-[90px] ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  {currentProject?.domain || "preview.app"}
                </span>
              </a>

              <button
                type="button"
                onClick={() =>
                  setFilePreview({
                    title: "TLDR.txt",
                    type: "text",
                    content: currentProject?.tldr || "TLDR notes",
                  })
                }
                className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
              >
                <img
                  src="/images/txt.png"
                  alt="TLDR.txt"
                  className="w-16 h-16 object-contain drop-shadow-sm"
                />
                <span
                  className={`text-[12px] font-medium text-center leading-tight ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  TLDR.txt
                </span>
              </button>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-2xl p-5 border flex items-center gap-4 ${
                isDarkMode
                  ? "bg-[#1c1c1e] border-zinc-800 shadow-none text-zinc-100"
                  : "bg-white border-zinc-200 shadow-sm text-zinc-900"
              }`}
            >
              <img
                src="/images/pratham.jpg"
                alt="Pratham"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#007aff]"
              />
              <div>
                <h3
                  className={`font-bold text-base ${
                    isDarkMode ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  {resumeData.personalInfo.name}
                </h3>
                <p className="text-xs text-[#007aff] font-medium">
                  {resumeData.personalInfo.title}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {resumeData.personalInfo.location}
                </p>
              </div>
            </div>

            <div
              className={`rounded-2xl p-4 border space-y-2 ${
                isDarkMode
                  ? "bg-[#1c1c1e] border-zinc-800 shadow-none"
                  : "bg-white border-zinc-200 shadow-sm"
              }`}
            >
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Core Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React.js",
                  "JavaScript",
                  "TypeScript",
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Tailwind CSS",
                  "GSAP",
                  "Docker",
                ].map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      isDarkMode
                        ? "bg-zinc-800 text-zinc-200"
                        : "bg-zinc-100 text-zinc-800"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`rounded-2xl p-4 border space-y-2 ${
                isDarkMode
                  ? "bg-[#1c1c1e] border-zinc-800 shadow-none"
                  : "bg-white border-zinc-200 shadow-sm"
              }`}
            >
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${resumeData.personalInfo.email}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`mailto:${resumeData.personalInfo.email}`, "_blank");
                  }}
                  className="p-3 bg-[#007aff] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform select-none"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
                <a
                  href={resumeData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(resumeData.personalInfo.linkedin, "_blank", "noopener,noreferrer");
                  }}
                  className="p-3 bg-[#0077b5] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform select-none"
                >
                  <ExternalLink size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {filePreview && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`rounded-2xl max-w-sm w-full p-5 shadow-2xl border space-y-4 animate-in fade-in zoom-in-95 duration-150 ${
              isDarkMode
                ? "bg-[#1c1c1e] text-zinc-100 border-zinc-800"
                : "bg-white text-zinc-900 border-zinc-200"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-3 ${
                isDarkMode ? "border-zinc-800" : "border-zinc-200"
              }`}
            >
              <h3 className="font-bold text-sm truncate">
                {filePreview.title}
              </h3>
              <button
                type="button"
                onClick={() => setFilePreview(null)}
                className="text-zinc-400 hover:text-zinc-200 text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {filePreview.type === "image" ? (
              <div className="rounded-xl overflow-hidden bg-black max-h-72">
                <img
                  src={filePreview.img}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <pre
                className={`text-xs whitespace-pre-wrap font-sans p-3 rounded-xl border leading-relaxed max-h-60 overflow-y-auto ${
                  isDarkMode
                    ? "bg-zinc-900 text-zinc-300 border-zinc-800"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200"
                }`}
              >
                {filePreview.content}
              </pre>
            )}

            <button
              type="button"
              onClick={() => setFilePreview(null)}
              className="w-full py-2 bg-[#007aff] text-white rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div
        className={`shrink-0 relative z-20 backdrop-blur-xl border-t pt-2 pb-4 px-12 flex flex-col items-center ${
          isDarkMode
            ? "bg-[#121214]/95 border-zinc-800 text-zinc-100"
            : "bg-white/95 border-zinc-200 text-zinc-900"
        }`}
      >
        <div className="w-full flex items-center justify-around">
          <button
            type="button"
            onClick={() => {
              setFilesTab("work");
              setFilesFolder(null);
            }}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              filesTab === "work"
                ? isDarkMode
                  ? "text-blue-400"
                  : "text-zinc-900 font-semibold"
                : "text-[#8e8e93]"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z" />
            </svg>
            <span className="text-[10.5px] font-medium tracking-tight">Work</span>
          </button>

          <button
            type="button"
            onClick={() => setFilesTab("about")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              filesTab === "about"
                ? isDarkMode
                  ? "text-blue-400"
                  : "text-zinc-900 font-semibold"
                : "text-[#8e8e93]"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path
                d="M12 7v5l3.5 0"
                stroke={isDarkMode ? "#121214" : "white"}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-[10.5px] font-medium tracking-tight">About Me</span>
          </button>
        </div>

        <div
          className={`w-32 h-1 rounded-full mt-2 pointer-events-none ${
            isDarkMode ? "bg-white/30" : "bg-black/30"
          }`}
        />
      </div>
    </div>
  );
};

export default IPhoneFilesApp;
