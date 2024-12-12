import { useCallback } from "react";
import * as THREE from "three";
import { useThreeStore } from "@/stores/useThreeStore";

const useBoundingCamera = () => {
  const { camera } = useThreeStore();

  const setBoundingCamera = useCallback(
    (mesh: THREE.Mesh, vector: THREE.Vector3) => {
      if (!camera) return;

      const box = new THREE.Box3().setFromObject(mesh, true);
      const sphere = box.getBoundingSphere(new THREE.Sphere());

      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const distance = sphere.radius / Math.tan(fovRad / 2);

      const center = box.getCenter(new THREE.Vector3());
      const normal = vector.clone().normalize();
      const position = normal.multiplyScalar(distance).add(center);

      camera.position.copy(position);
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    },
    [camera],
  );

  return setBoundingCamera;
};

export default useBoundingCamera;
