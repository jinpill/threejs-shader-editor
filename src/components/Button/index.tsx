"use client";

import React, { useEffect, useImperativeHandle, useRef } from "react";
import classNames from "classnames";
import Icon, { type IconName } from "@/components/Icon";
import style from "./style.module.scss";

export type ButtonProps = {
  label?: string;
  tabIndex?: number;
  size?: ButtonSize;
  type?: ButtonType;
  minWidth?: "auto" | "none";
  icon?: IconName;
  useAutoFocus?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
};

export type ButtonSize = "small" | "large";
export type ButtonType = "primary" | "secondary" | "tertiary" | "danger";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => buttonRef.current!, []);

  useEffect(() => {
    if (!props.useAutoFocus) return;
    buttonRef.current?.focus();
  }, [props.useAutoFocus]);

  return (
    <button
      ref={buttonRef}
      className={classNames(
        style.button,
        props.className,
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
      {props.icon && <Icon className={style.icon} icon={props.icon} />}
      {props.label}
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
