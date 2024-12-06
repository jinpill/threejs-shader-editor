import { create } from "zustand";
import * as THREE from "three";

export type ThreeStore = {
  camera: THREE.PerspectiveCamera | null;
  getCamera: () => THREE.PerspectiveCamera | null;
  setCamera: (camera: THREE.PerspectiveCamera) => void;
};

export const useThreeStore = create<ThreeStore>((set, get) => ({
  camera: null,
  getCamera: () => {
    const state = get();
    return state.camera;
  },
  setCamera: (camera) => {
    set({ camera });
  },
}));
