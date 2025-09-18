import { useEffect, useState } from "react";

/**
 * Force a delay to show the loading state for at least 500ms before resolving.
 * This is useful for UX to avoid flickering when the component mounts.
 * @returns {void}
 */
const useForceDelay = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    // Cleanup the timer
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loading;
};

export default useForceDelay;
