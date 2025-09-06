import classNames from "classnames";
import useMountAnimation from "@/hooks/useMountAnimation";
import style from "../style.module.scss";

type TooltipContentsProps = {
  contents: string;
  style: React.CSSProperties;
};

const TooltipContents = (props: TooltipContentsProps) => {
  const { isUnmounting, handleAnimationEnd } = useMountAnimation();

  return (
    <div
      className={classNames(style.tooltip, {
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
