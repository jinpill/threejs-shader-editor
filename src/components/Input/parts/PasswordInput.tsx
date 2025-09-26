import React, { useState } from "react";
import BaseInput, { type BaseInputProps, type CommonOmitProps } from "./BaseInput";

export type PasswordInputProps = Omit<BaseInputProps, CommonOmitProps>;
type InputType = "password" | "text";

const PasswordInput = React.forwardRef<HTMLDivElement, PasswordInputProps>(
  (props, ref) => {
    const [type, setType] = useState<InputType>("password");

    const handleToggleType = () => {
      setType((prev) => {
        if (prev === "text") return "password";
        else return "text";
      });
    };

    return (
      <BaseInput
        ref={ref}
        type={type}
        {...props}
        afterElement={<button onClick={handleToggleType}>ㅋ</button>}
      />
    );
  },
);

PasswordInput.displayName = "Input.Password";
export default PasswordInput;
