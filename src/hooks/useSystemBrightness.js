import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook to manage global display brightness
 * and real-time screen dimmer overlay opacity.
 */
export const useSystemBrightness = (initialBrightness = 100) => {
  const [brightness, setBrightnessState] = useState(initialBrightness);

  // Sync with CSS variable for root style inheritance
  useEffect(() => {
    document.documentElement.style.setProperty("--system-brightness", brightness);
  }, [brightness]);

  const setBrightness = useCallback((val) => {
    const num = Math.max(15, Math.min(100, Number(val)));
    setBrightnessState(num);
  }, []);

  // Compute dimmer overlay opacity
  const overlayOpacity = (100 - brightness) / 125;

  return {
    brightness,
    setBrightness,
    overlayOpacity,
  };
};

export default useSystemBrightness;
