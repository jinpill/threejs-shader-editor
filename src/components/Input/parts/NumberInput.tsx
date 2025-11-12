import React from "react";
import BaseNumberInput, { type BaseNumberInputProps } from "./utils/BaseNumberInput";
import Container from "./utils/Container";
import Unit from "./utils/Unit";

export type NumberInputProps = BaseNumberInputProps & {
  unit?: string;
};

const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => (
  <Container ref={ref} size={props.size} isFullWidth={props.isFullWidth}>
    <BaseNumberInput {...props} />
    {props.unit && <Unit>{props.unit}</Unit>}
  </Container>
));

NumberInput.displayName = "Input.Number";
export default NumberInput;
