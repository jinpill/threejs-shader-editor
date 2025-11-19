import React, { useEffect, useId, useState } from "react";
import * as THREE from "three";
import BaseNumberInput, { type BaseNumberInputProps } from "./utils/BaseNumberInput";
import Container from "./utils/Container";
import FieldLabel from "./utils/FieldLabel";

export type Vector2InputProps = Omit<BaseNumberInputProps, "value" | "onChange"> & {
  value?: THREE.Vector2;
  onChange?: (value: THREE.Vector2) => void;
};

/**
 * - `--input-width`: 가로 크기 (default: small: 12.5rem, large: 18.75rem)
 * - `--input-min-width`: 최소 가로 크기 (default: auto)
 * - `--input-max-width`: 최대 가로 크기 (default: 100%)
 */
const Vector2Input = React.forwardRef<HTMLDivElement, Vector2InputProps>((props, ref) => {
  const xId = useId();
  const yId = useId();

  const [vector2, setVector2] = useState<THREE.Vector2>(() => {
    return props.value ?? new THREE.Vector2();
  });

  const handleChange = (axis: "x" | "y", value: number) => {
    const nextVector2 = vector2.clone();
    nextVector2[axis] = value;

    if (props.onChange) {
      props.onChange(nextVector2);
    } else {
      setVector2(nextVector2);
    }
  };

  useEffect(() => {
    setVector2(props.value ?? new THREE.Vector2());
  }, [props.value]);

  return (
    <Container ref={ref} {...props}>
      <FieldLabel id={xId}>X</FieldLabel>
      <BaseNumberInput
        {...props}
        id={xId}
        value={vector2.x}
        onChange={handleChange.bind(null, "x")}
      />

      <FieldLabel id={yId}>Y</FieldLabel>
      <BaseNumberInput
        {...props}
        id={yId}
        value={vector2.y}
        onChange={handleChange.bind(null, "y")}
      />
    </Container>
  );
});

Vector2Input.displayName = "Input.Vector2";
export default Vector2Input;
