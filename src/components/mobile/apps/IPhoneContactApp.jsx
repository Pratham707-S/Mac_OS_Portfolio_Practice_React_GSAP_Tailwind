import React, { useState } from "react";
import { ChevronLeft, Calendar, Send, Loader2, Mail } from "lucide-react";
import IPhoneStatusBar from "../ui/IPhoneStatusBar.jsx";
import { resumeData } from "../data/resumeData.js";
import { sendPortfolioEmail } from "../../../utils/emailService.js";

export const IPhoneContactApp = ({ currentTime, isOpen, onClose, isDarkMode }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("Opportunity / Collaboration Inquiry");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast("Please enter a message");
      return;
    }

    setIsSending(true);
    try {
      const res = await sendPortfolioEmail({
        from_name: senderName || "Portfolio Visitor",
        from_email: senderEmail,
        subject,
        message,
      });

      if (res.success) {
        showToast(res.message);
        setMessage("");
        setShowEmailModal(false);
      } else {
        showToast(res.message || "Opening email client");
      }
    } catch (err) {
      showToast("Error sending message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom duration-200 select-text overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
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
          Contact Me
        </span>

        <div className="w-16" />
      </div>

      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-black/85 text-white text-[12.5px] font-medium px-4 py-2 rounded-full shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 pointer-events-none max-w-[90%] text-center">
          {toastMessage}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-12 flex flex-col items-center">
        <div
          className={`w-24 h-24 aspect-square rounded-full overflow-hidden shadow-md border-2 mt-1 shrink-0 ${
            isDarkMode ? "border-zinc-700" : "border-zinc-100"
          }`}
        >
          <img
            src="/images/pratham.jpg"
            alt={resumeData.personalInfo.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2
          className={`text-[22px] font-bold mt-3.5 tracking-tight text-center shrink-0 ${
            isDarkMode ? "text-zinc-100" : "text-zinc-900"
          }`}
        >
          Let's Connect
        </h2>
        <p
          className={`text-[14px] text-center mt-1 leading-relaxed max-w-[280px] shrink-0 ${
            isDarkMode ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Got an idea? A bug to squash?
          <br />
          Or just wanna talk tech? I'm in.
        </p>

        <div className="w-full space-y-3.5 mt-5 max-w-sm shrink-0">
          <a
            href="https://cal.com/pratham-tiwari"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-[16px] bg-[#ea5353] hover:bg-[#de4343] active:scale-[0.98] transition-all text-white flex flex-col justify-between shadow-sm cursor-pointer min-h-[76px] shrink-0"
          >
            <div className="flex items-center">
              <Calendar size={22} className="stroke-[2.2]" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight mt-1">
              Schedule a call
            </span>
          </a>

          <button
            type="button"
            onClick={() => setShowEmailModal(true)}
            className="w-full p-4 rounded-[16px] bg-[#34c759] hover:bg-[#2db64f] active:scale-[0.98] transition-all text-white flex flex-col justify-between shadow-sm cursor-pointer min-h-[76px] shrink-0 text-left"
          >
            <div className="flex items-center">
              <Send size={20} className="stroke-[2.2] -rotate-12" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight mt-1">
              Send Email Directly
            </span>
          </button>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-[16px] bg-[#fa755a] hover:bg-[#ee664b] active:scale-[0.98] transition-all text-white flex flex-col justify-between shadow-sm cursor-pointer min-h-[76px] shrink-0"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-tight mt-1">
              Twitter/X
            </span>
          </a>

          <a
            href={resumeData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-[16px] bg-[#0077b5] hover:bg-[#006ca4] active:scale-[0.98] transition-all text-white flex flex-col justify-between shadow-sm cursor-pointer min-h-[76px] shrink-0"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.67-1.66-1.67a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.66 1.67 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-tight mt-1">
              LinkedIn
            </span>
          </a>
        </div>
      </div>

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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#34c759] flex items-center justify-center text-white">
                  <Mail size={16} />
                </div>
                <div>
                  <h3
                    className={`font-bold text-[15px] leading-tight ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    Send Email
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    To: {resumeData.personalInfo.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-zinc-400 hover:text-zinc-200 text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-[13.5px] outline-none focus:border-[#34c759] ${
                    isDarkMode
                      ? "bg-[#2c2c2e] border border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-[13.5px] outline-none focus:border-[#34c759] ${
                    isDarkMode
                      ? "bg-[#2c2c2e] border border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-[13.5px] outline-none focus:border-[#34c759] ${
                    isDarkMode
                      ? "bg-[#2c2c2e] border border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Hi Pratham, I'd like to talk about..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-[13.5px] outline-none focus:border-[#34c759] resize-none ${
                    isDarkMode
                      ? "bg-[#2c2c2e] border border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                  }`}
                />
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
                  disabled={isSending}
                  className="flex-1 py-2.5 rounded-xl bg-[#34c759] hover:bg-[#2db64f] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md disabled:opacity-70"
                >
                  {isSending ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className={`w-full pb-3 flex justify-center ${
          isDarkMode ? "bg-black" : "bg-white"
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

export default IPhoneContactApp;
