import { useEffect } from "react";
import * as THREE from "three";
import { useThreeStore } from "@/stores/useThreeStore";
import { useCustomizingStore } from "@/stores/useCustomizingStore";

const BACKGROUND_COLORS = {
  light: 0xffffff,
  dark: 0x444444,
};

/**
 * 테마에 따라 Scene의 배경색상을 변경합니다.
 */
const useBackgroundColor = () => {
  const { theme } = useCustomizingStore();
  const { scene } = useThreeStore();

  useEffect(() => {
    if (!scene) return;

    const color = BACKGROUND_COLORS[theme];
    if (typeof color === "number") {
      scene.background = new THREE.Color(color);
    }
  }, [scene, theme]);
};

export default useBackgroundColor;
