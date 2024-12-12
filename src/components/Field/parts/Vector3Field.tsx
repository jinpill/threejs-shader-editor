import React from "react";
import classNames from "classnames";
import * as THREE from "three";

import FieldBase from "../utils/FieldBase";
import Input from "../utils/Input";

import style from "./Vector3Field.module.scss";

export type Vector3FieldProps = {
  label: string;
  value?: THREE.Vector3;

  onChange?: (value: THREE.Vector3) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  className?: string;
  style?: React.CSSProperties;
};

/**
 * `--fi-width` Field.Vector3 너비를 지정 (default: 11.375rem)
 */
const Vector3Field = React.forwardRef<HTMLDivElement, Vector3FieldProps>((props) => {
  return (
    <FieldBase
      className={classNames(style.vector3Field, props.className)}
      style={props.style}
    >
      <Input
        type="number"
        label={props.label}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      <Input type="number" label=" " onBlur={props.onBlur} onFocus={props.onFocus} />
      <Input type="number" label=" " onBlur={props.onBlur} onFocus={props.onFocus} />
    </FieldBase>
  );
});

Vector3Field.displayName = "Vector3Field";
export default Vector3Field;
