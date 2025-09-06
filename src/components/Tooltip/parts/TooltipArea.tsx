import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import MountAnimation from "@/components/MountAnimation";
import TooltipContents from "./TooltipContents";
import type { TooltipDirection } from "..";
import { useTooltipContext } from "../Context";

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
  const [direction, setDirection] = useState<TooltipDirection>("bottom");
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const $area = areaRef.current;
    if (!data || !$area) {
      setIsVisible(false);
      return;
    }

    const areaRect = $area.getBoundingClientRect();
    setContents(data.contents);
    setDirection(data.direction);
    setIsVisible(true);

    setTooltipStyle(() => {
      switch (data.direction) {
        case "top":
          return {
            top: data.rect.top - areaRect.top,
            left: data.rect.left - areaRect.left + data.rect.width / 2,
          };
        case "right":
          return {
            top: data.rect.top - areaRect.top + data.rect.height / 2,
            left: data.rect.left - areaRect.left + data.rect.width,
          };
        case "left":
          return {
            top: data.rect.top - areaRect.top + data.rect.height / 2,
            left: data.rect.left - areaRect.left,
          };
        default:
          return {
            top: data.rect.top - areaRect.top + data.rect.height,
            left: data.rect.left - areaRect.left + data.rect.width / 2,
          };
      }
    });
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
          setDirection("bottom");
          setTooltipStyle({});
        }}
      >
        <TooltipContents contents={contents} direction={direction} style={tooltipStyle} />
      </MountAnimation>
    </div>
  );
};

export default TooltipArea;
