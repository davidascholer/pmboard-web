import { createContext } from "react"
import { ThemeProviderState } from "./types"

const initialState: ThemeProviderState = {
    theme: "dark",
    changeTheme: () => console.log("changeTheme not implemented"),
  }

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
