import type { Meta, StoryObj } from "@storybook/react";
import Scrollbar from ".";

const meta = {
  title: "Reusable/Scrollbar",
  component: Scrollbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Scrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Contents = () => (
  <>
    {Array.from({ length: 20 }).map((_, i) => (
      <p key={i}>
        Quisque a lectus. Donec consectetur, libero at auctor ullamcorper, lectus arcu
        pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris non
        ligula pellentesque ultrices.
      </p>
    ))}
  </>
);

export const Default: Story = {
  args: {
    style: {
      width: "25rem",
      height: "37.5rem",
    },
    children: <Contents />,
  },
};

export const BorderAndPadding: Story = {
  args: {
    style: {
      width: "25rem",
      height: "37.5rem",
      borderRadius: "0.5rem",
      border: "0.0625rem solid #d3d3d3",
      padding: "1.25rem",
    },
    children: <Contents />,
  },
};
