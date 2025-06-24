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
            position: "relative",
          }}
        >
          <button
            style={{
              width: "12.5rem",
              height: "2.5rem",
              position: "absolute",
              top: "50%",
              right: "20%",
              transform: "translate(50%, -50%)",
              borderRadius: "0.25rem",
              border: "0.0625rem solid #d3d3d3",
              backgroundColor: "#f4f4f4",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={handleAddToast}
          >
            추가
          </button>
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
