import React from "react";
import BaseInput, { type BaseInputProps } from "./BaseInput";

export type PasswordInputProps = Omit<BaseInputProps, "type">;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    return <BaseInput ref={ref} type="password" {...props} />;
  },
);

PasswordInput.displayName = "Input.Password";
export default PasswordInput;
