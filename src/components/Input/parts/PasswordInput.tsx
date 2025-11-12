import React, { useState } from "react";
import BaseInput, { type CommonOmitProps } from "./utils/BaseInput";
import Container from "./utils/Container";
import type { BaseProps } from "../types";

export type PasswordInputProps = Omit<BaseProps, CommonOmitProps>;
type InputType = "password" | "text";

const PasswordInput = React.forwardRef<HTMLDivElement, PasswordInputProps>(
  (props, ref) => {
    const { className, isFullWidth, ...baseInputProps } = props;
    const containerProps = { isFullWidth, className };

    const [type, setType] = useState<InputType>("password");

    const handleToggleType = () => {
      setType((prev) => {
        if (prev === "text") return "password";
        else return "text";
      });
    };

    return (
      <Container ref={ref} {...containerProps}>
        <BaseInput type={type} {...baseInputProps} />
        <button onClick={handleToggleType}>ㅋ</button>
      </Container>
    );
  },
);

PasswordInput.displayName = "Input.Password";
export default PasswordInput;
