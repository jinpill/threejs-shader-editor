import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Toggle from ".";
import { useArgs } from "@storybook/preview-api";

const meta = {
  title: "Reusable/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
      args.onChange?.(value);
    };

    return <Toggle {...args} value={value} onChange={handleChange} />;
  },
};
