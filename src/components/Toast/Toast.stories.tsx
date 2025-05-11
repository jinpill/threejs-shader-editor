import type { Meta, StoryObj } from "@storybook/react";
import Toast from ".";

const meta = {
  title: "Reusable/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
