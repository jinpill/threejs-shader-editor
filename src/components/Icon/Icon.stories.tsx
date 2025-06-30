import type { Meta, StoryObj } from "@storybook/react";
import Icon from ".";

const meta = {
  title: "Reusable/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    icon: "home",
  },
};

export const Input: Story = {
  args: {
    icon: "input",
  },
};

export const Language: Story = {
  args: {
    icon: "language",
  },
};
