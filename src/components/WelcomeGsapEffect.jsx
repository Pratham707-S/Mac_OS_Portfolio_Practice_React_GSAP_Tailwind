import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontWeight: baseWeight }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = Array.from(container.querySelectorAll("span"));
  const { min, max, default: base } = FONT_WEIGHTS[type];
  let bounds = [];
  let containerLeft = 0;
  let rafId = null;

  const updateBounds = () => {
    const containerRect = container.getBoundingClientRect();
    containerLeft = containerRect.left;
    bounds = letters.map((letter) => {
      const rect = letter.getBoundingClientRect();
      return {
        center: rect.left - containerLeft + rect.width / 2,
        letter,
      };
    });
  };

  const animateLetter = (letter, weight, duration = 0.2) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontWeight: weight,
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e) => {
    if (!bounds.length) updateBounds();
    const mouseX = e.clientX - containerLeft;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      bounds.forEach(({ center, letter }) => {
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 20000);
        animateLetter(letter, min + (max - min) * intensity);
      });
    });
  };

  const handleMouseEnter = () => {
    updateBounds();
  };

  const handleMouseLeave = () => {
    if (rafId) cancelAnimationFrame(rafId);
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
    bounds = [];
  };

  container.addEventListener("mouseenter", handleMouseEnter, { passive: true });
  container.addEventListener("mousemove", handleMouseMove, { passive: true });
  container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    container.removeEventListener("mouseenter", handleMouseEnter);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const WelcomeGsapEffect = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const cleanTitle = setupTextHover(titleRef.current, "title");
    const cleanSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    return () => {
      cleanTitle?.();
      cleanSubtitle?.();
    };
  }, []);

  return (
    <section id="WelcomeGsapEffect" className="max-sm:hidden">
      <p ref={subtitleRef}>
        {renderText("Hi I'm Pratham Welcome to my", "text-3xl font-georama", 100)}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-9xl italic font-georama", 400)}
      </h1>
    </section>
  );
};

export default WelcomeGsapEffect;