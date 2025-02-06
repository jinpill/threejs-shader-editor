import { create } from "zustand";
import * as THREE from "three";

export type MaterialStore = {
  materialOptions: MaterialOptions;
  getMaterialOptions: () => MaterialOptions;
  setMaterialOptions: (options: MaterialOptions) => void;
};

export type MaterialOptions = {
  transparent: boolean;
  side: string;
};

export const DEFAULT_MATERIAL_OPTIONS: MaterialOptions = {
  transparent: true,
  side: THREE.DoubleSide.toString(),
};

export const useMaterialStore = create<MaterialStore>((set, get) => ({
  materialOptions: DEFAULT_MATERIAL_OPTIONS,
  getMaterialOptions: () => {
    return get().materialOptions;
  },
  setMaterialOptions: (options) => {
    set({ materialOptions: options });
  },
}));
