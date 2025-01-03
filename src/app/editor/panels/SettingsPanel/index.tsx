import ToolPanel from "@/components/ToolPanel";

const SettingsPanel = () => {
  return (
    <ToolPanel title="사용자 설정" name="Settings" isRight>
      <ToolPanel.Section title="일반">
        <ToolPanel.Label name="디스플레이 배율"></ToolPanel.Label>
      </ToolPanel.Section>
    </ToolPanel>
  );
};

export default SettingsPanel;
