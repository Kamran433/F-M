import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // Default to dark

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      let initialTheme = "dark"; // Default
      if (storedTheme) {
        initialTheme = storedTheme;
      } else {
        initialTheme = systemPrefersDark ? "dark" : "light";
      }

      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
