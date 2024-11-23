"use client";

import React, { useEffect, useState } from "react";
import { STLLoader } from "three-stdlib";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PublishIcon from "@mui/icons-material/Publish";
import style from "./style.module.scss";

const EditorPage = () => {
  const [model, setModel] = useState<THREE.BufferGeometry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleDrop = async (files: File[]) => {
    const file = files[0];

    console.log("File Type:", file.type);
    console.log("File Name:", file.name);

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    console.log("File 확장자:", fileExtension);

    if (fileExtension !== "stl") {
      setError("지원되지 않는 형식입니다. STL 파일을 업로드하세요.");
      setModel(null);
      setDropped(false);
      return;
    }

    setError(null);
    setDropped(true);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result === null) {
        console.error("파일을 읽는 데 실패했습니다.");
        setError("파일을 읽는 데 실패했습니다.");
        return;
      }

      console.log("Reader Result:", reader.result);

      const loader = new STLLoader();
      try {
        const geometry = loader.parse(reader.result as ArrayBuffer);

        geometry.center();
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        if (box) {
          const size = new THREE.Vector3();
          box.getSize(size);

          console.log("Model Size:", size);

          const maxAxis = Math.max(size.x, size.y, size.z);
          geometry.scale(1 / maxAxis, 1 / maxAxis, 1 / maxAxis);
        }

        console.log("Geometry Parsed:", geometry);
        setModel(geometry);
      } catch (e) {
        console.error("STL 파싱 중 오류 발생:", e);
        setError("STL 파일을 로드하는 중 오류가 발생했습니다.");
        setModel(null);
        setDropped(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      setDragging(true);
      setError(null);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
    };

    const handleDropEvent = (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
      const files = Array.from(event.dataTransfer?.files || []);
      handleDrop(files);
    };

    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("dragleave", handleDragLeave);
    element.addEventListener("drop", handleDropEvent);

    return () => {
      element.removeEventListener("dragenter", handleDragEnter);
      element.removeEventListener("dragover", handleDragOver);
      element.removeEventListener("dragleave", handleDragLeave);
      element.removeEventListener("drop", handleDropEvent);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${style.container} ${dragging ? style.dragging : ""} ${
        error ? style.error : ""
      }`}
    >
      {dragging && !model && !error && !dropped && (
        <>
          <PublishIcon className={style.dropIcon} />
          <p className={style.instruction}>파일을 끌어와 3D 모델을 로드하기</p>
        </>
      )}

      {error && <p className={style.errorMessage}>{error}</p>}

      {dropped && model && (
        <Canvas
          className={style.canvasWrapper}
          camera={{ position: [10, 10, 10], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <mesh geometry={model} scale={[0.01, 0.01, 0.01]}>
            <meshStandardMaterial color="orange" />
          </mesh>
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
};

export default EditorPage;
