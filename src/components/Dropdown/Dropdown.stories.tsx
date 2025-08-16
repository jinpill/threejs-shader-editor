import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Dropdown, { DropdownProps } from ".";
import Options from "@/components/Options";
import type { Option } from "@/stores/useOptionsStore";

const meta = {
  title: "Reusable/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Story />
        </div>
        <Options />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    options: Array.from({ length: 10 }).map((_, i) => {
      const option: Option<number> = {
        icon: "camera",
        value: i,
        label: `Option ${i + 1}`,
        description: `Description for option ${i + 1}`,
      };

      if (i < 5) {
        delete option.icon;
        delete option.description;
      }

      return option;
    }),
  },
  render: (args) => {
    const [{ value }, setValue] = useArgs();

    const handleChange = (value: number) => {
      setValue({ value });
      args.onChange?.(value);
    };

    return (
      <Dropdown
        {...(args as DropdownProps<number>)}
        value={value}
        onChange={handleChange}
      />
    );
  },
};
