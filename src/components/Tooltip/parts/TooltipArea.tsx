import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useTooltipContext } from "../Context";
import style from "../style.module.scss";

export type TooltipAreaProps = {
  className?: string;
  style?: React.CSSProperties;
};

const TooltipArea = (props: TooltipAreaProps) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const { data } = useTooltipContext();
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    const $area = areaRef.current;
    if (!data || !$area) {
      setTooltipStyle(null);
      return;
    }

    const areaRect = $area.getBoundingClientRect();
    setTooltipStyle({
      top: data.rect.top - areaRect.top + data.rect.height,
      left: data.rect.left - areaRect.left + data.rect.width / 2,
    });
  }, [data]);

  return (
    <div
      ref={areaRef}
      className={classNames(style.tooltipArea, props.className)}
      style={props.style}
    >
      {data && tooltipStyle && (
        <div className={style.tooltip} style={tooltipStyle}>
          {data.contents}
        </div>
      )}
    </div>
  );
};

export default TooltipArea;
