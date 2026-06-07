import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { TerminalThemeContext } from "@/contexts/TerminalThemeContext";
import {
  applyTerminalTheme,
  TERMINAL_THEME_STORAGE_KEY,
  type TerminalTheme,
} from "@/lib/terminalTheme";

type TerminalThemeProviderProps = {
  children: ReactNode;
  initialTheme: TerminalTheme;
};

export default function TerminalThemeProvider({
  children,
  initialTheme,
}: TerminalThemeProviderProps) {
  const [theme, setTheme] = useState<TerminalTheme>(initialTheme);

  useEffect(() => {
    applyTerminalTheme(theme);

    try {
      window.localStorage.setItem(TERMINAL_THEME_STORAGE_KEY, theme);
    } catch {
      // The selected theme still applies for this session.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <TerminalThemeContext.Provider value={value}>
      {children}
    </TerminalThemeContext.Provider>
  );
}
