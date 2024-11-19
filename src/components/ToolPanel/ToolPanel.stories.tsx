import type { Meta, StoryObj } from "@storybook/react";
import ToolPanel from ".";
import { Skeleton } from "@mui/material";

const meta = {
  title: "Reusable/ToolPanel",
  component: ToolPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToolPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ToolPanel {...args}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" width="100%" height="80px" />
      ))}
    </ToolPanel>
  ),
  args: {
    title: "3D모델",
  },
};
