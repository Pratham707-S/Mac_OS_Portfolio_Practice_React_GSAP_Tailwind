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
    icon: "terminal.png",
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
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Schedule a call",
    icon: "/icons/calendar.svg",
    bg: "#f4656b",
    link: "tel:+91",
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
    // ▶ Project 1: KP Store
    {
      id: 5,
      name: "Project 1 (KP Store)",
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
              subtitle: "Frontend Architecture & Store Design",
              description: [
                "Built using modern React components with atomic state isolation.",
                "Custom cart persistence, zero external heavy UI libraries, pure CSS & Tailwind.",
              ],
            },
          ],
        },
        {
          id: 102,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 103,
          name: "Screenshot.png",
          icon: "/images/image.png",
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
          subtitle: "KP Store Project TLDR & Notes",
          image: "/images/1786199425015.jpeg",
          description: [
            "KP STORE is an Apple-inspired e-commerce platform built from scratch with React and Tailwind CSS.",
            "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
            "Think of it like walking into a flagship Apple store—but right from your phone or laptop.",
            "It's built with React and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
          ],
        },
      ],
    },

    // ▶ Project 2: REDEFINE GAMING
    {
      id: 6,
      name: "Project 2 (Redefine Gaming)",
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
              subtitle: "GSAP Animation Pipeline",
              description: [
                "Timeline sequencing with ScrollTrigger batching and GPU compositing.",
                "Custom clip-path transitions and high-performance WebGL asset loading.",
              ],
            },
          ],
        },
        {
          id: 202,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 203,
          name: "Screenshot.png",
          icon: "/images/image.png",
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
          subtitle: "Redefine Gaming TLDR & Notes",
          image: "/images/redefine-gaming.png",
          description: [
            "REDEFINE GAMING is an award-winning metagame gaming platform designed for the next generation of web gamers.",
            "Instead of static landing pages, it brings high-voltage 3D animation, interactive trailers, and sound design to the browser.",
            "Engineered with GSAP and React for flawless 60fps performance on modern devices.",
          ],
        },
      ],
    },

    // ▶ Project 3: GSAP Awwwards Experience
    {
      id: 7,
      name: "Project 3 (GSAP Awwwards)",
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
              name: "Timeline-Design.txt",
              icon: "/images/txt.png",
              kind: "file",
              fileType: "txt",
              subtitle: "ScrollTrigger Timeline Blueprint",
              description: [
                "Layered parallax scroll animations, magnetic buttons, and text reveal staggers.",
              ],
            },
          ],
        },
        {
          id: 302,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 303,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/blog3.png",
        },
        {
          id: 304,
          name: "gsap-awwwards.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://gsap-awwwards-website-main-peach.vercel.app/",
        },
        {
          id: 305,
          name: "TLDR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          subtitle: "GSAP Awwwards Project TLDR & Notes",
          image: "/images/blog3.png",
          description: [
            "A showcase of high-end GSAP scroll-triggered timelines, magnetic button interactions, and fluid typography reveals.",
            "Crafted with pure React, Tailwind CSS, and custom GSAP plugin integrations.",
          ],
        },
      ],
    },

    // ▶ Project 4: Creative Motion
    {
      id: 8,
      name: "Project 4 (Creative Motion)",
      icon: "/images/folder.png",
      kind: "folder",
      windowPosition: "top-[40vh] left-7",
      children: [
        {
          id: 401,
          name: "Full case study",
          icon: "/images/folder.png",
          kind: "folder",
        },
        {
          id: 402,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://figma.com",
        },
        {
          id: 403,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/blog2.png",
        },
        {
          id: 404,
          name: "live-demo.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Pratham707-S",
        },
        {
          id: 405,
          name: "TLDR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          subtitle: "Creative Motion Experiments",
          image: "/images/blog2.png",
          description: [
            "Interactive experimental web components built with React 19, Framer Motion, and GSAP.",
            "Features custom physics, smooth inertia scrolling, and high-DPI canvas rendering.",
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