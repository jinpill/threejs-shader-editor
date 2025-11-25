import { create } from "zustand";
import type { IconName } from "@/components/Icon";
import type { CommonSize } from "@/hooks/useCommonSize";

type OptionsStore = {
  options: Options<string | number> | null;
  getOptions: () => Options<string | number> | null;
  setOptions: (options: Options<string | number> | null) => void;
};

export type Options<V extends string | number> = {
  id: string;
  size: OptionSize;
  rect: DOMRect;
  value: V;
  list: Option<V>[];
  callback: (value: V) => void;
};

export type OptionSize = CommonSize;

export type Option<V extends string | number> = {
  icon?: IconName;
  value: V;
  label: string;
  description?: string;
};

export const useOptionsStore = create<OptionsStore>((set, get) => ({
  options: null,
  getOptions: () => get().options,
  setOptions: (options) => {
    set({ options });
  },
}));
