import { useState, useEffect } from "react";

export const useSystemTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      localStorage.removeItem("macos_theme"); // Clear legacy localhost light cache
      const saved = localStorage.getItem("macos_theme_v2");
      return saved === "light" ? false : true; // Default dark
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      try {
        localStorage.setItem("macos_theme_v2", "dark");
      } catch (e) {}
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      try {
        localStorage.setItem("macos_theme_v2", "light");
      } catch (e) {}
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, setIsDarkMode, toggleTheme };
};

export default useSystemTheme;
