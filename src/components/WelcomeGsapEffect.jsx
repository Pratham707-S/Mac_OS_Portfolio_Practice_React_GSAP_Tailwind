import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 700, default: 200 },
  title: { min: 300, max: 900, default: 400 },
};

const renderWord = (word, className, baseWeight = 400) => (
  <span className="inline-block whitespace-nowrap mx-1">
    {[...word].map((char, i) => (
      <span
        key={i}
        className={`inline-block font-georama ${className}`}
        style={{
          fontVariationSettings: `'wght' ${baseWeight}`,
          fontWeight: baseWeight,
        }}
      >
        {char}
      </span>
    ))}
  </span>
);

const renderSentence = (text, className, baseWeight = 400) => {
  return text.split(" ").map((word, i) => (
    <React.Fragment key={i}>
      {renderWord(word, className, baseWeight)}
    </React.Fragment>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span > span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Trigger hover wave only when mouse is within vertical proximity of container
    const isNearbyY = mouseY >= rect.top - 80 && mouseY <= rect.bottom + 80;
    if (!isNearbyY) {
      letters.forEach((letter) => {
        gsap.to(letter, {
          fontWeight: base,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
          onUpdate: function () {
            letter.style.fontVariationSettings = `'wght' ${base}`;
          },
        });
      });
      return;
    }

    letters.forEach((letter) => {
      const lRect = letter.getBoundingClientRect();
      const letterCenterX = lRect.left + lRect.width / 2;
      const distance = Math.abs(mouseX - letterCenterX);
      const intensity = Math.exp(-(distance ** 2) / 14000);

      const targetWeight = Math.round(min + (max - min) * intensity);
      const targetY = -8 * intensity;

      gsap.to(letter, {
        fontWeight: targetWeight,
        y: targetY,
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
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: function () {
          letter.style.fontVariationSettings = `'wght' ${base}`;
        },
      });
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const WelcomeGsapEffect = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const subtitleLetters = subtitleRef.current?.querySelectorAll("span > span") || [];
    const titleLetters = titleRef.current?.querySelectorAll("span > span") || [];

    // Smooth entrance reveal
    tl.fromTo(
      subtitleLetters,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.015, duration: 0.6 }
    ).fromTo(
      titleLetters,
      { opacity: 0, y: 35, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.025, duration: 0.8 },
      "-=0.4"
    );

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
      className="max-sm:hidden select-none pointer-events-none text-center"
      style={{ zIndex: 1 }}
    >
      <p ref={subtitleRef} className="text-3xl font-georama text-gray-200 tracking-wide">
        {renderSentence("Hi I'm Pratham Welcome to my", "text-3xl font-georama", 200)}
      </p>
      <h1 ref={titleRef} className="mt-5 text-9xl italic font-georama text-white tracking-tight drop-shadow-2xl">
        {renderSentence("Portfolio", "text-9xl italic font-georama", 400)}
      </h1>
    </section>
  );
};

export default WelcomeGsapEffect;