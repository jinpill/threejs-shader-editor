import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { MaterialOptions } from "@/stores/useMaterialStore";

const useMaterial = (
  vertexShader: string,
  fragmentShader: string,
  options: MaterialOptions,
) => {
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
    material.needsUpdate = true;
  }, [vertexShader, fragmentShader, material]);

  useEffect(() => {
    material.transparent = options.transparent;
    material.side = Number(options.side) as THREE.Side;
    material.needsUpdate = true;
  }, [options, material]);

  return material;
};

export default useMaterial;
