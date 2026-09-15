import React, { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  Search,
  Share2,
  Plus,
  Copy,
  ChevronRight as ArrowRight,
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    date: 'Sep 2, 2025',
    title: 'How I Built My macOS-Style Dev Portfolio with React + Tailwind',
    image: '/images/blog1.png',
    link: 'https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it',
  },
  {
    id: 2,
    date: 'Aug 28, 2025',
    title: 'How I Organize My Projects for Sanity and Speed',
    image: '/images/blog2.png',
    link: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development',
  },
  {
    id: 3,
    date: 'Aug 15, 2025',
    title: 'Small UX Details That Make a Big Difference (and How I Implemented Them)',
    image: '/images/blog3.png',
    link: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations',
  },
];

const Safari = () => {
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openPost = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#1e1e1e] text-white rounded-xl shadow-2xl overflow-hidden font-sans select-none border border-[#3a3a3c]">
      {/* macOS Safari Header Matching Figma */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#2a2a2c] border-b border-[#3a3a3c] text-[#a1a1aa]"
      >
        {/* Left Controls & Navigation */}
        <div className="flex items-center gap-3">
          <WindowControls target="safari" />

          <button
            type="button"
            title="Toggle Sidebar"
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <PanelLeft size={14} />
          </button>

          <div className="flex items-center gap-0.5 text-gray-400">
            <button
              type="button"
              title="Back"
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              title="Forward"
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <button
            type="button"
            title="Privacy Report"
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Shield size={13} />
          </button>
        </div>

        {/* Center Smart Search / Address Bar */}
        <div className="flex-1 max-w-sm mx-4 flex items-center justify-center gap-2 bg-[#1e1e1e] border border-white/10 px-3 py-1 rounded-lg text-xs shadow-inner">
          <Search size={12} className="text-gray-400 flex-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search or enter website name"
            className="w-full bg-transparent outline-none border-none p-0 text-xs text-center placeholder:text-gray-400 text-gray-200"
          />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 text-gray-400">
          <button
            type="button"
            title="Share"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <Share2 size={14} />
          </button>
          <button
            type="button"
            title="New Tab"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <Plus size={15} />
          </button>
          <button
            type="button"
            title="Show All Tabs"
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <Copy size={13} />
          </button>
        </div>
      </div>

      {/* Safari Window Body */}
      <div className="p-8 sm:p-10 bg-[#1c1c1e] min-h-[380px] max-h-[460px] overflow-y-auto">
        {/* Title */}
        <h2 className="text-center text-sm font-semibold text-[#f4656b] mb-8 tracking-wide">
          My Developer Blog
        </h2>

        {/* Blog Posts List */}
        <div className="max-w-md mx-auto space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => openPost(post.link)}
              className="group flex items-center gap-4 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 flex-none rounded-xl overflow-hidden bg-zinc-800 shadow-md">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-gray-400 block mb-0.5 font-normal">
                  {post.date}
                </span>

                <h3 className="text-xs sm:text-[13px] font-semibold text-white leading-snug group-hover:text-[#60a5fa] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <span className="text-sky-400 text-xs font-medium flex items-center gap-0.5 mt-1 group-hover:underline">
                  <span>Check out the full post</span>
                  <ArrowRight size={12} className="inline-block" />
                </span>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 text-xs py-8">
              No matching blog posts found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;
