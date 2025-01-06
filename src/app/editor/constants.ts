import * as THREE from "three";
import type { GeometryParams } from "./types/geometry";
import type { MaterialOptions } from "./types/material";

export const DEFAULT_GEOMETRY_PARAMS: GeometryParams = {
  type: "box",
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};

export const DEFAULT_MATERIAL_OPTIONS: MaterialOptions = {
  transparent: true,
  side: THREE.DoubleSide,
};
