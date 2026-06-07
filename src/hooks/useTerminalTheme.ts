import { useContext } from "react";

import { TerminalThemeContext } from "@/contexts/TerminalThemeContext";

export function useTerminalTheme() {
  const context = useContext(TerminalThemeContext);

  if (!context) {
    throw new Error(
      "useTerminalTheme must be used within TerminalThemeProvider"
    );
  }

  return context;
}
