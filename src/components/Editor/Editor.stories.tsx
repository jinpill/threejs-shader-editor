import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Editor, { EditorProps } from ".";
import { useState } from "react";

const meta = {
  title: "Reusable/Editor",
  component: Editor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props: EditorProps) => {
    const [value, setValue] = useState("");
    return <Editor {...props} value={value} onChange={setValue} />;
  },
  args: {
    label: "Fragment Shader",
    value: "",
  },
};
