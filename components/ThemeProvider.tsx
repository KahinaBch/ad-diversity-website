"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}>({ theme: "system", resolved: "dark", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark" || saved === "system") {
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    function resolve() {
      const r = theme === "system" ? (mq.matches ? "dark" : "light") : theme;
      setResolved(r);
      document.documentElement.setAttribute("data-theme", r);
    }

    resolve();
    mq.addEventListener("change", resolve);
    return () => mq.removeEventListener("change", resolve);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
