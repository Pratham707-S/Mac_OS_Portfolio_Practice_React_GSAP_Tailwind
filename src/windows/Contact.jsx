import React, { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import { socials } from '#constants';
import { Calendar, Send, Phone, Mail, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { sendPortfolioEmail } from '../utils/emailService.js';

const renderSocialIcon = (item) => {
  if (item.text.toLowerCase().includes('schedule') || item.text.toLowerCase().includes('call')) {
    return <Calendar className="w-5 h-5 text-white" />;
  }
  if (item.text.toLowerCase().includes('email') || item.text.toLowerCase().includes('mail')) {
    return <Send className="w-5 h-5 text-white" />;
  }
  if (item.icon) {
    return (
      <img
        src={item.icon}
        alt={item.text}
        className="w-5 h-5 filter brightness-0 invert"
      />
    );
  }
  return <Mail className="w-5 h-5 text-white" />;
};

const Contact = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Opportunity / Project Discussion');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a message' });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);
    try {
      const res = await sendPortfolioEmail({
        from_name: senderName || 'Portfolio Visitor',
        from_email: senderEmail,
        subject,
        message,
      });

      if (res.success) {
        setStatusMessage({ type: 'success', text: res.message });
        setMessage('');
        setTimeout(() => {
          setShowEmailModal(false);
          setStatusMessage(null);
        }, 2000);
      } else {
        setStatusMessage({ type: 'info', text: res.message });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to send message' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-sans select-none">
      {/* macOS Window Header */}
      <div id="window-header" className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d2d] border-b border-[#3a3a3c] select-none">
        <WindowControls target="contact" />
        <p className="font-semibold text-xs text-gray-400 tracking-tight">Contact Me</p>
        <div className="w-12" /> {/* Spacing balance */}
      </div>

      {/* Window Body */}
      <div className="p-6 sm:p-8 space-y-4 bg-[#1e1e1e] text-white flex-1 overflow-y-auto">
        {/* User Avatar */}
        <div className="relative inline-block">
          <img
            src="/images/pratham.jpg"
            alt="Pratham Tiwari"
            className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-white dark:ring-zinc-700 border border-gray-200 dark:border-zinc-700"
          />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed max-w-md">
            Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
          </p>
        </div>

        {/* Social / Contact Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {socials.map((item) => {
            const isEmail = item.text.toLowerCase().includes('email') || item.text.toLowerCase().includes('mail');

            if (isEmail) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  style={{ backgroundColor: item.bg }}
                  className="group flex flex-col justify-between p-3.5 rounded-xl text-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 min-h-[95px] text-left cursor-pointer"
                >
                  <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                    {renderSocialIcon(item)}
                  </div>
                  <span className="text-xs font-semibold tracking-wide">
                    {item.text}
                  </span>
                </button>
              );
            }

            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: item.bg }}
                className="group flex flex-col justify-between p-3.5 rounded-xl text-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 min-h-[95px]"
              >
                <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                  {renderSocialIcon(item)}
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  {item.text}
                </span>
              </a>
            );
          })}
        </div>

        {/* Direct Email Modal (EmailJS) */}
        {showEmailModal && (
          <div className="mt-4 p-5 rounded-xl bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#3a3a3c] shadow-inner space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#3a3a3c] pb-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#34c759]" />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  Send Direct Message via EmailJS
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xs font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {statusMessage && (
              <div
                className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <CheckCircle2 size={14} />
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-zinc-700 text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#34c759]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-zinc-700 text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#34c759]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-zinc-700 text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#34c759]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-zinc-700 text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-[#34c759] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-4 py-1.5 rounded-lg bg-[#34c759] hover:bg-[#2db64f] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSending ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');
export default ContactWindow;
