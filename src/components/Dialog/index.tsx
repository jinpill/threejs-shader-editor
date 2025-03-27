import classNames from "classnames";
import Scrim from "@/components/Scrim";
import Icon, { type IconName } from "@/components/Icon";
import useMountAnimation from "@/hooks/useMountAnimation";
import style from "./style.module.scss";
import { useCallback, useEffect } from "react";

export type DialogProps<V> = {
  icon: IconName;
  title: string;
  message: string;
  defaultValue: V;
  buttons: DialogButton<V>[];
  callback: (value: V) => void;
};

export type DialogButton<V> = {
  icon: IconName;
  label: string;
  value: V;
};

const Dialog = <V,>(props: DialogProps<V>) => {
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
      }
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
        onClick={() => props.callback(props.buttons[0].value)}
      >
        <div className={style.icon}>
          <Icon icon={props.icon} />
        </div>
        <button tabIndex={-1} onClick={handleClickAway}>
          <Icon icon="close" />
        </button>

        <div className={style.title}>{props.title}</div>
        <div className={style.message}>{props.message}</div>

        <div className={style.buttons}>
          {props.buttons.map((button, i) => (
            <button key={i} onClick={() => props.callback(button.value)}>
              <Icon icon={button.icon} />
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Scrim>
  );
};

export default Dialog;
