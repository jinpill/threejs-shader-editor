import type { Meta, StoryObj } from "@storybook/react";
import Toasts from ".";
import { useToastStore } from "@/stores/useToastStore";

const meta = {
  title: "Reusable/Toasts",
  component: Toasts,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const { addToast } = useToastStore();

      const handleAddToast = () => {
        addToast({
          status: "info",
          title: "우와 신기하다",
          message: "참 쉽죠?",
          duration: 3000,
        });
      };

      return (
        <div
          style={{
            height: "500px",
          }}
        >
          <button onClick={handleAddToast}>추가</button>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Toasts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
