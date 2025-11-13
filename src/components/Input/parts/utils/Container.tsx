import React from "react";
import classNames from "classnames";
import style from "../../style.module.scss";
import { InputSize } from "../..";

export type ContainerProps = {
  size?: InputSize;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const handleClick = (event: React.MouseEvent) => {
    const $target = event.target as HTMLElement;
    if ($target.tagName === "INPUT") return;

    event.currentTarget.querySelector("input")?.focus();
    event.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={classNames(
        style.inputContainer,
        props.className,
        style[props.size ?? "small"],
        {
          [style.fullWidth]: props.isFullWidth,
          [style.disabled]: props.isDisabled,
        },
      )}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
});

Container.displayName = "Container";
export default Container;
