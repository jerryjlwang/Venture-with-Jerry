import { Moon, Sun } from "lucide-react";

import { useTerminalTheme } from "@/hooks/useTerminalTheme";

export default function TerminalThemeToggle() {
  const { theme, toggleTheme } = useTerminalTheme();
  const isDark = theme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={theme === "light"}
      title={label}
      data-theme-toggle
      className="fixed bottom-4 right-4 z-[100] inline-flex h-12 items-center gap-2 rounded-full border border-terminal-border-strong bg-terminal-panel px-3.5 font-mono text-sm tracking-wide text-terminal-text shadow-terminal-toggle backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-terminal-border-hover hover:bg-terminal-glass-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent focus-visible:ring-offset-2 focus-visible:ring-offset-terminal-bg sm:bottom-6 sm:right-6"
    >
      <Icon className="h-4 w-4 text-terminal-accent" aria-hidden="true" />
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
