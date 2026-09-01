import { useState, useCallback } from "react";

/**
 * Custom hook to trigger and manage macOS floating system toast notifications.
 */
export const useSystemNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((title, message) => {
    setNotification({
      id: Date.now(),
      title,
      message,
    });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    clearNotification,
  };
};

export default useSystemNotification;
