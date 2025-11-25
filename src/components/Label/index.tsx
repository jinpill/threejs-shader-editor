import { useEffect, useId, useRef } from "react";
import classNames from "classnames";

import LabelGroup from "./parts/LabelGroup";
import useCommonSize, { CommonSizeContext, type CommonSize } from "@/hooks/useCommonSize";
import { useLabelGroupContext } from "./hooks";

import style from "./style.module.scss";

export type LabelProps = {
  text: string;
  size?: LabelSize;
  direction?: LabelDirection;
  className?: string;
  children?: React.ReactNode;
};

export type LabelSize = CommonSize;

export type LabelDirection = "top" | "left" | "right";

const Label = (props: LabelProps) => {
  const id = useId();
  const textRef = useRef<HTMLDivElement>(null);

  const size = useCommonSize(props.size);
  const { width, updateWidth, disconnect } = useLabelGroupContext();

  useEffect(() => {
    const $text = textRef.current;
    if (!$text) return;

    const width = $text.offsetWidth;
    updateWidth?.(id, Math.ceil(width));
  }, [props.text, id, updateWidth]);

  useEffect(() => {
    return () => disconnect?.(id);
  }, [id, disconnect]);

  return (
    <label
      className={classNames(
        style.label,
        props.className,
        style[size],
        style[props.direction ?? "top"],
        {
          [style.notReady]: props.direction === "left" && updateWidth && width === 0,
        },
      )}
    >
      <div
        className={style.text}
        style={{
          width: props.direction === "left" && width ? `${width}px` : "auto",
        }}
      >
        <div ref={textRef}>{props.text}</div>
      </div>

      <div className={style.contents}>
        <CommonSizeContext.Provider value={{ size: props.size }}>
          {props.children}
        </CommonSizeContext.Provider>
      </div>
    </label>
  );
};

Label.Group = LabelGroup;
export default Label;
