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
  Copy,
  BookOpen,
  Code2,
  Lock,
  RefreshCw,
  Check,
  ChevronRight as ArrowRight,
  Globe,
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    date: 'Published Architecture Guide',
    readTime: '6 min read',
    title: 'Understanding How Access and Refresh Tokens (JWT) Work',
    subtitle: 'A complete architectural deep-dive into secure dual-token authentication, silent rotation, and HttpOnly cookie security.',
    image: '/images/jwt-token.jpg',
    url: 'jwt-security-guide.com',
  },
];

const Safari = () => {
  const [activeView, setActiveView] = useState('article'); // 'article' | 'blog'
  const [searchValue, setSearchValue] = useState('jwt-security-guide.com');
  const [copied, setCopied] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('server'); // 'server' | 'client'

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      const query = searchValue.trim();
      if (query.toLowerCase().includes('jwt') || query.toLowerCase().includes('guide')) {
        setActiveView('article');
        setSearchValue('jwt-security-guide.com');
      } else if (query.toLowerCase().includes('blog')) {
        setActiveView('blog');
        setSearchValue('pratham.dev/blog');
      } else if (/^(https?:\/\/|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/.test(query)) {
        const targetUrl = query.startsWith('http') ? query : `https://${query}`;
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText('https://macos-portfolio-phi-ruby.vercel.app/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white font-sans select-none overflow-hidden">
      {/* macOS Safari Header Matching Figma */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#2a2a2c] border-b border-[#3a3a3c] text-[#a1a1aa] shrink-0"
      >
        {/* Left Controls & Navigation */}
        <div className="flex items-center gap-3">
          <WindowControls target="safari" />

          <button
            type="button"
            title="Toggle Sidebar"
            onClick={() => {
              setActiveView((prev) => (prev === 'article' ? 'blog' : 'article'));
              setSearchValue(activeView === 'article' ? 'pratham.dev/blog' : 'jwt-security-guide.com');
            }}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <PanelLeft size={14} />
          </button>

          <div className="flex items-center gap-0.5 text-gray-400">
            <button
              type="button"
              title="Back"
              onClick={() => {
                setActiveView('blog');
                setSearchValue('pratham.dev/blog');
              }}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              title="Forward"
              onClick={() => {
                setActiveView('article');
                setSearchValue('jwt-security-guide.com');
              }}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <button
            type="button"
            title="Privacy Report"
            className="p-1 rounded hover:bg-white/10 text-emerald-400 transition-colors"
          >
            <Shield size={13} />
          </button>
        </div>

        {/* Center Smart Search / Address Bar with Search Engine */}
        <div className="flex-1 max-w-sm mx-4 relative">
          <div className="flex items-center justify-center gap-2 bg-[#1e1e1e] border border-white/10 px-3 py-1 rounded-lg text-xs shadow-inner focus-within:border-blue-500 transition-colors">
            {activeView === 'article' ? (
              <Lock size={11} className="text-emerald-400 flex-none" />
            ) : (
              <Search size={12} className="text-gray-400 flex-none" />
            )}
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search or enter website name"
              className="w-full bg-transparent outline-none border-none p-0 text-xs text-center placeholder:text-gray-400 text-gray-200"
            />
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 text-gray-400">
          <button
            type="button"
            title="Share URL"
            onClick={handleShare}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors relative"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
          </button>
          <button
            type="button"
            title="Reader Mode"
            onClick={() => {
              setActiveView('article');
              setSearchValue('jwt-security-guide.com');
            }}
            className={`p-1 rounded hover:bg-white/10 transition-colors ${
              activeView === 'article' ? 'text-blue-400 bg-white/10' : 'text-gray-400'
            }`}
          >
            <BookOpen size={14} />
          </button>
          <button
            type="button"
            title="Show All Tabs"
            onClick={() => {
              setActiveView('blog');
              setSearchValue('pratham.dev/blog');
            }}
            className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <Copy size={13} />
          </button>
        </div>
      </div>

      {/* Safari Tab Bar */}
      <div className="flex items-center px-3 pt-1.5 bg-[#252527] border-b border-[#3a3a3c] gap-1 text-[11px] select-none shrink-0">
        <button
          type="button"
          onClick={() => {
            setActiveView('article');
            setSearchValue('jwt-security-guide.com');
          }}
          className={`px-3 py-1 rounded-t-md flex items-center gap-1.5 transition-colors ${
            activeView === 'article'
              ? 'bg-[#1c1c1e] text-white font-medium border-t border-x border-[#3a3a3c]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Globe size={11} className="text-blue-400" />
          <span>jwt-security-guide.com</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveView('blog');
            setSearchValue('pratham.dev/blog');
          }}
          className={`px-3 py-1 rounded-t-md flex items-center gap-1.5 transition-colors ${
            activeView === 'blog'
              ? 'bg-[#1c1c1e] text-white font-medium border-t border-x border-[#3a3a3c]'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen size={11} className="text-amber-400" />
          <span>Developer Articles</span>
        </button>
      </div>

      {/* Safari Window Body */}
      <div className="flex-1 bg-[#1c1c1e] overflow-y-auto select-text p-6 sm:p-8">
        {activeView === 'article' ? (
          /* ================= ARTICLE READER VIEW ================= */
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            {/* Top Article Badge & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Security Architecture
                </span>
                <span className="text-[11px] text-zinc-400">Published Reference</span>
                <span className="text-[11px] text-zinc-600">•</span>
                <span className="text-[11px] text-zinc-400">6 min read</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                Understanding How Access &amp; Refresh Tokens (JWT) Work
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  By <strong className="text-zinc-200 font-medium">Pratham Tiwari</strong> — Full Stack &amp; Backend Engineering Guide
                </p>
                <a
                  href="https://medium.com/@pratham.1226667/understanding-how-access-and-refresh-tokens-work-9bf0fb9a898f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#1a8917] hover:bg-[#156f12] text-white rounded-lg text-[11px] font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open on Medium</span>
                  <ArrowRight size={10} />
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900">
              <img
                src="/images/jwt-token.jpg"
                alt="JWT Architecture Diagram"
                className="w-full h-44 sm:h-52 object-cover"
              />
            </div>

            {/* Quick Summary Pill */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/30 text-xs text-blue-100/90 leading-relaxed">
              💡 <strong>Core Insight:</strong> JSON Web Tokens (JWT) provide stateless authentication. By combining short-lived <strong>Access Tokens (15 mins)</strong> stored in-memory with encrypted <strong>Refresh Tokens (7 days)</strong> in HttpOnly cookies, applications prevent XSS/CSRF token leakage while providing zero-friction session persistence.
            </div>

            {/* Section 1: Architecture Blueprint */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Lock size={15} className="text-amber-400" />
                <span>1. The Dual-Token Security Paradigm</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-400">Access Token</span>
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">15m Expiry</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Stateless token carrying user ID &amp; roles. Sent in the <code>Authorization: Bearer &lt;token&gt;</code> header with every REST request.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-400">Refresh Token</span>
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">7d Expiry</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Stored strictly in <code>HttpOnly, SameSite=Strict</code> secure cookies. Used solely to obtain a new access token when expired.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Flow Steps */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <RefreshCw size={15} className="text-sky-400" />
                <span>2. Automated Silent Refresh Lifecycle</span>
              </h2>

              <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <span className="flex-none w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">1</span>
                  <p className="text-[11.5px]"><strong className="text-white">Authentication:</strong> Client submits credentials. Server validates and issues both tokens.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-none w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">2</span>
                  <p className="text-[11.5px]"><strong className="text-white">API Requests:</strong> Client communicates using the Access Token in Axios memory.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-none w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">3</span>
                  <p className="text-[11.5px]"><strong className="text-white">401 Interception:</strong> When access token expires (15m), Axios interceptor catches 401 Unauthorized.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex-none w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">4</span>
                  <p className="text-[11.5px]"><strong className="text-white">Silent Rotation:</strong> Interceptor silently hits <code>/api/auth/refresh</code> with the HttpOnly cookie, receives a new Access Token, and replays the original failed requests without user interruption.</p>
                </div>
              </div>
            </div>

            {/* Section 3: Code Snippets */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Code2 size={15} className="text-emerald-400" />
                  <span>3. Implementation Blueprint</span>
                </h2>

                <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setActiveCodeTab('server')}
                    className={`px-2 py-0.5 rounded ${
                      activeCodeTab === 'server' ? 'bg-blue-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Express Backend
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCodeTab('client')}
                    className={`px-2 py-0.5 rounded ${
                      activeCodeTab === 'client' ? 'bg-blue-600 text-white font-medium' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Axios Interceptor
                  </button>
                </div>
              </div>

              {activeCodeTab === 'server' ? (
                <div className="p-3 bg-[#121214] rounded-lg border border-zinc-800 font-mono text-[10.5px] text-emerald-300/90 overflow-x-auto">
                  <pre>{`// Express.js Refresh Route & Cookie Setter
app.post('/api/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.jwt_refresh;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.ACCESS_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccessToken });
  });
});`}</pre>
                </div>
              ) : (
                <div className="p-3 bg-[#121214] rounded-lg border border-zinc-800 font-mono text-[10.5px] text-sky-300/90 overflow-x-auto">
                  <pre>{`// Axios Response Interceptor for Silent Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
      api.defaults.headers.common['Authorization'] = \`Bearer \${data.accessToken}\`;
      originalRequest.headers['Authorization'] = \`Bearer \${data.accessToken}\`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);`}</pre>
                </div>
              )}
            </div>

            {/* Footer tags */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
              {['JWT', 'Node.js', 'Express', 'React', 'Web Security', 'HttpOnly Cookies', 'Redis Blacklist'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* ================= BLOG OVERVIEW LIST ================= */
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-center text-sm font-semibold text-[#f4656b] mb-8 tracking-wide">
              My Developer Blog &amp; Case Studies
            </h2>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setActiveView('article');
                    setSearchValue(post.url);
                  }}
                  className="group flex items-center gap-4 cursor-pointer p-3 -mx-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-blue-500/40 transition-all shadow-md"
                >
                  <div className="w-16 h-16 flex-none rounded-xl overflow-hidden bg-zinc-800 shadow-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-gray-400 block mb-0.5 font-normal">
                      {post.date} • {post.readTime}
                    </span>

                    <h3 className="text-xs sm:text-[13px] font-semibold text-white leading-snug group-hover:text-[#60a5fa] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <span className="text-sky-400 text-xs font-medium flex items-center gap-0.5 mt-1 group-hover:underline">
                      <span>Read Full Architecture Guide in Safari</span>
                      <ArrowRight size={12} className="inline-block" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;
