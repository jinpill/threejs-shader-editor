import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import * as THREE from "three";
import Field from ".";
import { fn } from "@storybook/test";

import type { NumberFieldProps } from "./parts/NumberField";
import type { Vector3FieldProps } from "./parts/Vector3Field";

const numberFieldMeta = {
  title: "Reusable/Field",
  component: Field.Number,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Field.Number>;

export default numberFieldMeta;
type NumberFieldStory = StoryObj<typeof numberFieldMeta>;

export const NumberField: NumberFieldStory = {
  args: {
    label: "Number Field",
    unit: "px",
    value: 0,
  },
  render: (args: NumberFieldProps) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: number) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Field.Number {...args} value={value} onChange={handleChange} />;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vector3FieldMeta = {
  ...numberFieldMeta,
  component: Field.Vector3,
} satisfies Meta<typeof Field.Vector3>;
type Vector3FieldStory = StoryObj<typeof vector3FieldMeta>;

export const Vector3Field: Vector3FieldStory = {
  args: {
    label: "Vector3 Field",
    value: new THREE.Vector3(),
  },
  render: (args: Vector3FieldProps) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: THREE.Vector3) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Field.Vector3 {...args} value={value} onChange={handleChange} />;
  },
};
