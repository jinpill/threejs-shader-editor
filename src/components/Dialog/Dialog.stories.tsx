import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { getContainerConfigs } from "@/stories/utils";
import Button from "@/components/Button";
import MountAnimation from "@/components/MountAnimation";
import Dialog from ".";

const meta = {
  title: "Reusable/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={() => setIsVisible(true)} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...args} onClickAway={() => setIsVisible(false)} />
        </MountAnimation>
      </>
    );
  },
  args: {},
};
