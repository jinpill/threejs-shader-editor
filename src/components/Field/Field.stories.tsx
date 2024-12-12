import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import Field from ".";
import type { NumberFieldProps } from "./parts/NumberField";

const meta = {
  title: "Reusable/Field",
  component: Field.Number,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field.Number>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input Field",
    value: 0,
  },
  render: (args: NumberFieldProps) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: number) => {
      setValue({ value });
    };

    return <Field.Number {...args} value={value} onChange={handleChange} />;
  },
};
