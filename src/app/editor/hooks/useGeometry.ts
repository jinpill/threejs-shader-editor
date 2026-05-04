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

    if (params.type === "file") {
      const id = toast.add({
        status: "info",
        title: "STL 파일 로드",
        message: "STL 파일을 불러오는 중입니다...",
        progress: 0,
        duration: null,
      });

      const url = URL.createObjectURL(params.file);
      const loader = new STLLoader();

      loader.load(
        url,
        (geometry: THREE.BufferGeometry) => {
          setGeometry(geometry);
          setError("");

          toast.update(id, {
            status: "success",
            message: "STL 파일을 성공적으로 불러왔습니다!",
            progress: 1,
            duration: 3000,
          });
        },
        (xhr) => {
          toast.update(id, {
            progress: xhr.loaded / xhr.total,
          });
        },
        (error) => {
          console.error("STL 파일 로드 중 오류 발생:", error);
          setError("STL 파일을 불러오는 중 오류가 발생했습니다.");

          toast.update(id, {
            status: "error",
            message: "STL 파일을 불러오는 중 오류가 발생했습니다.",
            duration: 3000,
          });
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
