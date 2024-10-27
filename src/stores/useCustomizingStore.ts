import { create } from "zustand";

const THEME_KEY = "THREEJS_SHADER_EDITOR_THEME";

export type CustomizingStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
};

export type Theme = "light" | "dark";

export const useCustomizingStore = create<CustomizingStore>((set) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem(THEME_KEY, theme);
  },
  initTheme: () => {
    let theme = localStorage.getItem(THEME_KEY);

    if (theme !== "light" && theme !== "dark") {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      theme = darkMode ? "dark" : "light";
    }

    set({
      theme: theme as Theme,
    });
  },
}));
