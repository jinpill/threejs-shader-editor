import React from "react";
import type { GeometryParams } from "../types/geometry";

export type ContextState = {
  geometryParams: GeometryParams;
  setGeometryParams: (params: GeometryParams) => void;
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
});

const useContext = () => {
  return React.useContext(Context);
};

export default useContext;
