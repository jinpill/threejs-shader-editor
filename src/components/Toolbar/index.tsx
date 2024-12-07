import { AppBar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ToolbarButton from "./parts/ToolbarButton";
import style from "./style.module.scss";

export type ToolbarProps = {
  onClickSettings?: () => void;
  children?: React.ReactNode;
};

const Toolbar = (props: ToolbarProps) => (
  <AppBar className={style.toolbar} color="default" position="static">
    <div className={style.wrapper}>
      <div>{props.children}</div>
      <div>
        <ToolbarButton label="사용자 설정" onClick={props.onClickSettings}>
          <SettingsIcon />
        </ToolbarButton>
      </div>
    </div>
  </AppBar>
);

Toolbar.Button = ToolbarButton;
export default Toolbar;
