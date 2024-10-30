"use client";

import SampleButton from "@/components/SampleButton";
import Editor from "@/components/Editor";
import { useState } from "react";

const EditorPage = () => {
  const [fragmentShader, setFragmentShader] = useState("");

  return (
    <div>
      <h1>Editor</h1>
      <Editor
        label="Fragment Shader"
        value={fragmentShader}
        onChange={setFragmentShader}
      />
      <SampleButton size="medium">Sample Button</SampleButton>
    </div>
  );
};

export default EditorPage;
