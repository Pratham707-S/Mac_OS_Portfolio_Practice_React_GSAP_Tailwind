export const filesProjectsData = [
  {
    id: "kp-store",
    folderName: "KP Store (Apple E-Commerce)",
    name: "KP Store",
    displayTitle: "KP Store\n(E-Commerce)",
    screenshotImg: "/images/1786199425015.jpeg",
    liveUrl: "https://react-shopping-cart-by-hand-no-ai.vercel.app/",
    domain: "kp-store.app",
    tldr: "KP Store — Apple Inspired Full-Stack E-Commerce Experience\n\n• Overview: A flagship Apple-style e-commerce platform built from scratch with React 19, Tailwind CSS, and deterministic cart mechanics.\n• Key Engineering: Modular component architecture, instant state reconciliation with zero re-rendering lag, and responsive design across all devices.\n• Highlights: Rich product showcase cards, live search filtering, animated drawer checkout, and deterministic pricing calculations.",
    caseStudy: "KP Store — Full Architectural Breakdown\n\n1. Technical Architecture:\n• Framework: React 19 & Tailwind CSS v4\n• State Management: Custom Context & Reducer pattern for deterministic cart dispatching\n• Performance: Sub-second initial load, lazy loaded image assets, 100/100 Lighthouse performance\n\n2. Key Engineering Challenges Solved:\n• State synchronization across complex multi-item cart quantities\n• Fluid checkout animation with zero layout shifts\n• Mobile-first responsive touch navigation conforming to Apple HIG standards\n\n3. Business Impact:\n• Instant checkout simulation with real-time tax and shipping calculation\n• High customer engagement through interactive product galleries",
  },
  {
    id: "redefine-gaming",
    folderName: "Redefine Gaming (3D Showcase)",
    name: "Redefine Gaming",
    displayTitle: "Redefine Gaming\n(3D Experience)",
    screenshotImg: "/images/redefine-gaming.png",
    liveUrl: "https://award-winning-website-main-beryl.vercel.app/",
    domain: "redefine-gaming.app",
    tldr: "Redefine Gaming — Award-Winning 3D Metagame Showcase\n\n• Overview: A high-voltage interactive gaming platform featuring custom GSAP ScrollTrigger timelines, 3D video integrations, and magnetic sound design.\n• Key Engineering: Hardware-accelerated GPU transitions, clip-path morphing, and fluid layout physics.\n• Highlights: Smooth 60fps scrolling, Awwwards-inspired typography animations, and seamless video streaming.",
    caseStudy: "Redefine Gaming — Full Technical Case Study\n\n1. Motion Pipeline & Animation Engine:\n• GSAP 3 (ScrollTrigger, Flip, Observer) for timeline orchestration\n• GPU-composited canvas transforms with zero jank\n• Custom easing physics tailored for immersive storytelling\n\n2. Key Innovations:\n• Asynchronous asset prefetching for instantaneous scene switches\n• Interactive cursor following and dynamic depth parallax\n• Fully responsive across 4K displays down to iPhone screens\n\n3. Design Philosophy:\n• Dark neo-brutalist aesthetic with neon accents and high contrast typography",
  },
  {
    id: "jwt-auth",
    folderName: "JWT Auth (Security Guide)",
    name: "JWT Architecture",
    displayTitle: "JWT Auth\n(Security System)",
    screenshotImg: "/images/jwt-token.jpg",
    liveUrl: "https://medium.com/@pratham.1226667/understanding-access-and-refresh-tokens-jwt-012ab63cfbf5",
    domain: "medium.com/@pratham",
    tldr: "JWT Access & Refresh Token System — Architectural Deep Dive\n\n• Overview: Comprehensive guide and production reference on implementing secure dual-token authentication workflows.\n• Key Engineering: HttpOnly cookie storage, silent token rotation, Redis token blacklisting, and cross-site scripting (XSS/CSRF) mitigation.\n• Highlights: Published on Medium with wide developer readership and production-ready security blueprints.",
    caseStudy: "JWT Token Architecture — Comprehensive Security Case Study\n\n1. Core Security Paradigm:\n• Dual-token strategy: Short-lived Access Tokens (15m) + Encrypted Refresh Tokens (7d)\n• Automated silent refresh interception via Axios/Fetch middleware\n• Token revocation lists & secure fingerprint validation\n\n2. Implementation Highlights:\n• Protection against replay attacks and credential harvesting\n• Stateless authentication scaling to millions of concurrent sessions\n• Complete backend implementation in Node.js, Express & MongoDB\n\n3. Key Takeaways:\n• Zero token leakage via XSS protection\n• Seamless user session persistence across browser restarts",
  },
  {
    id: "portfolio-os",
    folderName: "macOS & iOS Portfolio OS",
    name: "Portfolio OS",
    displayTitle: "Portfolio OS\n(macOS & iOS)",
    screenshotImg: "/images/pratham.jpg",
    liveUrl: "https://github.com/Pratham707-S/Mac_OS_Portfolio_Practice_React_GSAP_Tailwind",
    domain: "github.com/Pratham707-S",
    tldr: "Interactive macOS & iOS Developer Portfolio Operating System\n\n• Overview: A full desktop and mobile simulation with draggable windows, dynamic dark mode, Apple Music player with live synced lyrics, and native app ecosystem.\n• Key Engineering: React 19, GSAP Draggable, Zustand state store, Tailwind CSS, and modular component architecture.",
    caseStudy: "macOS & iOS Portfolio OS — Architectural Blueprint\n\n1. Window & App Management Engine:\n• Multi-window z-index layering and boundary-restricted GSAP drag physics\n• Viewport detection dynamically switching between macOS desktop and iPhone iOS interface\n• HTML5 audio engine with synchronized live lyrics and ambient theme coordination\n\n2. Performance & Code Quality:\n• Zero layout shifts and strict TypeScript/JavaScript modularity\n• Full keyboard shortcut support and Apple HIG design fidelity",
  },
];

export const photosGalleryData = [
  {
    id: "pratham-profile",
    title: "Pratham Tiwari — Profile & LinkedIn",
    category: "Profile",
    src: "/images/pratham.jpg",
    isProfile: true,
    linkedinUrl: "https://www.linkedin.com/in/pratham-tiwari-a5518b264/",
  },
  {
    id: "kp-store",
    title: "KP Store — Apple E-Commerce Platform",
    category: "Projects",
    src: "/images/1786199425015.jpeg",
  },
  {
    id: "redefine-gaming",
    title: "Redefine Gaming — Award-Winning 3D Showcase",
    category: "Projects",
    src: "/images/redefine-gaming.png",
  },
  {
    id: "jwt-guide",
    title: "JWT Token Security Architecture Breakdown",
    category: "Articles",
    src: "/images/jwt-token.jpg",
  },
];

export const safariBlogData = {
  article: {
    title: "Understanding How Access and Refresh Tokens (JWT) Work in Modern Web Apps",
    subtitle: "A complete architectural deep-dive into secure authentication, silent token rotation, and HttpOnly cookie security.",
    date: "Published on Medium",
    readTime: "6 min read",
    mediumUrl: "https://medium.com/@pratham.1226667/understanding-access-and-refresh-tokens-jwt-012ab63cfbf5",
    tags: ["JWT", "Node.js", "Express", "Authentication", "Web Security", "React"],
  },
};
