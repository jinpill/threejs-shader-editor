import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useArgs } from "@storybook/preview-api";
import Editor, { EditorProps } from ".";

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
  render: (args: EditorProps) => {
    const [{ value }, setValue] = useArgs();
    const handleChange = (value: string) => {
      setValue({ value: value });
    };
    return <Editor {...args} value={value} onChange={handleChange} />;
  },
  args: {
    label: "Fragment Shader",
    value: "",
  },
};
