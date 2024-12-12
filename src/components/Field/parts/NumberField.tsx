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
  value?: number;

  onChange?: (value: number) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  className?: string;
  style?: React.CSSProperties;
};

/**
 * `--fi-width` Field.Number의 너비를 지정 (default: 11.375rem)
 */
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>((props) => {
  const min = numberUtils.parseNumber(props.min);
  const max = numberUtils.parseNumber(props.max);
  const value = props.value?.toString() ?? "";

  const handleChange = (value: string) => {
    props.onChange?.(Number(value));
  };

  return (
    <FieldBase
      className={classNames(style.numberField, props.className)}
      style={props.style}
    >
      <Input
        type="number"
        label={props.label}
        min={min}
        max={max}
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
