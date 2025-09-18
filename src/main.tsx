// Entry point. Don't move this file.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import AppThemeProvider from "./context/AppContextProvider";
import ReduxProvider from "./state/ReduxProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </AppThemeProvider>
  </StrictMode>
);
