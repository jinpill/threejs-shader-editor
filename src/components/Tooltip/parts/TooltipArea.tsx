import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import MountAnimation from "@/components/MountAnimation";
import { useTooltipContext } from "../Context";
import TooltipContents from "./TooltipContents";

import style from "../style.module.scss";

export type TooltipAreaProps = {
  className?: string;
  style?: React.CSSProperties;
};

const TooltipArea = (props: TooltipAreaProps) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const { data } = useTooltipContext();
  const [isVisible, setIsVisible] = useState(false);

  const [contents, setContents] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const $area = areaRef.current;
    if (!data || !$area) {
      setIsVisible(false);
      return;
    }

    const areaRect = $area.getBoundingClientRect();
    setContents(data.contents);
    setTooltipStyle({
      top: data.rect.top - areaRect.top + data.rect.height,
      left: data.rect.left - areaRect.left + data.rect.width / 2,
    });
    setIsVisible(true);
  }, [data]);

  return (
    <div
      ref={areaRef}
      className={classNames(style.tooltipArea, props.className)}
      style={props.style}
    >
      <MountAnimation
        isVisible={isVisible}
        onUnmounted={() => {
          setContents("");
          setTooltipStyle({});
        }}
      >
        <TooltipContents contents={contents} style={tooltipStyle} />
      </MountAnimation>
    </div>
  );
};

export default TooltipArea;
