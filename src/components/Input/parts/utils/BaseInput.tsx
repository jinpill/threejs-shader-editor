import React, { useEffect, useState } from "react";
import classNames from "classnames";
import type { InputSize } from "../..";
import style from "../../style.module.scss";

export type BaseInputProps = {
  type: "text" | "password" | "number";
  size?: InputSize;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  useAutoFocus?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCopy?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onBeforeInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
};

export type CommonOmitProps = "type";

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const [value, setValue] = useState(props.value ?? "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (props.onChange) {
      props.onChange(value);
    } else {
      setValue(value);
    }
  };

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  return (
    <input
      ref={ref}
      className={classNames(style.input, props.className)}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
      autoFocus={props.useAutoFocus}
      maxLength={props.maxLength}
      type={props.type}
      placeholder={props.placeholder}
      value={value}
      onChange={handleChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      onCopy={props.onCopy}
      onPaste={props.onPaste}
      onBeforeInput={props.onBeforeInput}
      onInput={props.onInput}
    />
  );
});

BaseInput.displayName = "BaseInput";
export default BaseInput;
