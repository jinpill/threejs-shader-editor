import React, { useEffect, useMemo, useRef, useState } from "react";
import BaseInput, { type CommonOmitProps } from "./BaseInput";
import type { BaseProps } from "../../types";

export type BaseNumberInputProps = Omit<
  BaseProps,
  CommonOmitProps | "value" | "onChange" | "className" | "placeholder"
> & {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
};

const BaseNumberInput = React.forwardRef<HTMLInputElement, BaseNumberInputProps>(
  (props, ref) => {
    const [value, setValue] = useState(props.value?.toString() ?? "0");
    const prevValueRef = useRef(value);

    const min = useMemo(() => props.min ?? -Infinity, [props.min]);
    const max = useMemo(() => props.max ?? Infinity, [props.max]);
    const step = useMemo(() => props.step ?? 1, [props.step]);
    const decimals = useMemo(() => props.decimals ?? 3, [props.decimals]);

    const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
      const data = (event as unknown as InputEvent).data;
      if (data === "e") event.preventDefault();
      props.onBeforeInput?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      if (key === "Enter") {
        event.preventDefault();
        applyValue(value);
      } else if (key === "Escape") {
        event.preventDefault();
        setValue(prevValueRef.current);
      } else if (key === "ArrowUp") {
        event.preventDefault();
        adjustValue(+step);
      } else if (key === "ArrowDown") {
        event.preventDefault();
        adjustValue(-step);
      }

      props.onKeyDown?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      applyValue(value);
      props.onBlur?.(event);
    };

    const adjustValue = (foo: number) => {
      const nextValue = parseFloat(value) + foo;
      applyValue(nextValue);
    };

    const applyValue = (value: string | number) => {
      const prevValue = formatValue(prevValueRef.current);
      const nextValue = formatValue(value);

      if (prevValue === nextValue) {
        setValue(prevValueRef.current);
      } else if (isNaN(nextValue)) {
        changeValue(prevValue);
      } else {
        changeValue(nextValue);
      }
    };

    const formatValue = (value: string | number) => {
      const isNumber = typeof value === "number";
      const number = isNumber ? value : parseFloat(value);
      if (isNaN(number)) return number;

      if (number < min) return min;
      if (number > max) return max;
      return parseFloat(number.toFixed(decimals));
    };

    const changeValue = (value: number) => {
      if (props.onChange) {
        props.onChange(value);
      } else {
        setValue(value.toString());
      }
      prevValueRef.current = value.toString();
    };

    useEffect(() => {
      setValue(props.value?.toString() ?? "0");
    }, [props.value]);

    return (
      <BaseInput
        ref={ref}
        type="number"
        {...props}
        value={value}
        onChange={setValue}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    );
  },
);

BaseNumberInput.displayName = "BaseNumberInput";
export default BaseNumberInput;
