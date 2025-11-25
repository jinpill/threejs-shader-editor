import React from "react";
import classNames from "classnames";

import type { InputSize } from "../..";
import useCommonSize from "@/hooks/useCommonSize";
import style from "../../style.module.scss";

export type ContainerProps = {
  size?: InputSize;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const size = useCommonSize(props.size);

  const handleClick = (event: React.MouseEvent) => {
    const $target = event.target as HTMLElement;
    if ($target.tagName === "INPUT") return;

    event.currentTarget.querySelector("input")?.focus();
    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={classNames(style.inputContainer, props.className, style[size], {
        [style.fullWidth]: props.isFullWidth,
        [style.disabled]: props.isDisabled,
      })}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
});

Container.displayName = "Container";
export default Container;
