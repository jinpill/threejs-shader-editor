import { useEffect, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/Addons.js";
import type { GeometryParams } from "@/stores/useGeometryStore";

const useGeometry = (params: GeometryParams) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry>(
    () => new THREE.BufferGeometry(),
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.type === "box") {
      setGeometry(
        new THREE.BoxGeometry(
          params.width,
          params.height,
          params.depth,
          params.widthSegments,
          params.heightSegments,
          params.depthSegments,
        ),
      );
    }

    if (params.type === "sphere") {
      setGeometry(
        new THREE.SphereGeometry(
          params.radius,
          params.widthSegments,
          params.heightSegments,
          params.phiStart,
          params.phiLength,
          params.thetaStart,
          params.thetaLength,
        ),
      );
    }

    if (params.type === "cylinder") {
      setGeometry(
        new THREE.CylinderGeometry(
          params.radiusTop,
          params.radiusBottom,
          params.height,
          params.radialSegments,
          params.heightSegments,
          params.openEnded,
          params.thetaStart,
          params.thetaLength,
        ),
      );
    }

    if (params.type === "file") {
      const loader = new STLLoader();
      const filePath = params.file.path;

      loader.load(
        filePath,
        (geometry) => {
          setGeometry(geometry);
          setError("");
        },
        undefined,
        (error) => {
          console.error("STL 파일 로드 중 오류 발생:", error);
          setError("STL 파일을 로드하는 중 오류가 발생했습니다.");
        },
      );
    }
  }, [params]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return {
    geometry,
    error,
  };
};

export default useGeometry;
