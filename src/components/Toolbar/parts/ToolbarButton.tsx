import { Tooltip } from "@mui/material";
import style from "../style.module.scss";

export type ToolbarButtonProps = {
  name: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ToolbarButton = (props: ToolbarButtonProps) => (
  <Tooltip title={props.name} arrow>
    <button className={style.toolbarButton} tabIndex={-1} onClick={props.onClick}>
      {props.children}
    </button>
  </Tooltip>
);

export default ToolbarButton;
