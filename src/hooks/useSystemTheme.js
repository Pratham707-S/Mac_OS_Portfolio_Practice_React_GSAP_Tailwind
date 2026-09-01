import { useState, useEffect } from "react";

export const useSystemTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("macos_theme");
    return saved ? saved === "dark" : true; // Default dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("macos_theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("macos_theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, setIsDarkMode, toggleTheme };
};

export default useSystemTheme;
