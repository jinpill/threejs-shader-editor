import React, { useEffect, useState } from "react";
import * as THREE from "three";
import BaseNumberInput, { type BaseNumberInputProps } from "./utils/BaseNumberInput";
import Container from "./utils/Container";
import FieldLabel from "./utils/FieldLabel";

export type Vector3InputProps = Omit<BaseNumberInputProps, "value" | "onChange"> & {
  value?: THREE.Vector3;
  onChange?: (value: THREE.Vector3) => void;
};

/**
 * - `--input-width`: 가로 크기 (default: small: 12.5rem, large: 18.75rem)
 * - `--input-min-width`: 최소 가로 크기 (default: auto)
 * - `--input-max-width`: 최대 가로 크기 (default: 100%)
 */
const Vector3Input = React.forwardRef<HTMLDivElement, Vector3InputProps>((props, ref) => {
  const [vector3, setVector3] = useState<THREE.Vector3>(() => {
    return props.value ?? new THREE.Vector3();
  });

  const handleChange = (axis: "x" | "y" | "z", value: number) => {
    const nextVector3 = vector3.clone();
    nextVector3[axis] = value;

    if (props.onChange) {
      props.onChange(nextVector3);
    } else {
      setVector3(nextVector3);
    }
  };

  useEffect(() => {
    setVector3(props.value ?? new THREE.Vector3());
  }, [props.value]);

  return (
    <Container ref={ref} {...props}>
      <FieldLabel>X</FieldLabel>
      <BaseNumberInput
        {...props}
        value={vector3.x}
        onChange={handleChange.bind(null, "x")}
      />

      <FieldLabel>Y</FieldLabel>
      <BaseNumberInput
        {...props}
        value={vector3.y}
        onChange={handleChange.bind(null, "y")}
      />

      <FieldLabel>Z</FieldLabel>
      <BaseNumberInput
        {...props}
        value={vector3.z}
        onChange={handleChange.bind(null, "z")}
      />
    </Container>
  );
});

Vector3Input.displayName = "Input.Vector3";
export default Vector3Input;
