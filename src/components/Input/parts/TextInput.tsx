import React from "react";
import BaseInput, { type CommonOmitProps } from "./utils/BaseInput";
import Container from "./utils/Container";
import type { BaseProps } from "../types";

export type TextInputProps = Omit<BaseProps, CommonOmitProps>;

/**
 * - `--input-width`: 가로 크기 (default: small: 12.5rem, large: 18.75rem)
 * - `--input-min-width`: 최소 가로 크기 (default: auto)
 * - `--input-max-width`: 최대 가로 크기 (default: 100%)
 */
const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>((props, ref) => (
  <Container ref={ref} {...props}>
    <BaseInput type="text" {...props} />
  </Container>
));

TextInput.displayName = "Input.Text";
export default TextInput;
