import ToolPanel from "@/components/ToolPanel";
import style from "../style.module.scss";

const SettingsPanel = () => {
  return (
    <ToolPanel className={style.right} title="사용자 설정" name="Settings">
      <ToolPanel.Section title="일반">
        <ToolPanel.Label name="디스플레이 배율"></ToolPanel.Label>
      </ToolPanel.Section>
    </ToolPanel>
  );
};

export default SettingsPanel;
