import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { getContainerConfigs } from "@/stories/utils";
import Button from "@/components/Button";
import MountAnimation from "@/components/MountAnimation";
import Scrim from ".";

const meta = {
  title: "Reusable/Scrim",
  component: Scrim,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Scrim>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...getContainerConfigs(),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        <Button label="스크림 열기" onClick={() => setIsVisible(true)} />
        <MountAnimation isVisible={isVisible}>
          <Scrim {...args} onClick={() => setIsVisible(false)} />
        </MountAnimation>
      </>
    );
  },
  args: {
    opacity: 0.2,
  },
};
