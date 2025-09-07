import React from "react";
import classNames from "classnames";
import TextNormalizer from "@/components/TextNormalizer";
import type { TooltipDirection } from "..";
import useMountAnimation from "@/hooks/useMountAnimation";
import style from "../style.module.scss";

type TooltipContentsProps = {
  contents: string;
  direction: TooltipDirection;
  isReady: boolean;
  style: React.CSSProperties;
};

const TooltipContents = React.forwardRef<HTMLDivElement, TooltipContentsProps>(
  (props, ref) => {
    const { isUnmounting, handleAnimationEnd } = useMountAnimation();

    return (
      <div
        ref={ref}
        className={classNames(style.tooltip, style[props.direction], {
          [style.ready]: props.isReady,
          [style.unmounting]: isUnmounting,
        })}
        style={props.style}
        onAnimationEnd={handleAnimationEnd}
      >
        <TextNormalizer text={props.contents} />
      </div>
    );
  },
);

TooltipContents.displayName = "TooltipContents";
export default TooltipContents;
