import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import { socials } from '#constants';
import { Calendar, Send, Phone, Mail, ExternalLink } from 'lucide-react';

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
  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl overflow-hidden font-sans transition-colors duration-200">
      {/* macOS Window Header */}
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#f6f6f6] dark:bg-[#2d2d2d] border-b border-gray-200 dark:border-[#3a3a3c] select-none">
        <WindowControls target="contact" />
        <p className="font-semibold text-xs text-gray-500 dark:text-gray-400 tracking-tight">Contact Me</p>
        <div className="w-12" /> {/* Spacing balance */}
      </div>

      {/* Window Body */}
      <div className="p-6 sm:p-8 space-y-4">
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
          {socials.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');
export default ContactWindow;
