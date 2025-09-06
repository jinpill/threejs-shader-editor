import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from ".";
import Button from "@/components/Button";

const meta = {
  title: "Reusable/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Tooltip.Provider>
            <Story />
            <Tooltip.Area />
          </Tooltip.Provider>
        </div>
      );
    },
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: "이것은 중요한 버튼입니다.",
    direction: "bottom",
    children: <Button label="실행" />,
  },
};
