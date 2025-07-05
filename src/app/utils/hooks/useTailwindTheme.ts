import { useLayoutEffect } from "react";
import { useAppSelector } from "@/state/hooks";

/**
 * Set the theme in the body element, as now is the approach in tailwindcss v4
 */
const useTailwindTheme = () => {
  const user = useAppSelector((state) => state.user);
  const theme = user?.settings?.theme;

  useLayoutEffect(() => {
    if (theme) {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    } else {
      // Fallback to system preference if no theme is set
      const isSystemDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (isSystemDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [theme]);
};

export default useTailwindTheme;
