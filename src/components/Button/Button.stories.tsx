import type { Meta, StoryObj } from "@storybook/react";
import { getContainerConfigs } from "@/stories/utils";
import Button from ".";

const darkModeConfigs = getContainerConfigs({
  theme: "dark",
});

const meta = {
  title: "Reusable/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "tertiary",
  },
};

export const Danger: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "danger",
  },
};

export const PrimaryDark: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "primary",
  },
  ...darkModeConfigs,
};

export const SecondaryDark: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "secondary",
  },
  ...darkModeConfigs,
};

export const TertiaryDark: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "tertiary",
  },
  ...darkModeConfigs,
};

export const DangerDark: Story = {
  args: {
    label: "버튼",
    size: "small",
    type: "danger",
  },
  ...darkModeConfigs,
};
