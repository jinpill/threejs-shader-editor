import classNames from "classnames";
import Label from "@mui/material/FormLabel";
import style from "./style.module.scss";

export type ToolPanelLabelProps = {
  name: string;

  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * `--tp-ln-width` ToolPanel.Label의 고정 너비를 지정 (default: auto)
 */
const ToolPanelLabel = (props: ToolPanelLabelProps) => {
  return (
    <Label className={classNames(style.label, props.className)} style={props.style}>
      <div className={style.name}>{props.name}</div>
      <div className={style.contents}>{props.children}</div>
    </Label>
  );
};

export default ToolPanelLabel;
