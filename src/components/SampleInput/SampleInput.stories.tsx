import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import SampleInput from ".";

const meta = {
  title: "Reusable/SampleInput",
  component: SampleInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof SampleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    value: "Sample Input",
  },
};
