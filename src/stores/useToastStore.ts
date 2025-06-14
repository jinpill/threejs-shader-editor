import { create } from "zustand";
import type { ToastProps } from "@/components/Toast";

type ToastStore = {
  lastId: number;
  list: ToastConfig[];
  idsToRemove: number[];
  addToast: (config: Omit<ToastConfig, "id">) => void;
  removeToast: (id: number) => void;
  addIdsToRemove: (id: number) => void;
};

type ToastConfig = ToastProps & {
  id: number;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  lastId: 0,
  list: [],
  idsToRemove: [],
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
    const { list, idsToRemove } = get();
    const newList = list.filter((toast) => toast.id !== id);
    const newIdsToRemove = idsToRemove.filter((toastId) => toastId !== id);

    set({
      list: newList,
      idsToRemove: newIdsToRemove,
    });
  },
  addIdsToRemove: (id) => {
    const { idsToRemove } = get();
    if (idsToRemove.includes(id)) return;
    set({ idsToRemove: [...idsToRemove, id] });
  },
}));
