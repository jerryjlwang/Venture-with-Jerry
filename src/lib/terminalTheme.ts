export type TerminalTheme = "dark" | "light";

export const TERMINAL_THEME_STORAGE_KEY = "vwj-terminal-theme";

export function getInitialTerminalTheme(): TerminalTheme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const storedTheme = window.localStorage.getItem(
      TERMINAL_THEME_STORAGE_KEY
    );

    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "dark";
  } catch {
    return "dark";
  }
}

export function applyTerminalTheme(theme: TerminalTheme) {
  document.documentElement.dataset.terminalTheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );
  themeColor?.setAttribute("content", theme === "light" ? "#edf6f4" : "#000000");
}
