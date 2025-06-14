import { create } from "zustand";

type ToastStore = {
  lastId: number;
  list: ToastConfig[];
  addToast: (config: Omit<ToastConfig, "id">) => void;
  removeToast: (id: number) => void;
};

type ToastConfig = {
  id: number;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  lastId: 0,
  list: [],
  addToast: (config) => {
    const newId = get().lastId + 1;
    const newToast: ToastConfig = {
      id: newId,
      ...config,
    };
    const newList = [...get().list, newToast];

    set({
      lastId: newId,
      list: newList,
    });
  },
  removeToast: (id) => {
    const list = get().list;
    const newList = list.filter((toast) => toast.id !== id);
    set({ list: newList });
  },
}));
