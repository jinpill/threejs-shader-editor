import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import Dropdown, { DropdownProps } from ".";
import Options from "@/components/Options";
import Button from "@/components/Button";
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
    (Story) => {
      const containerRef = useRef<HTMLDivElement>(null);

      const setJustifyContent = (
        justifyContent: "flex-start" | "center" | "flex-end",
      ) => {
        if (!containerRef.current) return;
        containerRef.current.style.justifyContent = justifyContent;
      };

      return (
        <div
          ref={containerRef}
          style={{
            height: "25rem",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              position: "absolute",
              top: "50%",
              left: "1rem",
              transform: "translateY(-50%)",
            }}
          >
            <Button label="위" onClick={() => setJustifyContent("flex-start")} />
            <Button label="중간" onClick={() => setJustifyContent("center")} />
            <Button label="아래" onClick={() => setJustifyContent("flex-end")} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <div style={{ width: "15rem" }}>
              <Story />
            </div>
          </div>
          <Options />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "small",
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
    isFullWidth: true,
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
