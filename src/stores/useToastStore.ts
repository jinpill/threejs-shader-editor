import { create } from "zustand";
import type { ToastProps } from "@/components/Toast";

export type ToastStore = {
  lastId: number;
  list: ToastConfig[];
  idsToRemove: number[];
  addToast: (params: AddParams) => number;
  updateToast: (id: number, params: Partial<Omit<ToastConfig, "id">>) => void;
  removeToast: (id: number) => void;
  addIdsToRemove: (id: number) => void;
};

export type ToastConfig = Omit<ToastProps, "onTimeout"> & {
  id: number;
};

type AddParams = Omit<ToastConfig, "id" | "duration"> & {
  duration?: number | null;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  lastId: 0,
  list: [],
  idsToRemove: [],
  addToast: (params) => {
    const newId = get().lastId + 1;
    const newToast: ToastConfig = {
      id: newId,
      ...params,
      duration: null,
    };

    if (params.duration !== null) {
      newToast.duration = params.duration ?? 5000;
    }

    const newList = [...get().list, newToast];

    set({
      lastId: newId,
      list: newList,
    });
    return newId;
  },
  updateToast: (id, params) => {
    const list = [...get().list];
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) return;

    list[index] = {
      ...list[index],
      ...params,
    };
    set({ list });
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
