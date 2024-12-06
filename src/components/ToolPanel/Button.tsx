import classNames from "classnames";
import Button from "@mui/material/Button";
import style from "./style.module.scss";

export type ToolPanelButtonProps = {
  label: string;
  type: "primary" | "secondary";
  isDisabled?: boolean;
  onClick?: () => void;

  className?: string;
  style?: React.CSSProperties;
};

const ToolPanelButton = (props: ToolPanelButtonProps) => {
  return (
    <Button
      className={classNames(style.button, props.className)}
      style={props.style}
      variant={VARIANTS[props.type]}
      color="primary"
      size="medium"
      disableElevation
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default ToolPanelButton;

const VARIANTS = {
  primary: "contained",
  secondary: "outlined",
} as const;
