import ToolPanel from "@/components/ToolPanel";
import style from "../style.module.scss";

const SettingsPanel = () => {
  return (
    <ToolPanel className={style.right} title="사용자 설정" name="Settings"></ToolPanel>
  );
};

export default SettingsPanel;
