export type GeometryType = "file" | "box" | "sphere";

export type GeometryParams =
  | FileGeometryParams
  | BoxGeometryParams
  | SphereGeometryParams;

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
