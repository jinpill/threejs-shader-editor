import React, { useImperativeHandle, useRef } from "react";
import classNames from "classnames";

import TooltipProvider from "./parts/TooltipProvider";
import TooltipArea from "./parts/TooltipArea";
import { useTooltipContext } from "./Context";

import style from "./style.module.scss";

export type TooltipProps = {
  contents: string;
  children?: React.ReactNode;
  className?: string;
};

const TooltipBase = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const timeoutIdRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => wrapperRef.current!, []);

  const { setData } = useTooltipContext();

  const handlePointerEnter = () => {
    const $wrapper = wrapperRef.current;
    if (!$wrapper) return;

    timeoutIdRef.current = window.setTimeout(() => {
      setData({
        contents: props.contents,
        rect: $wrapper.getBoundingClientRect(),
      });
    }, 500);
  };

  const handlePointerLeave = () => {
    if (timeoutIdRef.current === null) return;

    window.clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;
    setData(null);
  };

  return (
    <div
      ref={wrapperRef}
      className={classNames(style.tooltipWrapper, props.className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {props.children}
    </div>
  );
});
TooltipBase.displayName = "Tooltip";

type TooltipComponent = typeof TooltipBase & {
  Provider: typeof TooltipProvider;
  Area: typeof TooltipArea;
};

const Tooltip = TooltipBase as TooltipComponent;
Tooltip.Provider = TooltipProvider;
Tooltip.Area = TooltipArea;
export default Tooltip;
