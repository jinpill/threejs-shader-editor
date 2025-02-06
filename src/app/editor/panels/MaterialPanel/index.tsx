import { useState } from "react";
import * as THREE from "three";

import ToolPanel from "@/components/ToolPanel";
import CheckBox from "@/components/CheckBox";
import Dropdown from "@/components/Dropdown";

import { useMaterialStore, type MaterialOptions } from "@/stores/useMaterialStore";

const SIDE_OPTIONS = [
  { value: THREE.FrontSide.toString(), label: "Front" },
  { value: THREE.BackSide.toString(), label: "Back" },
  { value: THREE.DoubleSide.toString(), label: "Double" },
];

const MaterialPanel = () => {
  const { materialOptions, setMaterialOptions } = useMaterialStore();
  const [checked, setChecked] = useState(false);

  const handleChange = <K extends keyof MaterialOptions>(
    key: K,
    value: MaterialOptions[K],
  ) => {
    setMaterialOptions({
      ...materialOptions,
      [key]: value,
    });
  };

  return (
    <ToolPanel title="매터리얼" name="Material">
      <ToolPanel.Section title="일반">
        <ToolPanel.Label name="Transparent" isReverse>
          <CheckBox
            value={materialOptions.transparent}
            onChange={handleChange.bind(null, "transparent")}
          />
        </ToolPanel.Label>

        <ToolPanel.Label name="Side">
          <Dropdown
            value={materialOptions.side.toString()}
            options={SIDE_OPTIONS}
            onChange={handleChange.bind(null, "side")}
          />
        </ToolPanel.Label>
      </ToolPanel.Section>

      <ToolPanel.Section title="유니폼">
        <ToolPanel.Label name="Unix time" isReverse>
          <CheckBox value={checked} onChange={setChecked} />
        </ToolPanel.Label>
      </ToolPanel.Section>
    </ToolPanel>
  );
};

export default MaterialPanel;
