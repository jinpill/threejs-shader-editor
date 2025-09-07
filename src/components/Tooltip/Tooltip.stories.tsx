import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "@/components/Dropdown";
import Options from "@/components/Options";
import Tooltip from ".";
import Button from "@/components/Button";

const meta = {
  title: "Reusable/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const [vAlignment, setVAlignment] = useState(1);
      const [hAlignment, setHAlignment] = useState(1);

      return (
        <div
          style={{
            height: "320px",
            padding: "1rem",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems:
                vAlignment === 0
                  ? "flex-start"
                  : vAlignment === 1
                  ? "center"
                  : "flex-end",
              justifyContent:
                hAlignment === 0
                  ? "flex-start"
                  : hAlignment === 1
                  ? "center"
                  : "flex-end",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                position: "absolute",
                top: "50%",
                left: hAlignment === 0 ? "auto" : "0",
                right: hAlignment === 0 ? "0" : "auto",
                transform: "translateY(-50%)",
              }}
            >
              <Dropdown
                options={[
                  { label: "Top", value: 0 },
                  { label: "Center", value: 1 },
                  { label: "Bottom", value: 2 },
                ]}
                value={vAlignment}
                onChange={setVAlignment}
              />
              <Dropdown
                options={[
                  { label: "Left", value: 0 },
                  { label: "Center", value: 1 },
                  { label: "Right", value: 2 },
                ]}
                value={hAlignment}
                onChange={setHAlignment}
              />
            </div>
            <Options />
            <Tooltip.Provider>
              <Story />
              <Tooltip.Area />
            </Tooltip.Provider>
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: "이것은 중요한 버튼입니다.",
    direction: "bottom",
    children: <Button label="실행" />,
  },
};
