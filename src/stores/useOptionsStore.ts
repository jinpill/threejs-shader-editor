import { create } from "zustand";
import type { IconName } from "@/components/Icon";
import type { CommonSize } from "@/hooks/useCommonSize";

type OptionsStore = {
  options: Options<OptionValue> | null;
  getOptions: () => Options<OptionValue> | null;
  setOptions: (options: Options<OptionValue> | null) => void;
};

export type Options<V extends OptionValue> = {
  id: string;
  size: OptionSize;
  rect: DOMRect;
  value: V;
  list: Option<V>[];
  callback: (value: V) => void;
};

export type OptionSize = CommonSize;

export type Option<V extends OptionValue> = {
  icon?: IconName;
  value: V;
  label: string;
  description?: string;
};

export type OptionValue = string | number;

export const useOptionsStore = create<OptionsStore>((set, get) => ({
  options: null,
  getOptions: () => get().options,
  setOptions: (options) => {
    set({ options });
  },
}));
