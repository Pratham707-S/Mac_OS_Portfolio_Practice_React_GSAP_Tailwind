import React, { useState, useEffect, useRef } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import { locations } from '#constants';
import useWindowStore from '#store/window';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

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
  RotateCcw,
} from 'lucide-react';

const Finder = () => {
  const { openWindow, windows } = useWindowStore();
  const [currentLocationKey, setCurrentLocationKey] = useState('work');
  const [activeFolder, setActiveFolder] = useState(null);
  const [history, setHistory] = useState(['work']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Trash state
  const [trashList, setTrashList] = useState(locations.trash.children || []);

  // Canvas Ref for Draggable bounds
  const canvasRef = useRef(null);
  const draggablesRef = useRef([]);

  // Synchronize when opened from Dock via trash icon or custom data
  useEffect(() => {
    const requestedLoc = windows.finder?.data?.location;
    if (requestedLoc && requestedLoc !== currentLocationKey) {
      navigateToLocation(requestedLoc);
    }
  }, [windows.finder?.data?.location]);

  const currentLocation = locations[currentLocationKey] || locations.work;

  // Current items to display
  let displayItems = [];
  if (currentLocationKey === 'work') {
    if (activeFolder) {
      displayItems = activeFolder.children || [];
    } else {
      displayItems = currentLocation.children || [];
    }
  } else if (currentLocationKey === 'trash') {
    displayItems = trashList;
  } else {
    displayItems = currentLocation.children || [];
  }

  // Filter items by search query
  const filteredItems = displayItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize GSAP Draggable on items
  useEffect(() => {
    // Kill existing draggables before re-creating
    draggablesRef.current.forEach((d) => d.kill());
    draggablesRef.current = [];

    if (!canvasRef.current || currentLocationKey === 'about') return;

    const elements = canvasRef.current.querySelectorAll('.finder-draggable-item');
    if (elements.length > 0) {
      draggablesRef.current = Draggable.create(elements, {
        bounds: canvasRef.current,
        edgeResistance: 0.7,
        type: 'x,y',
        zIndexBoost: true,
        cursor: 'grab',
        activeCursor: 'grabbing',
      });
    }

    return () => {
      draggablesRef.current.forEach((d) => d.kill());
      draggablesRef.current = [];
    };
  }, [currentLocationKey, activeFolder, filteredItems.length]);

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

  // Trash actions
  const handleEmptyTrash = () => {
    setTrashList([]);
  };

  const handleRestoreTrash = () => {
    setTrashList(locations.trash.children || []);
  };

  const handleDeleteItemFromTrash = (e, id) => {
    e.stopPropagation();
    setTrashList((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle Item Click / Open
  const handleItemClick = (item) => {
    if (item.kind === 'folder') {
      openFolder(item);
    } else if (item.fileType === 'url' || item.href) {
      window.open(item.href, '_blank');
    } else if (item.fileType === 'pdf') {
      openWindow('resume');
    } else if (item.fileType === 'txt') {
      openWindow('txtfile', item);
    } else if (item.fileType === 'img') {
      openWindow('imgfile', item);
    }
  };

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
                <span className="text-blue-400 truncate max-w-[200px]">
                  {activeFolder.name}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Center / Right Actions */}
        <div className="flex items-center gap-3">
          {/* Empty Trash Button in Trash View */}
          {currentLocationKey === 'trash' && (
            <div className="flex items-center gap-2">
              {trashList.length > 0 ? (
                <button
                  type="button"
                  onClick={handleEmptyTrash}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white text-[11px] font-semibold transition-colors shadow-sm"
                >
                  <Trash2 size={11} />
                  <span>Empty Trash</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRestoreTrash}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-semibold transition-colors shadow-sm"
                >
                  <RotateCcw size={11} />
                  <span>Reset Trash</span>
                </button>
              )}
            </div>
          )}

          {/* Search Input */}
          <div className="flex items-center gap-2 bg-[#1e1e1e] border border-white/10 px-2.5 py-1 rounded-lg text-xs w-40 shadow-inner">
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
      </div>

      {/* Main Container: Sidebar + Freeform Draggable Canvas */}
      <div className="flex min-h-[440px] max-h-[520px]">
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
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  currentLocationKey === 'trash'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trash2 size={14} className="text-rose-400 flex-none" />
                  <span>Trash</span>
                </div>
                {trashList.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
                    {trashList.length}
                  </span>
                )}
              </li>
            </ul>
          </div>

          {/* Work Sub-Folders */}
          {locations.work.children && (
            <div>
              <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                Work
              </h3>
              <ul className="space-y-0.5">
                {locations.work.children.map((proj) => {
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
                      <Folder size={12} className={isSelected ? 'text-white' : 'text-blue-400'} />
                      <span className="truncate">{proj.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Main Finder Canvas Area */}
        <main
          ref={canvasRef}
          className="flex-1 relative p-6 bg-[#1c1c1e] overflow-hidden min-h-[440px]"
        >
          {/* About Me Special View */}
          {currentLocationKey === 'about' ? (
            <div className="max-w-xl mx-auto py-4 overflow-y-auto max-h-[420px]">
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
            /* Freeform Draggable Items (matching Figma Screenshot) */
            <>
              {filteredItems.map((item, idx) => {
                const isFolder = item.kind === 'folder';
                const posClass =
                  item.position ||
                  (idx === 0
                    ? 'top-8 left-8'
                    : idx === 1
                    ? 'top-8 left-64'
                    : idx === 2
                    ? 'top-48 left-8'
                    : 'top-48 left-64');

                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`finder-draggable-item absolute ${posClass} group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors text-center w-36`}
                  >
                    {/* Delete button when viewing Trash */}
                    {currentLocationKey === 'trash' && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteItemFromTrash(e, item.id)}
                        title="Delete permanently"
                        className="absolute top-0 right-1 p-1 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <X size={10} />
                      </button>
                    )}

                    {/* Icon display */}
                    <div className="relative w-16 h-16 flex items-center justify-center mb-1.5 pointer-events-none">
                      {isFolder ? (
                        <img
                          src="/images/folder.png"
                          alt="folder"
                          className="w-16 h-16 object-contain drop-shadow-md"
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
                    <span className="text-xs font-medium text-gray-200 group-hover:text-white leading-tight max-w-[130px] break-words line-clamp-2 select-none pointer-events-none">
                      {item.name}
                    </span>
                  </div>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 text-xs space-y-2 py-20">
                  <img
                    src="/images/trash.png"
                    alt="Empty Trash"
                    className="w-14 h-14 opacity-50 mb-1"
                  />
                  <p className="font-semibold text-gray-400">
                    {currentLocationKey === 'trash'
                      ? 'Trash is completely empty.'
                      : 'This folder is empty.'}
                  </p>
                  {currentLocationKey === 'trash' && (
                    <button
                      type="button"
                      onClick={handleRestoreTrash}
                      className="text-xs text-sky-400 hover:underline mt-1"
                    >
                      Restore sample trash files
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, 'finder');
export default FinderWindow;
