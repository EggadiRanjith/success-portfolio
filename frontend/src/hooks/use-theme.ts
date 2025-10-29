import { useCallback, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function useTheme() {
  const getInitialTheme = useCallback<() => Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  }, []);

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyThemeClass = useCallback((t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Ensure HTML has the correct class on mount
    applyThemeClass(theme);
  }, [theme, applyThemeClass]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    applyThemeClass(t);
  }, [applyThemeClass]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
}
