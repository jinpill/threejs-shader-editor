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

export const Info: Story = {
  args: {
    id: 1,
    status: "info",
    title: "Info",
    message: "This is an info toast.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttons: [
      {
        type: "secondary",
        icon: "pan_tool",
        label: "No!!",
        onClick: () => {
          console.log("Umm...");
        },
      },
      {
        type: "primary",
        icon: "check",
        label: "Yes!!",
        onClick: () => {
          console.log("OK clicked!!");
        },
      },
    ],
  },
};

export const Success: Story = {
  args: {
    id: 1,
    status: "success",
    title: "Success",
    message: "This is a success toast.",
  },
};

export const Warning: Story = {
  args: {
    id: 1,
    status: "warning",
    title: "Warning",
    message: "This is a warning toast.",
  },
};

export const Error: Story = {
  args: {
    id: 1,
    status: "error",
    title: "Error",
    message: "This is an error toast.",
  },
};
