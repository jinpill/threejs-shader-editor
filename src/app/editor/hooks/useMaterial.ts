import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { MaterialOptions } from "../types/material";

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
    material.side = options.side;
    material.needsUpdate = true;
  }, [options, material]);

  return material;
};

export default useMaterial;
