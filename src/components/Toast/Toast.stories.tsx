import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Toast from ".";

const handleTimeout = (id: number) => {
  console.log("timeout:", id);
};

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
    duration: 5000,
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
    onTimeout: handleTimeout,
  },
};

export const Success: Story = {
  args: {
    id: 1,
    status: "success",
    title: "Success",
    message: "This is a success toast.",
    duration: null,
    onTimeout: handleTimeout,
  },
};

export const Warning: Story = {
  args: {
    id: 1,
    status: "warning",
    title: "Warning",
    message: "This is a warning toast.",
    duration: null,
    onTimeout: handleTimeout,
  },
};

export const Error: Story = {
  args: {
    id: 1,
    status: "error",
    title: "Error",
    message: "This is an error toast.",
    duration: null,
    onTimeout: handleTimeout,
  },
};

export const Progress: Story = {
  args: {
    id: 1,
    status: "info",
    title: "Progress",
    message: "Update in progress...",
    progress: 0.5,
    duration: null,
    onTimeout: handleTimeout,
  },
  render: (args) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      let timeoutId: number | null = null;

      const updateProgress = () => {
        setProgress((prev) => {
          const progress = prev + Math.random() / 10;

          if (progress > 1) {
            return 1;
          } else {
            timeoutId = window.setTimeout(updateProgress, 500);
            return progress;
          }
        });
      };
      updateProgress();

      return () => {
        if (timeoutId === null) return;
        clearTimeout(timeoutId);
        timeoutId = null;
      };
    }, []);

    return <Toast {...args} progress={progress} />;
  },
};
