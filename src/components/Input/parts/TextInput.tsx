import React from "react";
import BaseInput, { type CommonOmitProps } from "./utils/BaseInput";
import Container from "./utils/Container";
import type { BaseProps } from "../types";

export type TextInputProps = Omit<BaseProps, CommonOmitProps>;

const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>((props, ref) => {
  const { className, isFullWidth, ...baseInputProps } = props;
  const containerProps = { isFullWidth, className };

  return (
    <Container ref={ref} {...containerProps}>
      <BaseInput type="text" {...baseInputProps} />
    </Container>
  );
});

TextInput.displayName = "Input.Text";
export default TextInput;
