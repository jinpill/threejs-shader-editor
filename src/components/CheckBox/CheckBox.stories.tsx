import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import Dropdown from "@/components/Dropdown";
import { fn } from "@storybook/test";
import CheckBox from ".";

const meta = {
  title: "Reusable/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof CheckBox>;

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

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Dropdown size={args.size} />
        <CheckBox {...args} value={value} onChange={handleChange} />
      </div>
    );
  },
};
