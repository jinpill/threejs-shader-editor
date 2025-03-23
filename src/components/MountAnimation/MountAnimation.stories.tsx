import React from "react";
import classNames from "classnames";

import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/Button";
import MountAnimation from ".";

import style from "./style.module.scss";
import useUnmountAnimation from "@/hooks/useUnmountAnimation";

const meta = {
  title: "Reusable/MountAnimation",
  component: MountAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MountAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

const Children = (props: React.PropsWithChildren) => {
  const { isUnmounting, handleAnimationEnd } = useUnmountAnimation();

  return (
    <div
      className={classNames(style.children, {
        [style.unmounting]: isUnmounting,
      })}
      onAnimationEnd={handleAnimationEnd}
    >
      {props.children}
    </div>
  );
};

export const Default: Story = {
  render: (args) => {
    const [{ isVisible }, setValue] = useArgs();

    const handleClick = () => {
      setValue({
        isVisible: !isVisible,
      });
    };

    return (
      <div>
        <Button label="클릭하세요" onClick={handleClick} />
        <MountAnimation {...args} isVisible={isVisible} />
      </div>
    );
  },
  args: {
    isVisible: false,
    children: <Children>Children</Children>,
  },
};
