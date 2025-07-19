import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Dropdown, { DropdownProps } from ".";

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
    value: 1,
    options: Array.from({ length: 10 }).map((_, i) => ({
      value: i,
      label: `Option ${i + 1}`,
    })),
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: number) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return (
      <Dropdown
        {...(args as DropdownProps<number>)}
        value={value}
        onChange={handleChange}
      />
    );
  },
};
