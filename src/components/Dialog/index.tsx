"use client";

import { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";

import Scrim from "@/components/Scrim";
import StatusIcon, { type IconStatus } from "@/components/StatusIcon";
import Icon, { type IconName } from "@/components/Icon";
import Button, { type ButtonType } from "@/components/Button";
import useMountAnimation from "@/hooks/useMountAnimation";

import style from "./style.module.scss";

export type DialogProps<V> = {
  status: DialogStatus;
  title: string;
  message: string;
  defaultValue: V;
  defaultFocus: number;
  buttons: DialogButton<V>[];
  callback: (value: V) => void;
};

export type DialogStatus = IconStatus;

export type DialogButton<V> = {
  icon: IconName;
  label: string;
  type: ButtonType;
  value: V;
};

const Dialog = <V,>(props: DialogProps<V>) => {
  const buttonsRef = useRef<HTMLDivElement>(null);

  const { callback } = props;
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();

  const handleClickAway = useCallback(() => {
    callback(props.defaultValue);
  }, [callback, props.defaultValue]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        event.preventDefault();
        handleClickAway();
        return;
      }

      if (event.code === "ArrowLeft") {
        event.preventDefault();
        focusButton(-1);
        return;
      }

      if (event.code === "ArrowRight") {
        event.preventDefault();
        focusButton(+1);
        return;
      }

      if (event.code === "Tab") {
        if (event.shiftKey) {
          event.preventDefault();
          focusButton(-1);
        } else {
          event.preventDefault();
          focusButton(+1);
        }
        return;
      }
    };

    const focusButton = (direction: number) => {
      const $activeElement = document.activeElement;
      const $buttons = Array.from(buttonsRef.current?.querySelectorAll("button") ?? []);

      let index = $buttons.indexOf($activeElement as HTMLButtonElement);
      if (direction === -1 && index === -1) {
        index = $buttons.length;
      }

      $buttons[index + direction]?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClickAway]);

  return (
    <Scrim onClick={handleClickAway}>
      <div
        className={classNames(style.dialog, {
          [style.unmounting]: isUnmounting,
        })}
        onTransitionEnd={handleAnimationEnd}
      >
        <StatusIcon className={style.statusIcon} status={props.status} />

        <button tabIndex={-1} className={style.closeButton} onClick={handleClickAway}>
          <Icon className={style.icon} icon="close" />
        </button>

        <div className={style.title}>{props.title}</div>
        <div className={style.message}>{props.message}</div>

        <div ref={buttonsRef} className={style.buttons}>
          {props.buttons.map((button, i) => (
            <Button
              key={i}
              className={style.button}
              type={button.type}
              icon={button.icon}
              label={button.label}
              useAutoFocus={i === props.defaultFocus}
              onClick={() => props.callback(button.value)}
            />
          ))}
        </div>
      </div>
    </Scrim>
  );
};

export default Dialog;
