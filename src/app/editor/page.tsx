"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/Addons.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import PublishIcon from "@mui/icons-material/Publish";
import EditorToolbar from "./EditorToolbar";
import ModelsPanel from "./panels/ModelsPanel";
import SettingsPanel from "./panels/SettingsPanel";

import useDragAndDrop from "@/hooks/useDragAndDrop";
import useBoundingCamera from "@/hooks/useBoundingCamera";
import useBackgroundColor from "./hooks/useBackgroundColor";

import { useThreeStore } from "@/stores/useThreeStore";
import { useToolbarStore } from "@/stores/useToolbarStore";

import style from "./style.module.scss";
import TargetHelper from "./TargetHelper";

const EditorPage = () => {
  const { handleCreated } = useThreeStore();
  const setBoundingCamera = useBoundingCamera();
  const { activeToolPanel } = useToolbarStore();

  const [mesh, setMesh] = useState<THREE.Mesh | null>(null);
  const [error, setError] = useState<string | null>(null);

  useBackgroundColor();

  const { ref, dragging } = useDragAndDrop<HTMLDivElement>((files) => {
    const file = files[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension !== "stl") {
      setError("지원되지 않는 형식입니다. STL 파일을 업로드하세요.");
      return;
    }

    const url = URL.createObjectURL(file);
    const loader = new STLLoader();
    loader.load(
      url,
      (geometry: THREE.BufferGeometry) => {
        const material = new THREE.MeshPhongMaterial({
          color: 0x00b7ff,
        });
        const mesh = new THREE.Mesh(geometry, material);
        const box = new THREE.Box3();
        box.setFromObject(mesh);

        const center = box.getCenter(new THREE.Vector3());
        mesh.position.sub(center);

        setError(null);
        setMesh(mesh);

        const normal = new THREE.Vector3(0, -1, 0);
        setBoundingCamera(mesh, normal);
      },
      (xhr) => {
        console.log("Loading Progress:", `${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error("STL 파일 로드 중 오류 발생:", error);
        setError("STL 파일을 로드하는 중 오류가 발생했습니다.");
        setMesh(null);
      },
    );
  });

  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement &&
        (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA");

      if (!isInputFocused && e.key === " " && e.code === "Space") {
        e.preventDefault();

        if (mesh) {
        }
      }
    };

    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [mesh, setBoundingCamera]);

  return (
    <div
      ref={ref}
      className={classNames(style.container, {
        [style.dragging]: dragging,
        [style.error]: error,
      })}
    >
      {/* Toolbar */}
      <EditorToolbar />

      <div className={style.viewArea}>
        {/* Tool Panels */}
        <div className={style.toolPanelArea}>
          {activeToolPanel === "Models" && <ModelsPanel />}
          {activeToolPanel === "Settings" && <SettingsPanel />}
        </div>

        {/* Overview */}
        <div className={style.overviewArea}>
          {dragging && (
            <div className={style.dropDescription}>
              <PublishIcon fontSize="inherit" />
              <p className={style.instruction}>파일을 끌어와 3D 모델을 로드하기</p>
            </div>
          )}
          {error && <p className={style.errorMessage}>{error}</p>}
        </div>

        <Canvas
          camera={{
            position: [0, 0, 100],
            fov: 50,
            near: 0.1,
            far: 10000,
            up: [0, 0, 1],
          }}
          onCreated={handleCreated}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {mesh && <primitive object={mesh} />}
          <OrbitControls />
          <TargetHelper />
        </Canvas>
      </div>
    </div>
  );
};

export default EditorPage;
