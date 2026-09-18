import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  Terminal,
  Download,
  ExternalLink,
  Mail,
  Calendar,
  Share2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Languages,
  Trash2,
  Copy,
  Send,
  Loader2,
} from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";
import { notesData } from "../data/notesData.js";
import { techStackList } from "../data/techStackData.js";
import { resumeData } from "../data/resumeData.js";
import { sendPortfolioEmail } from "../../../utils/emailService.js";

export const IPhoneNotesApp = ({ currentTime, isOpen, onClose, isDarkMode }) => {
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToolToast, setActiveToolToast] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);

  // use this for local storage note persistence
  const [customNoteTitle, setCustomNoteTitle] = useState(() => {
    return localStorage.getItem("pratham_user_note_title") || "My Notes & Feedback";
  });
  const [customNoteBody, setCustomNoteBody] = useState(() => {
    return (
      localStorage.getItem("pratham_user_note_body") ||
      "Hey Pratham,\n\nI checked out your portfolio and loved the clean macOS & iOS interface! Let's connect for an opportunity or collaboration."
    );
  });

  // use this for drag-to-scroll on desktop simulator
  const listScrollRef = useRef(null);
  const isDraggingListRef = useRef(false);
  const startYRef = useRef(0);
  const scrollTopRef = useRef(0);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    localStorage.setItem("pratham_user_note_title", customNoteTitle);
  }, [customNoteTitle]);

  useEffect(() => {
    localStorage.setItem("pratham_user_note_body", customNoteBody);
  }, [customNoteBody]);

  if (!isOpen) return null;

  const showToast = (message) => {
    setActiveToolToast(message);
    setTimeout(() => setActiveToolToast(null), 2200);
  };

  const handleCopyNote = () => {
    const textToCopy = `${customNoteTitle}\n\n${customNoteBody}`;
    navigator.clipboard.writeText(textToCopy);
    showToast("Copied to clipboard!");
  };

  const handleClearNote = () => {
    setCustomNoteBody("");
    showToast("Note cleared");
  };

  const handleSendEmailJS = async (e) => {
    if (e) e.preventDefault();
    if (!customNoteBody.trim()) {
      showToast("Please write a message first");
      return;
    }

    setIsSendingEmail(true);
    try {
      const res = await sendPortfolioEmail({
        from_name: senderName || "Portfolio Visitor",
        from_email: senderEmail || "",
        subject: customNoteTitle || "Note from Portfolio",
        message: customNoteBody,
      });

      if (res.success) {
        showToast(res.message);
        setShowEmailModal(false);
      } else {
        showToast(res.message || "Sent via mail client");
      }
    } catch (err) {
      showToast("Error sending note");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const filteredNotes = notesData.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMouseDownList = (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    isDraggingListRef.current = true;
    hasMovedRef.current = false;
    startYRef.current = e.pageY;
    scrollTopRef.current = listScrollRef.current ? listScrollRef.current.scrollTop : 0;
  };

  const handleMouseMoveList = (e) => {
    if (!isDraggingListRef.current || !listScrollRef.current) return;
    const deltaY = e.pageY - startYRef.current;
    if (Math.abs(deltaY) > 5) {
      hasMovedRef.current = true;
    }
    listScrollRef.current.scrollTop = scrollTopRef.current - deltaY;
  };

  const handleMouseUpList = () => {
    isDraggingListRef.current = false;
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom duration-200 select-none overflow-hidden ${
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
            if (selectedNoteId) setSelectedNoteId(null);
            else onClose();
          }}
          className="flex items-center gap-0.5 text-[#e5a00d] font-normal text-[16px] active:opacity-70 cursor-pointer"
        >
          <ChevronLeft size={22} className="stroke-[2.2] -ml-1 text-[#e5a00d]" />
          <span>{selectedNoteId ? "Notes" : "Go back"}</span>
        </button>

        <span
          className={`font-semibold text-[17px] tracking-tight max-w-[170px] truncate ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {selectedNoteId
            ? selectedNoteId === "scratchpad"
              ? "Blank Note"
              : notesData.find((n) => n.id === selectedNoteId)?.title || "Note"
            : "Notes"}
        </span>

        {selectedNoteId ? (
          <button
            type="button"
            onClick={() => {
              if (selectedNoteId === "scratchpad") {
                handleCopyNote();
              } else if (navigator.share) {
                navigator.share({
                  title: "Pratham Tiwari Notes",
                  url: window.location.href,
                });
              } else {
                showToast("Note link copied to clipboard");
              }
            }}
            className="text-[#e5a00d] active:opacity-70 cursor-pointer"
          >
            {selectedNoteId === "scratchpad" ? <Copy size={18} /> : <Share2 size={18} />}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSelectedNoteId("scratchpad")}
            className="text-[#e5a00d] text-sm font-semibold active:opacity-70 cursor-pointer"
          >
            + New
          </button>
        )}
      </div>

      {activeToolToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-black/85 text-white text-[12px] font-medium px-4 py-1.5 rounded-full shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 pointer-events-none max-w-[90%] text-center">
          {activeToolToast}
        </div>
      )}

      {!selectedNoteId && (
        <div
          ref={listScrollRef}
          onMouseDown={handleMouseDownList}
          onMouseMove={handleMouseMoveList}
          onMouseUp={handleMouseUpList}
          onMouseLeave={handleMouseUpList}
          className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3.5 pb-28 flex flex-col cursor-default"
        >
          <div
            className={`rounded-[10px] px-3 py-2 flex items-center gap-2 mb-4 shrink-0 ${
              isDarkMode
                ? "bg-[#1c1c1e] border border-zinc-800 text-zinc-100"
                : "bg-[#e3e3e8] text-zinc-900"
            }`}
          >
            <Search size={16} className="text-[#8e8e93] shrink-0 stroke-[2]" />
            <input
              type="text"
              placeholder="Search notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent border-none outline-none text-[14.5px] w-full font-normal ${
                isDarkMode
                  ? "text-zinc-100 placeholder:text-zinc-500"
                  : "text-zinc-900 placeholder:text-[#8e8e93]"
              }`}
            />
          </div>

          <div className="text-[12px] font-bold text-[#8e8e93] uppercase tracking-wider px-1 mb-2 shrink-0">
            All iCloud
          </div>

          <div
            className={`rounded-2xl border overflow-hidden divide-y shrink-0 ${
              isDarkMode
                ? "bg-[#1c1c1e] border-zinc-800 divide-zinc-800/80 shadow-none"
                : "bg-white border-zinc-200/90 divide-zinc-100 shadow-sm"
            }`}
          >
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => {
                  if (hasMovedRef.current) return;
                  setSelectedNoteId(note.id);
                }}
                className={`w-full p-3.5 text-left cursor-pointer transition-colors flex items-center justify-between group ${
                  isDarkMode
                    ? note.id === "scratchpad"
                      ? "bg-amber-950/20 hover:bg-amber-950/30 active:bg-amber-950/40"
                      : "hover:bg-zinc-800/50 active:bg-zinc-800"
                    : note.id === "scratchpad"
                    ? "bg-amber-50/40 hover:bg-amber-50/60 active:bg-amber-100/60"
                    : "hover:bg-zinc-50 active:bg-zinc-100"
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-bold text-[15px] truncate ${
                        isDarkMode ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {note.id === "scratchpad" ? (customNoteTitle || "Blank Note") : note.title}
                    </h3>
                  </div>
                  <div
                    className={`flex items-center gap-2 mt-0.5 text-[12.5px] truncate ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    <span
                      className={`font-medium shrink-0 ${
                        isDarkMode ? "text-zinc-300" : "text-zinc-800"
                      }`}
                    >
                      {note.date}
                    </span>
                    <span className="truncate">
                      {note.id === "scratchpad"
                        ? customNoteBody || "Click here to type your notes..."
                        : note.preview}
                    </span>
                  </div>
                </div>
                <ChevronRight size={17} className="text-zinc-400 shrink-0" />
              </button>
            ))}
          </div>

          <div className="py-6 text-center text-[12px] text-zinc-400 shrink-0">
            {filteredNotes.length} {filteredNotes.length === 1 ? "Note" : "Notes"}
          </div>
        </div>
      )}

      {selectedNoteId && (
        <div
          className={`flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-16 flex flex-col ${
            isDarkMode ? "bg-black text-zinc-100" : "bg-white text-zinc-800"
          }`}
        >
          {selectedNoteId === "scratchpad" && (
            <div className="flex-1 flex flex-col space-y-3">
              <div className="text-center text-[11.5px] text-zinc-400 font-medium pb-1">
                {currentTime.format("MMMM D, YYYY [at] h:mm A")}
              </div>

              <input
                type="text"
                value={customNoteTitle}
                onChange={(e) => setCustomNoteTitle(e.target.value)}
                placeholder="Note Title..."
                className={`w-full text-[20px] font-bold border-none outline-none bg-transparent ${
                  isDarkMode
                    ? "text-white placeholder:text-zinc-600"
                    : "text-zinc-900 placeholder:text-zinc-300"
                }`}
              />

              <textarea
                value={customNoteBody}
                onChange={(e) => setCustomNoteBody(e.target.value)}
                placeholder="Start typing your note, ideas, questions, or feedback for Pratham here..."
                className={`flex-1 min-h-[260px] w-full text-[15px] border-none outline-none bg-transparent resize-none leading-relaxed font-sans ${
                  isDarkMode
                    ? "text-zinc-200 placeholder:text-zinc-600"
                    : "text-zinc-800 placeholder:text-zinc-300"
                }`}
              />

              <div
                className={`pt-3 border-t flex items-center justify-between text-xs ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-100"
                }`}
              >
                <span className="text-zinc-400 text-[11px]">
                  {customNoteBody.length} chars • Auto-saved
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClearNote}
                    className={`px-2.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 font-medium cursor-pointer ${
                      isDarkMode
                        ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    <Trash2 size={12} />
                    <span>Clear</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEmailModal(true)}
                    disabled={isSendingEmail}
                    className="px-3 py-1.5 rounded-lg bg-[#e5a00d] text-white hover:bg-[#d4940c] active:scale-95 transition-all flex items-center gap-1.5 font-medium cursor-pointer shadow-sm disabled:opacity-70"
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Send to Pratham</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedNoteId === "techstack" && (
            <div className="space-y-4">
              <div
                className={`flex items-center gap-2 pb-2 border-b ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <Terminal
                  size={18}
                  className={isDarkMode ? "text-zinc-200" : "text-zinc-800"}
                />
                <h2
                  className={`text-[18px] font-bold ${
                    isDarkMode ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  Techstack &amp; Skills
                </h2>
              </div>

              <div
                className={`grid grid-cols-12 text-[12px] font-bold pb-2 border-b uppercase tracking-wider ${
                  isDarkMode
                    ? "text-zinc-400 border-zinc-800"
                    : "text-zinc-500 border-zinc-200"
                }`}
              >
                <div className="col-span-5">Category</div>
                <div className="col-span-7">Technologies</div>
              </div>

              <div
                className={`divide-y ${
                  isDarkMode ? "divide-zinc-800/80" : "divide-zinc-100"
                }`}
              >
                {techStackList.map((item) => (
                  <div
                    key={item.category}
                    className="grid grid-cols-12 py-3 items-start text-[13px]"
                  >
                    <div
                      className={`col-span-5 flex items-center gap-1.5 font-semibold ${
                        isDarkMode ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      <Check size={14} className="text-emerald-500 stroke-[3] shrink-0" />
                      <span className="text-[12.5px]">{item.category}</span>
                    </div>
                    <div
                      className={`col-span-7 font-normal leading-relaxed text-[12px] ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {item.technologies}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-5 p-4 rounded-xl border font-mono text-[12px] space-y-1 ${
                  isDarkMode
                    ? "bg-[#1c1c1e] border-zinc-800 text-zinc-300"
                    : "bg-zinc-50 border-zinc-200/80 text-zinc-700"
                }`}
              >
                <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                  <Check size={14} className="stroke-[3]" />
                  <span>{techStackList.length} of {techStackList.length} skill stacks verified</span>
                </div>
                <div
                  className={`flex items-center gap-2 pl-5 text-[11.5px] ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <span>Languages: {resumeData.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          )}

          {selectedNoteId === "resume" && (
            <div
              className={`space-y-4 ${
                isDarkMode ? "text-zinc-200" : "text-zinc-800"
              }`}
            >
              <div
                className={`flex items-center justify-between pb-3 border-b ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <div>
                  <h2
                    className={`text-[20px] font-black tracking-tight ${
                      isDarkMode ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {resumeData.personalInfo.name}
                  </h2>
                  <p className="text-xs text-[#e5a00d] font-bold mt-0.5">
                    {resumeData.personalInfo.title}
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {resumeData.personalInfo.email} • {resumeData.personalInfo.phone} • {resumeData.personalInfo.location}
                  </p>
                </div>
                <a
                  href="/Resume.pdf"
                  download="Pratham_Tiwari_Resume.pdf"
                  className="px-3 py-1.5 bg-[#e5a00d] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm shrink-0 active:scale-95 transition-transform"
                >
                  <Download size={12} />
                  <span>PDF</span>
                </a>
              </div>

              <div className="space-y-1 text-[13px]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#e5a00d]">
                  Summary
                </h4>
                <p
                  className={`leading-relaxed text-[12px] ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {resumeData.personalInfo.summary}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#e5a00d]">
                  <Briefcase size={14} />
                  <span>Professional Experience</span>
                </div>

                {resumeData.experience.map((job) => (
                  <div
                    key={job.company + job.title}
                    className={`p-3 rounded-xl border space-y-1 text-[12px] ${
                      isDarkMode
                        ? "bg-[#1c1c1e] border-zinc-800"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p
                        className={`font-bold ${
                          isDarkMode ? "text-zinc-100" : "text-zinc-900"
                        }`}
                      >
                        {job.title}
                      </p>
                      <span
                        className={`text-[11px] font-medium ${
                          isDarkMode ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {job.period}
                      </span>
                    </div>
                    <p className="text-[#e5a00d] text-xs font-medium">
                      {job.company} • {job.location}
                    </p>
                    <ul
                      className={`list-disc list-inside space-y-0.5 text-[11.5px] pt-1 leading-relaxed ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {job.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#e5a00d]">
                  <FolderGit2 size={14} />
                  <span>Projects</span>
                </div>

                <div className="space-y-2 text-[12px]">
                  {resumeData.projects.map((proj) => (
                    <div
                      key={proj.title}
                      className={`p-3 rounded-xl border space-y-1 ${
                        isDarkMode
                          ? "bg-[#1c1c1e] border-zinc-800"
                          : "bg-zinc-50 border-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p
                          className={`font-bold ${
                            isDarkMode ? "text-zinc-100" : "text-zinc-900"
                          }`}
                        >
                          {proj.title}
                        </p>
                        {proj.demoUrl ? (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#e5a00d] font-semibold hover:underline flex items-center gap-0.5"
                          >
                            <span>{proj.badge}</span>
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span className="text-[11px] text-[#e5a00d] font-medium">
                            {proj.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[11px] ${
                          isDarkMode ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {proj.stack}
                      </p>
                      <p
                        className={`text-[11.5px] leading-relaxed ${
                          isDarkMode ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#e5a00d]">
                  <GraduationCap size={14} />
                  <span>Education</span>
                </div>

                <div className="space-y-1.5 text-[12px]">
                  {resumeData.education.map((edu) => (
                    <div
                      key={edu.degree}
                      className={`p-2.5 rounded-xl border ${
                        isDarkMode
                          ? "bg-[#1c1c1e] border-zinc-800"
                          : "bg-zinc-50 border-zinc-200"
                      }`}
                    >
                      <p
                        className={`font-bold ${
                          isDarkMode ? "text-zinc-100" : "text-zinc-900"
                        }`}
                      >
                        {edu.degree}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {edu.institution} • {edu.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#e5a00d]">
                  <Languages size={14} />
                  <span>Languages</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.languages.map((lang) => (
                    <span
                      key={lang}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-zinc-800 text-zinc-200"
                          : "bg-zinc-100 text-zinc-800"
                      }`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedNoteId === "about" && (
            <div
              className={`space-y-4 ${
                isDarkMode ? "text-zinc-200" : "text-zinc-800"
              }`}
            >
              <div
                className={`flex items-center gap-3.5 pb-3 border-b ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <img
                  src="/images/pratham.jpg"
                  alt="Pratham"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#e5a00d]"
                />
                <div>
                  <h2
                    className={`text-[17px] font-bold ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    {resumeData.personalInfo.name}
                  </h2>
                  <p className="text-xs text-[#e5a00d] font-medium">
                    {resumeData.personalInfo.title}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-[13px]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#e5a00d]">
                  Professional Summary
                </h4>
                <p
                  className={`leading-relaxed text-[12.5px] ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {resumeData.personalInfo.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`mailto:${resumeData.personalInfo.email}`}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-colors ${
                    isDarkMode
                      ? "bg-[#1c1c1e] border-zinc-800 text-zinc-200 hover:bg-zinc-800"
                      : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100"
                  }`}
                >
                  <Mail size={16} className="text-[#e5a00d]" />
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-400">Email Me</p>
                    <p className="text-xs font-semibold truncate">Direct Email</p>
                  </div>
                </a>

                <a
                  href="https://cal.com/pratham-tiwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-colors ${
                    isDarkMode
                      ? "bg-[#1c1c1e] border-zinc-800 text-zinc-200 hover:bg-zinc-800"
                      : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100"
                  }`}
                >
                  <Calendar size={16} className="text-[#e5a00d]" />
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-400">Schedule</p>
                    <p className="text-xs font-semibold truncate">Book a Call</p>
                  </div>
                </a>
              </div>
            </div>
          )}

          {selectedNoteId === "jwt" && (
            <div
              className={`space-y-4 ${
                isDarkMode ? "text-zinc-200" : "text-zinc-800"
              }`}
            >
              <div
                className={`pb-3 border-b ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <span className="text-[11px] font-bold text-[#e5a00d] uppercase tracking-wider">
                  Technical Architecture
                </span>
                <h2
                  className={`text-[18px] font-bold mt-1 leading-snug ${
                    isDarkMode ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Understanding Access &amp; Refresh Tokens (JWT)
                </h2>
                <p
                  className={`text-[12px] mt-1 ${
                    isDarkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Jul 26, 2024 • 4 min read • Auth &amp; Security
                </p>
              </div>

              <div
                className={`space-y-3 text-[13px] leading-relaxed ${
                  isDarkMode ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                <p>
                  JSON Web Tokens (JWT) are an open, industry-standard RFC 7519 method for representing claims securely between two parties.
                </p>
                <div
                  className={`p-3 rounded-xl border space-y-1.5 font-mono text-[12px] ${
                    isDarkMode
                      ? "bg-[#1c1c1e] border-zinc-800 text-zinc-200"
                      : "bg-zinc-50 border-zinc-200 text-zinc-800"
                  }`}
                >
                  <div className="font-bold text-[#e5a00d]">1. Access Tokens (Short-lived)</div>
                  <p
                    className={`text-[11.5px] font-sans ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Used to authorize requests to protected API endpoints. Typically expires in 15–30 minutes to reduce blast radius.
                  </p>
                  <div className="font-bold text-[#e5a00d] pt-2">2. Refresh Tokens (Long-lived)</div>
                  <p
                    className={`text-[11.5px] font-sans ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Stored securely in an{" "}
                    <code
                      className={`px-1 py-0.5 rounded ${
                        isDarkMode
                          ? "bg-zinc-800 text-zinc-100"
                          : "bg-zinc-200 text-zinc-900"
                      }`}
                    >
                      httpOnly
                    </code>{" "}
                    cookie. Used to issue new access tokens without requiring re-login.
                  </p>
                </div>
              </div>

              <a
                href="https://medium.com/@pratham.1226667/understanding-how-access-and-refresh-tokens-work-9bf0fb9a898f"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 bg-[#e5a00d] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>Read Full Article on Medium</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
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
              <div>
                <h3
                  className={`font-bold text-[16px] ${
                    isDarkMode ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  Send Note via Email
                </h3>
                <p className="text-[11.5px] text-zinc-400 mt-0.5">
                  Delivered directly to {resumeData.personalInfo.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-zinc-400 hover:text-zinc-200 text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEmailJS} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-[13.5px] outline-none focus:border-[#e5a00d] ${
                    isDarkMode
                      ? "bg-[#2c2c2e] border border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Your Email (for reply)
                </label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-[13.5px] outline-none focus:border-[#e5a00d] ${
                    isDarkMode
                      ? "bg-[#2c2c2e] border border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                  }`}
                />
              </div>

              <div
                className={`p-3 rounded-xl border text-[11.5px] ${
                  isDarkMode
                    ? "bg-amber-950/30 border-amber-800/40 text-amber-200"
                    : "bg-amber-50/60 border-amber-200/60 text-amber-900"
                }`}
              >
                <p className="font-semibold truncate">Subject: {customNoteTitle}</p>
                <p
                  className={`line-clamp-2 mt-0.5 ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {customNoteBody}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 ${
                    isDarkMode
                      ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="flex-1 py-2.5 rounded-xl bg-[#e5a00d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md disabled:opacity-70"
                >
                  {isSendingEmail ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Send Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className={`shrink-0 relative z-20 backdrop-blur-xl border-t pt-2.5 pb-4 px-10 flex flex-col items-center shadow-md ${
          isDarkMode
            ? "bg-[#121214]/95 border-zinc-800"
            : "bg-[#f8f8f9]/95 border-zinc-200/80"
        }`}
      >
        <div className="w-full flex items-center justify-between text-[#e5a00d]">
          <button
            type="button"
            onClick={() => {
              setSelectedNoteId("scratchpad");
              showToast("Checklist mode ready");
            }}
            className="p-2 active:scale-90 transition-transform cursor-pointer hover:opacity-80"
            title="Checklist"
          >
            <svg
              className="w-[25px] h-[25px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e5a00d"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5" cy="6.5" r="3.2" fill="#e5a00d" stroke="none" />
              <polyline
                points="3.7 6.5 4.6 7.4 6.3 5.5"
                stroke="white"
                strokeWidth="1.3"
              />
              <line x1="11" y1="6.5" x2="21" y2="6.5" />
              <circle cx="5" cy="17.5" r="3.2" stroke="#e5a00d" strokeWidth="1.8" />
              <line x1="11" y1="17.5" x2="21" y2="17.5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => showToast("Camera scanner ready")}
            className="p-2 active:scale-90 transition-transform cursor-pointer hover:opacity-80"
            title="Camera"
          >
            <svg
              className="w-[26px] h-[26px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e5a00d"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="3.8" strokeWidth="1.9" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedNoteId("scratchpad");
              showToast("Ready to type notes");
            }}
            className="p-2 active:scale-90 transition-transform cursor-pointer hover:opacity-80"
            title="Type Note / Markup"
          >
            <svg
              className="w-[26px] h-[26px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e5a00d"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="1.9" />
              <path
                d="M12 6.5l-3 7h6l-3-7z"
                fill="#e5a00d"
                stroke="none"
              />
              <line x1="12" y1="13.5" x2="12" y2="17" strokeWidth="1.8" />
            </svg>
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

export default IPhoneNotesApp;
