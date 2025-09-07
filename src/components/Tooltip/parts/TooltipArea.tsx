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
  const contentsRef = useRef<HTMLDivElement>(null);
  const { data } = useTooltipContext();

  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [contents, setContents] = useState("");
  const [direction, setDirection] = useState<TooltipDirection>("bottom");
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const handleMounted = () => {
    const $area = areaRef.current;
    const $contents = contentsRef.current;
    if (!$area || !$contents || !data) return;

    setIsReady(true);
    setTooltipStyle(() => {
      const { direction, rect } = data;
      const style: React.CSSProperties = {};

      const areaRect = $area.getBoundingClientRect();
      const contentsRect = $contents.getBoundingClientRect();

      if (direction === "top" || direction === "bottom") {
        let left = rect.left - areaRect.left + rect.width / 2;
        if (left + contentsRect.width / 2 > areaRect.width) {
          left -= left + contentsRect.width / 2 - areaRect.width;
        } else if (left - contentsRect.width / 2 < 0) {
          left -= left - contentsRect.width / 2;
        }
        style.left = left;

        if (direction === "top") {
          style.top = rect.top - areaRect.top;
        } else {
          style.top = rect.top - areaRect.top + rect.height;
        }
      }

      if (direction === "left" || direction === "right") {
        let top = rect.top - areaRect.top + rect.height / 2;
        if (top + contentsRect.height / 2 > areaRect.height) {
          top -= top + contentsRect.height / 2 - areaRect.height;
        } else if (top - contentsRect.height / 2 < 0) {
          top -= top - contentsRect.height / 2;
        }
        style.top = top;

        if (direction === "left") {
          style.left = rect.left - areaRect.left;
        } else {
          style.left = rect.left - areaRect.left + rect.width;
        }
      }

      return style;
    });
  };

  const handleUnmounted = () => {
    setContents("");
    setDirection("bottom");
    setTooltipStyle({});
    setIsReady(false);
  };

  useEffect(() => {
    if (!data) {
      setIsVisible(false);
      return;
    }

    setContents(data.contents);
    setDirection(data.direction);
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
        onMounted={handleMounted}
        onUnmounted={handleUnmounted}
      >
        <TooltipContents
          ref={contentsRef}
          contents={contents}
          direction={direction}
          isReady={isReady}
          style={tooltipStyle}
        />
      </MountAnimation>
    </div>
  );
};

export default TooltipArea;
