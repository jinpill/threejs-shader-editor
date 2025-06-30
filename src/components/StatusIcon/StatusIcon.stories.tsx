import type { Meta, StoryObj } from "@storybook/react";
import StatusIcon from ".";

const meta = {
  title: "Reusable/StatusIcon",
  component: StatusIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    status: "info",
  },
};

export const Success: Story = {
  args: {
    status: "success",
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
};

export const Error: Story = {
  args: {
    status: "error",
  },
};
