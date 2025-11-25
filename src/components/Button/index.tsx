"use client";

import React, { useEffect, useImperativeHandle, useRef } from "react";
import classNames from "classnames";

import Icon, { type IconName } from "@/components/Icon";
import useCommonSize, { type CommonSize } from "@/hooks/useCommonSize";
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
  onPointerEnter?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
};

export type ButtonSize = CommonSize;
export type ButtonType = "primary" | "secondary" | "tertiary" | "danger";

/**
 * `--btn-border-color`: 버튼 보더의 색상을 지정
 *
 * `--btn-bg-color`: 버튼 배경의 색상을 지정
 *
 * `--btn-text-color`: 버튼 텍스트의 색상을 지정
 *
 * `--btn-outline-color`: 버튼 아웃라인의 색상을 지정
 *
 * `--btn-hover-bg-color`: 호버 상태일 때, 버튼 배경의 색상을 지정
 *
 * `--btn-active-bg-color`: 액티브 상태일 때, 버튼 배경의 색상을 지정
 *
 * `--btn-disabled-bg-color`: 비활성화 상태일 때, 버튼 배경의 색상을 지정
 *
 * `--btn-disabled-text-color`: 비활성화 상태일 때, 버튼 텍스트의 색상을 지정
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => buttonRef.current!, []);
  const size = useCommonSize(props.size);

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
        style[size],
        style[props.type ?? "secondary"],
        {
          [style.fullWidth]: props.isFullWidth,
          [style.minWidthNone]: props.minWidth === "none",
        },
      )}
      tabIndex={props.tabIndex}
      disabled={props.isDisabled}
      onClick={props.onClick}
      onPointerEnter={props.onPointerEnter}
      onPointerLeave={props.onPointerLeave}
    >
      {props.icon && <Icon className={style.icon} icon={props.icon} />}
      {props.label}
      {props.children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
