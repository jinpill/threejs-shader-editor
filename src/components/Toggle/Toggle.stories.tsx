import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Label from "@/components/Label";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/Button";
import Toggle from ".";
import { useArgs } from "@storybook/preview-api";

const meta = {
  title: "Reusable/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
      args.onChange?.(value);
    };

    return <Toggle {...args} value={value} onChange={handleChange} />;
  },
};

export const Test: Story = {
  args: {},
  render: (args) => {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
      args.onChange?.(value);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.375rem",
        }}
      >
        <Label size={args.size} direction="left" text="위치">
          <Input.Vector3 isDisabled={args.isDisabled} />
        </Label>
        <Label size={args.size} direction="left" text="상태 표시하기">
          <Toggle {...args} value={value} onChange={handleChange} />
        </Label>
        <Label size={args.size} direction="right" text="어떤 기능 실행하기">
          <CheckBox isDisabled={args.isDisabled} />
        </Label>
        <Button
          size={args.size}
          type="primary"
          label="실행하기"
          isFullWidth
          isDisabled={args.isDisabled}
        />
      </div>
    );
  },
};
