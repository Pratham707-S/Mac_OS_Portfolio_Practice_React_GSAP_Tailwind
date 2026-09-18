const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Finder",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Safari",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Photos",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "terminal.svg",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash.png",
    canOpen: true,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Published on Medium",
    title: "Understanding How Access and Refresh Tokens Work",
    image: "/images/jwt-token.jpg",
    link: "https://medium.com/@pratham.1226667/understanding-how-access-and-refresh-tokens-work-9bf0fb9a898f",
  },
];

const techStack = [
  {
    category: "Programming Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python (Basics)", "Java (Basics)"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "GSAP"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    category: "Database",
    items: ["MongoDB", "Mongoose"],
  },
  {
    category: "Core Concepts",
    items: ["Data Structures & Algorithms", "Responsive Web Design", "API Integration", "JWT Authentication", "MVC Architecture"],
  },
  {
    category: "Tools & AI",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render", "Cursor AI", "Cline", "Ollama", "OpenRouter", "Claude", "ChatGPT", "Antigravity", "n8n"],
  },
];

const socials = [
  {
    id: 1,
    text: "Schedule a call",
    icon: "/icons/calendar.svg",
    bg: "#f4656b",
    link: "https://cal.com/pratham-tiwari",
  },
  {
    id: 2,
    text: "Email me",
    icon: "/icons/send.svg",
    bg: "#4bcb63",
    link: "mailto:prathamtiwari.dev@gmail.com",
  },
  {
    id: 3,
    text: "GitHub",
    icon: "/icons/github.svg",
    bg: "#ff866b",
    link: "https://github.com/Pratham707-S",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/pratham-tiwari-962a00342/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Videos",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1: KP Store (Apple E-Commerce)
    {
      id: 5,
      name: "KP Store (Apple E-Commerce)",
      icon: "/images/folder.png",
      kind: "folder",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 101,
          name: "Full case study",
          icon: "/images/folder.png",
          kind: "folder",
          children: [
            {
              id: 1011,
              name: "Architecture.txt",
              icon: "/images/txt.png",
              kind: "file",
              fileType: "txt",
              subtitle: "Frontend Architecture & Store Mechanics",
              description: [
                "1. Technical Architecture & Stack:",
                "• Core Framework: React 19, Tailwind CSS v4, and modern ESNext standards.",
                "• State Engine: Built with isolated Context and Reducer patterns ensuring zero re-rendering bottlenecks across multi-item operations.",
                "• Zero Dependencies: Developed without heavy third-party UI component libraries for lightning-fast sub-second loading.",
                "",
                "2. Key Engineering Challenges Solved:",
                "• Instant bidirectional state synchronization between global cart drawers and product catalog matrices.",
                "• Deterministic cart calculation engine supporting coupon codes, dynamic tax brackets, and tiered shipping.",
                "• High-DPI responsive design strictly conforming to Apple Human Interface Guidelines (HIG).",
                "",
                "3. Performance Metrics:",
                "• Perfect 100/100 Lighthouse performance and accessibility scores.",
                "• Zero Cumulative Layout Shift (CLS) during drawer animations and lazy loaded media.",
              ],
            },
          ],
        },
        {
          id: 102,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 103,
          name: "Screenshot.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/1786199425015.jpeg",
        },
        {
          id: 104,
          name: "kp-store.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://react-shopping-cart-by-hand-no-ai.vercel.app/",
        },
        {
          id: 105,
          name: "TLDR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          subtitle: "KP Store — Apple Inspired Full-Stack E-Commerce Experience",
          image: "/images/1786199425015.jpeg",
          description: [
            "KP STORE is a flagship Apple-inspired e-commerce platform built from the ground up with React and Tailwind CSS.",
            "Instead of a standard generic storefront, it delivers a luxury shopping experience featuring bold typography, interactive high-resolution product showcases, animated slider navigation, and seamless drawer checkout.",
            "Engineered with strict zero-dependency principles for pure performance, deterministic cart state management, and silky 60fps animations across phones, tablets, and desktops.",
          ],
        },
      ],
    },

    // ▶ Project 2: Redefine Gaming (3D Showcase)
    {
      id: 6,
      name: "Redefine Gaming (3D Showcase)",
      icon: "/images/folder.png",
      kind: "folder",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 201,
          name: "Full case study",
          icon: "/images/folder.png",
          kind: "folder",
          children: [
            {
              id: 2011,
              name: "Motion-Specs.txt",
              icon: "/images/txt.png",
              kind: "file",
              fileType: "txt",
              subtitle: "GSAP Motion Pipeline & 3D Engine",
              description: [
                "1. Motion Pipeline & Animation Engine:",
                "• GSAP 3 (ScrollTrigger, Flip, Observer) for complex multi-stage timeline orchestration.",
                "• GPU-composited canvas transforms with zero frame drops during intense scroll events.",
                "• Custom easing curves tailored specifically for cinematic storytelling and metagame reveals.",
                "",
                "2. Performance & Innovations:",
                "• Asynchronous asset prefetching guaranteeing instant scene switches and uninterrupted audio-visual immersion.",
                "• Interactive cursor physics and layered parallax depth mapping.",
                "• Fully responsive rendering scaling seamlessly from 4K ultra-wide monitors down to mobile viewports.",
                "",
                "3. Design Aesthetics:",
                "• Neo-brutalist dark gaming aesthetic with glowing neon accents, sharp typography, and micro-interactions.",
              ],
            },
          ],
        },
        {
          id: 202,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 203,
          name: "Screenshot.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/redefine-gaming.png",
        },
        {
          id: 204,
          name: "redefine-gaming.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://award-winning-website-main-beryl.vercel.app/",
        },
        {
          id: 205,
          name: "TLDR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          subtitle: "Redefine Gaming — Award-Winning 3D Metagame Showcase",
          image: "/images/redefine-gaming.png",
          description: [
            "REDEFINE GAMING is an award-winning interactive metagame gaming platform designed for next-generation web experiences.",
            "Instead of static landing pages, it brings high-voltage 3D animation, interactive trailers, magnetic sound design, and custom GSAP ScrollTrigger timelines directly to the browser.",
            "Crafted with React, Tailwind CSS, and custom shader/canvas effects for flawless 60fps performance on all modern devices.",
          ],
        },
      ],
    },

    // ▶ Project 3: JWT Auth (Security Guide)
    {
      id: 7,
      name: "JWT Auth (Security Guide)",
      icon: "/images/folder.png",
      kind: "folder",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 301,
          name: "Full case study",
          icon: "/images/folder.png",
          kind: "folder",
          children: [
            {
              id: 3011,
              name: "Security-Blueprint.txt",
              icon: "/images/txt.png",
              kind: "file",
              fileType: "txt",
              subtitle: "Dual-Token Architecture & Cryptographic Specs",
              description: [
                "1. Core Security Paradigm:",
                "• Dual-token strategy: Short-lived Access Tokens (15 minutes) + Encrypted Refresh Tokens (7 days).",
                "• Stored in Secure HttpOnly, SameSite=Strict cookies to eliminate Cross-Site Scripting (XSS) attack vectors.",
                "• Automated silent refresh interception through Axios/Fetch middleware with zero user session interruption.",
                "",
                "2. Threat Mitigation & Revocation:",
                "• In-memory Redis token blacklisting for instantaneous session revocation upon password changes or logout.",
                "• Cryptographic fingerprint validation preventing stolen refresh token replay attacks.",
                "",
                "3. Full-Stack Production Implementation:",
                "• Complete backend service built with Node.js, Express.js, MongoDB, and Mongoose.",
                "• Comprehensive unit and integration test suite verifying edge-case expiration behaviors.",
              ],
            },
          ],
        },
        {
          id: 302,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 303,
          name: "Screenshot.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/jwt-token.jpg",
        },
        {
          id: 304,
          name: "jwt-security-guide.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "safari",
        },
        {
          id: 305,
          name: "TLDR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          subtitle: "JWT Access & Refresh Token System — Deep Dive",
          image: "/images/jwt-token.jpg",
          description: [
            "A comprehensive technical deep-dive and production-ready architecture blueprint on modern authentication security.",
            "Published on Medium to widespread developer acclaim, covering HttpOnly cookie storage, silent token rotation, Redis blacklisting, and CSRF/XSS defense strategies.",
            "Includes production-tested Node.js, Express, and React reference implementations for enterprise-grade authentication.",
          ],
        },
      ],
    },

    // ▶ Project 4: macOS & iOS Portfolio OS
    {
      id: 8,
      name: "macOS & iOS Portfolio OS",
      icon: "/images/folder.png",
      kind: "folder",
      windowPosition: "top-[40vh] left-7",
      children: [
        {
          id: 401,
          name: "Full case study",
          icon: "/images/folder.png",
          kind: "folder",
          children: [
            {
              id: 4011,
              name: "OS-Architecture.txt",
              icon: "/images/txt.png",
              kind: "file",
              fileType: "txt",
              subtitle: "Portfolio OS System Blueprint",
              description: [
                "1. Window & App Management Engine:",
                "• Dynamic multi-window z-index layering and boundary-restricted GSAP Draggable physics.",
                "• Viewport detection dynamically switching between macOS desktop and iPhone iOS interface.",
                "• HTML5 audio engine with synchronized live lyrics and ambient theme coordination.",
                "",
                "2. State & Component Ecosystem:",
                "• Fully interactive native applications: Finder, Safari, Terminal, Photos, Apple Music, Notes, Calendar, Settings, and Messages.",
                "• Real-time system notifications, search spotlight, battery simulation, and dock magnification physics.",
                "",
                "3. Performance & Code Quality:",
                "• Zero layout shifts and strict TypeScript/JavaScript modularity.",
                "• Full keyboard shortcut support and Apple HIG design fidelity.",
              ],
            },
          ],
        },
        {
          id: 402,
          name: "Design.fig",
          icon: "/images/figma.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 403,
          name: "Screenshot.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/pratham.jpg",
        },
        {
          id: 404,
          name: "portfolio-os.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Pratham707-S/Mac_OS_Portfolio_Practice_React_GSAP_Tailwind",
        },
        {
          id: 405,
          name: "TLDR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          subtitle: "macOS & iOS Interactive Portfolio Operating System",
          image: "/images/pratham.jpg",
          description: [
            "An interactive developer portfolio operating system simulating macOS Tahoe on desktop and iOS 18 on mobile devices.",
            "Features fully functional desktop apps (Finder, Terminal, Safari, Photos, Contact, Trash) and an iPhone suite (Music with live lyrics, Notes, Files, Calendar, Settings, Camera, Messages).",
            "Engineered with React 19, GSAP, Tailwind CSS, and custom audio/drag physics engines.",
          ],
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/pratham.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/pratham.jpg",
      description: [
        "Hey! I'm Pratham 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and GSAP—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I'm big on clean UI, good UX, and writing code that doesn't need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping chai/coffee, and exploring creative web animations 🚀",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
    {
      id: 3,
      name: "legacy-jquery-v1.zip",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-10 left-50",
      subtitle: "Old 2023 Portfolio Archive",
      description: [
        "Legacy portfolio built with jQuery and CSS floats.",
        "Archived and safely trashed in favor of React 19, GSAP, and Tailwind CSS! 🚀",
      ],
    },
    {
      id: 4,
      name: "bugs-resolved.log",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-40 left-20",
      subtitle: "Squashed Bugs Log",
      description: [
        "✓ Fixed Draggable input intercepting",
        "✓ Fixed White screen on missing Lucide icons",
        "✓ Cleaned up redundant CSS selectors",
        "All bugs successfully trashed! 🐛🚫",
      ],
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };