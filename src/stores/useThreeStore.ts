import { create } from "zustand";
import * as THREE from "three";
import type { RootState } from "@react-three/fiber";

export type ThreeStore = {
  camera: THREE.PerspectiveCamera | null;
  getCamera: () => THREE.PerspectiveCamera | null;

  scene: THREE.Scene | null;
  getScene: () => THREE.Scene | null;

  invalidate: () => void;
  initThreeStore: (state: RootState) => void;
};

export const useThreeStore = create<ThreeStore>((set, get) => ({
  camera: null,
  getCamera: () => {
    const state = get();
    return state.camera;
  },

  scene: null,
  getScene: () => {
    const state = get();
    return state.scene;
  },

  invalidate: () => {},
  initThreeStore: (state) => {
    set({
      scene: state.scene,
      invalidate: state.invalidate,
    });

    if (state.camera instanceof THREE.PerspectiveCamera) {
      set({ camera: state.camera });
    }
  },
}));
