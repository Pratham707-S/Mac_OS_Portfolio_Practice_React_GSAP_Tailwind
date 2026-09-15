import React, { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import { locations } from '#constants';
import useWindowStore from '#store/window';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Folder,
  User,
  FileText,
  Trash2,
  ExternalLink,
  X,
  FileCode,
  Globe,
  Image as ImageIcon,
  Eye,
} from 'lucide-react';

const Finder = () => {
  const { openWindow } = useWindowStore();
  const [currentLocationKey, setCurrentLocationKey] = useState('work');
  const [activeFolder, setActiveFolder] = useState(null); // Inside a specific project folder
  const [history, setHistory] = useState(['work']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // File Preview Modal State
  const [previewFile, setPreviewFile] = useState(null);

  const currentLocation = locations[currentLocationKey] || locations.work;

  // Handle Navigation
  const navigateToLocation = (locKey) => {
    setCurrentLocationKey(locKey);
    setActiveFolder(null);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(locKey);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const openFolder = (folder) => {
    setActiveFolder(folder);
  };

  const handleBack = () => {
    if (activeFolder) {
      setActiveFolder(null);
    } else if (historyIndex > 0) {
      const prevLoc = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentLocationKey(prevLoc);
      setActiveFolder(null);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextLoc = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentLocationKey(nextLoc);
      setActiveFolder(null);
    }
  };

  // Handle File Click
  const handleItemClick = (item) => {
    if (item.kind === 'folder') {
      openFolder(item);
    } else if (item.fileType === 'url' || item.href) {
      window.open(item.href, '_blank');
    } else if (item.fileType === 'pdf') {
      openWindow('resume');
    } else {
      setPreviewFile(item);
    }
  };

  // Current items to display
  let displayItems = [];
  if (currentLocationKey === 'work') {
    if (activeFolder) {
      displayItems = activeFolder.children || [];
    } else {
      displayItems = currentLocation.children || [];
    }
  } else {
    displayItems = currentLocation.children || [];
  }

  // Filter items by search query
  const filteredItems = displayItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col bg-[#1e1e1e] text-white rounded-xl shadow-2xl overflow-hidden font-sans select-none border border-[#3a3a3c]">
      {/* macOS Finder Window Header */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#2a2a2c] border-b border-[#3a3a3c] text-[#a1a1aa]"
      >
        {/* Left Controls & Navigation */}
        <div className="flex items-center gap-3">
          <WindowControls target="finder" />

          <div className="flex items-center gap-0.5 text-gray-400">
            <button
              type="button"
              onClick={handleBack}
              disabled={historyIndex === 0 && !activeFolder}
              title="Back"
              className="p-1 rounded hover:bg-white/10 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={handleForward}
              disabled={historyIndex >= history.length - 1}
              title="Forward"
              className="p-1 rounded hover:bg-white/10 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Breadcrumb Title */}
          <span className="text-xs font-semibold text-gray-200 tracking-wide flex items-center gap-1.5">
            <span>{currentLocation.name}</span>
            {activeFolder && (
              <>
                <span className="text-gray-500">/</span>
                <span className="text-blue-400 truncate max-w-[180px]">
                  {activeFolder.name}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Right Search Input */}
        <div className="flex items-center gap-2 bg-[#1e1e1e] border border-white/10 px-2.5 py-1 rounded-lg text-xs w-44 shadow-inner">
          <Search size={12} className="text-gray-400 flex-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent outline-none border-none p-0 text-xs placeholder:text-gray-400 text-gray-200"
          />
        </div>
      </div>

      {/* Main Container: Sidebar + Content */}
      <div className="flex min-h-[420px] max-h-[500px]">
        {/* Left Sidebar */}
        <aside className="w-44 flex-none bg-[#252528] border-r border-[#3a3a3c] p-3 flex flex-col space-y-4">
          <div>
            <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
              Favorites
            </h3>
            <ul className="space-y-0.5">
              <li
                onClick={() => navigateToLocation('work')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  currentLocationKey === 'work' && !activeFolder
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Folder size={14} className="text-sky-400 flex-none" />
                <span>Work</span>
              </li>

              <li
                onClick={() => navigateToLocation('about')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  currentLocationKey === 'about'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <User size={14} className="text-emerald-400 flex-none" />
                <span>About me</span>
              </li>

              <li
                onClick={() => navigateToLocation('resume')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  currentLocationKey === 'resume'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FileText size={14} className="text-amber-400 flex-none" />
                <span>Resume</span>
              </li>

              <li
                onClick={() => navigateToLocation('trash')}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  currentLocationKey === 'trash'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Trash2 size={14} className="text-rose-400 flex-none" />
                <span>Trash</span>
              </li>
            </ul>
          </div>

          {/* Work Sub-Folders */}
          {locations.work.children && (
            <div>
              <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                Projects
              </h3>
              <ul className="space-y-0.5">
                {locations.work.children.map((proj, idx) => {
                  const isSelected =
                    currentLocationKey === 'work' &&
                    activeFolder?.id === proj.id;
                  return (
                    <li
                      key={proj.id}
                      onClick={() => {
                        setCurrentLocationKey('work');
                        openFolder(proj);
                      }}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors truncate ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-[11px] text-gray-500 font-mono">
                        0{idx + 1}
                      </span>
                      <span className="truncate">{proj.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Main Finder Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#1c1c1e]">
          {/* About Me Special View (matching Figma Screenshot 5) */}
          {currentLocationKey === 'about' ? (
            <div className="max-w-xl mx-auto py-4">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/pratham.jpg"
                  alt="Pratham Tiwari"
                  className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white/20"
                />
                <div>
                  <h2 className="text-base font-bold text-white">
                    Meet the Developer Behind the Code
                  </h2>
                  <p className="text-xs text-sky-400 font-medium">
                    Pratham Tiwari — Frontend & Motion Engineer
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-gray-300 leading-relaxed font-sans bg-white/5 p-5 rounded-xl border border-white/10">
                <p>
                  Hey! I'm Pratham 👋, a web developer who enjoys building
                  sleek, interactive websites that actually work well.
                </p>
                <p>
                  I specialize in JavaScript, React, and GSAP—and I love making
                  things feel smooth, fast, and just a little bit delightful.
                </p>
                <p>
                  I'm big on clean UI, good UX, and writing code that doesn't
                  need a search party to debug.
                </p>
                <p>
                  Outside of dev work, you'll find me tweaking layouts at 2AM,
                  sipping chai/coffee, and exploring creative web animations 🚀
                </p>
              </div>
            </div>
          ) : (
            /* Standard Grid Icon Layout (matching Figma Screenshot 1 & 2) */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-2">
              {filteredItems.map((item) => {
                const isFolder = item.kind === 'folder';

                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="group flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-200 text-center"
                  >
                    {/* Icon display */}
                    <div className="relative w-16 h-16 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-200">
                      {isFolder ? (
                        <img
                          src="/images/folder.png"
                          alt="folder"
                          className="w-14 h-14 object-contain drop-shadow-md"
                        />
                      ) : item.fileType === 'url' ? (
                        <img
                          src="/images/safari.png"
                          alt="safari link"
                          className="w-14 h-14 object-contain drop-shadow-md"
                        />
                      ) : item.fileType === 'txt' ? (
                        <img
                          src="/images/txt.png"
                          alt="text document"
                          className="w-14 h-14 object-contain drop-shadow-md"
                        />
                      ) : item.fileType === 'img' ? (
                        <img
                          src={item.imageUrl || '/images/image.png'}
                          alt="preview"
                          className="w-14 h-14 object-cover rounded-lg drop-shadow-md border border-white/20"
                        />
                      ) : (
                        <img
                          src={item.icon || '/images/plain.png'}
                          alt={item.name}
                          className="w-14 h-14 object-contain drop-shadow-md"
                        />
                      )}

                      {/* Small badge for live url */}
                      {item.fileType === 'url' && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5 text-white shadow-sm">
                          <ExternalLink size={9} />
                        </div>
                      )}
                    </div>

                    {/* File / Folder Name */}
                    <span className="text-xs font-medium text-gray-200 group-hover:text-white leading-tight max-w-[120px] break-words line-clamp-2">
                      {item.name}
                    </span>
                  </div>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="col-span-full py-16 text-center text-gray-500 text-xs">
                  This folder is empty.
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* In-Finder File Preview Modal (matching Figma Screenshot 3) */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#252528] rounded-2xl shadow-2xl border border-white/20 overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d30] border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer" onClick={() => setPreviewFile(null)} />
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                <span className="text-xs font-semibold text-gray-300 ml-2">
                  {previewFile.name}
                </span>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {previewFile.fileType === 'img' ? (
                <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 max-h-[60vh] bg-black">
                  <img
                    src={previewFile.imageUrl}
                    alt={previewFile.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {previewFile.subtitle && (
                    <h3 className="text-sm font-bold text-sky-400">
                      {previewFile.subtitle}
                    </h3>
                  )}
                  {previewFile.image && (
                    <img
                      src={previewFile.image}
                      alt="preview"
                      className="w-full h-40 object-cover rounded-xl border border-white/10"
                    />
                  )}
                  <div className="space-y-2 text-xs text-gray-300 leading-relaxed font-sans">
                    {Array.isArray(previewFile.description) ? (
                      previewFile.description.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))
                    ) : (
                      <p>{previewFile.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, 'finder');
export default FinderWindow;
