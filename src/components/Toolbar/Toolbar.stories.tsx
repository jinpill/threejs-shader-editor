import type { Meta, StoryObj } from "@storybook/react";
import Toolbar from ".";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import AnimationIcon from "@mui/icons-material/Animation";

const meta = {
  title: "Reusable/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "1rem 0" }}>
      <Toolbar {...args}>
        <Toolbar.Button label="3D모델">
          <ViewInArIcon />
        </Toolbar.Button>

        <Toolbar.Button label="조작">
          <ControlCameraIcon />
        </Toolbar.Button>

        <Toolbar.Button label="복제">
          <AnimationIcon />
        </Toolbar.Button>
      </Toolbar>
    </div>
  ),
  args: {},
};
