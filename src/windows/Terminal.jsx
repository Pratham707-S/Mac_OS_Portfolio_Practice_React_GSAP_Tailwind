import React, { useState, useRef, useEffect } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { techStack } from '#constants';
import { Folder } from 'lucide-react';
import WindowControls from '#components/WindowControls';

const Terminal = () => {
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim().toLowerCase();
      if (!trimmed) return;

      if (trimmed === 'clear') {
        setCommandHistory([]);
        setInputVal('');
        return;
      }

      let response = null;
      if (trimmed === 'help') {
        response = (
          <div className="text-[#d1d5db] space-y-1">
            <p>Available commands:</p>
            <p className="pl-4 text-[#9ca3af]">pratham, skills, about, contact, clear, date, whoami</p>
          </div>
        );
      } else if (trimmed === 'pratham' || trimmed === 'whoami' || trimmed === 'about' || trimmed === 'bio') {
        response = (
          <div className="py-1 text-[#e5e7eb] space-y-1">
            <div className="grid grid-cols-[100px_1fr] gap-x-2">
              <span className="text-[#9ca3af]">Name:</span>
              <span className="font-semibold text-white">Pratham Tiwari</span>

              <span className="text-[#9ca3af]">Education:</span>
              <span>MCA Student</span>

              <span className="text-[#9ca3af]">Role:</span>
              <span>Full Stack Web Developer & Frontend Engineer</span>

              <span className="text-[#9ca3af]">LinkedIn:</span>
              <a
                href="https://www.linkedin.com/in/pratham-tiwari-962a00342/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#60a5fa] hover:underline"
              >
                https://www.linkedin.com/in/pratham-tiwari-962a00342/
              </a>

              <span className="text-[#9ca3af]">GitHub:</span>
              <a
                href="https://github.com/Pratham707-S"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#60a5fa] hover:underline"
              >
                https://github.com/Pratham707-S
              </a>
            </div>
          </div>
        );
      } else if (trimmed === 'skills' || trimmed === 'techstack') {
        response = (
          <div className="py-1 text-[#e5e7eb] space-y-1">
            <div className="grid grid-cols-[130px_1fr] gap-x-3 text-[#9ca3af] border-b border-zinc-700 pb-1 font-semibold">
              <span>CATEGORY</span>
              <span>TECHNOLOGIES</span>
            </div>
            {techStack.map(({ category, items }) => (
              <div key={category} className="grid grid-cols-[130px_1fr] gap-x-3 py-0.5">
                <span className="text-[#d1d5db] font-medium">{category}</span>
                <span className="text-[#9ca3af]">{items.join(', ')}</span>
              </div>
            ))}
          </div>
        );
      } else if (trimmed === 'contact') {
        response = 'Reach out via LinkedIn or check the Contact app on the Dock.';
      } else if (trimmed === 'date') {
        response = new Date().toString();
      } else {
        response = `zsh: command not found: ${trimmed}. Type "help" for a list of commands.`;
      }

      setCommandHistory((prev) => [...prev, { cmd: inputVal, res: response }]);
      setInputVal('');
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  return (
    <div className="flex flex-col w-full h-full text-[#e5e5e5] font-mono text-[13px] select-text">
      {/* Native macOS Terminal Title Bar */}
      <div id="window-header" className="flex items-center justify-between px-3.5 py-2 bg-[#2d2d2d] border-b border-[#3a3a3c] select-none">
        <WindowControls target="terminal" />
        
        {/* Terminal Title */}
        <div className="flex items-center gap-1.5 text-xs text-[#d1d5db] font-medium">
          <Folder size={13} className="text-[#9ca3af]" />
          <span>pratham — -zsh — 80×24</span>
        </div>

        <div className="w-12" />
      </div>

      {/* Native Terminal Body */}
      <div 
        className="p-3 bg-[#1e1e1e] max-h-[460px] overflow-y-auto space-y-2 text-[#e5e5e5] leading-relaxed cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Login Message */}
        <p className="text-[#9ca3af]">
          Last login: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} on ttys008
        </p>

        {/* Initial Command */}
        <div>
          <p>
            <span>pratham@prathams-MacBook-Air ~ % </span>
            <span className="text-white font-medium">cat tech-stack.json</span>
          </p>

          {/* Clean Terminal Tech Stack Table */}
          <div className="my-2 space-y-1">
            <div className="grid grid-cols-[130px_1fr] gap-x-3 text-[#9ca3af] font-semibold border-b border-[#3a3a3c] pb-1">
              <span>CATEGORY</span>
              <span>TECHNOLOGIES</span>
            </div>

            {techStack.map(({ category, items }) => (
              <div key={category} className="grid grid-cols-[130px_1fr] gap-x-3 py-0.5">
                <span className="text-[#d1d5db] font-medium">{category}</span>
                <span className="text-[#a1a1aa]">{items.join(', ')}</span>
              </div>
            ))}

            <div className="pt-1.5 text-xs text-[#71717a] border-t border-[#3a3a3c]">
              <span>[6/6 stacks loaded successfully]</span>
            </div>
          </div>
        </div>

        {/* History */}
        {commandHistory.map((item, index) => (
          <div key={index} className="space-y-1">
            <p>
              <span>pratham@prathams-MacBook-Air ~ % </span>
              <span className="text-white">{item.cmd}</span>
            </p>
            {item.res && <div className="pl-4 text-[#d1d5db]">{item.res}</div>}
          </div>
        ))}

        {/* Input Prompt */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="shrink-0">pratham@prathams-MacBook-Air ~ % </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent text-white outline-none border-none p-0 focus:ring-0 font-mono text-[13px] caret-white"
            autoFocus
          />
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');
export default TerminalWindow;