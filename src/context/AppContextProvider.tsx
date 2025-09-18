import { useState } from "react";
import AppContext from "./AppContext";
import { ColorThemeType, PM_BOARD_COLOR_THEME_KEY, ThemeProviderStateType } from "@/shared/types";

interface ThemeProviderProps {
  children: React.ReactNode;
}

function AppContextProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ColorThemeType>("dark");

  const value: ThemeProviderStateType = {
    theme: currentTheme,
    changeTheme: () => {
      // Change the new theme to state
      let newTheme: ColorThemeType = "light";
      if (currentTheme === "light") newTheme = "system";
      if (currentTheme === "system") newTheme = "dark";
      if (currentTheme === "dark") newTheme = "light";
      localStorage.setItem(PM_BOARD_COLOR_THEME_KEY, newTheme);
      setCurrentTheme(newTheme);  

      // Set the new theme to the browser
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(newTheme);
      }
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
