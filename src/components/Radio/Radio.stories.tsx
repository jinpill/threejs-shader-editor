import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Radio from ".";
import { useState } from "react";

const meta = {
  title: "Reusable/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    size: "small",
    isDisabled: false,
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: boolean) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Radio {...args} value={value} onChange={handleChange} />;
  },
};

export const Group: Story = {
  args: {
    size: "small",
    isDisabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(-1);

    const options = [
      { label: "Option 1", value: 0 },
      { label: "Option 2", value: 1 },
      { label: "Option 3", value: 2 },
    ];

    return (
      <Radio.Group
        size={args.size}
        isDisabled={args.isDisabled}
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};
