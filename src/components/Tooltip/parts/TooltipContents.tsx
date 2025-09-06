import classNames from "classnames";
import type { TooltipDirection } from "..";
import useMountAnimation from "@/hooks/useMountAnimation";
import style from "../style.module.scss";

type TooltipContentsProps = {
  contents: string;
  direction: TooltipDirection;
  style: React.CSSProperties;
};

const TooltipContents = (props: TooltipContentsProps) => {
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();

  return (
    <div
      className={classNames(style.tooltip, style[props.direction], {
        [style.unmounting]: isUnmounting,
      })}
      style={props.style}
      onAnimationEnd={handleAnimationEnd}
    >
      {props.contents}
    </div>
  );
};

export default TooltipContents;
