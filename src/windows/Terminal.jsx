import React, { useState, useRef, useEffect } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { techStack } from '#constants';
import WindowControls from '#components/WindowControls';
import confetti from 'canvas-confetti';

const Terminal = () => {
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [loginTime] = useState(() => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const time = now.toTimeString().split(' ')[0];
    return `${day} ${month} ${date} ${time}`;
  });

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  const executeCommand = (cmdText) => {
    // If user presses enter on empty input, default to 'search pratham' so they see the profile immediately
    const effectiveCmd = cmdText.trim() === '' && commandHistory.length === 0 ? 'search pratham' : cmdText;
    const trimmed = effectiveCmd.trim().toLowerCase();
    
    if (trimmed === '') {
      setCommandHistory((prev) => [...prev, { cmd: '', res: null }]);
      setInputVal('');
      return;
    }

    if (trimmed === 'clear') {
      setCommandHistory([]);
      setInputVal('');
      return;
    }

    let response = null;
    if (trimmed === 'help' || trimmed === '?' || trimmed === 'h' || trimmed === 'commands' || trimmed === 'menu' || trimmed === 'list') {
      response = (
        <div className="text-[#d1d5db] space-y-1.5 py-1 text-xs">
          <p className="text-white font-semibold">Available Terminal Commands:</p>
          <div className="grid grid-cols-[160px_1fr] gap-x-2 pl-2 text-xs">
            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('search pratham')}>search pratham</span>
            <span className="text-[#9ca3af]">Full bio, MCA scholarship &amp; GATE goals</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('skills')}>skills</span>
            <span className="text-[#9ca3af]">Full-stack technical skills &amp; tools</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('goals')}>goals</span>
            <span className="text-[#9ca3af]">Future career roadmap &amp; GATE exam</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('future-stack')}>future-stack</span>
            <span className="text-[#9ca3af]">Future learning stack: AI/ML, C++, DSA</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('projects')}>projects</span>
            <span className="text-[#9ca3af]">Live featured web applications</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('resume')}>resume</span>
            <span className="text-[#9ca3af]">Download official resume PDF</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('contact')}>contact</span>
            <span className="text-[#9ca3af]">Email, LinkedIn &amp; Cal booking</span>

            <span className="text-[#ff758f] cursor-pointer hover:underline" onClick={() => executeCommand('love')}>love</span>
            <span className="text-[#ffb3c1]">💖 Surprise Easter egg animation</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('date')}>date</span>
            <span className="text-[#9ca3af]">Display current system date &amp; time</span>

            <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('clear')}>clear</span>
            <span className="text-[#9ca3af]">Clear terminal screen</span>
          </div>
        </div>
      );
    } else if (
      trimmed === 'search pratham' ||
      trimmed === 'search' ||
      trimmed === 'find pratham' ||
      trimmed === 'pratham' ||
      trimmed === 'whoami' ||
      trimmed === 'about' ||
      trimmed === 'bio' ||
      trimmed === 'info'
    ) {
      response = (
        <div className="py-2 text-[#e5e7eb] space-y-3 border-l-2 border-[#60a5fa] pl-3 my-1.5 bg-[#252528]/40 rounded-r">
          {/* Header / Intro */}
          <div>
            <div className="text-xs text-[#60a5fa] uppercase tracking-wider font-semibold">
              [DEVELOPER PROFILE &amp; BIOGRAPHY]
            </div>
            <h3 className="text-[15px] font-bold text-white mt-0.5">
              Pratham Tiwari — Full Stack Software Engineer &amp; MCA Scholar
            </h3>
            <p className="text-xs text-[#9ca3af] mt-1 leading-relaxed">
              Passionate software engineer building high-performance web applications, scalable backend architectures, and exploring deep-tech AI &amp; systems engineering.
            </p>
          </div>

          {/* Core Snapshot */}
          <div className="grid grid-cols-[130px_1fr] gap-x-2 text-xs leading-relaxed border-t border-zinc-700/60 pt-2">
            <span className="text-[#9ca3af]">Current Education:</span>
            <span className="text-white font-medium">Master of Computer Applications (MCA)</span>

            <span className="text-[#9ca3af]">Current Stack:</span>
            <span className="text-zinc-200">React 19, JavaScript (ES6+), TypeScript, Tailwind CSS, GSAP, Node.js, Express, MongoDB, REST APIs</span>

            <span className="text-[#9ca3af]">Target Role:</span>
            <span className="text-emerald-400 font-medium">Full Stack Software Engineer / Frontend Specialist</span>
          </div>

          {/* Future Goals & Aspirations */}
          <div className="border-t border-zinc-700/60 pt-2 space-y-1">
            <div className="text-[#f59e0b] font-bold text-xs">
              FUTURE GOALS &amp; ACADEMIC ASPIRATIONS
            </div>
            <ul className="text-xs space-y-1 pl-1 text-[#d1d5db] list-disc list-inside">
              <li>
                <strong className="text-white">Clear MCA with Distinction:</strong> Strengthening core CS foundations, OS, DBMS, and distributed network protocols.
              </li>
              <li>
                <strong className="text-white">Crack GATE Examination:</strong> Rigorous preparation for GATE (CS &amp; IT) to master advanced computational theory.
              </li>
              <li>
                <strong className="text-white">High-Impact Engineering:</strong> Build production-grade AI applications and contribute to high-scale open source repositories.
              </li>
            </ul>
          </div>

          {/* Future Tech Horizons */}
          <div className="border-t border-zinc-700/60 pt-2 space-y-1.5">
            <div className="text-[#38bdf8] font-bold text-xs">
              FUTURE LEARNING STACK &amp; HORIZONS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-black/30 p-2 rounded border border-zinc-800">
                <span className="text-white font-semibold">1. Data Structures &amp; Algorithms (C++)</span>
                <p className="text-[#9ca3af] text-[11px] mt-0.5">
                  Advanced problem solving, Graphs, Dynamic Programming, Trees, and Competitive Coding in C++.
                </p>
              </div>
              <div className="bg-black/30 p-2 rounded border border-zinc-800">
                <span className="text-white font-semibold">2. Artificial Intelligence &amp; Machine Learning</span>
                <p className="text-[#9ca3af] text-[11px] mt-0.5">
                  Machine Learning models, Neural Networks, PyTorch, Large Language Model architectures, and AI Agents.
                </p>
              </div>
            </div>
          </div>

          {/* Resume & Direct Links */}
          <div className="border-t border-zinc-700/60 pt-2 grid grid-cols-[110px_1fr] gap-x-2 text-xs leading-relaxed">
            <span className="text-[#9ca3af]">Resume PDF:</span>
            <a
              href="/Resume.pdf"
              download="Pratham_Tiwari_Resume.pdf"
              className="text-[#60a5fa] hover:underline font-medium inline-flex items-center gap-1"
            >
              Download Pratham_Tiwari_Resume.pdf
            </a>

            <span className="text-[#9ca3af]">LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/pratham-tiwari-a5518b264/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60a5fa] hover:underline"
            >
              https://www.linkedin.com/in/pratham-tiwari-a5518b264/
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

            <span className="text-[#9ca3af]">Email:</span>
            <a
              href="mailto:pratham.tiwari.dev@gmail.com"
              className="text-[#60a5fa] hover:underline"
            >
              pratham.tiwari.dev@gmail.com
            </a>
          </div>
        </div>
      );
    } else if (
      trimmed === 'skills' ||
      trimmed === 'techstack' ||
      trimmed === 'tech-stack' ||
      trimmed === 'cat tech-stack.json' ||
      trimmed === 'tech'
    ) {
      response = (
        <div className="my-2 space-y-1.5">
          <div className="grid grid-cols-[140px_1fr] gap-x-3 text-[#9ca3af] font-semibold border-b border-[#3a3a3c] pb-1">
            <span>CATEGORY</span>
            <span>TECHNOLOGIES</span>
          </div>

          {techStack.map(({ category, items }) => (
            <div key={category} className="grid grid-cols-[140px_1fr] gap-x-3 py-0.5 text-xs">
              <span className="text-[#d1d5db] font-medium">{category}</span>
              <span className="text-[#a1a1aa]">{items.join(', ')}</span>
            </div>
          ))}

          <div className="pt-1 text-xs text-[#71717a] border-t border-[#3a3a3c]">
            <span>[6/6 stacks loaded successfully]</span>
          </div>
        </div>
      );
    } else if (trimmed === 'goals' || trimmed === 'future') {
      response = (
        <div className="py-2 text-xs text-[#e5e7eb] space-y-2 border-l-2 border-[#f59e0b] pl-3 my-1 bg-[#252528]/30 rounded-r">
          <p className="text-white font-bold uppercase text-[13px] text-[#f59e0b]">
            🎯 Pratham Tiwari — Future Roadmap &amp; Goals:
          </p>
          <p>1. <strong className="text-white">Clear MCA with High Honors:</strong> Solidify fundamental computer science and distributed systems architecture.</p>
          <p>2. <strong className="text-white">Crack GATE CS/IT Exam:</strong> Master advanced algorithms, discrete mathematics, and computation theory.</p>
          <p>3. <strong className="text-white">Master C++ &amp; Advanced DSA:</strong> Solve 500+ complex problems across dynamic programming, trees, and graphs.</p>
          <p>4. <strong className="text-white">Deep-Dive into AI / ML:</strong> Build autonomous AI systems, deep learning agents, and scalable neural architectures.</p>
        </div>
      );
    } else if (trimmed === 'future-stack' || trimmed === 'ai' || trimmed === 'ml' || trimmed === 'dsa' || trimmed === 'cpp') {
      response = (
        <div className="py-2 text-xs text-[#e5e7eb] space-y-2 border-l-2 border-[#38bdf8] pl-3 my-1 bg-[#252528]/30 rounded-r">
          <p className="text-white font-bold uppercase text-[13px] text-[#38bdf8]">
            ⚡ Future Learning Stack Horizons:
          </p>
          <p>• <strong className="text-white">C++ &amp; High-Performance Computing:</strong> Memory management, STL, OOP, and system programming.</p>
          <p>• <strong className="text-white">Advanced DSA:</strong> Trees, Graph Algorithms, Dynamic Programming, Bit Manipulation, Greedy Approaches.</p>
          <p>• <strong className="text-white">AI / ML Engineering:</strong> Python, PyTorch, Scikit-Learn, Deep Learning, LLM Fine-Tuning &amp; AI Agents.</p>
        </div>
      );
    } else if (trimmed === 'resume' || trimmed === 'cv' || trimmed === 'pdf') {
      response = (
        <div className="py-1 text-xs text-[#e5e7eb] space-y-1">
          <p className="font-semibold text-white">📄 Official Resume PDF:</p>
          <p className="text-[#9ca3af]">
            Download: <a href="/Resume.pdf" download="Pratham_Tiwari_Resume.pdf" className="text-[#60a5fa] hover:underline font-bold">[Download Resume.pdf]</a>
          </p>
        </div>
      );
    } else if (trimmed === 'projects') {
      response = (
        <div className="py-1 text-[#e5e7eb] space-y-1.5">
          <p className="font-semibold text-white">Featured Live Projects:</p>
          <div className="space-y-1 pl-2 text-xs">
            <p>
              <span className="text-[#60a5fa] font-bold">1. KP Store</span> — Modern Apple-style E-Commerce Web App{' '}
              <a
                href="https://react-shopping-cart-by-hand-no-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                [Open Live]
              </a>
            </p>
            <p>
              <span className="text-[#60a5fa] font-bold">2. Redefine Gaming</span> — Award-Winning 3D Interactive Showcase{' '}
              <a
                href="https://award-winning-website-main-beryl.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                [Open Live]
              </a>
            </p>
            <p>
              <span className="text-[#60a5fa] font-bold">3. JWT Auth Architecture</span> — Full Stack Token System Article{' '}
              <a
                href="https://medium.com/@pratham.1226667/understanding-how-access-and-refresh-tokens-work-9bf0fb9a898f"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                [Read Medium]
              </a>
            </p>
          </div>
        </div>
      );
    } else if (
      trimmed === 'love' ||
      trimmed === '<3' ||
      trimmed === 'heart' ||
      trimmed === 'love you' ||
      trimmed === 'ily' ||
      trimmed === 'pratham love'
    ) {
      // Trigger romantic/fun heart confetti particles!
      try {
        const heartShape = confetti.shapeFromPath({
          path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 34,-75 76,-75 38,0 57,18 75,56z',
        });
        confetti({
          shapes: [heartShape],
          scalar: 2.2,
          particleCount: 55,
          spread: 120,
          origin: { y: 0.6 },
          colors: ['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a', '#ff0054', '#ffb3c1', '#f72585'],
        });
      } catch (err) {
        // Safe fallback
      }

      response = (
        <div className="py-2.5 text-xs text-[#ff758f] space-y-2.5 border-l-2 border-[#ff4d6d] pl-3.5 my-1.5 bg-[#2b141d]/60 rounded-r">
          <pre className="text-[#ff4d6d] font-bold text-[11px] leading-[1.15] select-none filter drop-shadow-[0_0_8px_rgba(255,77,109,0.5)]">
{`
       ♥♥♥♥♥♥♥♥            ♥♥♥♥♥♥♥♥
     ♥♥♥♥♥♥♥♥♥♥♥♥        ♥♥♥♥♥♥♥♥♥♥♥♥
   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
       ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
         ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
           ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
             ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
               ♥♥♥♥♥♥♥♥♥♥♥♥
                 ♥♥♥♥♥♥♥♥
                   ♥♥♥♥
                    ♥♥
`}
          </pre>
          <div className="space-y-1 text-[#fce7f3]">
            <p className="text-[#ff758f] font-bold text-[14px] flex items-center gap-1.5">
              <span>💖 Sending Love &amp; Positive Vibes! 💖</span>
            </p>
            <p className="text-[#fbcfe8] leading-relaxed text-xs">
              "Thank you for stopping by and exploring my developer portfolio! Keep coding, keep building passionate things, and always love what you do."
            </p>
            <div className="pt-1 text-[#fda4af] font-semibold text-[11px]">
              — Pratham Tiwari • Handcrafted with React &amp; GSAP ❤️
            </div>
          </div>
        </div>
      );
    } else if (trimmed === 'contact' || trimmed === 'email') {
      response = (
        <div className="py-1 text-xs space-y-1">
          <p className="text-white font-medium">Contact Pratham Tiwari:</p>
          <p className="text-[#9ca3af]">Email: <a href="mailto:pratham.tiwari.dev@gmail.com" className="text-[#60a5fa] hover:underline">pratham.tiwari.dev@gmail.com</a></p>
          <p className="text-[#9ca3af]">LinkedIn: <a href="https://www.linkedin.com/in/pratham-tiwari-a5518b264/" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">https://www.linkedin.com/in/pratham-tiwari-a5518b264/</a></p>
          <p className="text-[#9ca3af]">Schedule Call: <a href="https://cal.com/pratham-tiwari" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">https://cal.com/pratham-tiwari</a></p>
        </div>
      );
    } else if (trimmed === 'date') {
      response = new Date().toString();
    } else {
      response = `zsh: command not found: ${trimmed}. Type "help" or "search pratham" for available commands (skills, goals, projects, resume, love).`;
    }

    setCommandHistory((prev) => [...prev, { cmd: effectiveCmd, res: response }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
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
          {/* macOS Magenta Folder Icon */}
          <svg className="w-3.5 h-3.5 text-[#9d72ff]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
          </svg>
          <span>pratham — -zsh — 80×24</span>
        </div>

        <div className="w-12 flex justify-end">
          {/* macOS Terminal Split Icon */}
          <svg className="w-3.5 h-3.5 text-[#8e8e93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="12" y1="3" x2="12" y2="21" />
          </svg>
        </div>
      </div>

      {/* Native Terminal Body */}
      <div 
        className="p-3 bg-[#1e1e1e] min-h-[300px] max-h-[460px] overflow-y-auto space-y-2 text-[#e5e5e5] leading-relaxed cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Authentic macOS Terminal Header & Clean MOTD Instruction */}
        <div className="space-y-1 text-xs text-[#ffffff]">
          <p>Last login: {loginTime} on ttys008</p>
          <p className="text-[#a1a1aa] text-[12px]">
            Type <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('search pratham')}>"search pratham"</span> or <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('help')}>"help"</span> (or try: <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('skills')}>skills</span>, <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('goals')}>goals</span>, <span className="text-[#60a5fa] cursor-pointer hover:underline" onClick={() => executeCommand('projects')}>projects</span>, <span className="text-[#ff758f] cursor-pointer hover:underline" onClick={() => executeCommand('love')}>love</span>)
          </p>
        </div>

        {/* Command History */}
        {commandHistory.map((item, index) => (
          <div key={index} className="space-y-1">
            <p className="flex items-center gap-1.5">
              <span className="text-white font-normal">pratham@prathams-MacBook-Air ~ %</span>
              <span className="text-white">{item.cmd}</span>
            </p>
            {item.res && <div className="pl-4 text-[#d1d5db]">{item.res}</div>}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-1.5">
          <span className="shrink-0 text-white font-normal">pratham@prathams-MacBook-Air ~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="search pratham"
            className="flex-1 bg-transparent text-white outline-none border-none p-0 focus:ring-0 font-mono text-[13px] caret-white placeholder:text-zinc-600 placeholder:italic"
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