import { Tooltip } from "@mui/material";
import type { ToolPanelName } from "@/stores/useToolbarStore";
import style from "../style.module.scss";

export type ToolbarButtonProps = {
  label: string;
  name?: ToolPanelName;
  children?: React.ReactNode;
  onClick?: (name?: ToolPanelName) => void;
};

const ToolbarButton = (props: ToolbarButtonProps) => {
  const handleClick = () => {
    props.onClick?.(props.name);
  };

  return (
    <Tooltip title={props.label} arrow>
      <button className={style.button} tabIndex={-1} onClick={handleClick}>
        {props.children}
      </button>
    </Tooltip>
  );
};

export default ToolbarButton;
