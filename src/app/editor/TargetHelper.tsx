import { useEffect } from "react";
import usePointHelper from "@/hooks/usePointHelper";
import * as THREE from "three";

const SPHERE_RADIUS = 0.5;
const TargetHelper = () => {
  const { addPointHelper, removePointerHelper } = usePointHelper(SPHERE_RADIUS);

  useEffect(() => {
    const position = new THREE.Vector3(10, 0, 0);
    const helper = addPointHelper(position);

    return () => {
      if (!helper) return;
      removePointerHelper(helper);
    };
  }, [addPointHelper, removePointerHelper]);

  return null;
};

export default TargetHelper;
