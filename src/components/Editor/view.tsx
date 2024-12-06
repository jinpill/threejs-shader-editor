import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const View = ({
  mesh,
  onCalculateFov,
}: {
  mesh: THREE.Mesh | null;
  onCalculateFov: (fov: number) => void;
}) => {
  const { camera } = useThree();

  useEffect(() => {
    if (mesh && camera instanceof THREE.PerspectiveCamera) {
      const box = new THREE.Box3().setFromObject(mesh);
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const radius = sphere.radius;

      const distance = radius / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.position.set(0, 0, distance);

      const newFov = 2 * THREE.MathUtils.radToDeg(Math.atan(radius / distance));
      onCalculateFov(newFov);
      // camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  }, [mesh, camera, onCalculateFov]);

  return null;
};

export default View;
