import React from "react";
import classNames from "classnames";
import style from "./FieldBase.module.scss";

export type FieldBaseProps = {
  isFullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const FieldBase = React.forwardRef<HTMLDivElement, FieldBaseProps>((props, ref) => (
  <div
    ref={ref}
    className={classNames(style.fieldBase, props.className, {
      [style.fullWidth]: props.isFullWidth,
    })}
    style={props.style}
  >
    {props.children}
  </div>
));

FieldBase.displayName = "FieldBase";
export default FieldBase;
