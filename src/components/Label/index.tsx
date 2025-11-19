import classNames from "classnames";
import LabelGroup from "./parts/LabelGroup";
import style from "./style.module.scss";
import { useLabelGroupContext } from "./hooks";
import { useEffect, useId, useRef } from "react";

export type LabelProps = {
  text: string;
  direction?: LabelDirection;
  className?: string;
  children?: React.ReactNode;
};

export type LabelDirection = "top" | "left" | "right";

const Label = (props: LabelProps) => {
  const id = useId();
  const textRef = useRef<HTMLDivElement>(null);
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

      <div className={style.contents}>{props.children}</div>
    </label>
  );
};

Label.Group = LabelGroup;
export default Label;
