import ToolPanel from "@/components/ToolPanel";
import Field from "@/components/Field";
import { useCustomizingStore } from "@/stores/useCustomizingStore";

const SettingsPanel = () => {
  const { displayScale, setDisplayScale } = useCustomizingStore();

  return (
    <ToolPanel title="사용자 설정" name="Settings" isRight>
      <ToolPanel.Section title="일반">
        <Field.Number
          label="디스플레이 배율"
          unit="%"
          step="10"
          value={displayScale}
          onChange={setDisplayScale}
        />
      </ToolPanel.Section>
    </ToolPanel>
  );
};

export default SettingsPanel;
