import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Dropdown from ".";

const meta = {
  title: "Reusable/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
    message: "Select an option",
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: string) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return <Dropdown {...args} value={value} onChange={handleChange} />;
  },
};
