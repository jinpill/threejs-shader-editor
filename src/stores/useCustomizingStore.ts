import { create } from "zustand";

const THEME_KEY = "THREEJS_SHADER_EDITOR_THEME";
const DISPLAY_SCALE_KEY = "THREEJS_SHADER_EDITOR_DISPLAY_SCALE";

export type CustomizingStore = {
  theme: Theme;
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;

  displayScale: number;
  getDisplayScale: () => number;
  setDisplayScale: (displayScale: number) => void;
  initDisplayScale: () => void;
};

export type Theme = "light" | "dark";

export const useCustomizingStore = create<CustomizingStore>((set, get) => ({
  theme: "light",
  getTheme: () => {
    return get().theme;
  },
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

  displayScale: 100,
  getDisplayScale: () => {
    return get().displayScale;
  },
  setDisplayScale: (displayScale) => {
    set({ displayScale });
    localStorage.setItem(DISPLAY_SCALE_KEY, displayScale.toString());
  },
  initDisplayScale: () => {
    const displayScale = localStorage.getItem(DISPLAY_SCALE_KEY);
    if (!displayScale) return;

    set({
      displayScale: parseFloat(displayScale),
    });
  },
}));
