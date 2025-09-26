import React from "react";
import BaseInput, { type BaseInputProps } from "./BaseInput";

export type TextInputProps = Omit<BaseInputProps, "type">;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <BaseInput ref={ref} type="text" {...props} />;
});

TextInput.displayName = "Input.Text";
export default TextInput;
