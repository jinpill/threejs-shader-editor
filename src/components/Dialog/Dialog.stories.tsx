import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { getContainerConfigs } from "@/stories/utils";
import Button from "@/components/Button";
import MountAnimation from "@/components/MountAnimation";
import Dialog, { type DialogProps } from ".";

const meta = {
  title: "Reusable/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "info",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 1,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "primary",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const Success: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "success",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 1,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "primary",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const Warning: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "warning",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 0,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "danger",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const Error: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "error",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 0,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "danger",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const InfoDark: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
    theme: "dark",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "info",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 1,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "primary",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const SuccessDark: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
    theme: "dark",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "success",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 1,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "primary",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const WarningDark: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
    theme: "dark",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "warning",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 0,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "primary",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};

export const ErrorDark: Story = {
  ...getContainerConfigs({
    minHeight: "500px",
    theme: "dark",
  }),
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const [props, setProps] = useState(args as DialogProps<boolean>);

    const confirm = () => {
      const { promise, resolve } = Promise.withResolvers<boolean>();
      setIsVisible(true);
      setProps((prev) => ({
        ...prev,
        callback: (value: boolean) => {
          resolve(value);
          setIsVisible(false);
        },
      }));
      return promise;
    };

    const handleClick = async () => {
      const value = await confirm();
      console.log("value:", value);
    };

    useEffect(() => {
      setProps((prev) => ({
        ...(args as DialogProps<boolean>),
        callback: prev.callback,
      }));
    }, [args]);

    return (
      <>
        <Button label="다이얼로그 열기" onClick={handleClick} />

        <MountAnimation isVisible={isVisible}>
          <Dialog {...props} />
        </MountAnimation>
      </>
    );
  },
  args: {
    type: "error",
    title: "Lorem Ipsum Dolor Sit Amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultValue: false,
    defaultFocus: 0,
    buttons: [
      {
        icon: "close",
        type: "secondary",
        label: "취소",
        value: false,
      },
      {
        icon: "check",
        type: "danger",
        label: "확인",
        value: true,
      },
    ],
    callback: () => {},
  },
};
