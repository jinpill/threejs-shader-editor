import { create } from "zustand";
import * as THREE from "three";
import type { RootState } from "@react-three/fiber";
import type { OrbitControlsProps } from "@react-three/drei";

type Controls = Parameters<Required<OrbitControlsProps>["onUpdate"]>[0];

export type ThreeStore = {
  camera: THREE.PerspectiveCamera | null;
  getCamera: () => THREE.PerspectiveCamera | null;

  scene: THREE.Scene | null;
  getScene: () => THREE.Scene | null;

  controls: Controls | null;
  getControls: () => Controls | null;
  setControls: (controls: Controls) => void;

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

  controls: null,
  getControls: () => {
    const state = get();
    return state.controls;
  },
  setControls: (controls) => {
    set({ controls });
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
