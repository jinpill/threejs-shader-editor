import React, { useMemo, useState } from "react";
import classNames from "classnames";
import * as THREE from "three";

import InputLabel from "@mui/material/InputLabel";
import FieldBase from "../utils/FieldBase";
import Input from "../utils/Input";

import style from "./Vector3Field.module.scss";

export type Vector3FieldProps = {
  label: string;
  value?: THREE.Vector3;

  onChange?: (value: THREE.Vector3) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  className?: string;
  style?: React.CSSProperties;
};

/**
 * `--fi-width` Field.Vector3 너비를 지정 (default: 11.375rem)
 */
const Vector3Field = React.forwardRef<HTMLDivElement, Vector3FieldProps>((props, ref) => {
  const vector3 = useMemo(() => {
    return props.value ?? new THREE.Vector3();
  }, [props.value]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (axis: "x" | "y" | "z", value: string) => {
    const newValue = value.trim() ? Number(value) : 0;
    const newVector3 = vector3.clone();
    newVector3[axis] = newValue;
    props.onChange?.(newVector3);
  };

  return (
    <FieldBase
      ref={ref}
      className={classNames(style.vector3Field, props.className)}
      style={props.style}
    >
      <div className={style.label}>
        <InputLabel focused={isFocused} shrink>
          {props.label}
        </InputLabel>
      </div>

      <Input
        type="number"
        label=" "
        start="x"
        value={vector3.x.toString()}
        onKeyDown={props.onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange.bind(null, "x")}
      />
      <Input
        type="number"
        label=" "
        start="y"
        value={vector3.y.toString()}
        onKeyDown={props.onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange.bind(null, "y")}
      />
      <Input
        type="number"
        label=" "
        start="z"
        value={vector3.z.toString()}
        onKeyDown={props.onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange.bind(null, "z")}
      />
    </FieldBase>
  );
});

Vector3Field.displayName = "Vector3Field";
export default Vector3Field;
