import type { Meta, StoryObj } from "@storybook/react";
import ToolPanel from ".";
import Skeletons from "@/stories/utils/Skeletons";

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
      <Skeletons count={10} height="80px" />
    </ToolPanel>
  ),
  args: {
    title: "ToolPanel",
  },
};

export const WithSections: Story = {
  render: (args) => (
    <ToolPanel {...args}>
      <ToolPanel.Section title="Section 1">
        <Skeletons count={2} height="32px" />
      </ToolPanel.Section>

      <ToolPanel.Section title="Section 2">
        <Skeletons count={3} height="32px" />
      </ToolPanel.Section>
    </ToolPanel>
  ),
  args: {
    title: "ToolPanel with Sections",
  },
};

export const WithButtons: Story = {
  render: (args) => (
    <ToolPanel {...args}>
      <ToolPanel.Section title="Section 1">
        <Skeletons count={2} height="32px" />
      </ToolPanel.Section>

      <ToolPanel.Section title="Section 2">
        <Skeletons count={3} height="32px" />
      </ToolPanel.Section>

      <ToolPanel.Buttons>
        <ToolPanel.Button type="secondary" label="Button 1" />
        <ToolPanel.Button type="primary" label="Button 2" />
      </ToolPanel.Buttons>
    </ToolPanel>
  ),
  args: {
    title: "ToolPanel with Buttons",
  },
};

export const WithLabels: Story = {
  render: (args) => (
    <ToolPanel {...args}>
      <ToolPanel.Section title="Section 1">
        <ToolPanel.Label name="Label 1">
          <Skeletons count={1} height="32px" />
        </ToolPanel.Label>
        <ToolPanel.Label name="Label 2">
          <Skeletons count={1} height="32px" />
        </ToolPanel.Label>
      </ToolPanel.Section>

      <ToolPanel.Section title="Section 2">
        <ToolPanel.Label name="Label 3">
          <Skeletons count={1} height="32px" />
        </ToolPanel.Label>
        <ToolPanel.Label name="Label 4">
          <Skeletons count={1} height="32px" />
        </ToolPanel.Label>
        <ToolPanel.Label name="Label 5">
          <Skeletons count={1} height="32px" />
        </ToolPanel.Label>
      </ToolPanel.Section>

      <ToolPanel.Buttons>
        <ToolPanel.Button type="secondary" label="Button 1" />
        <ToolPanel.Button type="primary" label="Button 2" />
      </ToolPanel.Buttons>
    </ToolPanel>
  ),
  args: {
    title: "ToolPanel with Labels",
  },
};
