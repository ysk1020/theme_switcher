import { createContext, type ReactNode, useEffect, useState } from "react";

export const ThemesOption = ["light", "dark", "system"] as const;

export type Theme = (typeof ThemesOption)[number];

type initialState = {
  theme: Theme;
  changeTheme: (selectedTheme: Theme) => void;
};

const DEFAULT_THEME = "system";

const initialState: initialState = {
  theme: DEFAULT_THEME,
  changeTheme: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(initialState);
ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "system") {
      if (darkModePreference) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
    } else if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      // theme === "light"
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const value = {
    theme,
    changeTheme: (selectedTheme: Theme) => setTheme(selectedTheme),
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
