import { AppBar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ToolbarButton from "./parts/ToolbarButton";
import style from "./style.module.scss";

export type ToolbarProps = {
  onOpenSettings?: () => void;
  children?: React.ReactNode;
};

const Toolbar = (props: ToolbarProps) => (
  <AppBar className={style.toolbar} color="default">
    <div className={style.wrapper}>
      <div>{props.children}</div>
      <div>
        <ToolbarButton name="사용자 설정" onClick={props.onOpenSettings}>
          <SettingsIcon />
        </ToolbarButton>
      </div>
    </div>
  </AppBar>
);

Toolbar.Button = ToolbarButton;
export default Toolbar;
