import { useCallback, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function useTheme() {
  const getInitialTheme = useCallback<() => Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const systemTheme = prefersDark ? "dark" : "light";
    return systemTheme;
  }, []);

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  
  // Sync theme from localStorage on client mount (after SSR)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    
    // Read current state at the time of mount
    setThemeState((currentTheme) => {
      if (stored === "light" || stored === "dark") {
        if (stored !== currentTheme) {
          applyThemeClass(stored);
          return stored;
        }
      }
      return currentTheme;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const applyThemeClass = useCallback((t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
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

  // Follow system if no user override
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (!stored) {
        const next = mq.matches ? "dark" : "light";
        setThemeState(next);
        applyThemeClass(next);
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [applyThemeClass]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch (e) {
      // Error saving to localStorage silently
    }
    applyThemeClass(t);
  }, [applyThemeClass]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [theme, setTheme]);

  const returnValue = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
  return returnValue;
}
