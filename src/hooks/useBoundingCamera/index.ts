import { useCallback } from "react";
import * as THREE from "three";
import { useThreeStore } from "@/stores/useThreeStore";

const useBoundingCamera = () => {
  const { controls, camera } = useThreeStore();

  const setBoundingCamera = useCallback(
    (mesh: THREE.Mesh, vector: THREE.Vector3) => {
      if (!camera || !controls) return;

      const box = new THREE.Box3().setFromObject(mesh, true);
      const sphere = box.getBoundingSphere(new THREE.Sphere());

      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const distance = (sphere.radius * 1.1) / Math.sin(fovRad / 2);

      const center = box.getCenter(new THREE.Vector3());
      const normal = vector.clone().normalize();
      const position = normal.multiplyScalar(distance).add(center);

      camera.position.copy(position);
      camera.updateProjectionMatrix();

      controls.target.copy(center);
      controls.update();
    },
    [camera, controls],
  );

  return setBoundingCamera;
};

export default useBoundingCamera;
