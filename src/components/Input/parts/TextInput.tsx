import React from "react";
import BaseInput, { type BaseInputProps, type CommonOmitProps } from "./BaseInput";

export type TextInputProps = Omit<BaseInputProps, CommonOmitProps>;

const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>((props, ref) => {
  return <BaseInput ref={ref} type="text" {...props} />;
});

TextInput.displayName = "Input.Text";
export default TextInput;
