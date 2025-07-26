import { useId, useRef } from "react";
import classNames from "classnames";

import Button, { type ButtonSize } from "@/components/Button";
import Icon from "@/components/Icon";
import { useOptionsStore, type Option } from "@/stores/useOptionsStore";

import style from "./style.module.scss";

export type DropdownProps<V extends string | number> = {
  size?: DropdownSize;
  value?: V;
  options?: Option<V>[];
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (value: V) => void;
  className?: string;
};

export type DropdownSize = ButtonSize;

const Dropdown = <V extends string | number>(props: DropdownProps<V>) => {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const size = props.size ?? "small";
  const options = props.options ?? [];
  const option = options.find((option) => option.value === props.value);
  const isDisabled = props.isDisabled || options.length === 0;

  const { setOptions } = useOptionsStore();

  const handleClick = () => {
    const $button = buttonRef.current;
    const rect = $button?.getBoundingClientRect();
    if (!rect) return;

    setOptions({
      id: id,
      rect: rect,
      list: options,
      callback: (value) => {
        if (props.value === value) return;
        props.onChange?.(value as V);
      },
    });
  };

  return (
    <Button
      ref={buttonRef}
      className={classNames(style.dropdown, props.className, style[size])}
      type="secondary"
      size={size}
      isDisabled={isDisabled}
      onClick={handleClick}
    >
      <div className={style.label}>
        {option?.label ?? props.placeholder ?? "Select an option"}
      </div>
      <Icon className={style.icon} icon="keyboard_arrow_down" />
    </Button>
  );
};

export default Dropdown;
