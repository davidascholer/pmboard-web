import { ThemeProviderState } from "@/ui/theme/types";
import { createContext } from "react";

const defaultValue: ThemeProviderState = {
  theme: "light",
  changeTheme: () => () => console.log("default context value"),
};

const AppContext = createContext(defaultValue);
export default AppContext;
