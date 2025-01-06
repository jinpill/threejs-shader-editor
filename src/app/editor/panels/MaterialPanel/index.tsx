import { useState } from "react";
import ToolPanel from "@/components/ToolPanel";
import CheckBox from "@/components/CheckBox";
import useContext from "../../hooks/useContext";
import type { MaterialOptions } from "../../types/material";

const MaterialPanel = () => {
  const { materialOptions, setMaterialOptions } = useContext();
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
