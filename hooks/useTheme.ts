import { useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "eg-theme";
const THEME_COLOR: Record<Theme, string> = {
  light: "#F3ECDD",
  dark: "#14160E",
};

function readTheme(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme) || "light";
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[next]);
    setTheme(next);
  };

  return [theme, toggle];
}
