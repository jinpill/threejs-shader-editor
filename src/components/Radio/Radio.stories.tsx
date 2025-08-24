import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Radio from ".";

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

export const Default: Story = {
  args: {
    size: "small",
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
