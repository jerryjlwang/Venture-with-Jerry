import { createContext } from "react";

import type { TerminalTheme } from "@/lib/terminalTheme";

export type TerminalThemeContextValue = {
  theme: TerminalTheme;
  toggleTheme: () => void;
};

export const TerminalThemeContext =
  createContext<TerminalThemeContextValue | null>(null);
