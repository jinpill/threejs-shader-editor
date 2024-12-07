import classNames from "classnames";
import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ToolPanelSection from "./parts/Section";
import ToolPanelLabel from "./parts/Label";
import ToolPanelButtons from "./parts/Buttons";
import ToolPanelButton from "./parts/Button";

import { useToolbarStore, type ToolPanelName } from "@/stores/useToolbarStore";

import style from "./style.module.scss";

export type ToolPanelProps = {
  title: string;
  name?: ToolPanelName;
  onClose?: () => void;

  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * - `--tp-width` ToolPanel의 너비를 지정 (default: 400px)
 * - `--tp-height` ToolPanel의 높이를 지정 (default: auto)
 * - `--tp-max-height` ToolPanel의 최대 높이를 지정 (default: 640px)
 */
const ToolPanel = (props: ToolPanelProps) => {
  const { hideToolPanel } = useToolbarStore();

  const handleClose = () => {
    if (props.name) {
      hideToolPanel(props.name);
    }

    props.onClose?.();
  };

  return (
    <Paper
      elevation={4}
      className={classNames(style.toolPanel, props.className)}
      style={props.style}
    >
      <header className={style.header}>
        <div className={style.title}>{props.title}</div>

        <button className={style.closeButton} tabIndex={-1} onClick={handleClose}>
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
