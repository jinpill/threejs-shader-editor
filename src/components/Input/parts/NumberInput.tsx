import React from "react";
import BaseNumberInput, { type BaseNumberInputProps } from "./utils/BaseNumberInput";
import Container from "./utils/Container";
import Unit from "./utils/Unit";

export type NumberInputProps = BaseNumberInputProps & {
  unit?: string;
};

/**
 * - `--input-width`: Height of the input (default: small: 12.5rem, large: 18.75rem)
 * - `--input-min-width`: Minimum width of the input (default: auto)
 * - `--input-max-width`: Maximum width of the input (default: 100%)
 */
const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => (
  <Container ref={ref} {...props}>
    <BaseNumberInput {...props} />
    {props.unit && <Unit>{props.unit}</Unit>}
  </Container>
));

NumberInput.displayName = "Input.Number";
export default NumberInput;
