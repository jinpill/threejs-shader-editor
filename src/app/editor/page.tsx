"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const EditorPage = () => {
  return (
    <div style={{ height: "100%" }}>
      <Canvas>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default EditorPage;
