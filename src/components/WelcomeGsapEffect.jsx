import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 600, default: 100 },
  title: { min: 300, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={`inline-block transition-colors duration-150 ${className}`}
      style={{
        fontWeight: baseWeight,
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Check if mouse is within vertical reach of container
    const isNearbyY = mouseY >= rect.top - 60 && mouseY <= rect.bottom + 60;
    if (!isNearbyY) return;

    letters.forEach((letter) => {
      const lRect = letter.getBoundingClientRect();
      const letterCenterX = lRect.left + lRect.width / 2;
      const distance = Math.abs(mouseX - letterCenterX);
      const intensity = Math.exp(-(distance ** 2) / 16000);

      const targetWeight = Math.round(min + (max - min) * intensity);
      const targetY = -12 * intensity;
      const targetScale = 1 + 0.18 * intensity;

      gsap.to(letter, {
        fontWeight: targetWeight,
        y: targetY,
        scale: targetScale,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: function () {
          letter.style.fontVariationSettings = `'wght' ${targetWeight}`;
        },
      });
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      gsap.to(letter, {
        fontWeight: base,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: function () {
          letter.style.fontVariationSettings = `'wght' ${base}`;
        },
      });
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
    window.removeEventListener("mousemove", handleMouseMove);
  };
};

const WelcomeGsapEffect = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial entrance animation
    const subtitleLetters = subtitleRef.current?.querySelectorAll("span") || [];
    const titleLetters = titleRef.current?.querySelectorAll("span") || [];

    tl.fromTo(
      subtitleLetters,
      { opacity: 0, y: 30, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.02, duration: 0.8 }
    ).fromTo(
      titleLetters,
      { opacity: 0, y: 40, scale: 0.8, filter: "blur(12px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", stagger: 0.03, duration: 1 },
      "-=0.5"
    );

    // Setup interactive hover wave physics
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    const cleanupTitle = setupTextHover(titleRef.current, "title");

    return () => {
      cleanupSubtitle?.();
      cleanupTitle?.();
    };
  }, { scope: containerRef });

  return (
    <section
      id="WelcomeGsapEffect"
      ref={containerRef}
      className="max-sm:hidden select-none pointer-events-auto cursor-default z-0"
    >
      <p ref={subtitleRef} className="text-3xl font-georama text-gray-200 tracking-tight">
        {renderText("Hi I'm Pratham Welcome to my", "", 100)}
      </p>
      <h1 ref={titleRef} className="mt-4 text-9xl italic font-georama text-white font-normal drop-shadow-2xl">
        {renderText("Portfolio", "", 400)}
      </h1>
    </section>
  );
};

export default WelcomeGsapEffect;