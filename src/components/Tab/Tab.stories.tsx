import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Tab, { type TabProps } from ".";

const meta = {
  title: "Reusable/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: 0 },
      { label: "Option 2", value: 1 },
      { label: "Option 3", value: 2 },
    ],
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: number) => {
      setValue({ value });
    };

    return <Tab {...(args as TabProps<number>)} value={value} onChange={handleChange} />;
  },
};
