import React, { useCallback, useEffect, useState } from "react";
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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  className?: string;
  style?: React.CSSProperties;
};

/**
 * `--fi-width` Field.Number의 너비를 지정 (default: 11.375rem)
 */
const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>((props, ref) => {
  const min = numberUtils.parseNumber(props.min, null);
  const max = numberUtils.parseNumber(props.max, null);
  const step = numberUtils.parseNumber(props.step, 1);

  const getValueInRange = useCallback(
    (value: number) => {
      if (min !== null) value = Math.max(value, min);
      if (max !== null) value = Math.min(value, max);
      return value;
    },
    [min, max],
  );

  const [currentValue, setCurrentValue] = useState(() => {
    const value = getValueInRange(props.value ?? 0);
    return value.toString();
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    applyCurrentValue();
    props.onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyCurrentValue();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextValue = Number(currentValue) + step;
      applyCurrentValue(nextValue);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextValue = Number(currentValue) - step;
      applyCurrentValue(nextValue);
    }

    props.onKeyDown?.(e);
  };

  const applyCurrentValue = (value = Number(currentValue)) => {
    const valueInRange = getValueInRange(value);

    if (valueInRange === props.value || !props.onChange) {
      setCurrentValue(valueInRange.toString());
    } else {
      props.onChange(valueInRange);
    }
  };

  useEffect(() => {
    setCurrentValue(() => {
      const value = getValueInRange(props.value ?? 0);
      return value.toString();
    });
  }, [props.value, getValueInRange]);

  return (
    <FieldBase
      ref={ref}
      className={classNames(style.numberField, props.className)}
      style={props.style}
    >
      <Input
        type="number"
        label={props.label}
        end={props.unit}
        value={currentValue}
        onChange={setCurrentValue}
        onFocus={props.onFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </FieldBase>
  );
});

NumberField.displayName = "NumberField";
export default NumberField;
