import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import { photosLinks } from '#constants';
import { Search, X, Image as ImageIcon, Video as VideoIcon, Play, ExternalLink } from 'lucide-react';

const defaultPhotos = [
  {
    id: 1,
    title: 'KP STORE — Apple E-Commerce Platform',
    date: 'Featured Live Project',
    img: '/images/1786199425015.jpeg',
    type: 'image',
    category: 'Library',
    link: 'https://react-shopping-cart-by-hand-no-ai.vercel.app/',
  },
  {
    id: 6,
    title: 'REDEFINE GAMING — Award Winning Website',
    date: 'Featured Live Project',
    img: '/images/redefine-gaming.png',
    type: 'image',
    category: 'Library',
    link: 'https://award-winning-website-main-beryl.vercel.app/',
  },
  {
    id: 7,
    title: 'Understanding Access and Refresh Tokens (JWT)',
    date: 'Security Architecture Guide',
    img: '/images/jwt-token.jpg',
    type: 'image',
    category: 'Library',
    link: 'https://medium.com/@pratham.1226667/understanding-access-and-refresh-tokens-jwt-012ab63cfbf5',
  },
  {
    id: 5,
    title: 'Pratham Tiwari — Profile Highlight',
    date: 'Profile Highlight',
    img: '/images/pratham.jpg',
    type: 'image',
    category: 'People',
    link: 'https://www.linkedin.com/in/pratham-tiwari-962a00342/',
  },
  {
    id: 2,
    title: 'GSAP Awwwards Winning Website',
    date: 'Live Interactive Demo',
    video: '/video-background/REC-20260629233744.mp4',
    type: 'video',
    category: 'Videos',
    link: 'https://gsap-awwwards-website-main-peach.vercel.app/',
  },
  {
    id: 3,
    title: 'Creative Web Project Showcase 1',
    date: 'Video Demo',
    video: '/video-background/REC-20260317135447.mp4',
    type: 'video',
    category: 'Videos',
    link: '',
  },
  {
    id: 4,
    title: 'Creative Web Project Showcase 2',
    date: 'Video Demo',
    video: '/video-background/REC-20260616103604.mp4',
    type: 'video',
    category: 'Videos',
    link: '',
  },
];

const Photos = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentTabObj = photosLinks.find((tab) => tab.id === activeTab);
  const currentCategory = currentTabObj?.title || 'Library';

  // Filter photos based on tab and search
  const filteredPhotos = defaultPhotos.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 1) return p.type === 'image'; // Library shows all photo projects & profile
    if (activeTab === 2) return p.type === 'video' || p.category === 'Videos';
    if (activeTab === 4) return p.category === 'People';
    if (activeTab === 5) return p.id === 1 || p.id === 6 || p.id === 2 || p.id === 5;
    return true;
  });

  const handlePhotoClick = (photo) => {
    if (photo.link) {
      window.open(photo.link, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedPhoto(photo);
    }
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl overflow-hidden font-sans select-none">
      {/* macOS Window Header */}
      <div id="window-header" className="flex items-center justify-between px-4 py-2.5 bg-[#f6f6f6] dark:bg-[#2d2d2d] border-b border-gray-200 dark:border-[#3a3a3c]">
        <WindowControls target="photos" />

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg text-xs w-48 shadow-inner">
          <Search size={13} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Photos & Videos..."
            className="w-full bg-transparent outline-none border-none p-0 text-gray-800 dark:text-white placeholder:text-gray-400 text-xs"
          />
        </div>

        <div className="w-12" />
      </div>

      {/* Photos App Main Container */}
      <div className="flex min-h-[360px] max-h-[440px]">
        {/* Left Sidebar */}
        <aside className="w-44 flex-none bg-[#f8f9fa] dark:bg-[#252528] border-r border-gray-200 dark:border-[#3a3a3c] p-3 flex flex-col">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
            Photos & Videos
          </h3>

          <ul className="space-y-1">
            {photosLinks.map(({ id, icon, title }) => {
              const isActive = activeTab === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`w-full text-left flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-white/10'
                    }`}
                  >
                    <img
                      src={icon}
                      alt=""
                      className={`w-3.5 h-3.5 ${isActive ? 'filter brightness-0 invert' : 'dark:invert dark:opacity-80'}`}
                    />
                    <span>{title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right Gallery Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-white dark:bg-[#18181b]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-white/10">
            <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
              {currentCategory === 'Videos' ? (
                <VideoIcon size={15} className="text-blue-500" />
              ) : (
                <ImageIcon size={15} className="text-blue-500" />
              )}
              <span>{currentCategory}</span>
            </h2>
            <span className="text-xs text-gray-400">
              {filteredPhotos.length} {filteredPhotos.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Grid Layout Matching Figma Design */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[135px]">
              {filteredPhotos.map((photo, index) => {
                const isVideo = photo.type === 'video';
                const isHero = index === 0;

                return (
                  <button
                    type="button"
                    key={photo.id}
                    onClick={() => handlePhotoClick(photo)}
                    className={`relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-black/5 dark:border-white/10 bg-gray-100 dark:bg-zinc-800 transition-transform duration-300 hover:scale-[1.01] text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isHero ? 'sm:col-span-2 sm:row-span-2' : ''
                    }`}
                  >
                    {/* Media: Image or Video */}
                    {isVideo ? (
                      <video
                        src={photo.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <img
                        src={photo.img}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Gradient Overlay & Date/Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                      {photo.date && (
                        <span className="text-[10px] font-semibold text-white/90">
                          {photo.date}
                        </span>
                      )}
                      <p className="text-xs font-bold truncate">{photo.title}</p>
                      {photo.link && (
                        <span className="flex items-center gap-1 text-[11px] text-sky-300 mt-1 font-medium">
                          <span>Open Live Site</span>
                          <ExternalLink size={11} />
                        </span>
                      )}
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {isVideo && (
                        <div className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1 border border-white/10">
                          <Play size={9} className="fill-white" />
                          <span>Video</span>
                        </div>
                      )}
                      {photo.link && (
                        <div className="px-2 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
                          <ExternalLink size={9} />
                          <span>Live</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-56 text-gray-400 text-xs">
              <ImageIcon size={32} className="mb-2 opacity-40" />
              <p>No media found in this category.</p>
            </div>
          )}
        </main>
      </div>

      {/* Lightbox Modal for Selected Photo / Video (Rendered through Portal) */}
      {selectedPhoto &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn select-none"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl max-h-[85vh] bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-2 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Preview"
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <X size={18} />
              </button>
              {selectedPhoto.type === 'video' ? (
                <video
                  src={selectedPhoto.video}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              ) : (
                <img
                  src={selectedPhoto.img}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              )}
              <div className="p-3 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">{selectedPhoto.title}</h4>
                  {selectedPhoto.date && (
                    <p className="text-xs text-gray-400">{selectedPhoto.date}</p>
                  )}
                </div>
                {selectedPhoto.link && (
                  <a
                    href={selectedPhoto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <span>Visit Project</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

const PhotosWindow = WindowWrapper(Photos, 'photos');
export default PhotosWindow;
