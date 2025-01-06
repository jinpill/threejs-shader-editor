"use client";

import React from "react";
import Toolbar from "@/components/Toolbar";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";

import { useToolbarStore, type ToolPanelName } from "@/stores/useToolbarStore";

const EditorToolbar = () => {
  const { activeToolPanel, showToolPanel, hideToolPanel } = useToolbarStore();

  const handleClickToolbarButton = (name?: ToolPanelName) => {
    if (!name) return;

    if (activeToolPanel === name) {
      hideToolPanel(name);
    } else {
      showToolPanel(name);
    }
  };

  return (
    <Toolbar onClickSettings={handleClickToolbarButton.bind(null, "Settings")}>
      <Toolbar.Button label="모델 변경" name="Models" onClick={handleClickToolbarButton}>
        <ViewInArIcon />
      </Toolbar.Button>

      <Toolbar.Button label="매터리얼" name="Material" onClick={handleClickToolbarButton}>
        <FiberSmartRecordIcon />
      </Toolbar.Button>
    </Toolbar>
  );
};

export default EditorToolbar;
