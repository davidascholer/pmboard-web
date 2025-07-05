import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Theme } from "./types";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

function AppThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
