import React, { useState } from "react";
import Icon from "@/components/Icon";
import BaseInput, { type CommonOmitProps } from "./utils/BaseInput";
import Container from "./utils/Container";
import type { BaseProps } from "../types";
import style from "../style.module.scss";

export type PasswordInputProps = Omit<BaseProps, CommonOmitProps>;
type InputType = "password" | "text";

/**
 * - `--input-width`: Height of the input (default: small: 12.5rem, large: 18.75rem)
 * - `--input-min-width`: Minimum width of the input (default: auto)
 * - `--input-max-width`: Maximum width of the input (default: 100%)
 */
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
      <Container ref={ref} {...props}>
        <BaseInput type={type} {...props} />
        <button className={style.visibilityToggleButton} onClick={handleToggleType}>
          <Icon
            icon={type === "password" ? "visibility" : "visibility_off"}
            type="outlined"
          />
        </button>
      </Container>
    );
  },
);

PasswordInput.displayName = "Input.Password";
export default PasswordInput;
