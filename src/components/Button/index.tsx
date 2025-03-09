import React from "react";
import classNames from "classnames";
import style from "./style.module.scss";

export type ButtonProps = {
  label?: string;
  tabIndex?: number;
  size?: ButtonSize;
  type?: ButtonType;
  minWidth?: "none";
  isFullWidth?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ButtonSize = "small" | "large";
export type ButtonType = "primary" | "secondary" | "tertiary" | "danger";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      ref={ref}
      className={classNames(
        style.button,
        style[props.size ?? "small"],
        style[props.type ?? "secondary"],
        {
          [style.fullWidth]: props.isFullWidth,
          [style.minWidthNone]: props.minWidth === "none",
        },
      )}
      tabIndex={props.tabIndex}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.children}
      {props.label}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
