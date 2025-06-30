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

export const Default: Story = {
  args: {
    style: {
      width: "400px",
      height: "600px",
    },
    children: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius,
          turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis
          sollicitudin mauris.
        </p>
        <p>
          Integer in mauris eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
          egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus
          libero eu augue.
        </p>
        <p>
          Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed
          lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra
          auctor, sem massa mattis sem, at interdum magna augue eget diam.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubil.
          In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu
          tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.
        </p>
        <p>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur, libero
          at auctor ullamcorper, lectus arcu pulvinar risus, vitae facilisis libero dolor
          a purus. Sed vel lacus. Mauris non ligula pellentesque ultrices.
        </p>
        <p>
          Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at
          aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero
          ac justo. Vivamus non quam. In suscipit faucibus urna.
        </p>
        <p>
          Quisque a lectus. Donec consectetur, libero at auctor ullamcorper, lectus arcu
          pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris non
          ligula pellentesque ultrices.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius,
          turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis
          sollicitudin mauris.
        </p>
        <p>
          Integer in mauris eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed
          egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus
          libero eu augue.
        </p>
        <p>
          Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed
          lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra
          auctor, sem massa mattis sem, at interdum magna augue eget diam.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubil.
          In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu
          tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.
        </p>
        <p>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur, libero
          at auctor ullamcorper, lectus arcu pulvinar risus, vitae facilisis libero dolor
          a purus. Sed vel lacus. Mauris non ligula pellentesque ultrices.
        </p>
        <p>
          Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at
          aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero
          ac justo. Vivamus non quam. In suscipit faucibus urna.
        </p>
        <p>
          Quisque a lectus. Donec consectetur, libero at auctor ullamcorper, lectus arcu
          pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris non
          ligula pellentesque ultrices.
        </p>
      </>
    ),
  },
};
