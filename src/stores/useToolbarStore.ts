import { create } from "zustand";

export type ToolbarStore = {
  activeToolPanel: "" | ToolPanelName;
  getActiveToolPanel: () => "" | ToolPanelName;
  showToolPanel: (panel: ToolPanelName) => void;
  hideToolPanel: (panel?: ToolPanelName) => void;
};

export type ToolPanelName = "Models" | "Material" | "Settings";

export const useToolbarStore = create<ToolbarStore>((set, get) => ({
  activeToolPanel: "",
  getActiveToolPanel: () => {
    const state = get();
    return state.activeToolPanel;
  },
  showToolPanel: (panel) => {
    set({ activeToolPanel: panel });
  },
  hideToolPanel: (panel) => {
    if (!panel) {
      set({ activeToolPanel: "" });
    } else {
      const state = get();
      if (state.activeToolPanel !== panel) return;
      set({ activeToolPanel: "" });
    }
  },
}));
