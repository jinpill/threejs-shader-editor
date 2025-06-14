import type { Meta, StoryObj } from "@storybook/react";
import Toasts from ".";

const meta = {
  title: "Reusable/Toasts",
  component: Toasts,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          height: "500px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toasts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
