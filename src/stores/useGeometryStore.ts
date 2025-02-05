import { create } from "zustand";

export type GeometryStore = {
  geometryParams: GeometryParams;
  getGeometryParams: () => GeometryParams;
  setGeometryParams: (params: GeometryParams) => void;
};

export type GeometryType = "file" | "box" | "sphere" | "cylinder";

export type GeometryParams =
  | FileGeometryParams
  | BoxGeometryParams
  | SphereGeometryParams
  | CylinderGeometryParams;

export type FileGeometryParams = {
  type: "file";
  file: File;
};

export type BoxGeometryParams = {
  type: "box";
  width: number;
  height: number;
  depth: number;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
};

export type SphereGeometryParams = {
  type: "sphere";
  radius: number;
  widthSegments: number;
  heightSegments: number;
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;
};

export type CylinderGeometryParams = {
  type: "cylinder";
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
};

export const DEFAULT_GEOMETRY_PARAMS: GeometryParams = {
  type: "box",
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};

export const useGeometryStore = create<GeometryStore>((set, get) => ({
  geometryParams: DEFAULT_GEOMETRY_PARAMS,
  getGeometryParams: () => {
    return get().geometryParams;
  },
  setGeometryParams: (params) => {
    set({ geometryParams: params });
  },
}));
