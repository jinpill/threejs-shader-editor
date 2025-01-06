import React from "react";
import classNames from "classnames";

import FieldBase from "../utils/FieldBase";
import Input from "../utils/Input";
import * as numberUtils from "@/utils/numberUtils";

import style from "./NumberField.module.scss";

export type NumberFieldProps = {
  label: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  value?: number;
  unit?: string;

  onChange?: (value: number) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  className?: string;
  style?: React.CSSProperties;
};

/**
 * `--fi-width` Field.Number의 너비를 지정 (default: 11.375rem)
 */
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>((props, ref) => {
  const min = numberUtils.parseNumber(props.min);
  const max = numberUtils.parseNumber(props.max);
  const step = numberUtils.parseNumber(props.step);
  const value = props.value?.toString() ?? "";

  const handleChange = (value: string) => {
    let nextValue = Number(value);
    if (typeof min === "number") nextValue = Math.max(nextValue, min);
    if (typeof max === "number") nextValue = Math.min(nextValue, max);
    props.onChange?.(nextValue);
  };

  return (
    <FieldBase
      ref={ref}
      className={classNames(style.numberField, props.className)}
      style={props.style}
    >
      <Input
        type="number"
        label={props.label}
        min={min}
        max={max}
        step={step}
        end={props.unit}
        value={value}
        onChange={handleChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    </FieldBase>
  );
});

NumberField.displayName = "NumberField";
export default NumberField;
