import { useThreeStore } from "@/stores/useThreeStore";
import { useCallback } from "react";
import * as THREE from "three";

const usePointHelper = (radius = 0.5) => {
  const { scene } = useThreeStore();

  const addPointHelper = useCallback(
    (position: THREE.Vector3) => {
      if (!scene) return;
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);

      scene.add(mesh);
      return mesh;
    },
    [scene, radius],
  );

  const removePointerHelper = useCallback(
    (mesh: THREE.Mesh) => {
      if (!scene) return;
      scene.remove(mesh);
    },
    [scene],
  );

  return {
    addPointHelper,
    removePointerHelper,
  };
};

export default usePointHelper;
