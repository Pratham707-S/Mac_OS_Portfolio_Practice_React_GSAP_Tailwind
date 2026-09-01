import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import { Download, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Resume = () => {
  return (
    <div className="w-full flex flex-col bg-[#1e1e1e] text-white rounded-xl shadow-2xl overflow-hidden font-sans select-none border border-[#3a3a3c]">
      {/* macOS Window Header */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3a3a3c]"
      >
        <WindowControls target="resume" />

        <span className="text-xs font-semibold text-gray-300 tracking-wide">
          Pratham_Tiwari_Resume.pdf
        </span>

        <div className="flex items-center gap-2">
          <a
            href="/Resume.pdf"
            download="Pratham_Tiwari_Resume.pdf"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-colors shadow-sm"
          >
            <Download size={12} />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Resume Document Body Matching Figma */}
      <div className="p-6 sm:p-8 bg-[#f8f9fa] text-gray-800 max-h-[75vh] overflow-y-auto space-y-6 select-text">
        {/* Header Profile Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/pratham.jpg"
              alt="Pratham Tiwari"
              className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-blue-600"
            />
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                PRATHAM TIWARI
              </h1>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
                Frontend & Motion Design Engineer
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-600 space-y-1 font-medium">
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-blue-600" />
              <span>prathamtiwari.dev@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-blue-600" />
              <span>github.com/Pratham707-S</span>
            </div>
          </div>
        </div>

        {/* Experience & Summary */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-gray-200 pb-1 mb-2">
              Profile Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed font-sans">
              Passionate Frontend Developer specializing in high-performance web applications, interactive GSAP 60fps motion experiences, and Apple-grade UI design with React 19, Tailwind CSS, and Zustand.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-gray-200 pb-1 mb-2">
              Featured Projects
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                  <span>KP STORE — Apple-Grade E-Commerce</span>
                  <span className="text-blue-600 font-normal">2026</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Handcrafted responsive shopping platform with zero-AI pure React code, real-time cart state, and smooth checkout flow.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                  <span>REDEFINE GAMING — Awwwards Winning Experience</span>
                  <span className="text-blue-600 font-normal">2026</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Immersive metagame 3D web platform featuring GSAP timeline orchestration, video backgrounds, and buttery-smooth desktop navigation.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-gray-200 pb-1 mb-2">
              Technical Stack & Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                'React.js',
                'GSAP & ScrollTrigger',
                'Tailwind CSS',
                'JavaScript (ES6+)',
                'Zustand',
                'HTML5 & Modern CSS',
                'Git & GitHub',
                'Responsive Web Design',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
