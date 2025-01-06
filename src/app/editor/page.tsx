"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import PublishIcon from "@mui/icons-material/Publish";
import EditorToolbar from "./EditorToolbar";
import ModelsPanel from "./panels/ModelsPanel";
import MaterialPanel from "./panels/MaterialPanel";
import SettingsPanel from "./panels/SettingsPanel";
import ThreeInitializer from "./ThreeInitializer";
import RightArea from "./RightArea";

import useDragAndDrop from "@/hooks/useDragAndDrop";
import useBoundingCamera from "@/hooks/useBoundingCamera";
import { Context } from "./hooks/useContext";
import useGeometry from "./hooks/useGeometry";
import useMaterial from "./hooks/useMaterial";
import useBackgroundColor from "./hooks/useBackgroundColor";

import { useThreeStore } from "@/stores/useThreeStore";
import { useToolbarStore } from "@/stores/useToolbarStore";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { DEFAULT_MATERIAL_OPTIONS, DEFAULT_GEOMETRY_PARAMS } from "./constants";

import style from "./style.module.scss";

const EditorPage = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const { setControls, initThreeStore } = useThreeStore();
  const setBoundingCamera = useBoundingCamera();
  const { activeToolPanel } = useToolbarStore();

  const [geometryParams, setGeometryParams] = useState(DEFAULT_GEOMETRY_PARAMS);
  const { geometry, error } = useGeometry(geometryParams);

  const [vertexShader, setVertexShader] = useState(vertex);
  const [fragmentShader, setFragmentShader] = useState(fragment);
  const [materialOptions, setMaterialOptions] = useState(DEFAULT_MATERIAL_OPTIONS);
  const material = useMaterial(vertexShader, fragmentShader, materialOptions);

  useBackgroundColor();

  const { ref, dragging } = useDragAndDrop<HTMLDivElement>((files) => {
    const file = files[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "stl") return;

    setGeometryParams({
      type: "file",
      file: file,
    });
  });

  useEffect(() => {
    setTimeout(() => {
      const mesh = meshRef.current;
      if (!mesh) return;

      const box = new THREE.Box3();
      box.setFromObject(mesh);

      const center = box.getCenter(new THREE.Vector3());
      mesh.position.sub(center);

      const normal = new THREE.Vector3(0, -1, 0);
      setBoundingCamera(mesh, normal);
    }, 0);
  }, [geometry, setBoundingCamera]);

  // space에 대한 기능
  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      const tagName = document.activeElement?.tagName;
      const isInputFocused = tagName === "INPUT" || tagName === "TEXTAREA";
      if (isInputFocused || e.code !== "Space") return;
      e.preventDefault();

      const mesh = meshRef.current;
      const { camera } = useThreeStore.getState();
      if (!mesh || !camera) return;

      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.negate();

      setBoundingCamera(mesh, direction);
    };

    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [setBoundingCamera]);

  return (
    <Context.Provider
      value={{
        geometryParams,
        setGeometryParams,
        materialOptions,
        setMaterialOptions,
      }}
    >
      <div
        ref={ref}
        className={classNames(style.container, {
          [style.dragging]: dragging,
          [style.error]: error,
        })}
      >
        {/* Toolbar */}
        <EditorToolbar />

        <div className={style.flexContainer}>
          <div className={style.viewArea}>
            {/* Tool Panels */}
            <div className={style.toolPanelArea}>
              {activeToolPanel === "Models" && <ModelsPanel />}
              {activeToolPanel === "Material" && <MaterialPanel />}
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
              onCreated={initThreeStore}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <mesh ref={meshRef} geometry={geometry} material={material} />
              <OrbitControls onUpdate={setControls} enableDamping={false} />
              <ThreeInitializer />
            </Canvas>
          </div>

          <RightArea
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            onChangeVertexShader={setVertexShader}
            onChangeFragmentShader={setFragmentShader}
          />
        </div>
      </div>
    </Context.Provider>
  );
};

export default EditorPage;
