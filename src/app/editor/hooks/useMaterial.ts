import { useEffect, useMemo } from "react";
import * as THREE from "three";

const useMaterial = (vertexShader: string, fragmentShader: string) => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      visible: false,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {},
    });
  }, []);

  useEffect(() => {
    material.vertexShader = vertexShader;
    material.fragmentShader = fragmentShader;
    material.visible = true;
  }, [vertexShader, fragmentShader, material]);

  return material;
};

export default useMaterial;
