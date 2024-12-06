import { useCallback, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const View = ({ mesh }: { mesh: THREE.Mesh | null }) => {
  const { camera } = useThree();

  const setCameraPosition = useCallback(
    (vector: THREE.Vector3) => {
      if (mesh && camera instanceof THREE.PerspectiveCamera) {
        const box = new THREE.Box3().setFromObject(mesh, true);
        const sphere = box.getBoundingSphere(new THREE.Sphere());

        const fovRad = THREE.MathUtils.degToRad(camera.fov);
        const distance = sphere.radius / Math.tan(fovRad / 2);

        const normal = vector.clone().normalize();
        const position = normal.multiplyScalar(distance);

        camera.position.copy(position);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        camera.updateProjectionMatrix();
      }
    },
    [camera, mesh],
  );

  useEffect(() => {
    setCameraPosition(new THREE.Vector3(0, -1, 0));
  }, [setCameraPosition]);

  return null;
};

export default View;
