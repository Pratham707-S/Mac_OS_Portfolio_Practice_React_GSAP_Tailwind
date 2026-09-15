import React, { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Share2,
  BookOpen,
  Search,
  ExternalLink,
  X,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Mastering 60fps GSAP Animations in Modern React',
    category: 'GSAP Motion',
    date: 'Aug 15, 2025',
    readTime: '6 min read',
    image: '/images/blog3.png',
    summary:
      'A deep dive into building butter-smooth scroll triggers, timeline sequencing, and avoiding memory leaks in React with useGSAP and layout cleans.',
    externalLink: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations',
    content: {
      intro:
        'GSAP (GreenSock Animation Platform) is the industry standard for high-performance web animations. In React applications, managing animations within the component lifecycle is critical for maintaining 60fps frame rates.',
      sections: [
        {
          heading: '1. Why useGSAP Hook is a Game Changer',
          body: 'With React 18 strict mode and double mount cycles, manual gsap.to cleanups often left orphaned tweens. The @gsap/react useGSAP hook handles automatic context reversion and scope isolation effortlessly.',
        },
        {
          heading: '2. Avoiding Layout Thrashing with GPU Layers',
          body: 'Always animate transform properties (x, y, scale, rotation) and opacity rather than width, top, or left. Transforms execute on the GPU compositor thread, completely skipping expensive browser reflow cycles.',
        },
        {
          heading: '3. ScrollTrigger Batching & Performance',
          body: 'When animating multiple cards or items on scroll, use ScrollTrigger.batch() to trigger animations in batches instead of attaching hundreds of individual listeners to the DOM.',
        },
      ],
      keyTakeaways: [
        'Always clean up tweens on component unmount.',
        'Prefer transforms over positional properties.',
        'Use ScrollTrigger fastScrollEnd for smooth mobile interactions.',
      ],
    },
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Three.js for 3D Web Experiences',
    category: 'Three.js 3D',
    date: 'Aug 28, 2025',
    readTime: '8 min read',
    image: '/images/blog2.png',
    summary:
      'Learn how to render interactive 3D models, configure shaders, and optimize WebGL draw calls for immersive browser portfolios.',
    externalLink: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development',
    content: {
      intro:
        '3D elements transform standard web interfaces into memorable digital experiences. Three.js simplifies WebGL complexity into an intuitive scene-camera-renderer paradigm.',
      sections: [
        {
          heading: '1. Setting up Scene, Camera, and Canvas',
          body: 'Creating a balanced perspective camera and responsive WebGL renderer with proper pixel ratio clamping (Math.min(window.devicePixelRatio, 2)) ensures crisp visuals on Retina screens without overheating mobile GPUs.',
        },
        {
          heading: '2. Lighting & PBR Materials',
          body: 'Using MeshStandardMaterial with HDRI environment maps provides realistic physically based rendering (PBR) reflections without requiring heavy raytracing computations.',
        },
        {
          heading: '3. Optimizing GLTF Models with DRACO Compression',
          body: 'Draco compression reduces 3D asset size by up to 80%, drastically improving Largest Contentful Paint (LCP) and network download times.',
        },
      ],
      keyTakeaways: [
        'Clamp pixel ratio to 2 for optimal performance.',
        'Compress 3D geometry with Draco and glTF-transform.',
        'Dispose of geometries and textures when scenes unmount.',
      ],
    },
  },
  {
    id: 3,
    title: 'TypeScript & Modern State Architecture in Web Apps',
    category: 'React & State',
    date: 'Sep 2, 2025',
    readTime: '5 min read',
    image: '/images/blog1.png',
    summary:
      'Structuring scalable React state management using Zustand, TypeScript generics, and Higher-Order Components for cleaner modular codebases.',
    externalLink: 'https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it',
    content: {
      intro:
        'As frontend apps scale, prop drilling and bloated context providers create performance bottlenecks. Modern state libraries like Zustand combine atomic updates with zero boilerplate.',
      sections: [
        {
          heading: '1. Lightweight State with Zustand & Immer',
          body: 'Zustand provides a minimal hook-based store. Combining it with Immer enables direct immutable mutations while maintaining fine-grained component re-rendering.',
        },
        {
          heading: '2. Higher-Order Component Patterns for Window Managers',
          body: 'Wrapping windows in a reusable WindowWrapper HOC abstracts drag physics, z-index elevation, and focus states away from individual view components.',
        },
        {
          heading: '3. Type-Safe Action Dispatches',
          body: 'Leveraging TypeScript strict interfaces ensures every store dispatch and payload adheres to validated contracts at compile time.',
        },
      ],
      keyTakeaways: [
        'Keep global state minimal; localize UI state whenever possible.',
        'Use selector hooks to prevent unnecessary re-renders.',
        'Abstract repetitive window lifecycle logic into HOCs.',
      ],
    },
  },
];

const categories = ['All', 'GSAP Motion', 'Three.js 3D', 'React & State'];

const Safari = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState(null);
  const [urlAddress, setUrlAddress] = useState('https://pratham.dev/journal');

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl overflow-hidden font-sans select-none">
      {/* Safari Window Header & Toolbar */}
      <div
        id="window-header"
        className="flex flex-col bg-[#f0f0f2] dark:bg-[#252528] border-b border-gray-200 dark:border-[#3a3a3c]"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-4">
            <WindowControls target="safari" />

            {/* Nav Arrows */}
            <div className="flex items-center gap-1 text-gray-400">
              <button
                aria-label="Back"
                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                aria-label="Forward"
                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Smart URL Bar */}
          <div className="flex-1 max-w-lg mx-4 flex items-center gap-2 bg-white dark:bg-[#18181b] border border-gray-300/80 dark:border-zinc-700 px-3 py-1.5 rounded-lg shadow-inner text-xs text-gray-700 dark:text-gray-200">
            <Lock size={12} className="text-emerald-500 flex-none" />
            <input
              type="text"
              value={urlAddress}
              onChange={(e) => setUrlAddress(e.target.value)}
              className="w-full bg-transparent outline-none border-none p-0 text-xs font-mono text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              title="Reload Page"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <RotateCw size={12} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(urlAddress);
              }}
              title="Copy Link"
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Tab & Filter Strip */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#e8e8ea] dark:bg-[#1f1f22] border-t border-gray-200/60 dark:border-black/20 text-xs">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* In-page Search */}
          <div className="flex items-center gap-1.5 bg-white/70 dark:bg-black/30 border border-gray-300/50 dark:border-white/10 px-2 py-0.5 rounded-md text-[11px]">
            <Search size={11} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter notes..."
              className="bg-transparent outline-none border-none p-0 w-24 text-[11px] text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={10} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Safari Main Content Area */}
      <div className="p-5 max-h-[520px] min-h-[460px] overflow-y-auto bg-[#fafafa] dark:bg-[#18181b]">
        {/* Banner Hero */}
        <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles size={13} />
              <span>Engineering Journal & Notes</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">
              Thoughts on Frontend Architecture & Motion Design
            </h2>
            <p className="text-xs text-blue-100/90 mt-1 max-w-xl leading-relaxed">
              Curated deep-dives on GSAP smooth animations, Three.js 3D rendering, and scalable React architectures by Pratham Tiwari.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 text-right">
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md font-semibold">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group flex flex-col bg-white dark:bg-[#202024] rounded-xl border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Image Banner */}
              <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold">
                  {article.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-400 mb-1.5 font-medium">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setReadingArticle(article)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <BookOpen size={12} />
                    <span>Read Article</span>
                  </button>

                  {article.externalLink && (
                    <a
                      href={article.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open External Resource"
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 text-xs">
            <BookOpen size={36} className="mb-2 opacity-40" />
            <p>No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Safari Apple Reader Mode Overlay */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#fbfbfb] dark:bg-[#1c1c1e] text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl border border-black/10 dark:border-white/15 overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Reader Header */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {readingArticle.category} • Apple Reader Mode
              </span>
              <h1 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">
                {readingArticle.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium">
                <span>By Pratham Tiwari</span>
                <span>•</span>
                <span>{readingArticle.date}</span>
                <span>•</span>
                <span>{readingArticle.readTime}</span>
              </div>
            </div>

            {/* Featured Article Image */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-sm max-h-56 bg-zinc-900">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Intro */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-serif italic mb-6 border-l-4 border-blue-500 pl-4 py-1">
              "{readingArticle.content.intro}"
            </p>

            {/* Article Sections */}
            <div className="space-y-6 text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
              {readingArticle.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    {sec.heading}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}

              {/* Key Takeaways Card */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 mt-6">
                <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-2">
                  Key Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-blue-900 dark:text-blue-200">
                  {readingArticle.content.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* External Read Option */}
            {readingArticle.externalLink && (
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Want to explore more references?
                </span>
                <a
                  href={readingArticle.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  <span>Open Full Resource</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;
