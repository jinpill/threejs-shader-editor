import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import useCommonSize, { type CommonSize } from "@/hooks/useCommonSize";
import useStateRef from "@/hooks/useStateRef";
import type { Option, OptionValue } from "@/stores/useOptionsStore";
import style from "./style.module.scss";

export type TabProps<T extends OptionValue> = {
  size?: CommonSize;
  value?: T;
  options?: Option<T>[];
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onChange?: (value: T) => void;
};

type Effect = {
  width: number;
  left: number;
  animation: Animation;
};

type Animation = "" | "ping" | "pong";

const Tab = <T extends OptionValue>(props: TabProps<T>) => {
  const tabRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(props.value);
  const options = props.options ?? [];
  const optionsRef = useStateRef(options);
  const size = useCommonSize(props.size);
  const [effect, setEffect] = useState<Effect | null>(null);

  const handleChange = (value: T) => {
    if (props.onChange) props.onChange(value);
    else setValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusSibling(event, -1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusSibling(event, +1);
    }
  };

  const focusSibling = (event: React.KeyboardEvent, direction: number) => {
    const $tab = tabRef.current;
    if (!$tab) return;

    const $target = event.target as HTMLButtonElement;
    const $buttons = Array.from($tab.querySelectorAll("button"));

    const index = $buttons.indexOf($target) + direction;
    const $sibling = $buttons[index];
    $sibling?.focus();
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const $tab = tabRef.current;
    const options = optionsRef.current;
    if (!$tab || options.length === 0) return;

    const index = options.findIndex((option) => option.value === value);
    const $buttons = Array.from($tab.querySelectorAll("button"));
    const $button = $buttons[index];
    if (!$button) {
      setEffect(null);
      return;
    }

    const observer = new ResizeObserver(() => {
      const firstButtonRect = $buttons[0].getBoundingClientRect();
      const buttonRect = $button.getBoundingClientRect();

      setEffect((prev) => ({
        width: buttonRect.width,
        left: buttonRect.left - firstButtonRect.left,
        animation: prev === null ? "" : prev.animation === "ping" ? "pong" : "ping",
      }));
    });

    observer.observe($button);
    return () => observer.disconnect();
  }, [value, optionsRef]);

  return (
    <div
      ref={tabRef}
      className={classNames(style.tab, style[size], {
        [style.disabled]: props.isDisabled,
        [style.fullWidth]: props.isFullWidth,
      })}
    >
      <div className={style.activeEffectArea}>
        {effect !== null && (
          <div
            className={classNames({
              [style.ping]: effect.animation === "ping",
              [style.pong]: effect.animation === "pong",
            })}
            style={{
              width: `${effect.width}px`,
              left: `${effect.left}px`,
            }}
          />
        )}
      </div>

      <ul
        className={style.options}
        style={{
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        }}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={classNames(style.option, {
              [style.active]: option.value === value,
            })}
          >
            <button
              disabled={props.isDisabled}
              onClick={handleChange.bind(null, option.value)}
              onKeyDown={handleKeyDown}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
