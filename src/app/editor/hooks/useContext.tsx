import React from "react";
import * as THREE from "three";
import type { GeometryParams } from "../types/geometry";
import type { MaterialOptions } from "../types/material";

export type ContextState = {
  geometryParams: GeometryParams;
  setGeometryParams: (params: GeometryParams) => void;

  materialOptions: MaterialOptions;
  setMaterialOptions: (options: MaterialOptions) => void;
};

export const Context = React.createContext<ContextState>({
  geometryParams: {
    type: "box",
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  },
  setGeometryParams: () => {},

  materialOptions: {
    transparent: false,
    side: THREE.DoubleSide,
  },
  setMaterialOptions: () => {},
});

const useContext = () => {
  return React.useContext(Context);
};

export default useContext;
