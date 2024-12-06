import classNames from "classnames";
import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ToolPanelSection from "./Section";
import ToolPanelLabel from "./Label";
import ToolPanelButtons from "./Buttons";
import ToolPanelButton from "./Button";

import style from "./style.module.scss";

export type ToolPanelProps = {
  title: string;
  onClose?: () => void;

  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * - `--tool-panel-width` ToolPanel의 너비를 지정 (default: 400px)
 * - `--tool-panel-height` ToolPanel의 높이를 지정 (default: auto)
 * - `--tool-panel-max-height` ToolPanel의 최대 높이를 지정 (default: 640px)
 */
const ToolPanel = (props: ToolPanelProps) => {
  return (
    <Paper className={classNames(style.toolPanel, props.className)} style={props.style}>
      <header className={style.header}>
        <div className={style.title}>{props.title}</div>

        <button className={style.closeButton} tabIndex={-1} onClick={props.onClose}>
          <CloseIcon fontSize="small" />
        </button>
      </header>

      <div className={style.contents}>
        <div>{props.children}</div>
      </div>
    </Paper>
  );
};

ToolPanel.Section = ToolPanelSection;
ToolPanel.Label = ToolPanelLabel;
ToolPanel.Buttons = ToolPanelButtons;
ToolPanel.Button = ToolPanelButton;
export default ToolPanel;
