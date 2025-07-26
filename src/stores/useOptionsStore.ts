import { create } from "zustand";

type OptionsStore = {
  options: Options<string | number> | null;
  setOptions: (options: Options<string | number> | null) => void;
};

type Options<V extends string | number> = {
  id: string;
  rect: DOMRect;
  list: Option<V>[];
  callback: (value: V) => void;
};

export type Option<V extends string | number> = {
  value: V;
  label: string;
};

export const useOptionsStore = create<OptionsStore>((set) => ({
  options: null,
  setOptions: (options) => {
    set({ options });
  },
}));
